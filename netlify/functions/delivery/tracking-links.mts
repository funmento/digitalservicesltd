import type { Config, Context } from '@netlify/functions'
import { and, eq } from 'drizzle-orm'
import { createHash, randomBytes } from 'node:crypto'
import { db } from '../../../db/index.js'
import { auditLogs } from '../../../db/schema.js'
import { deliveryEvents, deliveryJobs, deliveryTrackingTokens } from '../../../db/delivery-schema.js'
import { canDispatch, forbidden, requireDeliveryContext } from './shared.mjs'

export default async (request: Request, _context: Context) => {
  if (request.method !== 'POST') return new Response('Method not allowed', { status: 405 })
  const resolved = await requireDeliveryContext()
  if ('error' in resolved) return resolved.error
  const { context } = resolved
  if (!canDispatch(context)) return forbidden()
  const { jobId, expiresAt } = await request.json() as { jobId?: string; expiresAt?: string }
  if (!jobId) return Response.json({ error: 'Job is required' }, { status: 400 })
  const [job] = await db.select().from(deliveryJobs).where(and(eq(deliveryJobs.id, jobId), eq(deliveryJobs.tenantId, context.tenantId))).limit(1)
  if (!job) return Response.json({ error: 'Delivery job not found' }, { status: 404 })
  const token = randomBytes(32).toString('base64url')
  const tokenHash = createHash('sha256').update(token).digest('hex')
  const [tracking] = await db.insert(deliveryTrackingTokens).values({ tenantId: context.tenantId, deliveryJobId: job.id, tokenHash, expiresAt: expiresAt ? new Date(expiresAt) : null }).returning()
  await db.insert(deliveryEvents).values({ tenantId: context.tenantId, deliveryJobId: job.id, eventType: 'delivery.tracking.created', actorMemberId: context.member.id })
  await db.insert(auditLogs).values({ tenantId: context.tenantId, memberId: context.member.id, action: 'delivery.tracking.created', entityType: 'delivery_job', entityId: job.id, metadata: { trackingTokenId: tracking.id } })
  return Response.json({ token, url: `${new URL(request.url).origin}/tracking/${token}`, expiresAt: tracking.expiresAt }, { status: 201 })
}
export const config: Config = { path: '/api/delivery/tracking-links' }
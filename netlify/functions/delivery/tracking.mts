import type { Config, Context } from '@netlify/functions'
import { and, eq, isNull, or } from 'drizzle-orm'
import { createHash } from 'node:crypto'
import { db } from '../../../db/index.js'
import { deliveryJobs, deliveryStops, deliveryTrackingTokens } from '../../../db/delivery-schema.js'

export default async (request: Request, _context: Context) => {
  if (request.method !== 'GET') return new Response('Method not allowed', { status: 405 })
  const token = new URL(request.url).searchParams.get('token')
  if (!token) return Response.json({ error: 'Tracking token required' }, { status: 400 })
  const tokenHash = createHash('sha256').update(token).digest('hex')
  const now = new Date()
  const [tracking] = await db.select().from(deliveryTrackingTokens).where(and(eq(deliveryTrackingTokens.tokenHash, tokenHash), isNull(deliveryTrackingTokens.revokedAt), or(isNull(deliveryTrackingTokens.expiresAt), eq(deliveryTrackingTokens.expiresAt, now)))).limit(1)
  if (!tracking) return Response.json({ error: 'Tracking link is unavailable' }, { status: 404 })
  const [job] = await db.select({ reference: deliveryJobs.reference, status: deliveryJobs.status, scheduledDate: deliveryJobs.scheduledDate, completedAt: deliveryJobs.completedAt }).from(deliveryJobs).where(and(eq(deliveryJobs.id, tracking.deliveryJobId), eq(deliveryJobs.tenantId, tracking.tenantId))).limit(1)
  const stops = await db.select({ sequence: deliveryStops.sequence, status: deliveryStops.status, completedAt: deliveryStops.completedAt }).from(deliveryStops).where(and(eq(deliveryStops.deliveryJobId, tracking.deliveryJobId), eq(deliveryStops.tenantId, tracking.tenantId)))
  await db.update(deliveryTrackingTokens).set({ lastViewedAt: now }).where(eq(deliveryTrackingTokens.id, tracking.id))
  return Response.json({ job, stops })
}
export const config: Config = { path: '/api/delivery/tracking' }
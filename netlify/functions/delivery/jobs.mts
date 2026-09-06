import type { Config, Context } from '@netlify/functions'
import { and, asc, eq } from 'drizzle-orm'
import { db } from '../../../db/index.js'
import { auditLogs, usageEvents } from '../../../db/schema.js'
import { deliveryEvents, deliveryJobs, deliveryStops } from '../../../db/delivery-schema.js'
import { canDispatch, forbidden, requireDeliveryContext } from './shared.mjs'

type Address = { line1: string; line2?: string; city: string; postcode: string; country: string }
type CreateJob = { reference?: string; scheduledDate?: string; recipientName?: string; recipientPhone?: string; recipientEmail?: string; address?: Address; deliveryNotes?: string }

export default async (request: Request, _context: Context) => {
  const resolved = await requireDeliveryContext()
  if ('error' in resolved) return resolved.error
  const { context } = resolved

  if (request.method === 'GET') {
    const jobs = await db.select().from(deliveryJobs).where(eq(deliveryJobs.tenantId, context.tenantId)).orderBy(asc(deliveryJobs.scheduledDate))
    return Response.json({ jobs })
  }
  if (request.method !== 'POST') return new Response('Method not allowed', { status: 405 })
  if (!canDispatch(context)) return forbidden()

  const body = await request.json() as CreateJob
  if (!body.reference?.trim() || !body.recipientName?.trim() || !body.scheduledDate || !body.address?.line1 || !body.address.city || !body.address.postcode || !body.address.country) return Response.json({ error: 'Reference, recipient, schedule and complete address are required' }, { status: 400 })
  const [job] = await db.insert(deliveryJobs).values({
    tenantId: context.tenantId, reference: body.reference.trim(), scheduledDate: new Date(body.scheduledDate),
    recipientName: body.recipientName.trim(), recipientPhone: body.recipientPhone?.trim() || null, recipientEmail: body.recipientEmail?.trim() || null,
    address: body.address, deliveryNotes: body.deliveryNotes?.trim() || '', createdByMemberId: context.member.id, status: 'ready_for_dispatch',
  }).returning()
  const [stop] = await db.insert(deliveryStops).values({ tenantId: context.tenantId, deliveryJobId: job.id, sequence: 1, recipientName: job.recipientName, address: job.address, notes: job.deliveryNotes }).returning()
  await db.insert(deliveryEvents).values({ tenantId: context.tenantId, deliveryJobId: job.id, deliveryStopId: stop.id, eventType: 'delivery.job.created', actorMemberId: context.member.id })
  await db.insert(auditLogs).values({ tenantId: context.tenantId, memberId: context.member.id, action: 'delivery.job.created', entityType: 'delivery_job', entityId: job.id, metadata: { reference: job.reference } })
  await db.insert(usageEvents).values({ tenantId: context.tenantId, moduleId: 'delivery', metric: 'delivery_jobs_created', quantity: 1 })
  return Response.json({ job, stop }, { status: 201 })
}
export const config: Config = { path: '/api/delivery/jobs' }
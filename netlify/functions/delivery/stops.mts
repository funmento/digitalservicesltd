import type { Config, Context } from '@netlify/functions'
import { and, eq } from 'drizzle-orm'
import { db } from '../../../db/index.js'
import { auditLogs, usageEvents } from '../../../db/schema.js'
import { deliveryAssignments, deliveryEvents, deliveryJobs, deliveryProofs, deliveryStops } from '../../../db/delivery-schema.js'
import { canDispatch, deriveJobStatus, forbidden, requireDeliveryContext } from './shared.mjs'

type StopAction = { stopId?: string; status?: 'out_for_delivery' | 'delivered' | 'delivery_failed'; failureReason?: string; recipientName?: string; proofType?: 'recipient_name' | 'signature' | 'photo' | 'otp'; storageKey?: string }

export default async (request: Request, _context: Context) => {
  if (request.method !== 'POST') return new Response('Method not allowed', { status: 405 })
  const resolved = await requireDeliveryContext()
  if ('error' in resolved) return resolved.error
  const { context } = resolved
  const body = await request.json() as StopAction
  if (!body.stopId || !body.status) return Response.json({ error: 'Stop and status are required' }, { status: 400 })
  const [stop] = await db.select().from(deliveryStops).where(and(eq(deliveryStops.id, body.stopId), eq(deliveryStops.tenantId, context.tenantId))).limit(1)
  if (!stop) return Response.json({ error: 'Delivery stop not found' }, { status: 404 })
  const [job] = await db.select().from(deliveryJobs).where(and(eq(deliveryJobs.id, stop.deliveryJobId), eq(deliveryJobs.tenantId, context.tenantId))).limit(1)
  const [assignment] = await db.select().from(deliveryAssignments).where(and(eq(deliveryAssignments.deliveryJobId, job.id), eq(deliveryAssignments.tenantId, context.tenantId))).limit(1)
  const isAssignedDriver = assignment && assignment.deliveryDriverId && context.member.id === assignment.assignedByMemberId
  if (!canDispatch(context) && !isAssignedDriver) return forbidden()
  if (body.status === 'delivered' && !body.proofType) return Response.json({ error: 'Proof of delivery is required before completion' }, { status: 400 })
  if (body.status === 'delivery_failed' && !body.failureReason?.trim()) return Response.json({ error: 'A failure reason is required' }, { status: 400 })

  const completedAt = body.status === 'delivered' ? new Date() : null
  await db.update(deliveryStops).set({ status: body.status, completedAt, failureReason: body.status === 'delivery_failed' ? body.failureReason!.trim() : null }).where(eq(deliveryStops.id, stop.id))
  if (body.status === 'delivered') await db.insert(deliveryProofs).values({ tenantId: context.tenantId, deliveryStopId: stop.id, type: body.proofType!, recipientName: body.recipientName?.trim() || null, storageKey: body.storageKey || null, capturedByMemberId: context.member.id })
  const stops = await db.select({ status: deliveryStops.status }).from(deliveryStops).where(and(eq(deliveryStops.deliveryJobId, job.id), eq(deliveryStops.tenantId, context.tenantId)))
  const jobStatus = deriveJobStatus(stops.map(item => item.status))
  await db.update(deliveryJobs).set({ status: jobStatus, completedAt: jobStatus === 'delivered' ? new Date() : null, updatedAt: new Date() }).where(eq(deliveryJobs.id, job.id))
  await db.insert(deliveryEvents).values({ tenantId: context.tenantId, deliveryJobId: job.id, deliveryStopId: stop.id, eventType: `delivery.stop.${body.status}`, actorMemberId: context.member.id, metadata: { failureReason: body.failureReason || null } })
  await db.insert(auditLogs).values({ tenantId: context.tenantId, memberId: context.member.id, action: `delivery.stop.${body.status}`, entityType: 'delivery_stop', entityId: stop.id, metadata: { jobId: job.id } })
  if (body.status === 'delivered' || body.status === 'delivery_failed') await db.insert(usageEvents).values({ tenantId: context.tenantId, moduleId: 'delivery', metric: 'delivery_stops_completed', quantity: 1 })
  return Response.json({ jobId: job.id, jobStatus, stopStatus: body.status })
}
export const config: Config = { path: '/api/delivery/stops' }
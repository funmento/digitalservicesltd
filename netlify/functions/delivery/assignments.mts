import type { Config, Context } from '@netlify/functions'
import { and, eq } from 'drizzle-orm'
import { db } from '../../../db/index.js'
import { auditLogs } from '../../../db/schema.js'
import { deliveryAssignments, deliveryDrivers, deliveryEvents, deliveryJobs, deliveryStops, deliveryVehicles } from '../../../db/delivery-schema.js'
import { canDispatch, forbidden, requireDeliveryContext } from './shared.mjs'

type AssignmentRequest = { jobId?: string; driverId?: string; vehicleId?: string | null }

export default async (request: Request, _context: Context) => {
  if (request.method !== 'POST') return new Response('Method not allowed', { status: 405 })
  const resolved = await requireDeliveryContext()
  if ('error' in resolved) return resolved.error
  const { context } = resolved
  if (!canDispatch(context)) return forbidden()
  const body = await request.json() as AssignmentRequest
  if (!body.jobId || !body.driverId) return Response.json({ error: 'Job and driver are required' }, { status: 400 })
  const [job] = await db.select().from(deliveryJobs).where(and(eq(deliveryJobs.id, body.jobId), eq(deliveryJobs.tenantId, context.tenantId))).limit(1)
  const [driver] = await db.select().from(deliveryDrivers).where(and(eq(deliveryDrivers.id, body.driverId), eq(deliveryDrivers.tenantId, context.tenantId), eq(deliveryDrivers.active, true))).limit(1)
  if (!job || !driver) return Response.json({ error: 'Job or driver was not found in this workspace' }, { status: 404 })
  if (body.vehicleId) {
    const [vehicle] = await db.select().from(deliveryVehicles).where(and(eq(deliveryVehicles.id, body.vehicleId), eq(deliveryVehicles.tenantId, context.tenantId), eq(deliveryVehicles.active, true))).limit(1)
    if (!vehicle) return Response.json({ error: 'Vehicle was not found in this workspace' }, { status: 404 })
  }
  await db.update(deliveryAssignments).set({ unassignedAt: new Date() }).where(and(eq(deliveryAssignments.deliveryJobId, job.id), eq(deliveryAssignments.tenantId, context.tenantId), eq(deliveryAssignments.unassignedAt, null)))
  const [assignment] = await db.insert(deliveryAssignments).values({ tenantId: context.tenantId, deliveryJobId: job.id, deliveryDriverId: driver.id, deliveryVehicleId: body.vehicleId || null, assignedByMemberId: context.member.id }).returning()
  await db.update(deliveryStops).set({ status: 'assigned' }).where(and(eq(deliveryStops.deliveryJobId, job.id), eq(deliveryStops.tenantId, context.tenantId)))
  await db.update(deliveryJobs).set({ status: 'assigned', updatedAt: new Date() }).where(eq(deliveryJobs.id, job.id))
  await db.insert(deliveryEvents).values({ tenantId: context.tenantId, deliveryJobId: job.id, eventType: 'delivery.job.assigned', actorMemberId: context.member.id, metadata: { driverId: driver.id, vehicleId: body.vehicleId || null } })
  await db.insert(auditLogs).values({ tenantId: context.tenantId, memberId: context.member.id, action: 'delivery.job.assigned', entityType: 'delivery_job', entityId: job.id, metadata: { assignmentId: assignment.id, driverId: driver.id } })
  return Response.json({ assignment, jobStatus: 'assigned' })
}
export const config: Config = { path: '/api/delivery/assignments' }
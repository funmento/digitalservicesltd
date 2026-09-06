import type { Config, Context } from '@netlify/functions'
import { and, eq, inArray, isNull } from 'drizzle-orm'
import { db } from '../../../db/index.js'
import { deliveryAssignments, deliveryDrivers, deliveryJobs, deliveryStops } from '../../../db/delivery-schema.js'
import { requireDeliveryContext } from './shared.mjs'

export default async (request: Request, _context: Context) => {
  if (request.method !== 'GET') return new Response('Method not allowed', { status: 405 })
  const resolved = await requireDeliveryContext()
  if ('error' in resolved) return resolved.error
  const { context } = resolved
  const [driver] = await db.select().from(deliveryDrivers).where(and(eq(deliveryDrivers.tenantId, context.tenantId), eq(deliveryDrivers.memberId, context.member.id), eq(deliveryDrivers.active, true))).limit(1)
  if (!driver) return Response.json({ error: 'No active driver profile is linked to this member' }, { status: 403 })
  const assignments = await db.select().from(deliveryAssignments).where(and(eq(deliveryAssignments.tenantId, context.tenantId), eq(deliveryAssignments.deliveryDriverId, driver.id), isNull(deliveryAssignments.unassignedAt)))
  const jobIds = assignments.map(assignment => assignment.deliveryJobId)
  const jobs = jobIds.length ? await db.select().from(deliveryJobs).where(and(eq(deliveryJobs.tenantId, context.tenantId), inArray(deliveryJobs.id, jobIds))) : []
  const stops = jobIds.length ? await db.select().from(deliveryStops).where(and(eq(deliveryStops.tenantId, context.tenantId), inArray(deliveryStops.deliveryJobId, jobIds))) : []
  return Response.json({ jobs, stops })
}
export const config: Config = { path: '/api/delivery/driver-jobs' }
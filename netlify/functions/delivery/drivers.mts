import type { Config, Context } from '@netlify/functions'
import { eq } from 'drizzle-orm'
import { db } from '../../../db/index.js'
import { auditLogs } from '../../../db/schema.js'
import { deliveryDrivers, deliveryVehicles } from '../../../db/delivery-schema.js'
import { canDispatch, forbidden, requireDeliveryContext } from './shared.mjs'

type Resource = { kind?: 'driver' | 'vehicle'; name?: string; phone?: string; email?: string; registration?: string; capacityKg?: number }

export default async (request: Request, _context: Context) => {
  const resolved = await requireDeliveryContext()
  if ('error' in resolved) return resolved.error
  const { context } = resolved
  if (request.method === 'GET') {
    const [drivers, vehicles] = await Promise.all([
      db.select().from(deliveryDrivers).where(eq(deliveryDrivers.tenantId, context.tenantId)),
      db.select().from(deliveryVehicles).where(eq(deliveryVehicles.tenantId, context.tenantId)),
    ])
    return Response.json({ drivers, vehicles })
  }
  if (request.method !== 'POST') return new Response('Method not allowed', { status: 405 })
  if (!canDispatch(context)) return forbidden()
  const body = await request.json() as Resource
  if (body.kind === 'driver') {
    if (!body.name?.trim() || !body.phone?.trim()) return Response.json({ error: 'Driver name and phone are required' }, { status: 400 })
    const [driver] = await db.insert(deliveryDrivers).values({ tenantId: context.tenantId, name: body.name.trim(), phone: body.phone.trim(), email: body.email?.trim() || null }).returning()
    await db.insert(auditLogs).values({ tenantId: context.tenantId, memberId: context.member.id, action: 'delivery.driver.created', entityType: 'delivery_driver', entityId: driver.id })
    return Response.json({ driver }, { status: 201 })
  }
  if (body.kind === 'vehicle') {
    if (!body.name?.trim() || !body.registration?.trim()) return Response.json({ error: 'Vehicle name and registration are required' }, { status: 400 })
    const [vehicle] = await db.insert(deliveryVehicles).values({ tenantId: context.tenantId, name: body.name.trim(), registration: body.registration.trim(), capacityKg: body.capacityKg || null }).returning()
    await db.insert(auditLogs).values({ tenantId: context.tenantId, memberId: context.member.id, action: 'delivery.vehicle.created', entityType: 'delivery_vehicle', entityId: vehicle.id })
    return Response.json({ vehicle }, { status: 201 })
  }
  return Response.json({ error: 'Resource kind must be driver or vehicle' }, { status: 400 })
}
export const config: Config = { path: '/api/delivery/drivers' }
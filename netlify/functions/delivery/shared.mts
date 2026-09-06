import { getUser } from '@netlify/identity'
import { and, eq } from 'drizzle-orm'
import { db } from '../../../db/index.js'
import { members, tenantModules } from '../../../db/schema.js'

export type DeliveryContext = { member: typeof members.$inferSelect; tenantId: string }

export async function requireDeliveryContext() {
  const user = await getUser()
  if (!user) return { error: Response.json({ error: 'Authentication required' }, { status: 401 }) } as const
  const [member] = await db.select().from(members).where(and(eq(members.identityUserId, user.id), eq(members.status, 'active'))).limit(1)
  if (!member) return { error: Response.json({ error: 'Active workspace membership required' }, { status: 403 }) } as const
  const [entitlement] = await db.select().from(tenantModules).where(and(eq(tenantModules.tenantId, member.tenantId), eq(tenantModules.moduleId, 'delivery'), eq(tenantModules.enabled, true))).limit(1)
  if (!entitlement) return { error: Response.json({ error: 'Delivery Management is not active for this workspace' }, { status: 402 }) } as const
  return { context: { member, tenantId: member.tenantId } satisfies DeliveryContext } as const
}

export function canDispatch(context: DeliveryContext) {
  return context.member.role === 'owner' || context.member.role === 'admin'
}

export function forbidden() {
  return Response.json({ error: 'Delivery dispatcher access required' }, { status: 403 })
}

export function deriveJobStatus(stopStatuses: string[], canceled = false) {
  if (canceled) return 'canceled' as const
  if (!stopStatuses.length || stopStatuses.every(status => status === 'pending')) return 'ready_for_dispatch' as const
  if (stopStatuses.every(status => status === 'delivered')) return 'delivered' as const
  if (stopStatuses.some(status => status === 'out_for_delivery')) return 'out_for_delivery' as const
  if (stopStatuses.some(status => status === 'delivery_failed') && !stopStatuses.some(status => ['pending', 'assigned', 'out_for_delivery'].includes(status))) return 'delivery_failed' as const
  if (stopStatuses.some(status => status === 'assigned')) return 'assigned' as const
  return 'ready_for_dispatch' as const
}

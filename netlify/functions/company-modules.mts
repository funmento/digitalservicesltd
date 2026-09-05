import type { Config, Context } from '@netlify/functions'
import { getUser } from '@netlify/identity'
import { and, eq } from 'drizzle-orm'
import { db } from '../../db/index.js'
import { auditLogs, members, modules, tenantModules } from '../../db/schema.js'

export default async (request: Request, _context: Context) => {
  const user = await getUser()
  if (!user) return Response.json({ error: 'Authentication required' }, { status: 401 })
  const [membership] = await db.select().from(members).where(eq(members.identityUserId, user.id)).limit(1)
  if (!membership) return Response.json({ error: 'Workspace not found' }, { status: 404 })

  if (request.method === 'GET') {
    const activeModules = await db.select({ id: modules.id, name: modules.name, slug: modules.slug, category: modules.category, featureFlags: modules.featureFlags, enabled: tenantModules.enabled })
      .from(tenantModules)
      .innerJoin(modules, eq(modules.id, tenantModules.moduleId))
      .where(and(eq(tenantModules.tenantId, membership.tenantId), eq(tenantModules.enabled, true), eq(modules.active, true)))
    return Response.json({ modules: activeModules })
  }

  if (request.method === 'PATCH') {
    if (membership.role === 'member') return Response.json({ error: 'Admin access required' }, { status: 403 })
    const body = await request.json() as { moduleId?: string; enabled?: boolean }
    if (!body.moduleId || typeof body.enabled !== 'boolean') return Response.json({ error: 'Module and enabled state are required' }, { status: 400 })
    const [companyModule] = await db.select().from(tenantModules).where(and(eq(tenantModules.tenantId, membership.tenantId), eq(tenantModules.moduleId, body.moduleId))).limit(1)
    if (!companyModule && body.enabled) return Response.json({ error: 'Activate new modules through secure checkout.' }, { status: 402 })
    if (!companyModule) return Response.json({ error: 'Module is not part of this workspace.' }, { status: 404 })
    await db.update(tenantModules).set({ enabled: body.enabled, activatedAt: body.enabled ? new Date() : companyModule.activatedAt }).where(eq(tenantModules.id, companyModule.id))
    await db.insert(auditLogs).values({ tenantId: membership.tenantId, memberId: membership.id, action: body.enabled ? 'module.enabled' : 'module.disabled', entityType: 'module', entityId: body.moduleId })
    return Response.json({ moduleId: body.moduleId, enabled: body.enabled })
  }

  return new Response('Method not allowed', { status: 405 })
}

export const config: Config = { path: '/api/company-modules' }

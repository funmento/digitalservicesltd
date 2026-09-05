import type { Config, Context } from '@netlify/functions'
import { getUser } from '@netlify/identity'
import { and, eq, inArray } from 'drizzle-orm'
import { db } from '../../db/index.js'
import { auditLogs, members, modules, notifications, roles, subscriptionPlans, subscriptions, teamMembers, teams, tenantModules, tenants } from '../../db/schema.js'

export default async (request: Request, _context: Context) => {
  if (request.method !== 'POST') return new Response('Method not allowed', { status: 405 })
  const user = await getUser()
  if (!user?.email) return Response.json({ error: 'Authentication required' }, { status: 401 })
  const body = await request.json() as { companyName?: string; industry?: string; modules?: string[] }
  if (!body.companyName?.trim()) return Response.json({ error: 'Company name is required' }, { status: 400 })
  const existing = await db.select().from(members).where(eq(members.identityUserId, user.id)).limit(1)
  if (existing.length) return Response.json({ tenantId: existing[0].tenantId })

  const requestedIds = [...new Set(body.modules || [])]
  const validModules = requestedIds.length ? await db.select({ id: modules.id }).from(modules).where(and(inArray(modules.id, requestedIds), eq(modules.active, true))) : []
  if (requestedIds.length && !validModules.length) return Response.json({ error: 'Choose at least one available module.' }, { status: 400 })

  const baseSlug = body.companyName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'workspace'
  const slug = `${baseSlug}-${crypto.randomUUID().slice(0, 6)}`
  const [tenant] = await db.insert(tenants).values({ name: body.companyName.trim(), slug, industry: body.industry || 'professional_services' }).returning()
  const createdRoles = await db.insert(roles).values([
    { tenantId: tenant.id, name: 'Owner', description: 'Full workspace, billing, and module control', system: true },
    { tenantId: tenant.id, name: 'Admin', description: 'Operational administration without ownership transfer', system: true },
    { tenantId: tenant.id, name: 'Member', description: 'Standard access controlled by assigned permissions', system: true },
  ]).returning()
  const ownerRole = createdRoles.find(role => role.name === 'Owner')
  const [member] = await db.insert(members).values({ tenantId: tenant.id, identityUserId: user.id, email: user.email, fullName: user.name || null, role: 'owner', roleId: ownerRole?.id }).returning()
  const [defaultTeam] = await db.insert(teams).values({ tenantId: tenant.id, name: 'Company', description: 'Default company-wide team' }).returning()
  await db.insert(teamMembers).values({ teamId: defaultTeam.id, memberId: member.id })
  const [corePlan] = await db.select().from(subscriptionPlans).where(eq(subscriptionPlans.slug, 'core')).limit(1)
  await db.insert(subscriptions).values({ tenantId: tenant.id, planId: corePlan?.id, status: 'trialing' })
  if (validModules.length) await db.insert(tenantModules).values(validModules.map(module => ({ tenantId: tenant.id, moduleId: module.id }))).onConflictDoNothing()
  await db.insert(notifications).values({ tenantId: tenant.id, memberId: member.id, title: 'Workspace ready', body: `${validModules.length} starting modules are active in your workspace.` })
  await db.insert(auditLogs).values({ tenantId: tenant.id, memberId: member.id, action: 'workspace.created', entityType: 'tenant', entityId: tenant.id, metadata: { moduleIds: validModules.map(module => module.id) } })
  return Response.json({ tenantId: tenant.id, slug: tenant.slug }, { status: 201 })
}

export const config: Config = { path: '/api/onboarding' }

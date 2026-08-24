import type { Config, Context } from '@netlify/functions'
import { getUser } from '@netlify/identity'
import { eq } from 'drizzle-orm'
import { db } from '../../db/index.js'
import { members, subscriptions, tenantModules, tenants } from '../../db/schema.js'

export default async (request: Request, _context: Context) => {
  if (request.method !== 'POST') return new Response('Method not allowed', { status: 405 })
  const user = await getUser()
  if (!user?.email) return Response.json({ error: 'Authentication required' }, { status: 401 })
  const body = await request.json() as { companyName?: string; industry?: string; modules?: string[] }
  if (!body.companyName?.trim()) return Response.json({ error: 'Company name is required' }, { status: 400 })
  const existing = await db.select().from(members).where(eq(members.identityUserId, user.id)).limit(1)
  if (existing.length) return Response.json({ tenantId: existing[0].tenantId })
  const slug = `${body.companyName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}-${crypto.randomUUID().slice(0, 6)}`
  const [tenant] = await db.insert(tenants).values({ name: body.companyName.trim(), slug, industry: body.industry || 'professional_services' }).returning()
  await db.insert(members).values({ tenantId: tenant.id, identityUserId: user.id, email: user.email, role: 'owner' })
  await db.insert(subscriptions).values({ tenantId: tenant.id, status: 'trialing' })
  if (body.modules?.length) await db.insert(tenantModules).values(body.modules.map(moduleId => ({ tenantId: tenant.id, moduleId }))).onConflictDoNothing()
  return Response.json({ tenantId: tenant.id }, { status: 201 })
}

export const config: Config = { path: '/api/onboarding' }

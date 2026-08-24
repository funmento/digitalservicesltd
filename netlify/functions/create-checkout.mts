import type { Config, Context } from '@netlify/functions'
import { getUser } from '@netlify/identity'
import { eq, inArray } from 'drizzle-orm'
import Stripe from 'stripe'
import { db } from '../../db/index.js'
import { members, modules, tenants } from '../../db/schema.js'

export default async (request: Request, _context: Context) => {
  if (request.method !== 'POST') return new Response('Method not allowed', { status: 405 })
  const user = await getUser()
  if (!user?.email) return Response.json({ error: 'Sign in to activate modules.' }, { status: 401 })
  const secretKey = Netlify.env.get('STRIPE_SECRET_KEY')
  if (!secretKey) return Response.json({ error: 'Stripe is not configured yet.' }, { status: 503 })
  const { moduleIds } = await request.json() as { moduleIds?: string[] }
  if (!moduleIds?.length) return Response.json({ error: 'Select at least one module.' }, { status: 400 })
  const [membership] = await db.select().from(members).where(eq(members.identityUserId, user.id)).limit(1)
  if (!membership) return Response.json({ error: 'Complete workspace onboarding first.' }, { status: 409 })
  const [tenant] = await db.select().from(tenants).where(eq(tenants.id, membership.tenantId)).limit(1)
  const selectedModules = await db.select().from(modules).where(inArray(modules.id, moduleIds))
  if (!selectedModules.length) return Response.json({ error: 'No valid modules were selected.' }, { status: 400 })
  const stripe = new Stripe(secretKey)
  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    customer: tenant.stripeCustomerId || undefined,
    customer_email: tenant.stripeCustomerId ? undefined : user.email,
    line_items: [
      { price_data: { currency: 'gbp', recurring: { interval: 'month' }, product_data: { name: 'Digital Services ERP core platform' }, unit_amount: 1900 }, quantity: 1 },
      ...selectedModules.map(module => ({ price_data: { currency: 'gbp', recurring: { interval: 'month' as const }, product_data: { name: `${module.name} module`, metadata: { moduleId: module.id } }, unit_amount: module.monthlyPrice * 100 }, quantity: 1 })),
    ],
    metadata: { tenantId: tenant.id, moduleIds: moduleIds.join(',') },
    success_url: `${new URL(request.url).origin}/dashboard?checkout=success`,
    cancel_url: `${new URL(request.url).origin}/marketplace?checkout=canceled`,
  })
  return Response.json({ url: session.url })
}

export const config: Config = { path: '/api/create-checkout' }

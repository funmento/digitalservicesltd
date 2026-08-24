import type { Config, Context } from '@netlify/functions'
import { eq } from 'drizzle-orm'
import Stripe from 'stripe'
import { db } from '../../db/index.js'
import { subscriptions, tenantModules, tenants } from '../../db/schema.js'

export default async (request: Request, _context: Context) => {
  const secretKey = Netlify.env.get('STRIPE_SECRET_KEY'); const webhookSecret = Netlify.env.get('STRIPE_WEBHOOK_SECRET')
  if (!secretKey || !webhookSecret) return new Response('Stripe unavailable', { status: 503 })
  const stripe = new Stripe(secretKey); const signature = request.headers.get('stripe-signature')
  if (!signature) return new Response('Missing signature', { status: 400 })
  let event: Stripe.Event
  try { event = stripe.webhooks.constructEvent(await request.text(), signature, webhookSecret) } catch { return new Response('Invalid signature', { status: 400 }) }
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object; const tenantId = session.metadata?.tenantId; const moduleIds = session.metadata?.moduleIds?.split(',').filter(Boolean) || []
    if (tenantId) {
      if (session.customer) await db.update(tenants).set({ stripeCustomerId: String(session.customer) }).where(eq(tenants.id, tenantId))
      await db.update(subscriptions).set({ stripeSubscriptionId: String(session.subscription), status: 'active', updatedAt: new Date() }).where(eq(subscriptions.tenantId, tenantId))
      if (moduleIds.length) await db.insert(tenantModules).values(moduleIds.map(moduleId => ({ tenantId, moduleId }))).onConflictDoUpdate({ target: [tenantModules.tenantId, tenantModules.moduleId], set: { enabled: true, activatedAt: new Date() } })
    }
  }
  return new Response('ok')
}

export const config: Config = { path: '/api/stripe-webhook' }

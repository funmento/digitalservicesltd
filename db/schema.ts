import { boolean, integer, pgEnum, pgTable, text, timestamp, uniqueIndex, uuid } from 'drizzle-orm/pg-core'

export const memberRole = pgEnum('member_role', ['owner', 'admin', 'member'])
export const subscriptionStatus = pgEnum('subscription_status', ['trialing', 'active', 'past_due', 'canceled'])

export const tenants = pgTable('tenants', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  industry: text('industry').notNull().default('professional_services'),
  stripeCustomerId: text('stripe_customer_id').unique(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
})

export const members = pgTable('members', {
  id: uuid('id').defaultRandom().primaryKey(),
  tenantId: uuid('tenant_id').notNull().references(() => tenants.id, { onDelete: 'cascade' }),
  identityUserId: text('identity_user_id').notNull(),
  email: text('email').notNull(),
  role: memberRole('role').notNull().default('member'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
}, (table) => [uniqueIndex('member_identity_tenant_idx').on(table.identityUserId, table.tenantId)])

export const modules = pgTable('modules', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description').notNull(),
  monthlyPrice: integer('monthly_price').notNull(),
  active: boolean('active').notNull().default(true),
})

export const tenantModules = pgTable('tenant_modules', {
  id: uuid('id').defaultRandom().primaryKey(),
  tenantId: uuid('tenant_id').notNull().references(() => tenants.id, { onDelete: 'cascade' }),
  moduleId: text('module_id').notNull().references(() => modules.id),
  enabled: boolean('enabled').notNull().default(true),
  activatedAt: timestamp('activated_at', { withTimezone: true }).defaultNow().notNull(),
}, (table) => [uniqueIndex('tenant_module_idx').on(table.tenantId, table.moduleId)])

export const subscriptions = pgTable('subscriptions', {
  id: uuid('id').defaultRandom().primaryKey(),
  tenantId: uuid('tenant_id').notNull().references(() => tenants.id, { onDelete: 'cascade' }).unique(),
  stripeSubscriptionId: text('stripe_subscription_id').unique(),
  status: subscriptionStatus('status').notNull().default('trialing'),
  seats: integer('seats').notNull().default(5),
  currentPeriodEnd: timestamp('current_period_end', { withTimezone: true }),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
})

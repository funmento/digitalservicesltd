import { boolean, integer, jsonb, pgEnum, pgTable, text, timestamp, uniqueIndex, uuid } from 'drizzle-orm/pg-core'

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

export const roles = pgTable('roles', {
  id: uuid('id').defaultRandom().primaryKey(),
  tenantId: uuid('tenant_id').notNull().references(() => tenants.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  description: text('description').notNull().default(''),
  system: boolean('system').notNull().default(false),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
}, (table) => [uniqueIndex('role_tenant_name_idx').on(table.tenantId, table.name)])

export const members = pgTable('members', {
  id: uuid('id').defaultRandom().primaryKey(),
  tenantId: uuid('tenant_id').notNull().references(() => tenants.id, { onDelete: 'cascade' }),
  identityUserId: text('identity_user_id').notNull(),
  email: text('email').notNull(),
  fullName: text('full_name'),
  role: memberRole('role').notNull().default('member'),
  roleId: uuid('role_id').references(() => roles.id, { onDelete: 'set null' }),
  status: text('status').notNull().default('active'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
}, (table) => [uniqueIndex('member_identity_tenant_idx').on(table.identityUserId, table.tenantId)])

export const modules = pgTable('modules', {
  id: text('id').primaryKey(),
  slug: text('slug').notNull().unique(),
  name: text('name').notNull(),
  description: text('description').notNull(),
  icon: text('icon').notNull().default('box'),
  category: text('category').notNull().default('Operations'),
  monthlyPrice: integer('monthly_price').notNull(),
  usagePricing: jsonb('usage_pricing').$type<Record<string, string | number>>().notNull().default({}),
  featureFlags: jsonb('feature_flags').$type<Record<string, boolean>>().notNull().default({}),
  active: boolean('active').notNull().default(true),
})

export const tenantModules = pgTable('tenant_modules', {
  id: uuid('id').defaultRandom().primaryKey(),
  tenantId: uuid('tenant_id').notNull().references(() => tenants.id, { onDelete: 'cascade' }),
  moduleId: text('module_id').notNull().references(() => modules.id),
  enabled: boolean('enabled').notNull().default(true),
  activatedAt: timestamp('activated_at', { withTimezone: true }).defaultNow().notNull(),
}, (table) => [uniqueIndex('tenant_module_idx').on(table.tenantId, table.moduleId)])

export const subscriptionPlans = pgTable('subscription_plans', {
  id: uuid('id').defaultRandom().primaryKey(),
  slug: text('slug').notNull().unique(),
  name: text('name').notNull(),
  baseMonthlyPrice: integer('base_monthly_price').notNull(),
  includedSeats: integer('included_seats').notNull().default(10),
  features: jsonb('features').$type<string[]>().notNull().default([]),
  active: boolean('active').notNull().default(true),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
})

export const subscriptions = pgTable('subscriptions', {
  id: uuid('id').defaultRandom().primaryKey(),
  tenantId: uuid('tenant_id').notNull().references(() => tenants.id, { onDelete: 'cascade' }).unique(),
  planId: uuid('plan_id').references(() => subscriptionPlans.id, { onDelete: 'set null' }),
  stripeSubscriptionId: text('stripe_subscription_id').unique(),
  status: subscriptionStatus('status').notNull().default('trialing'),
  seats: integer('seats').notNull().default(5),
  currentPeriodEnd: timestamp('current_period_end', { withTimezone: true }),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
})

export const teams = pgTable('teams', {
  id: uuid('id').defaultRandom().primaryKey(),
  tenantId: uuid('tenant_id').notNull().references(() => tenants.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  description: text('description').notNull().default(''),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
}, (table) => [uniqueIndex('team_tenant_name_idx').on(table.tenantId, table.name)])

export const teamMembers = pgTable('team_members', {
  id: uuid('id').defaultRandom().primaryKey(),
  teamId: uuid('team_id').notNull().references(() => teams.id, { onDelete: 'cascade' }),
  memberId: uuid('member_id').notNull().references(() => members.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
}, (table) => [uniqueIndex('team_member_idx').on(table.teamId, table.memberId)])

export const permissions = pgTable('permissions', {
  id: uuid('id').defaultRandom().primaryKey(),
  key: text('key').notNull().unique(),
  description: text('description').notNull().default(''),
})

export const rolePermissions = pgTable('role_permissions', {
  id: uuid('id').defaultRandom().primaryKey(),
  roleId: uuid('role_id').notNull().references(() => roles.id, { onDelete: 'cascade' }),
  permissionId: uuid('permission_id').notNull().references(() => permissions.id, { onDelete: 'cascade' }),
}, (table) => [uniqueIndex('role_permission_idx').on(table.roleId, table.permissionId)])

export const notifications = pgTable('notifications', {
  id: uuid('id').defaultRandom().primaryKey(),
  tenantId: uuid('tenant_id').notNull().references(() => tenants.id, { onDelete: 'cascade' }),
  memberId: uuid('member_id').references(() => members.id, { onDelete: 'cascade' }),
  title: text('title').notNull(),
  body: text('body').notNull().default(''),
  readAt: timestamp('read_at', { withTimezone: true }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
})

export const auditLogs = pgTable('audit_logs', {
  id: uuid('id').defaultRandom().primaryKey(),
  tenantId: uuid('tenant_id').notNull().references(() => tenants.id, { onDelete: 'cascade' }),
  memberId: uuid('member_id').references(() => members.id, { onDelete: 'set null' }),
  action: text('action').notNull(),
  entityType: text('entity_type').notNull(),
  entityId: text('entity_id'),
  metadata: jsonb('metadata').$type<Record<string, unknown>>().notNull().default({}),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
})

export const usageEvents = pgTable('usage_events', {
  id: uuid('id').defaultRandom().primaryKey(),
  tenantId: uuid('tenant_id').notNull().references(() => tenants.id, { onDelete: 'cascade' }),
  moduleId: text('module_id').notNull().references(() => modules.id),
  metric: text('metric').notNull(),
  quantity: integer('quantity').notNull().default(1),
  recordedAt: timestamp('recorded_at', { withTimezone: true }).defaultNow().notNull(),
})

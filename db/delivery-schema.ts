import { boolean, integer, jsonb, pgEnum, pgTable, text, timestamp, uniqueIndex, uuid } from 'drizzle-orm/pg-core'
import { members, tenants } from './schema'

export const deliveryJobStatus = pgEnum('delivery_job_status', ['draft', 'ready_for_dispatch', 'assigned', 'out_for_delivery', 'delivered', 'delivery_failed', 'canceled'])
export const deliveryStopStatus = pgEnum('delivery_stop_status', ['pending', 'assigned', 'out_for_delivery', 'delivered', 'delivery_failed', 'canceled'])
export const deliveryProofType = pgEnum('delivery_proof_type', ['recipient_name', 'signature', 'photo', 'otp'])

export const deliveryDrivers = pgTable('delivery_drivers', {
  id: uuid('id').defaultRandom().primaryKey(),
  tenantId: uuid('tenant_id').notNull().references(() => tenants.id, { onDelete: 'cascade' }),
  memberId: uuid('member_id').references(() => members.id, { onDelete: 'set null' }),
  name: text('name').notNull(),
  phone: text('phone').notNull(),
  email: text('email'),
  active: boolean('active').notNull().default(true),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
}, table => [uniqueIndex('delivery_driver_member_tenant_idx').on(table.tenantId, table.memberId)])

export const deliveryVehicles = pgTable('delivery_vehicles', {
  id: uuid('id').defaultRandom().primaryKey(),
  tenantId: uuid('tenant_id').notNull().references(() => tenants.id, { onDelete: 'cascade' }),
  registration: text('registration').notNull(),
  name: text('name').notNull(),
  capacityKg: integer('capacity_kg'),
  active: boolean('active').notNull().default(true),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
}, table => [uniqueIndex('delivery_vehicle_registration_tenant_idx').on(table.tenantId, table.registration)])

export const deliveryJobs = pgTable('delivery_jobs', {
  id: uuid('id').defaultRandom().primaryKey(),
  tenantId: uuid('tenant_id').notNull().references(() => tenants.id, { onDelete: 'cascade' }),
  reference: text('reference').notNull(),
  status: deliveryJobStatus('status').notNull().default('draft'),
  scheduledDate: timestamp('scheduled_date', { withTimezone: true }).notNull(),
  recipientName: text('recipient_name').notNull(),
  recipientPhone: text('recipient_phone'),
  recipientEmail: text('recipient_email'),
  address: jsonb('address').$type<{ line1: string; line2?: string; city: string; postcode: string; country: string }>().notNull(),
  deliveryNotes: text('delivery_notes').notNull().default(''),
  createdByMemberId: uuid('created_by_member_id').notNull().references(() => members.id),
  completedAt: timestamp('completed_at', { withTimezone: true }),
  canceledAt: timestamp('canceled_at', { withTimezone: true }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
}, table => [uniqueIndex('delivery_job_reference_tenant_idx').on(table.tenantId, table.reference)])

export const deliveryStops = pgTable('delivery_stops', {
  id: uuid('id').defaultRandom().primaryKey(),
  tenantId: uuid('tenant_id').notNull().references(() => tenants.id, { onDelete: 'cascade' }),
  deliveryJobId: uuid('delivery_job_id').notNull().references(() => deliveryJobs.id, { onDelete: 'cascade' }),
  sequence: integer('sequence').notNull().default(1),
  status: deliveryStopStatus('status').notNull().default('pending'),
  recipientName: text('recipient_name').notNull(),
  address: jsonb('address').$type<{ line1: string; line2?: string; city: string; postcode: string; country: string }>().notNull(),
  scheduledWindowStart: timestamp('scheduled_window_start', { withTimezone: true }),
  scheduledWindowEnd: timestamp('scheduled_window_end', { withTimezone: true }),
  completedAt: timestamp('completed_at', { withTimezone: true }),
  failureReason: text('failure_reason'),
  notes: text('notes').notNull().default(''),
}, table => [uniqueIndex('delivery_stop_sequence_job_idx').on(table.deliveryJobId, table.sequence)])

export const deliveryAssignments = pgTable('delivery_assignments', {
  id: uuid('id').defaultRandom().primaryKey(),
  tenantId: uuid('tenant_id').notNull().references(() => tenants.id, { onDelete: 'cascade' }),
  deliveryJobId: uuid('delivery_job_id').notNull().references(() => deliveryJobs.id, { onDelete: 'cascade' }),
  deliveryDriverId: uuid('delivery_driver_id').notNull().references(() => deliveryDrivers.id),
  deliveryVehicleId: uuid('delivery_vehicle_id').references(() => deliveryVehicles.id),
  assignedByMemberId: uuid('assigned_by_member_id').notNull().references(() => members.id),
  assignedAt: timestamp('assigned_at', { withTimezone: true }).defaultNow().notNull(),
  unassignedAt: timestamp('unassigned_at', { withTimezone: true }),
}, table => [uniqueIndex('active_delivery_assignment_job_idx').on(table.deliveryJobId, table.unassignedAt)])

export const deliveryProofs = pgTable('delivery_proofs', {
  id: uuid('id').defaultRandom().primaryKey(),
  tenantId: uuid('tenant_id').notNull().references(() => tenants.id, { onDelete: 'cascade' }),
  deliveryStopId: uuid('delivery_stop_id').notNull().references(() => deliveryStops.id, { onDelete: 'cascade' }),
  type: deliveryProofType('type').notNull(),
  recipientName: text('recipient_name'),
  storageKey: text('storage_key'),
  capturedAt: timestamp('captured_at', { withTimezone: true }).defaultNow().notNull(),
  capturedByMemberId: uuid('captured_by_member_id').references(() => members.id, { onDelete: 'set null' }),
  metadata: jsonb('metadata').$type<Record<string, unknown>>().notNull().default({}),
})

export const deliveryEvents = pgTable('delivery_events', {
  id: uuid('id').defaultRandom().primaryKey(),
  tenantId: uuid('tenant_id').notNull().references(() => tenants.id, { onDelete: 'cascade' }),
  deliveryJobId: uuid('delivery_job_id').notNull().references(() => deliveryJobs.id, { onDelete: 'cascade' }),
  deliveryStopId: uuid('delivery_stop_id').references(() => deliveryStops.id, { onDelete: 'cascade' }),
  eventType: text('event_type').notNull(),
  actorMemberId: uuid('actor_member_id').references(() => members.id, { onDelete: 'set null' }),
  occurredAt: timestamp('occurred_at', { withTimezone: true }).defaultNow().notNull(),
  metadata: jsonb('metadata').$type<Record<string, unknown>>().notNull().default({}),
})

export const deliveryTrackingTokens = pgTable('delivery_tracking_tokens', {
  id: uuid('id').defaultRandom().primaryKey(),
  tenantId: uuid('tenant_id').notNull().references(() => tenants.id, { onDelete: 'cascade' }),
  deliveryJobId: uuid('delivery_job_id').notNull().references(() => deliveryJobs.id, { onDelete: 'cascade' }),
  tokenHash: text('token_hash').notNull().unique(),
  expiresAt: timestamp('expires_at', { withTimezone: true }),
  revokedAt: timestamp('revoked_at', { withTimezone: true }),
  lastViewedAt: timestamp('last_viewed_at', { withTimezone: true }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
})

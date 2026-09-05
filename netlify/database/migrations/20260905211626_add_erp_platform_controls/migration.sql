CREATE TABLE "audit_logs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"tenant_id" uuid NOT NULL,
	"member_id" uuid,
	"action" text NOT NULL,
	"entity_type" text NOT NULL,
	"entity_id" text,
	"metadata" jsonb DEFAULT '{}' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "notifications" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"tenant_id" uuid NOT NULL,
	"member_id" uuid,
	"title" text NOT NULL,
	"body" text DEFAULT '' NOT NULL,
	"read_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "permissions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"key" text NOT NULL UNIQUE,
	"description" text DEFAULT '' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "role_permissions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"role_id" uuid NOT NULL,
	"permission_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "roles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"tenant_id" uuid NOT NULL,
	"name" text NOT NULL,
	"description" text DEFAULT '' NOT NULL,
	"system" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "subscription_plans" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"slug" text NOT NULL UNIQUE,
	"name" text NOT NULL,
	"base_monthly_price" integer NOT NULL,
	"included_seats" integer DEFAULT 10 NOT NULL,
	"features" jsonb DEFAULT '[]' NOT NULL,
	"active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "team_members" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"team_id" uuid NOT NULL,
	"member_id" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "teams" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"tenant_id" uuid NOT NULL,
	"name" text NOT NULL,
	"description" text DEFAULT '' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "usage_events" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"tenant_id" uuid NOT NULL,
	"module_id" text NOT NULL,
	"metric" text NOT NULL,
	"quantity" integer DEFAULT 1 NOT NULL,
	"recorded_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "members" ADD COLUMN "full_name" text;--> statement-breakpoint
ALTER TABLE "members" ADD COLUMN "role_id" uuid;--> statement-breakpoint
ALTER TABLE "members" ADD COLUMN "status" text DEFAULT 'active' NOT NULL;--> statement-breakpoint
ALTER TABLE "modules" ADD COLUMN "slug" text;--> statement-breakpoint
ALTER TABLE "modules" ADD COLUMN "icon" text DEFAULT 'box' NOT NULL;--> statement-breakpoint
ALTER TABLE "modules" ADD COLUMN "category" text DEFAULT 'Operations' NOT NULL;--> statement-breakpoint
ALTER TABLE "modules" ADD COLUMN "usage_pricing" jsonb DEFAULT '{}' NOT NULL;--> statement-breakpoint
ALTER TABLE "modules" ADD COLUMN "feature_flags" jsonb DEFAULT '{}' NOT NULL;--> statement-breakpoint
ALTER TABLE "subscriptions" ADD COLUMN "plan_id" uuid;--> statement-breakpoint
UPDATE "modules" SET "slug" = "id" WHERE "slug" IS NULL;--> statement-breakpoint
ALTER TABLE "modules" ALTER COLUMN "slug" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "modules" ADD CONSTRAINT "modules_slug_key" UNIQUE("slug");--> statement-breakpoint
CREATE UNIQUE INDEX "role_permission_idx" ON "role_permissions" ("role_id","permission_id");--> statement-breakpoint
CREATE UNIQUE INDEX "role_tenant_name_idx" ON "roles" ("tenant_id","name");--> statement-breakpoint
CREATE UNIQUE INDEX "team_member_idx" ON "team_members" ("team_id","member_id");--> statement-breakpoint
CREATE UNIQUE INDEX "team_tenant_name_idx" ON "teams" ("tenant_id","name");--> statement-breakpoint
ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_tenant_id_tenants_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_member_id_members_id_fkey" FOREIGN KEY ("member_id") REFERENCES "members"("id") ON DELETE SET NULL;--> statement-breakpoint
ALTER TABLE "members" ADD CONSTRAINT "members_role_id_roles_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE SET NULL;--> statement-breakpoint
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_tenant_id_tenants_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_member_id_members_id_fkey" FOREIGN KEY ("member_id") REFERENCES "members"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "role_permissions" ADD CONSTRAINT "role_permissions_role_id_roles_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "role_permissions" ADD CONSTRAINT "role_permissions_permission_id_permissions_id_fkey" FOREIGN KEY ("permission_id") REFERENCES "permissions"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "roles" ADD CONSTRAINT "roles_tenant_id_tenants_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_plan_id_subscription_plans_id_fkey" FOREIGN KEY ("plan_id") REFERENCES "subscription_plans"("id") ON DELETE SET NULL;--> statement-breakpoint
ALTER TABLE "team_members" ADD CONSTRAINT "team_members_team_id_teams_id_fkey" FOREIGN KEY ("team_id") REFERENCES "teams"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "team_members" ADD CONSTRAINT "team_members_member_id_members_id_fkey" FOREIGN KEY ("member_id") REFERENCES "members"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "teams" ADD CONSTRAINT "teams_tenant_id_tenants_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "usage_events" ADD CONSTRAINT "usage_events_tenant_id_tenants_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "usage_events" ADD CONSTRAINT "usage_events_module_id_modules_id_fkey" FOREIGN KEY ("module_id") REFERENCES "modules"("id");--> statement-breakpoint
INSERT INTO "subscription_plans" ("slug", "name", "base_monthly_price", "included_seats", "features") VALUES
('core', 'Core Platform', 19, 10, '["Secure workspace", "Module marketplace", "Roles and permissions", "Audit logs"]'::jsonb)
ON CONFLICT ("slug") DO UPDATE SET "name" = EXCLUDED."name", "base_monthly_price" = EXCLUDED."base_monthly_price", "included_seats" = EXCLUDED."included_seats", "features" = EXCLUDED."features", "active" = true;--> statement-breakpoint
UPDATE "subscriptions" SET "plan_id" = (SELECT "id" FROM "subscription_plans" WHERE "slug" = 'core') WHERE "plan_id" IS NULL;--> statement-breakpoint
INSERT INTO "permissions" ("key", "description") VALUES
('workspace.manage', 'Manage company workspace settings'),
('members.manage', 'Invite and manage workspace members'),
('teams.manage', 'Create and manage teams'),
('roles.manage', 'Configure roles and permissions'),
('modules.manage', 'Activate and deactivate modules'),
('billing.manage', 'Manage plans, module billing, and usage'),
('audit.view', 'View workspace audit logs'),
('reports.view', 'View and export reports')
ON CONFLICT ("key") DO UPDATE SET "description" = EXCLUDED."description";--> statement-breakpoint
INSERT INTO "roles" ("tenant_id", "name", "description", "system")
SELECT "id", role_name, role_description, true FROM "tenants" CROSS JOIN (VALUES
('Owner', 'Full workspace, billing, and module control'),
('Admin', 'Operational administration without ownership transfer'),
('Member', 'Standard access controlled by assigned permissions')
) AS defaults(role_name, role_description)
ON CONFLICT ("tenant_id", "name") DO NOTHING;--> statement-breakpoint
UPDATE "members" SET "role_id" = "roles"."id" FROM "roles" WHERE "roles"."tenant_id" = "members"."tenant_id" AND lower("roles"."name") = "members"."role"::text AND "members"."role_id" IS NULL;--> statement-breakpoint
UPDATE "modules" SET "active" = false WHERE "id" NOT IN ('crm', 'inventory', 'purchasing', 'delivery', 'manufacturing', 'customer-portal', 'accounting', 'reporting', 'projects', 'hr');--> statement-breakpoint
INSERT INTO "modules" ("id", "slug", "name", "description", "icon", "category", "monthly_price", "usage_pricing", "feature_flags", "active") VALUES
('crm', 'crm', 'CRM', 'Manage customers, leads, quotations, and sales pipelines in one shared workspace.', 'handshake', 'Sales', 29, '{"included":"Unlimited contacts"}'::jsonb, '{"pipeline":true,"quotations":true,"activities":true}'::jsonb, true),
('inventory', 'inventory', 'Inventory', 'Track stock levels, warehouses, transfers, and every movement in real time.', 'boxes', 'Operations', 35, '{"included":"3 locations"}'::jsonb, '{"multi_location":true,"stock_alerts":true,"transfers":true}'::jsonb, true),
('purchasing', 'purchasing', 'Purchasing', 'Manage purchase requests, suppliers, approvals, and incoming orders.', 'shopping-cart', 'Operations', 24, '{"included":"Unlimited suppliers"}'::jsonb, '{"approvals":true,"supplier_portal":true,"receiving":true}'::jsonb, true),
('delivery', 'delivery', 'Delivery Management', 'Assign drivers, track deliveries, and capture proof of delivery from the field.', 'truck', 'Logistics', 39, '{"included":"250 stops"}'::jsonb, '{"driver_app":true,"live_tracking":true,"proof_of_delivery":true}'::jsonb, true),
('manufacturing', 'manufacturing', 'Manufacturing', 'Plan production jobs, work orders, materials, and shop-floor schedules.', 'factory', 'Manufacturing', 59, '{"included":"500 work orders"}'::jsonb, '{"work_orders":true,"bill_of_materials":true,"capacity":true}'::jsonb, true),
('customer-portal', 'customer-portal', 'Customer Portal', 'Let customers track orders, invoices, deliveries, and service requests.', 'user-round-cog', 'Customer Experience', 19, '{"included":"Unlimited customer logins"}'::jsonb, '{"order_tracking":true,"invoice_access":true,"service_requests":true}'::jsonb, true),
('accounting', 'accounting', 'Accounting', 'Control invoices, expenses, cash flow, ledgers, and financial periods.', 'calculator', 'Finance', 45, '{"included":"1 legal entity"}'::jsonb, '{"general_ledger":true,"invoicing":true,"bank_reconciliation":true}'::jsonb, true),
('reporting', 'reporting', 'Reporting', 'Turn live operational data into dashboards, scheduled reports, and decisions.', 'bar-chart-3', 'Finance', 22, '{"included":"25 scheduled reports"}'::jsonb, '{"dashboards":true,"scheduled_reports":true,"exports":true}'::jsonb, true),
('projects', 'projects', 'Projects', 'Plan delivery, budgets, milestones, time, and team capacity with clarity.', 'clipboard-list', 'Operations', 27, '{"included":"50 active projects"}'::jsonb, '{"time_tracking":true,"budgets":true,"capacity":true}'::jsonb, true),
('hr', 'hr', 'HR', 'Manage employee records, leave, documents, onboarding, and performance.', 'package-check', 'Operations', 25, '{"included":"25 employee records"}'::jsonb, '{"employee_records":true,"leave":true,"performance":true}'::jsonb, true)
ON CONFLICT ("id") DO UPDATE SET "slug" = EXCLUDED."slug", "name" = EXCLUDED."name", "description" = EXCLUDED."description", "icon" = EXCLUDED."icon", "category" = EXCLUDED."category", "monthly_price" = EXCLUDED."monthly_price", "usage_pricing" = EXCLUDED."usage_pricing", "feature_flags" = EXCLUDED."feature_flags", "active" = true;

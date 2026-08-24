CREATE TYPE "member_role" AS ENUM('owner', 'admin', 'member');--> statement-breakpoint
CREATE TYPE "subscription_status" AS ENUM('trialing', 'active', 'past_due', 'canceled');--> statement-breakpoint
CREATE TABLE "members" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"tenant_id" uuid NOT NULL,
	"identity_user_id" text NOT NULL,
	"email" text NOT NULL,
	"role" "member_role" DEFAULT 'member'::"member_role" NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "modules" (
	"id" text PRIMARY KEY,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"monthly_price" integer NOT NULL,
	"active" boolean DEFAULT true NOT NULL
);
--> statement-breakpoint
CREATE TABLE "subscriptions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"tenant_id" uuid NOT NULL UNIQUE,
	"stripe_subscription_id" text UNIQUE,
	"status" "subscription_status" DEFAULT 'trialing'::"subscription_status" NOT NULL,
	"seats" integer DEFAULT 5 NOT NULL,
	"current_period_end" timestamp with time zone,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tenant_modules" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"tenant_id" uuid NOT NULL,
	"module_id" text NOT NULL,
	"enabled" boolean DEFAULT true NOT NULL,
	"activated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tenants" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"name" text NOT NULL,
	"slug" text NOT NULL UNIQUE,
	"industry" text DEFAULT 'professional_services' NOT NULL,
	"stripe_customer_id" text UNIQUE,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX "member_identity_tenant_idx" ON "members" ("identity_user_id","tenant_id");--> statement-breakpoint
CREATE UNIQUE INDEX "tenant_module_idx" ON "tenant_modules" ("tenant_id","module_id");--> statement-breakpoint
ALTER TABLE "members" ADD CONSTRAINT "members_tenant_id_tenants_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_tenant_id_tenants_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "tenant_modules" ADD CONSTRAINT "tenant_modules_tenant_id_tenants_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "tenant_modules" ADD CONSTRAINT "tenant_modules_module_id_modules_id_fkey" FOREIGN KEY ("module_id") REFERENCES "modules"("id");
INSERT INTO "modules" ("id", "name", "description", "monthly_price", "active") VALUES
('crm', 'CRM', 'Unify leads, pipelines, accounts, and customer activity.', 29, true),
('hr', 'HR Management', 'Manage people, leave, documents, and performance.', 25, true),
('payroll', 'Payroll', 'Run accurate payroll with approvals and audit trails.', 39, true),
('inventory', 'Inventory', 'Control purchasing, stock, warehouses, and suppliers.', 35, true),
('projects', 'Project Management', 'Plan delivery, budgets, capacity, and time.', 24, true),
('helpdesk', 'Help Desk', 'Resolve customer requests against measurable SLAs.', 19, true),
('fleet', 'Fleet Management', 'Track vehicles, drivers, maintenance, and costs.', 45, true),
('restaurant', 'Restaurant Management', 'Connect menus, orders, kitchens, and locations.', 59, true),
('healthcare', 'Healthcare Management', 'Coordinate appointments, teams, and patient workflows.', 69, true)
ON CONFLICT ("id") DO NOTHING;

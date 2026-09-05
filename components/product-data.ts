import {
  BarChart3,
  Boxes,
  Calculator,
  ClipboardList,
  Factory,
  Handshake,
  PackageCheck,
  ShoppingCart,
  Truck,
  UserRoundCog,
  type LucideIcon,
} from 'lucide-react'

export type ModuleCategory = 'Sales' | 'Operations' | 'Finance' | 'Manufacturing' | 'Logistics' | 'Customer Experience'

export type Module = {
  id: string
  slug: string
  name: string
  shortName: string
  description: string
  price: number
  usagePricing: string
  icon: LucideIcon
  category: ModuleCategory
  enabled: boolean
  featureFlags: string[]
  features: string[]
}

export const modules: Module[] = [
  { id: 'crm', slug: 'crm', name: 'CRM', shortName: 'CRM', description: 'Manage customers, leads, quotations, and sales pipelines in one shared workspace.', price: 29, usagePricing: 'Unlimited contacts included', icon: Handshake, category: 'Sales', enabled: true, featureFlags: ['pipeline', 'quotations', 'activities'], features: ['Lead management', 'Visual sales pipeline', 'Quotations', 'Customer activity'] },
  { id: 'inventory', slug: 'inventory', name: 'Inventory', shortName: 'Inventory', description: 'Track stock levels, warehouses, transfers, and every movement in real time.', price: 35, usagePricing: '3 locations included', icon: Boxes, category: 'Operations', enabled: true, featureFlags: ['multi_location', 'stock_alerts', 'transfers'], features: ['Live stock levels', 'Warehouse control', 'Stock movements', 'Low-stock alerts'] },
  { id: 'purchasing', slug: 'purchasing', name: 'Purchasing', shortName: 'Purchasing', description: 'Manage purchase requests, suppliers, approvals, and incoming orders.', price: 24, usagePricing: 'Unlimited suppliers', icon: ShoppingCart, category: 'Operations', enabled: true, featureFlags: ['approvals', 'supplier_portal', 'receiving'], features: ['Purchase requests', 'Approval workflows', 'Supplier records', 'Goods receiving'] },
  { id: 'delivery', slug: 'delivery', name: 'Delivery Management', shortName: 'Delivery', description: 'Assign drivers, track deliveries, and capture proof of delivery from the field.', price: 39, usagePricing: '250 stops included', icon: Truck, category: 'Logistics', enabled: true, featureFlags: ['driver_app', 'live_tracking', 'proof_of_delivery'], features: ['Driver assignment', 'Live delivery tracking', 'Route status', 'Proof of delivery'] },
  { id: 'manufacturing', slug: 'manufacturing', name: 'Manufacturing', shortName: 'Manufacturing', description: 'Plan production jobs, work orders, materials, and shop-floor schedules.', price: 59, usagePricing: '500 work orders included', icon: Factory, category: 'Manufacturing', enabled: true, featureFlags: ['work_orders', 'bill_of_materials', 'capacity'], features: ['Production jobs', 'Work orders', 'Bill of materials', 'Scheduling'] },
  { id: 'customer-portal', slug: 'customer-portal', name: 'Customer Portal', shortName: 'Customer Portal', description: 'Let customers track orders, invoices, deliveries, and service requests.', price: 19, usagePricing: 'Unlimited customer logins', icon: UserRoundCog, category: 'Customer Experience', enabled: true, featureFlags: ['order_tracking', 'invoice_access', 'service_requests'], features: ['Order tracking', 'Invoice access', 'Service requests', 'Branded portal'] },
  { id: 'accounting', slug: 'accounting', name: 'Accounting', shortName: 'Accounting', description: 'Control invoices, expenses, cash flow, ledgers, and financial periods.', price: 45, usagePricing: '1 legal entity included', icon: Calculator, category: 'Finance', enabled: true, featureFlags: ['general_ledger', 'invoicing', 'bank_reconciliation'], features: ['General ledger', 'Sales invoicing', 'Expenses', 'Bank reconciliation'] },
  { id: 'reporting', slug: 'reporting', name: 'Reporting', shortName: 'Reporting', description: 'Turn live operational data into dashboards, scheduled reports, and decisions.', price: 22, usagePricing: '25 scheduled reports included', icon: BarChart3, category: 'Finance', enabled: true, featureFlags: ['dashboards', 'scheduled_reports', 'exports'], features: ['Live dashboards', 'Report builder', 'Scheduled reports', 'Data exports'] },
  { id: 'projects', slug: 'projects', name: 'Projects', shortName: 'Projects', description: 'Plan delivery, budgets, milestones, time, and team capacity with clarity.', price: 27, usagePricing: '50 active projects included', icon: ClipboardList, category: 'Operations', enabled: true, featureFlags: ['time_tracking', 'budgets', 'capacity'], features: ['Project planning', 'Time tracking', 'Resource capacity', 'Budget control'] },
  { id: 'hr', slug: 'hr', name: 'HR', shortName: 'HR', description: 'Manage employee records, leave, documents, onboarding, and performance.', price: 25, usagePricing: '25 employee records included', icon: PackageCheck, category: 'Operations', enabled: true, featureFlags: ['employee_records', 'leave', 'performance'], features: ['Employee records', 'Leave management', 'Onboarding', 'Performance reviews'] },
]

export const homepageModules = modules.slice(0, 6)
export const industries = ['Professional Services', 'Retail & Distribution', 'Manufacturing', 'Hospitality', 'Construction', 'Transport & Logistics']

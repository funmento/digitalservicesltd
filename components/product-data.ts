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
export type ModuleStatus = 'LIVE' | 'EARLY_ACCESS' | 'COMING_SOON' | 'PLANNED'

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

export type MarketplaceModule = Module & {
  status: ModuleStatus
  statusLabel: string
  ctaLabel: string
  overview: string
  benefits: string[]
  roadmapPosition: string
  featured?: boolean
}

export const modules: Module[] = [
  { id: 'crm', slug: 'crm', name: 'CRM', shortName: 'CRM', description: 'Manage customers, leads, quotations, and sales pipelines in one shared workspace.', price: 29, usagePricing: 'Unlimited contacts included', icon: Handshake, category: 'Sales', enabled: true, featureFlags: ['pipeline', 'quotations', 'activities'], features: ['Lead management', 'Visual sales pipeline', 'Quotations', 'Customer activity'] },
  { id: 'inventory', slug: 'inventory', name: 'Inventory', shortName: 'Inventory', description: 'Track stock levels, warehouses, transfers, and every movement in real time.', price: 35, usagePricing: '3 locations included', icon: Boxes, category: 'Operations', enabled: true, featureFlags: ['multi_location', 'stock_alerts', 'transfers'], features: ['Live stock levels', 'Warehouse control', 'Stock movements', 'Low-stock alerts'] },
  { id: 'purchasing', slug: 'purchasing', name: 'Purchasing', shortName: 'Purchasing', description: 'Manage purchase requests, suppliers, approvals, and incoming orders.', price: 24, usagePricing: 'Unlimited suppliers', icon: ShoppingCart, category: 'Operations', enabled: true, featureFlags: ['approvals', 'supplier_portal', 'receiving'], features: ['Purchase requests', 'Approval workflows', 'Supplier records', 'Goods receiving'] },
  { id: 'delivery', slug: 'delivery', name: 'Delivery Management', shortName: 'Delivery', description: 'Manage deliveries, drivers, tracking and proof of delivery from one live workspace.', price: 29, usagePricing: '250 stops included', icon: Truck, category: 'Logistics', enabled: true, featureFlags: ['driver_app', 'live_tracking', 'proof_of_delivery'], features: ['Driver Assignment', 'Delivery Tracking', 'Secure Tracking Links', 'Proof Of Delivery', 'Delivered Timestamp', 'Auto Completion'] },
  { id: 'manufacturing', slug: 'manufacturing', name: 'Manufacturing', shortName: 'Manufacturing', description: 'Plan production jobs, work orders, materials, and shop-floor schedules.', price: 59, usagePricing: '500 work orders included', icon: Factory, category: 'Manufacturing', enabled: true, featureFlags: ['work_orders', 'bill_of_materials', 'capacity'], features: ['Production jobs', 'Work orders', 'Bill of materials', 'Scheduling'] },
  { id: 'customer-portal', slug: 'customer-portal', name: 'Customer Portal', shortName: 'Customer Portal', description: 'Let customers track orders, invoices, deliveries, and service requests.', price: 19, usagePricing: 'Unlimited customer logins', icon: UserRoundCog, category: 'Customer Experience', enabled: true, featureFlags: ['order_tracking', 'invoice_access', 'service_requests'], features: ['Order tracking', 'Invoice access', 'Service requests', 'Branded portal'] },
  { id: 'accounting', slug: 'accounting', name: 'Accounting', shortName: 'Accounting', description: 'Control invoices, expenses, cash flow, ledgers, and financial periods.', price: 45, usagePricing: '1 legal entity included', icon: Calculator, category: 'Finance', enabled: true, featureFlags: ['general_ledger', 'invoicing', 'bank_reconciliation'], features: ['General ledger', 'Sales invoicing', 'Expenses', 'Bank reconciliation'] },
  { id: 'reporting', slug: 'reporting', name: 'Reporting', shortName: 'Reporting', description: 'Turn live operational data into dashboards, scheduled reports, and decisions.', price: 22, usagePricing: '25 scheduled reports included', icon: BarChart3, category: 'Finance', enabled: true, featureFlags: ['dashboards', 'scheduled_reports', 'exports'], features: ['Live dashboards', 'Report builder', 'Scheduled reports', 'Data exports'] },
  { id: 'projects', slug: 'projects', name: 'Projects', shortName: 'Projects', description: 'Plan delivery, budgets, milestones, time, and team capacity with clarity.', price: 27, usagePricing: '50 active projects included', icon: ClipboardList, category: 'Operations', enabled: true, featureFlags: ['time_tracking', 'budgets', 'capacity'], features: ['Project planning', 'Time tracking', 'Resource capacity', 'Budget control'] },
  { id: 'hr', slug: 'hr', name: 'HR', shortName: 'HR', description: 'Manage employee records, leave, documents, onboarding, and performance.', price: 25, usagePricing: '25 employee records included', icon: PackageCheck, category: 'Operations', enabled: true, featureFlags: ['employee_records', 'leave', 'performance'], features: ['Employee records', 'Leave management', 'Onboarding', 'Performance reviews'] },
]

const releaseDetails: Record<string, Omit<MarketplaceModule, keyof Module>> = {
  delivery: {
    status: 'LIVE',
    statusLabel: 'Live',
    ctaLabel: 'Start Free Trial',
    featured: true,
    overview: 'Run the complete last-mile delivery workflow from assignment to verified completion, with a clear live view for dispatchers, drivers, and customers.',
    benefits: ['Replace delivery spreadsheets and status calls', 'Give customers secure self-service tracking', 'Capture a reliable audit trail for every stop', 'Complete deliveries automatically when proof is recorded'],
    roadmapPosition: 'Available now and actively receiving product improvements.',
  },
  crm: {
    status: 'EARLY_ACCESS',
    statusLabel: 'Early Access',
    ctaLabel: 'Join Early Access',
    overview: 'Bring customer records, leads, quotations, and sales activity into the same workspace used by the rest of your operation.',
    benefits: ['Create one shared customer record', 'Keep opportunities moving through a visual pipeline', 'Connect sales activity to operational delivery', 'Shape the module with direct early-access feedback'],
    roadmapPosition: 'In early access with selected businesses ahead of general availability.',
  },
  inventory: {
    status: 'COMING_SOON',
    statusLabel: 'Coming Soon',
    ctaLabel: 'Notify Me',
    overview: 'Create a dependable live record of stock across locations, transfers, receipts, and day-to-day movements.',
    benefits: ['See current stock without manual reconciliation', 'Reduce shortages with low-stock alerts', 'Trace movements across every location', 'Connect stock availability to purchasing and delivery'],
    roadmapPosition: 'Coming soon after CRM reaches general availability.',
  },
  purchasing: {
    status: 'COMING_SOON',
    statusLabel: 'Coming Soon',
    ctaLabel: 'Notify Me',
    overview: 'Standardise purchasing from request and approval through to supplier ordering and goods receipt.',
    benefits: ['Control spend with clear approvals', 'Keep supplier information in one place', 'Track open orders and expected receipts', 'Connect purchasing decisions to live inventory needs'],
    roadmapPosition: 'Coming soon alongside the inventory release track.',
  },
  manufacturing: {
    status: 'PLANNED',
    statusLabel: 'Planned',
    ctaLabel: 'View Roadmap',
    overview: 'Plan production work, materials, capacity, and shop-floor progress inside the connected ERP workspace.',
    benefits: ['Turn demand into structured production jobs', 'Coordinate materials and work orders', 'Improve visibility across capacity and schedules', 'Connect production progress to inventory and delivery'],
    roadmapPosition: 'Planned for a later platform phase after inventory and purchasing foundations are live.',
  },
  'customer-portal': {
    status: 'PLANNED',
    statusLabel: 'Planned',
    ctaLabel: 'View Roadmap',
    overview: 'Give customers a secure, branded place to follow orders, deliveries, documents, and service requests.',
    benefits: ['Reduce routine status enquiries', 'Give customers a consistent service experience', 'Share operational updates securely', 'Extend connected ERP data beyond internal teams'],
    roadmapPosition: 'Planned after the core operational modules have reached general availability.',
  },
}

const marketplaceModuleIds = ['delivery', 'crm', 'inventory', 'purchasing', 'manufacturing', 'customer-portal']

export const marketplaceModules: MarketplaceModule[] = marketplaceModuleIds.map(id => {
  const module = modules.find(item => item.id === id)
  if (!module) throw new Error(`Missing marketplace module: ${id}`)
  return { ...module, ...releaseDetails[id] }
})

export const homepageModules = marketplaceModules
export const industries = ['Professional Services', 'Retail & Distribution', 'Manufacturing', 'Hospitality', 'Construction', 'Transport & Logistics']

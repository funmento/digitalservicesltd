import { BriefcaseBusiness, Building2, CircleDollarSign, ClipboardList, Headphones, HeartPulse, PackageSearch, Truck, UsersRound, type LucideIcon } from 'lucide-react'

export type Module = { id: string; name: string; description: string; price: number; icon: LucideIcon; category: string; features: string[] }

export const modules: Module[] = [
  { id: 'crm', name: 'CRM', description: 'Unify every lead, conversation, quotation, and customer relationship.', price: 29, icon: UsersRound, category: 'Sales', features: ['Lead management', 'Visual sales pipeline', 'Quotations', 'Customer activities'] },
  { id: 'hr', name: 'HR Management', description: 'Give your people team one secure place for the employee lifecycle.', price: 25, icon: Building2, category: 'People', features: ['Employee records', 'Leave management', 'Document storage', 'Performance reviews'] },
  { id: 'payroll', name: 'Payroll', description: 'Run accurate UK payroll with clear controls and employee access.', price: 39, icon: CircleDollarSign, category: 'Finance', features: ['Payroll runs', 'Payslip portal', 'Approval workflows', 'HMRC-ready reporting'] },
  { id: 'inventory', name: 'Inventory', description: 'Control stock, purchasing, suppliers, and multiple locations.', price: 35, icon: PackageSearch, category: 'Operations', features: ['Live stock levels', 'Purchase orders', 'Supplier records', 'Low-stock alerts'] },
  { id: 'projects', name: 'Project Management', description: 'Plan profitable delivery with time, cost, and capacity visibility.', price: 24, icon: ClipboardList, category: 'Delivery', features: ['Project planning', 'Time tracking', 'Resource capacity', 'Budget control'] },
  { id: 'helpdesk', name: 'Help Desk', description: 'Resolve customer requests quickly against measurable service levels.', price: 19, icon: Headphones, category: 'Support', features: ['Shared ticket inbox', 'SLA tracking', 'Knowledge base', 'Customer portal'] },
  { id: 'fleet', name: 'Fleet Management', description: 'Track vehicles, drivers, maintenance, compliance, and operating costs.', price: 45, icon: Truck, category: 'Operations', features: ['Vehicle register', 'Driver assignments', 'Maintenance plans', 'Cost tracking'] },
  { id: 'restaurant', name: 'Restaurant Management', description: 'Connect menus, orders, kitchens, stock, and locations.', price: 59, icon: BriefcaseBusiness, category: 'Hospitality', features: ['Menu management', 'Order operations', 'Kitchen workflows', 'Location reporting'] },
  { id: 'healthcare', name: 'Healthcare Management', description: 'Coordinate appointments, teams, and secure patient workflows.', price: 69, icon: HeartPulse, category: 'Healthcare', features: ['Appointment scheduling', 'Patient workflows', 'Team rotas', 'Secure records'] },
]

export const industries = ['Professional Services', 'Retail & Distribution', 'Healthcare', 'Hospitality', 'Construction', 'Transport & Logistics']

import { AppShell } from '@/components/AppShell'
import { ProtectedPage } from '@/components/ProtectedPage'
import { Check, ChevronRight, CircleDollarSign, Plus, ShieldCheck, UsersRound } from 'lucide-react'

export const metadata = { title: 'Admin portal' }

export default function AdminPage() {
  return <ProtectedPage><AppShell section="Admin"><div className="dashboard admin-page">
    <div className="dashboard-heading"><div><span>WORKSPACE CONTROL</span><h1>Administration</h1><p>Manage access, billing, modules, and organisation-wide controls.</p></div><button className="button"><Plus />Invite user</button></div>
    <div className="admin-stats"><article><UsersRound /><div><span>Active users</span><b>248 <small>/ 300 seats</small></b></div></article><article><ShieldCheck /><div><span>Administrators</span><b>8</b></div></article><article><CircleDollarSign /><div><span>Monthly subscription</span><b>£448</b></div></article></div>
    <div className="admin-grid">
      <section><div className="card-heading"><div><h2>Users and access</h2><p>Control user roles and workspace access.</p></div><button className="view-all">Manage all <ChevronRight /></button></div>{[['AK', 'Alex Khan', 'alex@acme.co.uk', 'Owner'], ['SK', 'Sarah Khan', 'sarah@acme.co.uk', 'Admin'], ['JM', 'James Miller', 'james@acme.co.uk', 'Member'], ['LP', 'Lucy Price', 'lucy@acme.co.uk', 'Member']].map(([initials, name, email, role]) => <div className="user-row" key={email}><span className="avatar">{initials}</span><div><b>{name}</b><small>{email}</small></div><em>{role}</em><button>•••</button></div>)}</section>
      <section><div className="card-heading"><div><h2>Active modules</h2><p>4 modules · £117/month</p></div><button className="view-all">Marketplace <ChevronRight /></button></div>{['CRM', 'Project Management', 'HR Management', 'Help Desk'].map((module, index) => <div className="active-module" key={module}><span><Check /></span><b>{module}</b><em>£{[29, 24, 25, 19][index]}/mo</em></div>)}<button className="add-module"><Plus />Add another module</button></section>
    </div>
  </div></AppShell></ProtectedPage>
}

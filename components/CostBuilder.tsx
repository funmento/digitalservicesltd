'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { ArrowRight, Check, Minus, Plus } from 'lucide-react'
import { modules } from './product-data'

const featuredIds = ['crm', 'payroll', 'inventory', 'hr', 'projects', 'helpdesk']

export function CostBuilder() {
  const [selected, setSelected] = useState(['crm', 'payroll'])
  const [users, setUsers] = useState(10)
  const selectedModules = useMemo(() => modules.filter(module => selected.includes(module.id)), [selected])
  const userCost = Math.max(0, users - 10) * 4
  const monthly = 19 + userCost + selectedModules.reduce((total, module) => total + module.price, 0)
  const comparisonCost = 349 + users * 6
  const annualSavings = Math.max(0, (comparisonCost - monthly) * 12)

  function toggle(id: string) {
    setSelected(current => current.includes(id) ? current.filter(item => item !== id) : [...current, id])
  }

  return <div className="cost-builder">
    <div className="builder-config">
      <div className="builder-base"><div><span>CORE PLATFORM</span><b>Digital Services ERP</b><small>Workspace, security, analytics and marketplace access</small></div><strong>£19<small>/mo</small></strong></div>
      <div className="builder-module-list">{modules.filter(module => featuredIds.includes(module.id)).map(({ id, name, price, icon: Icon }) => {
        const active = selected.includes(id)
        return <button type="button" className={active ? 'active' : ''} key={id} onClick={() => toggle(id)} aria-pressed={active}><span className="builder-check">{active && <Check />}</span><Icon /><b>{name}</b><em>£{price}/mo</em></button>
      })}</div>
      <div className="user-control"><div><b>How many users?</b><small>10 users included. Additional users are £4/month.</small></div><div><button type="button" onClick={() => setUsers(Math.max(1, users - 1))} aria-label="Remove user"><Minus /></button><strong>{users}</strong><button type="button" onClick={() => setUsers(Math.min(500, users + 1))} aria-label="Add user"><Plus /></button></div></div>
    </div>
    <aside className="builder-total"><span>YOUR ESTIMATED COST</span><div className="builder-price"><sup>£</sup><strong>{monthly}</strong><em>/month</em></div><p>Base platform and {selected.length} activated {selected.length === 1 ? 'module' : 'modules'} for {users} users.</p><dl><div><dt>Core platform</dt><dd>£19</dd></div>{selectedModules.map(module => <div key={module.id}><dt>{module.name}</dt><dd>£{module.price}</dd></div>)}{userCost > 0 && <div><dt>Additional users</dt><dd>£{userCost}</dd></div>}</dl><div className="savings-box"><small>ESTIMATED ANNUAL SAVINGS</small><b>£{annualSavings.toLocaleString('en-GB')}</b><span>Compared with a typical bundled ERP stack</span></div><Link className="button" href={`/checkout?modules=${selected.join(',')}`}>Build My ERP <ArrowRight /></Link><Link className="builder-demo-link" href="#demos">See Live Demo</Link></aside>
  </div>
}

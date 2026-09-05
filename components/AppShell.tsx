'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { BarChart3, Bell, ChevronDown, CircleHelp, CreditCard, Gauge, LayoutGrid, LogOut, Search, Shield } from 'lucide-react'
import { Brand } from './Brand'
import { modules as moduleCatalog } from './product-data'

type EnabledModule = { id: string; name: string }

export function AppShell({ children, section = 'Overview' }: { children: React.ReactNode; section?: string }) {
  const [enabledModules, setEnabledModules] = useState<EnabledModule[]>([])

  useEffect(() => {
    fetch('/api/company-modules').then(response => response.ok ? response.json() : null).then(data => {
      if (data?.modules) setEnabledModules(data.modules)
    }).catch(() => undefined)
  }, [])

  return <div className="app-shell"><aside className="app-sidebar"><Brand /><nav><small>WORKSPACE</small><Link className={section === 'Overview' ? 'active' : ''} href="/dashboard"><Gauge />Overview</Link>{enabledModules.map(enabledModule => { const catalogModule = moduleCatalog.find(module => module.id === enabledModule.id); const Icon = catalogModule?.icon || LayoutGrid; return <Link key={enabledModule.id} href={`/dashboard?module=${enabledModule.id}`}><Icon />{catalogModule?.shortName || enabledModule.name}</Link> })}<Link href="/dashboard"><BarChart3 />Workspace analytics</Link><small>MANAGE</small><Link className={section === 'Modules' ? 'active' : ''} href="/marketplace"><LayoutGrid />App Store</Link><Link className={section === 'Admin' ? 'active' : ''} href="/admin"><Shield />Admin portal</Link><Link href="/pricing"><CreditCard />Subscription</Link></nav><div className="sidebar-bottom"><Link href="/#contact"><CircleHelp />Help centre</Link><Link href="/"><LogOut />Back to website</Link></div></aside><section className="app-main"><header className="app-topbar"><div><small>DIGITAL SERVICES ERP</small><b>{section}</b></div><label><Search /><input placeholder="Search workspace" /></label><div><button aria-label="Notifications"><Bell /></button><span>AK</span><b>Workspace owner</b><ChevronDown /></div></header>{children}</section></div>
}

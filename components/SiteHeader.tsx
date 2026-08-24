'use client'

import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Brand } from './Brand'

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  return <header className="site-header"><div className="shell header-inner"><Brand /><button className="menu-button" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Toggle navigation">{open ? <X /> : <Menu />}</button><nav className={open ? 'nav open' : 'nav'} aria-label="Primary navigation"><Link href="/modules">Modules</Link><Link href="/#cost-builder">Cost builder</Link><Link href="/industries">Industries</Link><Link href="/demos">Demos</Link><Link href="/pricing">Pricing</Link><Link href="/#contact">Contact</Link><span className="nav-divider" /><Link href="/login">Sign in</Link><Link className="button button-small" href="/#cost-builder">Build My ERP</Link></nav></div></header>
}

'use client'

import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Brand } from './Brand'

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  return <header className="site-header"><div className="shell header-inner"><Brand /><button className="menu-button" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Toggle navigation">{open ? <X /> : <Menu />}</button><nav className={open ? 'nav open' : 'nav'} aria-label="Primary navigation"><Link href="/marketplace">App Store</Link><Link href="/platform">Platform</Link><Link href="/#cost-builder">Pricing</Link><Link href="/#contact">Book Demo</Link><span className="nav-divider" /><Link href="/login">Sign in</Link><Link className="button button-small" href="/register">Start Free Trial</Link></nav></div></header>
}

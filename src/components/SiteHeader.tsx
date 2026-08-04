import { Link } from '@tanstack/react-router'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { useState } from 'react'

const navItems = [
  ['Services', '/services'],
  ['Solutions', '/solutions'],
  ['Portfolio', '/portfolio'],
  ['Case Studies', '/case-studies'],
  ['About', '/about'],
] as const

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="site-header">
      <div className="nav-shell">
        <Link to="/" className="brand" aria-label="Digital Services Ltd home">
          <span className="brand-mark" aria-hidden="true"><i /><i /><i /></span>
          <span className="brand-name">Digital Services <b>Ltd</b></span>
        </Link>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map(([label, path]) => (
            <Link key={path} to={path} activeProps={{ className: 'active' }}>{label}</Link>
          ))}
        </nav>

        <Link to="/contact" className="button button-small header-cta">
          Let's talk <ArrowUpRight size={16} />
        </Link>

        <button
          className="menu-button"
          type="button"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((value) => !value)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {isOpen && (
        <nav className="mobile-nav" aria-label="Mobile navigation">
          {navItems.map(([label, path]) => (
            <Link key={path} to={path} onClick={() => setIsOpen(false)}>{label}</Link>
          ))}
          <Link to="/contact" onClick={() => setIsOpen(false)}>Contact</Link>
        </nav>
      )}
    </header>
  )
}

import Link from 'next/link'
import { Brand } from './Brand'

export function SiteFooter() {
  return <footer className="site-footer"><div className="shell footer-grid"><div><Brand /><p>One modular operating system for modern organisations.</p></div><div><b>Platform</b><Link href="/modules">Module marketplace</Link><Link href="/pricing">Pricing</Link><Link href="/dashboard">Product dashboard</Link></div><div><b>Company</b><Link href="/industries">Industries</Link><Link href="/#contact">Contact sales</Link><Link href="/login">Customer login</Link></div><div><b>Trust</b><span>Secure cloud hosting</span><span>Role-based access</span><span>Audit-ready workflows</span></div></div><div className="shell footer-bottom"><span>© 2026 Digital Services Ltd.</span><span>Privacy · Terms · Security</span></div></footer>
}

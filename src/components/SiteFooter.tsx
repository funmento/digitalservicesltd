import { Link } from '@tanstack/react-router'
import { ArrowUpRight } from 'lucide-react'

const footerLinks = [
  ['Home', '/'], ['Services', '/services'], ['Solutions', '/solutions'],
  ['Portfolio', '/portfolio'], ['Case Studies', '/case-studies'],
  ['About', '/about'], ['Contact', '/contact'],
] as const

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-top">
        <div>
          <span className="eyebrow light">Ready to improve how your business runs?</span>
          <h2>Let's build the system<br />your business needs.</h2>
        </div>
        <Link to="/contact" className="round-link" aria-label="Book a free consultation">
          <ArrowUpRight size={28} />
        </Link>
      </div>
      <div className="container footer-grid">
        <div>
          <Link to="/" className="brand brand-footer">
            <span className="brand-mark" aria-hidden="true"><i /><i /><i /></span>
            <span className="brand-name">Digital Services <b>Ltd</b></span>
          </Link>
          <p>Custom software, ERP systems and business applications designed around real operations.</p>
        </div>
        <div className="footer-links">
          <span className="footer-label">Navigate</span>
          {footerLinks.map(([label, path]) => <Link key={path} to={path}>{label}</Link>)}
        </div>
        <div className="footer-contact">
          <span className="footer-label">Start a project</span>
          <a href="mailto:hello@digitalservicesltd.co.uk">hello@digitalservicesltd.co.uk</a>
          <p>Tell us what slows your business down. We'll explore how software can solve it.</p>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} Digital Services Ltd</span>
        <span>Software built around your business.</span>
      </div>
    </footer>
  )
}

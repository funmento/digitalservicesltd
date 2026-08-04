import { Link, createFileRoute } from '@tanstack/react-router'
import { ArrowRight, Boxes, ChartNoAxesCombined, CircleCheck, CloudCog, CreditCard, Gauge, Handshake, Layers3, PackageSearch, PanelsTopLeft, ShieldCheck, ShoppingBasket, Sparkles, UsersRound } from 'lucide-react'
import { CallToAction } from '@/components/CallToAction'
import { SystemVisual } from '@/components/SystemVisual'
import { createSeo } from '@/lib/seo'

export const Route = createFileRoute('/')({
  head: () => createSeo('Custom Software, ERP Systems & Business Applications', 'We design software that helps businesses automate processes, improve efficiency and scale operations.'),
  component: HomePage,
})

const services = [
  ['ERP Systems', Boxes], ['CRM Systems', UsersRound], ['Business Automation', CloudCog],
  ['Admin Dashboards', Gauge], ['Online Ordering Systems', ShoppingBasket],
  ['Customer Portals', PanelsTopLeft], ['Payment Integrations', CreditCard],
  ['Reporting & Analytics', ChartNoAxesCombined], ['Inventory Management', PackageSearch],
  ['Booking Systems', Layers3],
] as const

function HomePage() {
  return (
    <main id="main-content">
      <section className="home-hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="eyebrow"><Sparkles size={14} /> Software built for how you work</span>
            <h1>Custom Software, <em>ERP Systems</em> &amp; Business Applications</h1>
            <p>We design and develop software that helps businesses automate processes, improve efficiency, and scale operations.</p>
            <div className="button-row">
              <Link to="/contact" className="button">Book a Free Consultation <ArrowRight size={18} /></Link>
              <Link to="/portfolio" className="text-link">View Our Work <ArrowRight size={17} /></Link>
            </div>
            <div className="hero-proof">
              <span><ShieldCheck /> Secure architecture</span>
              <span><CloudCog /> Cloud-first platforms</span>
              <span><Handshake /> Long-term support</span>
            </div>
          </div>
          <SystemVisual />
        </div>
        <div className="hero-orbit orbit-one" /><div className="hero-orbit orbit-two" />
      </section>

      <section className="intro-strip">
        <div className="container intro-grid">
          <span className="section-number">01 / What we do</span>
          <h2>We replace fragmented processes with <em>connected systems</em> that make work clearer, faster and easier to manage.</h2>
        </div>
      </section>

      <section className="section services-preview">
        <div className="container">
          <div className="section-heading split-heading">
            <div><span className="eyebrow">Capabilities</span><h2>Systems that move<br />business forward.</h2></div>
            <div><p>From one critical workflow to a complete operational platform, every solution is shaped around your business.</p><Link to="/services" className="text-link">Explore all services <ArrowRight size={17} /></Link></div>
          </div>
          <div className="service-grid">
            {services.map(([name, Icon], index) => (
              <Link to="/services" className="service-tile" key={name}>
                <span className="tile-number">{String(index + 1).padStart(2, '0')}</span>
                <Icon />
                <h3>{name}</h3>
                <ArrowRight className="tile-arrow" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section why-section">
        <div className="container why-grid">
          <div className="why-sticky"><span className="eyebrow light">Why Digital Services Ltd</span><h2>Technical depth.<br />Commercial focus.</h2><p>Good software is not just well engineered. It must reduce friction, surface the right information and create measurable value.</p></div>
          <div className="why-list">
            {[
              ['Bespoke Development', 'Software designed around your exact workflows—not a generic platform you have to work around.'],
              ['Modern Cloud Platforms', 'Responsive, connected systems that your team can access securely from anywhere.'],
              ['Secure & Scalable Architecture', 'Strong technical foundations that support your business as users, data and complexity grow.'],
              ['Ongoing Support', 'A long-term technology partner for improvements, maintenance and new opportunities.'],
              ['Business-Focused Solutions', 'Every feature connects to a real operational need, outcome or commercial goal.'],
            ].map(([title, copy], index) => <article key={title}><span>0{index + 1}</span><CircleCheck /><div><h3>{title}</h3><p>{copy}</p></div></article>)}
          </div>
        </div>
      </section>

      <section className="section featured-work">
        <div className="container">
          <div className="section-heading"><span className="eyebrow">Featured case study</span><h2>One platform. Every order.<br />Complete control.</h2></div>
          <Link to="/case-studies" className="case-card">
            <div className="case-visual">
              <div className="phone-order"><span>DELIFE</span><h4>Your order</h4><div /><div /><strong>£32.40</strong><button>Checkout</button></div>
              <div className="case-dashboard"><div className="mini-nav">Delife Kitchen <i /></div><p>Today's sales</p><h4>£2,846.20</h4><div className="line-chart"><svg viewBox="0 0 400 130" preserveAspectRatio="none"><path d="M0 115 C55 100, 65 68, 110 78 S180 110, 210 58 S285 40, 320 55 S365 15, 400 8" /></svg></div><div className="mini-metrics"><i /><i /><i /></div></div>
            </div>
            <div className="case-copy"><span>Online ordering platform</span><h3>Delife Kitchen</h3><p>A connected ordering and operations platform with Stripe payments, dynamic delivery pricing, automated notifications and real-time order management.</p><div className="tag-row"><b>Payments</b><b>Automation</b><b>Dashboard</b><b>Reporting</b></div><span className="text-link">Read the case study <ArrowRight size={17} /></span></div>
          </Link>
        </div>
      </section>
      <CallToAction />
    </main>
  )
}

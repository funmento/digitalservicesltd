import { Link, createFileRoute } from '@tanstack/react-router'
import { ArrowRight, Boxes, ChartNoAxesCombined, CircleCheck, CloudCog, Code2, CreditCard, Gauge, Handshake, Layers3, Lightbulb, PackageSearch, PanelsTopLeft, Rocket, Search, ShieldCheck, ShoppingBasket, Sparkles, UsersRound } from 'lucide-react'
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

const credibilityMetrics = [
  ['10', 'Core capabilities delivered', 'Delife Kitchen platform'],
  ['6', 'Connected technologies', 'Across one reliable stack'],
  ['1', 'Unified order journey', 'From basket to fulfilment'],
] as const

const process = [
  ['01', 'Discover', 'We map the workflows, constraints and commercial goals that matter.', Search],
  ['02', 'Design', 'We shape the user journeys, system architecture and delivery roadmap.', Lightbulb],
  ['03', 'Build', 'We develop in focused stages with regular reviews and visible progress.', Code2],
  ['04', 'Launch & improve', 'We deploy, support and evolve the platform as your operation grows.', Rocket],
] as const

function HomePage() {
  return (
    <main id="main-content">
      <section className="home-hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="eyebrow"><Sparkles size={14} /> Software built around your operation</span>
            <h1>Custom Software, <em>ERP Systems</em> &amp; Business Applications</h1>
            <p>We design and develop connected software that removes operational friction, gives teams clearer control and supports sustainable growth.</p>
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

      <section className="credibility-strip" aria-label="Featured project results">
        <div className="container credibility-grid">
          <div className="credibility-intro"><span>Project proof</span><p>Built from a real delivery, not a concept dashboard.</p></div>
          {credibilityMetrics.map(([value, label, detail]) => <article key={label}><strong>{value}</strong><span>{label}</span><small>{detail}</small></article>)}
        </div>
      </section>

      <section className="intro-strip">
        <div className="container intro-grid">
          <span className="section-number">01 / What we do</span>
          <h2>We replace fragmented processes with <em>connected systems</em> that make work clearer, faster and easier to manage.</h2>
        </div>
      </section>

      <section className="section featured-work featured-work-home">
        <div className="container">
          <div className="section-heading split-heading">
            <div><span className="eyebrow">Featured case study</span><h2>Direct ordering.<br />Complete control.</h2></div>
            <div><p>Delife Kitchen needed more than a marketing website. We built the connected platform behind its customer journey and day-to-day order operations.</p><Link to="/case-studies" className="text-link">Read the full case study <ArrowRight size={17} /></Link></div>
          </div>
          <Link to="/case-studies" className="case-card case-card-premium">
            <div className="case-visual">
              <div className="case-project-mark"><span>DELIFE</span><small>Kitchen</small></div>
              <div className="phone-order"><span>DELIFE</span><h4>Your order</h4><div /><div /><strong>£32.40</strong><i>Checkout</i></div>
              <div className="case-dashboard"><div className="mini-nav">Delife Kitchen <i /></div><p>Orders overview</p><h4>Everything in one place.</h4><div className="line-chart"><svg viewBox="0 0 400 130" preserveAspectRatio="none"><path d="M0 115 C55 100, 65 68, 110 78 S180 110, 210 58 S285 40, 320 55 S365 15, 400 8" /></svg></div><div className="mini-metrics"><i /><i /><i /></div></div>
            </div>
            <div className="case-copy"><span>Online ordering &amp; operations</span><h3>Delife Kitchen</h3><p>A purpose-built platform connecting direct ordering, Stripe payments, dynamic delivery pricing, notifications and live order management.</p><div className="case-proof-list"><span><CircleCheck /> Customer storefront</span><span><CircleCheck /> Merchant dashboard</span><span><CircleCheck /> Automated workflows</span></div><div className="case-metric"><strong>10</strong><span>integrated capabilities delivered</span></div><span className="text-link">Explore the project <ArrowRight size={17} /></span></div>
          </Link>
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
          <div className="why-sticky"><span className="eyebrow light">Why businesses choose us</span><h2>Technical depth.<br />Commercial focus.</h2><p>Good software is not just well engineered. It must reduce friction, surface the right information and create measurable value.</p><Link to="/about" className="text-link why-link">How we work <ArrowRight size={17} /></Link></div>
          <div className="why-list">
            {[
              ['Built around the business', 'Your workflows lead the solution—not the limitations of an off-the-shelf product.'],
              ['One accountable partner', 'Strategy, interface design, engineering and support stay connected from day one.'],
              ['Clarity throughout delivery', 'Regular reviews and visible progress keep decisions grounded and stakeholders aligned.'],
              ['Designed for what comes next', 'Secure foundations make new users, integrations and capabilities easier to add.'],
            ].map(([title, copy], index) => <article key={title}><span>0{index + 1}</span><CircleCheck /><div><h3>{title}</h3><p>{copy}</p></div></article>)}
          </div>
        </div>
      </section>

      <section className="section home-process-section">
        <div className="container">
          <div className="section-heading split-heading process-heading"><div><span className="eyebrow">Our delivery process</span><h2>From operational problem<br />to working platform.</h2></div><p>A focused four-step process keeps complex software decisions clear, collaborative and tied to business outcomes.</p></div>
          <div className="home-process-grid">
            {process.map(([number, title, copy, Icon]) => <article key={title}><span>{number}</span><Icon /><div><h3>{title}</h3><p>{copy}</p></div></article>)}
          </div>
          <div className="process-cta"><p>Have a workflow that is slowing the business down?</p><Link to="/contact" className="button">Discuss your project <ArrowRight size={18} /></Link></div>
        </div>
      </section>
      <CallToAction />
    </main>
  )
}

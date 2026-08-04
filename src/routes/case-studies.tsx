import { createFileRoute } from '@tanstack/react-router'
import { BellRing, ChartNoAxesCombined, CircleCheck, CreditCard, Gauge, MailCheck, MapPinned, PackageCheck, ShoppingBasket, SlidersHorizontal } from 'lucide-react'
import { CallToAction } from '@/components/CallToAction'
import { PageHero } from '@/components/PageHero'
import { createSeo } from '@/lib/seo'

export const Route = createFileRoute('/case-studies')({
  head: () => createSeo('Case Studies | Delife Kitchen', 'See how Digital Services Ltd delivered an online ordering and operations platform for Delife Kitchen.'),
  component: CaseStudiesPage,
})

const features = [
  ['Online Ordering Platform', ShoppingBasket], ['Stripe Payments', CreditCard], ['Product Management', PackageCheck],
  ['Delivery Radius Controls', MapPinned], ['Dynamic Delivery Pricing', SlidersHorizontal], ['Customer Email Automation', MailCheck],
  ['Merchant Notifications', BellRing], ['Admin Dashboard', Gauge], ['Sales Reporting', ChartNoAxesCombined], ['Order Management', CircleCheck],
] as const

function CaseStudiesPage() {
  return (
    <main id="main-content">
      <PageHero eyebrow="Case study / Delife Kitchen" title={<>A direct ordering platform built for <em>control and growth.</em></>} description="Delife Kitchen needed more than a website. It needed a connected commerce and operations platform that could manage the entire order journey." />
      <section className="case-study-hero">
        <div className="container case-study-stage">
          <div className="case-study-device"><div className="device-bar"><span>DELIFE KITCHEN</span><i /><i /><i /></div><div className="device-content"><aside><b>Overview</b><span>Orders</span><span>Products</span><span>Delivery</span><span>Reports</span></aside><div className="device-main"><span>Tuesday, 04 August</span><h3>Good morning.</h3><div className="device-stats"><div><small>Today's revenue</small><strong>£2,846</strong></div><div><small>Orders</small><strong>84</strong></div><div><small>Average order</small><strong>£33.88</strong></div></div><div className="device-chart"><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /></div></div></div></div>
          <div className="case-stat"><strong>10</strong><span>core capabilities delivered in one integrated platform</span></div>
        </div>
      </section>

      <section className="section narrative-section"><div className="container narrative-grid"><span className="section-number">The challenge</span><div><h2>Reducing dependence on fragmented ordering processes.</h2><p>Delife Kitchen needed a branded direct-ordering experience with reliable payments, precise delivery controls and a straightforward way for staff to manage products and incoming orders.</p><p>The platform also needed to keep both customers and merchants informed automatically, while providing the reporting visibility required to manage performance.</p></div></div></section>
      <section className="section solution-section"><div className="container narrative-grid"><span className="section-number light">The solution</span><div><h2>One connected platform, from basket to fulfilment.</h2><p>Digital Services Ltd designed and developed a tailored ordering platform that connects the customer storefront with Stripe payments, location-aware delivery pricing and a purpose-built merchant dashboard.</p><p>Automated emails and notifications keep every participant updated, while order and sales reporting gives the business a live operational view.</p></div></div></section>
      <section className="section delivered-section"><div className="container"><div className="section-heading"><span className="eyebrow">Features delivered</span><h2>The complete operational toolkit.</h2></div><div className="delivered-grid">{features.map(([title, Icon], index) => <article key={title}><span>0{index + 1}</span><Icon /><h3>{title}</h3></article>)}</div></div></section>
      <section className="section outcome-section"><div className="container outcome-grid"><div><span className="eyebrow">Outcome</span><h2>A scalable foundation for direct digital sales.</h2></div><div className="outcome-points"><p><CircleCheck /> A consistent branded ordering journey</p><p><CircleCheck /> Less manual coordination for staff</p><p><CircleCheck /> Clear control over products and delivery logic</p><p><CircleCheck /> Automated customer and merchant communication</p><p><CircleCheck /> Better visibility of orders and sales performance</p></div></div></section>
      <section className="tech-section"><div className="container tech-row"><span>Technology stack</span>{['React', 'TypeScript', 'Stripe', 'Cloud Infrastructure', 'Transactional Email', 'Custom APIs'].map((tech) => <b key={tech}>{tech}</b>)}</div></section>
      <CallToAction eyebrow="Build your own success story" title="Your operation could be the next system we transform." />
    </main>
  )
}

import { createFileRoute } from '@tanstack/react-router'
import { ArrowRight, Building2, Hotel, PackageOpen, Route as RouteIcon, ShoppingBag, Store, UtensilsCrossed } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import { CallToAction } from '@/components/CallToAction'
import { PageHero } from '@/components/PageHero'
import { createSeo } from '@/lib/seo'

export const Route = createFileRoute('/solutions')({
  head: () => createSeo('Industry Software Solutions', 'Purpose-built software and automation for restaurants, retail, distribution, logistics, service companies, SMEs and hospitality businesses.'),
  component: SolutionsPage,
})

const industries = [
  ['Restaurants & Takeaways', UtensilsCrossed, 'Direct ordering, kitchen workflows, delivery controls and automated customer communication.', ['Online ordering', 'Menu management', 'Delivery operations']],
  ['Retail Businesses', Store, 'Connect inventory, sales, purchasing and customer data for clearer day-to-day control.', ['Stock visibility', 'Sales reporting', 'Customer systems']],
  ['Distributors', PackageOpen, 'Coordinate products, suppliers, orders and fulfilment through one operational platform.', ['Order processing', 'Supplier management', 'Inventory control']],
  ['Logistics Companies', RouteIcon, 'Improve job allocation, tracking, communication and reporting across fast-moving operations.', ['Job management', 'Status automation', 'Performance reporting']],
  ['Service Businesses', Building2, 'Manage customers, bookings, teams, approvals and recurring processes with less administration.', ['CRM workflows', 'Booking systems', 'Internal portals']],
  ['SMEs', ShoppingBag, 'Replace disconnected tools with scalable systems that provide one source of operational truth.', ['Business automation', 'Management dashboards', 'Cloud applications']],
  ['Hospitality Businesses', Hotel, 'Create smoother guest, booking, ordering and back-office experiences through connected software.', ['Guest portals', 'Booking workflows', 'Operational reporting']],
] as const

function SolutionsPage() {
  return (
    <main id="main-content">
      <PageHero eyebrow="Industry solutions" title={<>Built for the realities of <em>your sector.</em></>} description="The best systems reflect the pace, pressures and workflows of the business using them. We combine sector understanding with bespoke software development." />
      <section className="section industries-section">
        <div className="container industries-grid">
          {industries.map(([title, Icon, copy, items], index) => (
            <article className={`industry-card ${index === 0 ? 'featured-industry' : ''}`} key={title}>
              <div className="industry-icon"><Icon /></div><span className="industry-number">0{index + 1}</span>
              <h2>{title}</h2><p>{copy}</p>
              <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
              <Link to="/contact" className="text-link">Discuss your requirements <ArrowRight size={17} /></Link>
            </article>
          ))}
        </div>
      </section>
      <section className="section solution-principle"><div className="container principle-grid"><span className="eyebrow light">One principle</span><h2>Your software should reflect your competitive advantage—not erase it.</h2><p>We start with what makes your operation distinct, then design technology that strengthens it.</p></div></section>
      <CallToAction eyebrow="A solution shaped around your sector" title="Let's map the system your operation is missing." />
    </main>
  )
}

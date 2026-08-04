import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowRight, BarChart3, Boxes, PanelsTopLeft, ShoppingBasket } from 'lucide-react'
import { CallToAction } from '@/components/CallToAction'
import { PageHero } from '@/components/PageHero'
import { createSeo } from '@/lib/seo'

export const Route = createFileRoute('/portfolio')({
  head: () => createSeo('Software Development Portfolio', 'Explore the types of custom platforms, dashboards, portals and operational systems built by Digital Services Ltd.'),
  component: PortfolioPage,
})

const projects = [
  { title: 'Delife Kitchen', type: 'Online ordering & operations', icon: ShoppingBasket, className: 'project-copper', status: 'Featured case study', copy: 'Direct ordering, dynamic delivery pricing, Stripe payments and a live merchant dashboard.' },
  { title: 'Operations Command', type: 'ERP & reporting platform', icon: Boxes, className: 'project-green', status: 'Project profile coming soon', copy: 'A central workspace for purchasing, inventory, fulfilment and management reporting.' },
  { title: 'ClientFlow Portal', type: 'Customer experience platform', icon: PanelsTopLeft, className: 'project-blue', status: 'Project profile coming soon', copy: 'A secure self-service environment for documents, approvals, requests and communication.' },
  { title: 'Performance Lens', type: 'Analytics dashboard', icon: BarChart3, className: 'project-sand', status: 'Project profile coming soon', copy: 'Live KPIs and automated reporting that turn operational data into clear decisions.' },
]

function PortfolioPage() {
  return (
    <main id="main-content">
      <PageHero eyebrow="Portfolio" title={<>Digital products with <em>business purpose.</em></>} description="A growing portfolio of platforms designed to solve operational challenges, create better customer experiences and unlock clearer decision-making." />
      <section className="section portfolio-section">
        <div className="container portfolio-grid">
          {projects.map(({ title, type, icon: Icon, className, status, copy }, index) => (
            <article className={`portfolio-card ${className}`} key={title}>
              <div className="portfolio-visual"><span className="portfolio-logo"><Icon /></span><div className="ui-window"><i /><i /><i /><div className="ui-layout"><span /><b /><b /><b /></div></div></div>
              <div className="portfolio-copy"><span>{type}</span><h2>{title}</h2><p>{copy}</p><div className="portfolio-meta"><b>{status}</b>{index === 0 && <Link to="/case-studies" aria-label="Read Delife Kitchen case study"><ArrowRight /></Link>}</div></div>
            </article>
          ))}
        </div>
        <div className="container portfolio-note"><span>More work is being prepared for publication.</span><p>Some client platforms remain private by design. Future project profiles and screenshots can be added through this scalable portfolio structure.</p></div>
      </section>
      <CallToAction title="Have a complex workflow that deserves a better system?" />
    </main>
  )
}

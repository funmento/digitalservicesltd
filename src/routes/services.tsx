import { createFileRoute } from '@tanstack/react-router'
import { Boxes, CloudCog, Gauge, Network, ShoppingBasket, UsersRound } from 'lucide-react'
import { CallToAction } from '@/components/CallToAction'
import { PageHero } from '@/components/PageHero'
import { createSeo } from '@/lib/seo'

export const Route = createFileRoute('/services')({
  head: () => createSeo('Custom Software Development Services', 'Explore ERP systems, CRM platforms, business applications, ordering platforms, admin dashboards and automation solutions.'),
  component: ServicesPage,
})

const services = [
  { number: '01', title: 'ERP Systems', icon: Boxes, copy: 'Bring core operations into one reliable system with shared data, clear workflows and better control.', items: ['Inventory Management', 'Stock Control', 'Sales & Purchasing', 'Supplier Management', 'Reporting', 'Workflow Automation'] },
  { number: '02', title: 'CRM Systems', icon: UsersRound, copy: 'Build stronger customer relationships with a focused view of every lead, conversation and opportunity.', items: ['Customer Management', 'Lead Tracking', 'Sales Pipelines', 'Customer Reporting'] },
  { number: '03', title: 'Business Applications', icon: Network, copy: 'Replace spreadsheets and disconnected tools with purpose-built applications that support the way your team works.', items: ['Custom Workflow Systems', 'Internal Portals', 'Approval Processes', 'Operational Management'] },
  { number: '04', title: 'Online Ordering Platforms', icon: ShoppingBasket, copy: 'Own the customer experience with a fast, branded ordering platform connected directly to your operations.', items: ['Food Ordering', 'Delivery Management', 'Stripe Payments', 'Product Management', 'Customer Notifications'] },
  { number: '05', title: 'Admin Dashboards', icon: Gauge, copy: 'Turn operational data into clear decisions with dashboards designed for the metrics that matter.', items: ['Reporting', 'Analytics', 'KPI Tracking', 'Operational Visibility'] },
  { number: '06', title: 'Automation Solutions', icon: CloudCog, copy: 'Remove repetitive work, reduce errors and keep every part of a process moving automatically.', items: ['Process Automation', 'Email Automation', 'Notifications', 'Third-Party Integrations'] },
]

function ServicesPage() {
  return (
    <main id="main-content">
      <PageHero eyebrow="Services" title={<>Software engineered around <em>real operations.</em></>} description="We design connected business systems that reduce manual work, centralise information and give teams the tools to perform at their best." />
      <section className="section service-detail-section">
        <div className="container service-detail-list">
          {services.map(({ number, title, icon: Icon, copy, items }) => (
            <article className="service-detail" key={title}>
              <div className="detail-index"><span>{number}</span><Icon /></div>
              <div className="detail-copy"><h2>{title}</h2><p>{copy}</p></div>
              <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
            </article>
          ))}
        </div>
      </section>
      <section className="process-section section">
        <div className="container">
          <div className="section-heading split-heading"><div><span className="eyebrow">How we work</span><h2>From operational challenge<br />to working system.</h2></div><p>A practical, collaborative process keeps the project grounded in business value from the first workshop to ongoing improvement.</p></div>
          <div className="process-grid">
            {['Discover', 'Design', 'Develop', 'Improve'].map((item, index) => <article key={item}><span>0{index + 1}</span><h3>{item}</h3><p>{['Map processes, users, pain points and success measures.', 'Shape the workflows, interface and technical foundation.', 'Build, integrate and test in focused, visible stages.', 'Support adoption and evolve the system as needs change.'][index]}</p></article>)}
          </div>
        </div>
      </section>
      <CallToAction title="Need software that fits—not software you have to fit around?" />
    </main>
  )
}

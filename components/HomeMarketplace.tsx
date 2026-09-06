import Link from 'next/link'
import { ArrowRight, CalendarDays, Check } from 'lucide-react'
import { homepageModules } from './product-data'
import { ModuleStatusBadge } from './ModuleStatusBadge'

function moduleCtaHref(module: (typeof homepageModules)[number]) {
  if (module.status === 'LIVE') return `/register?module=${module.id}`
  if (module.status === 'PLANNED') return '#erp-roadmap'
  return `/modules/${module.slug}#module-interest`
}

export function HomeMarketplace() {
  return <section className="home-marketplace" aria-labelledby="marketplace-title">
    <div className="shell">
      <div className="marketplace-intro">
        <div><span className="kicker">Module marketplace</span><h2 id="marketplace-title">A working ERP that grows release by release.</h2></div>
        <div className="marketplace-message">
          <p>Delivery Management is live now. CRM is already in early access, with the next operational modules visibly moving through the roadmap.</p>
          <ul><li><Check /> Start with software available today.</li><li><Check /> See exactly what is launching next.</li></ul>
        </div>
      </div>
      <div className="storefront-grid">
        {homepageModules.map(module => {
          const Icon = module.icon
          return <article className={module.featured ? 'storefront-card storefront-featured' : 'storefront-card'} key={module.id}>
            {module.featured && <span className="featured-module-label">Featured Module</span>}
            <div className="storefront-card-top"><span className={`storefront-icon storefront-icon-${module.id}`}><Icon /></span><ModuleStatusBadge status={module.status} label={module.statusLabel} /></div>
            <div><small className="module-category">{module.category}</small><h3>{module.name}</h3><p>{module.description}</p></div>
            {module.featured && <ul className="featured-capabilities">{module.features.map(feature => <li key={feature}><Check />{feature}</li>)}</ul>}
            <div className="storefront-price"><small>STARTING AT</small><strong>£{module.price}</strong><span>/ month<small>{module.usagePricing}</small></span></div>
            <div className="storefront-actions">
              <Link className="storefront-primary" href={moduleCtaHref(module)}>{module.ctaLabel} <ArrowRight /></Link>
              {module.featured ? <Link href="/#contact"><CalendarDays /> Book Demo</Link> : <Link href={`/modules/${module.slug}`} aria-label={`View ${module.name} details`}>View Module <ArrowRight /></Link>}
            </div>
          </article>
        })}
      </div>
      <div className="marketplace-build-bar">
        <div><span>Start with the flagship module</span><strong>Delivery Management is live from £29/month</strong><small>CRM early access and a transparent release roadmap are already open.</small></div>
        <Link className="button button-white" href="/register?module=delivery">Start Free Trial <ArrowRight /></Link>
      </div>
      <Link className="marketplace-browse-link" href="/marketplace">Explore the ERP App Store <ArrowRight /></Link>
    </div>
  </section>
}

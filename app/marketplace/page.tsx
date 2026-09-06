'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, CalendarDays, Check, Search } from 'lucide-react'
import { ErpRoadmap } from '@/components/ErpRoadmap'
import { ModuleStatusBadge } from '@/components/ModuleStatusBadge'
import { marketplaceModules } from '@/components/product-data'

function moduleCtaHref(module: (typeof marketplaceModules)[number]) {
  if (module.status === 'LIVE') return `/register?module=${module.id}`
  if (module.status === 'PLANNED') return '#erp-roadmap'
  return `/modules/${module.slug}#module-interest`
}

export default function MarketplacePage() {
  const [query, setQuery] = useState('')
  const filtered = marketplaceModules.filter(module => `${module.name} ${module.description} ${module.features.join(' ')}`.toLowerCase().includes(query.toLowerCase()))

  return <div className="page-wrap marketplace-page">
    <section className="market-hero"><div className="shell"><span className="kicker">Digital Services ERP App Store</span><h1>Available now.<br />Growing in public.</h1><p>Start with a production-ready delivery workflow, join the next release early, and see exactly where every connected ERP module sits.</p><label className="market-search"><Search /><span className="sr-only">Search modules or features</span><input value={query} onChange={event => setQuery(event.target.value)} placeholder="Search modules or features" /></label></div></section>
    <section className="shell marketplace-grid" aria-label="ERP modules">
      {filtered.map(module => {
        const Icon = module.icon
        return <article id={module.id} className={module.featured ? 'market-module market-module-featured' : 'market-module'} key={module.id}>
          {module.featured && <span className="featured-module-label">Featured Module</span>}
          <div className="market-module-head"><div className="module-icon"><Icon /></div><ModuleStatusBadge status={module.status} label={module.statusLabel} /></div>
          <span className="module-category">{module.category}</span>
          <h2><Link href={`/modules/${module.slug}`}>{module.name}</Link></h2>
          <p>{module.description}</p>
          <ul>{module.features.map(feature => <li key={feature}><Check />{feature}</li>)}</ul>
          <div className="market-module-price"><span>From <b>£{module.price}</b> / month<small>{module.usagePricing}</small></span><small>{module.roadmapPosition}</small></div>
          <div className="market-module-actions"><Link className="button" href={moduleCtaHref(module)}>{module.ctaLabel} <ArrowRight /></Link>{module.featured ? <Link className="button button-outline" href="/#contact"><CalendarDays /> Book Demo</Link> : <Link className="button button-outline" href={`/modules/${module.slug}`}>View Module</Link>}</div>
        </article>
      })}
      {!filtered.length && <div className="marketplace-empty"><Search /><h2>No matching modules yet.</h2><p>Try a broader workflow or feature term. The roadmap is expanding as the platform grows.</p></div>}
    </section>
    <ErpRoadmap />
  </div>
}

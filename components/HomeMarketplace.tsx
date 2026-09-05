'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { ArrowRight, Check, Plus } from 'lucide-react'
import { homepageModules } from './product-data'

export function HomeMarketplace() {
  const [selected, setSelected] = useState<string[]>([])
  const total = useMemo(() => homepageModules.filter(module => selected.includes(module.id)).reduce((sum, module) => sum + module.price, 19), [selected])

  function toggleModule(id: string) {
    setSelected(current => current.includes(id) ? current.filter(moduleId => moduleId !== id) : [...current, id])
  }

  return <section className="home-marketplace" aria-labelledby="marketplace-title">
    <div className="shell">
      <div className="marketplace-intro">
        <div><span className="kicker">Module marketplace</span><h2 id="marketplace-title">Your ERP.<br />Pick the parts.</h2></div>
        <p>Every module is a complete business app. Activate only what you need today, then add more without moving data or changing platforms.</p>
      </div>
      <div className="storefront-grid">
        {homepageModules.map(({ id, shortName, description, price, usagePricing, icon: Icon, category }) => {
          const active = selected.includes(id)
          return <article className={active ? 'storefront-card selected' : 'storefront-card'} key={id}>
            <div className="storefront-card-top"><span className={`storefront-icon storefront-icon-${id}`}><Icon /></span><small>{category}</small></div>
            <div><h3>{shortName}</h3><p>{description}</p></div>
            <div className="storefront-price"><small>STARTING AT</small><strong>£{price}</strong><span>/ month<small>{usagePricing}</small></span></div>
            <button type="button" onClick={() => toggleModule(id)} aria-pressed={active}>{active ? <><Check /> Added to your ERP</> : <><Plus /> Activate Module</>}</button>
          </article>
        })}
      </div>
      <div className="marketplace-build-bar">
        <div><span>{selected.length ? `${selected.length} module${selected.length === 1 ? '' : 's'} selected` : 'Start with any module'}</span><strong>Estimated from £{total}/month</strong><small>Includes the £19 secure workspace</small></div>
        <Link className="button button-white" href={selected.length ? `/register?modules=${selected.join(',')}` : '/register'}>Start Free Trial <ArrowRight /></Link>
      </div>
      <Link className="marketplace-browse-link" href="/marketplace">Explore all 10 modules <ArrowRight /></Link>
    </div>
  </section>
}

import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight, CalendarDays, Check, ChevronRight } from 'lucide-react'
import { ModuleLeadForm } from '@/components/ModuleLeadForm'
import { ModuleStatusBadge } from '@/components/ModuleStatusBadge'
import { marketplaceModules } from '@/components/product-data'

export function generateStaticParams() {
  return marketplaceModules.map(module => ({ moduleId: module.id }))
}

export async function generateMetadata({ params }: { params: Promise<{ moduleId: string }> }): Promise<Metadata> {
  const { moduleId } = await params
  const module = marketplaceModules.find(item => item.id === moduleId)
  if (!module) return {}
  return { title: `${module.name} ERP Module`, description: `${module.description} Status: ${module.statusLabel}.` }
}

function primaryHref(module: (typeof marketplaceModules)[number]) {
  if (module.status === 'LIVE') return `/register?module=${module.id}`
  if (module.status === 'PLANNED') return '#roadmap-position'
  return '#module-interest'
}

export default async function ModulePage({ params }: { params: Promise<{ moduleId: string }> }) {
  const { moduleId } = await params
  const module = marketplaceModules.find(item => item.id === moduleId)
  if (!module) notFound()

  const Icon = module.icon
  const showLeadForm = module.status === 'EARLY_ACCESS' || module.status === 'COMING_SOON'

  return <div className={`page-wrap module-detail module-detail-${module.status.toLowerCase().replace('_', '-')}`}>
    <section className="module-detail-hero"><div className="shell module-detail-hero-grid"><div className="module-detail-copy"><div className="module-detail-meta"><span className="module-icon"><Icon /></span><ModuleStatusBadge status={module.status} label={module.statusLabel} />{module.featured && <span className="featured-module-label">Featured Module</span>}</div><span className="kicker">{module.category} Module</span><h1>{module.name}</h1><p>{module.overview}</p><div className="hero-actions"><Link className="button" href={primaryHref(module)}>{module.ctaLabel} <ArrowRight /></Link>{module.featured && <Link className="button button-outline" href="/#contact"><CalendarDays /> Book Demo</Link>}</div></div><aside className="module-release-card"><span>Release position</span><strong>{module.statusLabel}</strong><p>{module.roadmapPosition}</p><div><small>Starting price</small><b>£{module.price}<em>/month</em></b></div></aside></div></section>

    <section className="shell module-detail-section"><div className="module-section-heading"><span className="kicker">Module Overview</span><h2>One connected workflow, designed for daily use.</h2><p>{module.description}</p></div><div className={module.featured ? 'module-feature-grid flagship-features' : 'module-feature-grid'}>{module.features.map((feature, index) => <article key={feature}><span>{String(index + 1).padStart(2, '0')}</span><Check /><h3>{feature}</h3><p>{module.featured ? 'Included in the live Delivery Management workflow.' : `A core capability planned for the ${module.name} module.`}</p></article>)}</div></section>

    <section className="module-benefits"><div className="shell module-benefits-grid"><div><span className="kicker light">Business Benefits</span><h2>Built to remove operational friction.</h2></div><ul>{module.benefits.map(benefit => <li key={benefit}><Check /><span>{benefit}</span></li>)}</ul></div></section>

    <section className="shell module-roadmap-position" id="roadmap-position"><div><span className="kicker">Roadmap Position</span><h2>{module.statusLabel}</h2><p>{module.roadmapPosition}</p></div><Link className="text-arrow" href="/marketplace#erp-roadmap">See the full ERP roadmap <ChevronRight /></Link></section>

    {showLeadForm && <section className="module-interest-section" id="module-interest"><div className="shell"><ModuleLeadForm type={module.status === 'EARLY_ACCESS' ? 'early-access' : 'notify'} moduleName={module.name} /></div></section>}

    {!showLeadForm && <section className="module-detail-cta"><div className="shell"><div><span className="kicker light">{module.status === 'LIVE' ? 'Ready Now' : 'Follow The Roadmap'}</span><h2>{module.status === 'LIVE' ? 'Put Delivery Management to work.' : `Track ${module.name} as the platform grows.`}</h2></div><Link className="button button-white" href={module.status === 'LIVE' ? '/register?module=delivery' : '/marketplace#erp-roadmap'}>{module.ctaLabel} <ArrowRight /></Link></div></section>}
  </div>
}

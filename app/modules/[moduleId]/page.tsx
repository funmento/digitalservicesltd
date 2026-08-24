import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight, Check } from 'lucide-react'
import { modules } from '@/components/product-data'

export function generateStaticParams() {
  return modules.map(module => ({ moduleId: module.id }))
}

export default async function ModulePage({ params }: { params: Promise<{ moduleId: string }> }) {
  const { moduleId } = await params
  const module = modules.find(item => item.id === moduleId)

  if (!module) notFound()

  const Icon = module.icon
  return <div className="page-wrap"><section className="page-hero centered"><div className="shell"><span className="kicker">{module.category} module</span><div className="module-icon"><Icon /></div><h1>{module.name}</h1><p>{module.description}</p><div className="hero-actions pricing-actions"><Link className="button" href={`/register?module=${module.id}`}>Start Free Trial <ArrowRight /></Link><Link className="button button-outline" href="/modules">All Modules</Link></div></div></section><section className="shell usage-callout"><div><span className="kicker">Included capabilities</span><h2>From £{module.price} per month.</h2><ul>{module.features.map(feature => <li key={feature}><Check />{feature}</li>)}</ul></div><Link className="button" href={`/#cost-builder`}>Build My ERP <ArrowRight /></Link></section></div>
}

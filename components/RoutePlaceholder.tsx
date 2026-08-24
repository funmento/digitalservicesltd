import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

type RoutePlaceholderProps = {
  kicker: string
  title: string
  description: string
  primaryHref: string
  primaryLabel: string
  secondaryHref?: string
  secondaryLabel?: string
}

export function RoutePlaceholder({ kicker, title, description, primaryHref, primaryLabel, secondaryHref, secondaryLabel }: RoutePlaceholderProps) {
  return <div className="page-wrap"><section className="page-hero centered"><div className="shell"><span className="kicker">{kicker}</span><h1>{title}</h1><p>{description}</p><div className="hero-actions pricing-actions"><Link className="button" href={primaryHref}>{primaryLabel} <ArrowRight /></Link>{secondaryHref && secondaryLabel && <Link className="button button-outline" href={secondaryHref}>{secondaryLabel}</Link>}</div></div></section></div>
}

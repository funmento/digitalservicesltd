import Link from 'next/link'
import { CheckCircle2, ClipboardList, Construction } from 'lucide-react'
import { marketplaceModules, type ModuleStatus } from './product-data'

const groups: { title: string; status: ModuleStatus; icon: typeof CheckCircle2 }[] = [
  { title: 'Available Now', status: 'LIVE', icon: CheckCircle2 },
  { title: 'In Early Access', status: 'EARLY_ACCESS', icon: Construction },
  { title: 'Coming Soon', status: 'COMING_SOON', icon: Construction },
  { title: 'Planned', status: 'PLANNED', icon: ClipboardList },
]

export function ErpRoadmap({ compact = false }: { compact?: boolean }) {
  return <section className={compact ? 'erp-roadmap compact' : 'erp-roadmap'} id="erp-roadmap" aria-labelledby="erp-roadmap-title">
    <div className="shell">
      <div className="roadmap-heading"><span className="kicker">ERP Roadmap</span><h2 id="erp-roadmap-title">A live platform with a clear release path.</h2><p>Start with Delivery Management today, help shape CRM in early access, and follow the operational modules moving towards release.</p></div>
      <div className="roadmap-grid">
        {groups.map(({ title, status, icon: Icon }) => <article key={status} className={`roadmap-group roadmap-${status.toLowerCase().replace('_', '-')}`}>
          <div className="roadmap-group-title"><Icon /><h3>{title}</h3></div>
          <ul>{marketplaceModules.filter(module => module.status === status).map(module => <li key={module.id}><Link href={`/modules/${module.slug}`}><span>{module.name}</span><small>{module.roadmapPosition}</small></Link></li>)}</ul>
        </article>)}
      </div>
    </div>
  </section>
}

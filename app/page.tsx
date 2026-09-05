import Link from 'next/link'
import { ArrowRight, Check, CircleDollarSign, Layers3, Play, ShieldCheck, Sparkles, ToggleRight, Workflow } from 'lucide-react'
import { ContactForm } from '@/components/ContactForm'
import { CostBuilder } from '@/components/CostBuilder'
import { HomeMarketplace } from '@/components/HomeMarketplace'

const steps = [
  { number: '01', icon: Layers3, title: 'Choose a module', text: 'Start with the workflow creating the most friction today—CRM, inventory, purchasing, or any other app.' },
  { number: '02', icon: ToggleRight, title: 'Activate instantly', text: 'Your team gets a secure workspace with the selected module switched on. No deployment or long implementation.' },
  { number: '03', icon: Workflow, title: 'Connect as you grow', text: 'Add more modules when the business needs them. Shared users, data, permissions, and reporting stay connected.' },
]

const platformFeatures = [
  ['One workspace per company', 'Every customer gets an isolated tenant, company URL, users, teams, roles, and permissions.'],
  ['Modules controlled by feature flags', 'Capabilities switch on by subscription and company configuration, without a new deployment.'],
  ['Usage-aware billing', 'A clear base subscription combines with module and usage pricing, so cost follows real adoption.'],
  ['Control built into the core', 'Notifications, audit logs, access controls, and activity records span every activated module.'],
]

export default function Home() {
  return <>
    <section className="app-store-hero">
      <div className="shell app-store-hero-grid">
        <div className="app-store-hero-copy">
          <div className="eyebrow"><Sparkles /> The modular ERP for SMEs</div>
          <h1>ERP App Store<br /><em>for SMEs</em></h1>
          <p className="hero-lead">Start with what you need today.<br />Activate additional modules as your business grows.</p>
          <p className="hero-support">Build your business operating system one module at a time.</p>
          <div className="hero-actions"><Link className="button" href="/register">Start Free Trial <ArrowRight /></Link><Link className="button button-outline" href="/#contact"><Play /> Book Demo</Link></div>
          <div className="hero-proof"><span><Check /> Pay only for active modules</span><span><Check /> Add or remove apps anytime</span><span><Check /> One connected workspace</span></div>
        </div>
        <div className="app-store-visual" aria-label="A modular ERP workspace assembled from individual business apps">
          <div className="visual-toolbar"><span><i /> <i /> <i /></span><b>digitalservices / workspace</b><small>LIVE</small></div>
          <div className="visual-canvas">
            <div className="visual-core"><span>DS</span><div><small>YOUR WORKSPACE</small><strong>Business Core</strong></div><em>Active</em></div>
            <div className="visual-module visual-module-crm"><span>01</span><div><small>SALES</small><b>CRM</b></div><em>ON</em></div>
            <div className="visual-module visual-module-stock"><span>02</span><div><small>OPERATIONS</small><b>Inventory</b></div><em>ON</em></div>
            <div className="visual-module visual-module-delivery"><span>03</span><div><small>LOGISTICS</small><b>Delivery</b></div><em>+</em></div>
            <div className="visual-module visual-module-more"><span>+7</span><div><small>APP STORE</small><b>Add modules</b></div><em>+</em></div>
            <svg viewBox="0 0 620 390" aria-hidden="true"><path d="M310 194 C230 194 230 89 153 89"/><path d="M310 194 C390 194 390 89 467 89"/><path d="M310 194 C230 194 230 306 153 306"/><path d="M310 194 C390 194 390 306 467 306"/></svg>
          </div>
          <div className="visual-footer"><span><ShieldCheck /> Tenant isolated</span><span><CircleDollarSign /> £88 / month</span><b>2 of 10 modules active</b></div>
        </div>
      </div>
    </section>

    <HomeMarketplace />

    <section className="section how-it-works"><div className="shell"><div className="section-heading"><div><span className="kicker">How it works</span><h2>From one useful app<br />to a complete ERP.</h2></div><p>There is no big-bang rollout. Start small, prove value quickly, and expand on the same foundation as new needs appear.</p></div><div className="steps-grid">{steps.map(({ number, icon: Icon, title, text }) => <article key={number}><span>{number}</span><Icon /><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>

    <section className="section platform-core"><div className="shell platform-core-grid"><div className="platform-core-copy"><span className="kicker light">The connected core</span><h2>Apps that share the same business context.</h2><p>Unlike a collection of disconnected tools, every Digital Services ERP module runs on one multi-tenant company foundation.</p><Link className="button button-white" href="/platform">Explore the platform <ArrowRight /></Link></div><div className="platform-feature-list">{platformFeatures.map(([title, text], index) => <article key={title}><span>0{index + 1}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div></div></section>

    <section className="section cost-section" id="cost-builder"><div className="shell"><div className="section-heading"><div><span className="kicker">Transparent pricing</span><h2>Build the stack.<br />See the cost.</h2></div><p>Your subscription starts with a secure company workspace. Add modules and seats only when they create measurable value.</p></div><CostBuilder /></div></section>

    <section className="section contact-section" id="contact"><div className="shell contact-grid"><div><span className="kicker light">Book a product walkthrough</span><h2>Show us one broken workflow.</h2><p>We’ll map the smallest useful starting point and demonstrate the modules that solve it—without selling you an oversized system.</p><ul><li><Check /> A focused 30-minute conversation</li><li><Check /> A module recommendation for your operation</li><li><Check /> Clear pricing and rollout options</li></ul></div><ContactForm /></div></section>
  </>
}

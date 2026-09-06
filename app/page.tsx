import Link from 'next/link'
import {
  ArrowRight,
  BadgePoundSterling,
  Check,
  CheckCircle2,
  ChevronRight,
  CircleX,
  Layers3,
  PackageOpen,
  Play,
  ShieldCheck,
  Sparkles,
  Store,
  Truck,
  UsersRound,
  Workflow,
} from 'lucide-react'
import { ContactForm } from '@/components/ContactForm'
import { HomeMarketplace } from '@/components/HomeMarketplace'
import { ErpRoadmap } from '@/components/ErpRoadmap'

const steps = [
  { number: '01', title: 'Create Your Workspace', text: 'Set up your secure company account and invite your team.', icon: Store },
  { number: '02', title: 'Choose Your Modules', text: 'Activate only the business apps you need right now.', icon: Layers3 },
  { number: '03', title: 'Run Your Business', text: 'Connect teams, data and daily workflows in one place.', icon: Workflow },
  { number: '04', title: 'Activate More Modules As You Grow', text: 'Add capabilities instantly without replacing your system.', icon: Sparkles },
]

const pricing = [
  {
    name: 'Core workspace',
    eyebrow: 'SaaS platform',
    price: '£19',
    suffix: '/ month',
    description: 'Your secure company workspace connects every module, user, permission, and shared record.',
    features: ['10 users included', 'One connected data foundation', 'Monthly billing', '14-day free trial'],
  },
  {
    name: 'Business modules',
    eyebrow: 'Choose individually',
    price: 'From £19',
    suffix: '/ module / month',
    description: 'Activate CRM, Inventory, Purchasing, Delivery, Manufacturing, or Customer Portal separately.',
    features: ['Pay only for activated modules', 'Clear starting prices', 'Connected from day one', 'Add modules when needed'],
    featured: true,
  },
  {
    name: 'Scale over time',
    eyebrow: 'Grow at your pace',
    price: 'Monthly',
    suffix: 'activation',
    description: 'Start with one useful workflow and expand your ERP on the same SaaS platform as demand grows.',
    features: ['No all-at-once rollout', 'No unused module bundle', 'Shared users and permissions', 'One monthly platform'],
  },
]

const productFacts = [
  { value: '10', label: 'Business modules available' },
  { value: '£19', label: 'Core workspace per month' },
  { value: '14 days', label: 'Free trial before billing' },
  { value: '1', label: 'Connected SaaS platform' },
]

export default function Home() {
  return <div className="saas-home">
    <section className="saas-hero">
      <div className="saas-hero-grid shell">
        <div className="saas-hero-copy">
          <div className="product-brand"><span aria-hidden="true" /><strong>Digital Services ERP</strong></div>
          <h1>The ERP App Store <span>for SMEs</span></h1>
          <p className="saas-hero-lead">Start with what you need today.<br />Activate additional modules as your business grows.</p>
          <p className="saas-hero-support">Build your business operating system one module at a time.</p>
          <div className="saas-hero-actions">
            <Link className="button" href="/register">Start Free Trial <ArrowRight /></Link>
            <Link className="button button-outline" href="#contact"><Play /> Book Demo</Link>
          </div>
        </div>

        <div className="workspace-preview" aria-label="Digital Services ERP workspace showing individually activated modules">
          <div className="workspace-preview-top">
            <div className="workspace-mark">DS</div>
            <div><span>Digital Services ERP</span><strong>Northstar Workspace</strong></div>
            <span className="workspace-status"><i /> Live</span>
          </div>
          <div className="workspace-preview-body">
            <aside>
              <span className="active"><Layers3 /> Apps</span>
              <span><Workflow /> Activity</span>
              <span><ShieldCheck /> Access</span>
            </aside>
            <div className="workspace-content">
              <div className="workspace-heading"><div><span>YOUR BUSINESS OS</span><h2>Active modules</h2></div><button type="button">+ Add module</button></div>
              <div className="workspace-apps">
                <article className="preview-app preview-crm"><span><UsersRound /></span><div><small>SALES</small><strong>CRM</strong></div><em>Active</em></article>
                <article className="preview-app preview-stock"><span><PackageOpen /></span><div><small>OPERATIONS</small><strong>Inventory</strong></div><em>Active</em></article>
                <article className="preview-app preview-delivery"><span><Truck /></span><div><small>LOGISTICS</small><strong>Delivery</strong></div><em>Activate</em></article>
              </div>
              <div className="workspace-usage"><div><span>MONTHLY PLATFORM</span><strong>£83</strong></div><div><span>ACTIVE APPS</span><strong>2 <small>/ 10</small></strong></div><div><span>TEAM MEMBERS</span><strong>8</strong></div></div>
              <div className="workspace-message"><Sparkles /><span><strong>Grow when you are ready.</strong> Every new module connects to the same customers, products and team.</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <HomeMarketplace />

    <ErpRoadmap compact />

    <section className="product-proof" aria-label="Digital Services ERP product facts">
      <div className="shell product-proof-grid">
        {productFacts.map(fact => <div key={fact.label}><strong>{fact.value}</strong><span>{fact.label}</span></div>)}
      </div>
    </section>

    <section className="saas-section how-section">
      <div className="shell">
        <div className="saas-section-heading">
          <div><span className="kicker">How it works</span><h2>From first module to full ERP.</h2></div>
          <p>No long implementation programme. Start with a useful workflow, prove the value, and expand on the same connected platform.</p>
        </div>
        <div className="activation-steps">
          {steps.map(({ number, title, text, icon: Icon }, index) => <article key={number}>
            <div className="step-index">{number}</div><span className="step-icon"><Icon /></span><h3>{title}</h3><p>{text}</p>{index < steps.length - 1 && <ChevronRight className="step-arrow" />}
          </article>)}
        </div>
      </div>
    </section>

    <section className="saas-section modular-section">
      <div className="shell modular-grid">
        <div className="modular-copy"><span className="kicker light">Why modular ERP</span><h2>Stop buying software you are not ready to use.</h2><p>Traditional ERP bundles every department into one expensive project. Digital Services ERP lets each business build the right system at the right pace.</p><div className="modular-principle"><BadgePoundSterling /><span><strong>One workspace. Flexible cost.</strong> Your monthly price follows the modules and usage your team actually needs.</span></div></div>
        <div className="comparison-card">
          <div className="comparison-column traditional"><span>TRADITIONAL ERP</span><h3>Everything at once</h3><ul><li><CircleX /> Expensive upfront commitment</li><li><CircleX /> Complex implementation</li><li><CircleX /> Pay for every feature</li><li><CircleX /> Difficult to change</li></ul></div>
          <div className="comparison-column modular"><span>DIGITAL SERVICES ERP</span><h3>Exactly what you need</h3><ul><li><CheckCircle2 /> Start small</li><li><CheckCircle2 /> Pay only for needed modules</li><li><CheckCircle2 /> Scale as you grow</li><li><CheckCircle2 /> Activate features instantly</li></ul><Link href="/register">Build your ERP <ArrowRight /></Link></div>
        </div>
      </div>
    </section>

    <section className="saas-section pricing-section" id="pricing">
      <div className="shell">
        <div className="saas-section-heading"><div><span className="kicker">Simple modular pricing</span><h2>One workspace. Only the modules you choose.</h2></div><p>Your monthly total is the £19 core workspace plus the modules you activate. Start small, then add capabilities without changing platforms.</p></div>
        <div className="pricing-grid">{pricing.map(plan => <article className={plan.featured ? 'featured' : ''} key={plan.name}><span className="pricing-eyebrow">{plan.eyebrow}</span><h3>{plan.name}</h3><div className="pricing-price"><strong>{plan.price}</strong><span>{plan.suffix}</span></div><p>{plan.description}</p><ul>{plan.features.map(feature => <li key={feature}><Check /> {feature}</li>)}</ul><Link className={plan.featured ? 'button' : 'button button-outline'} href={plan.featured ? '/marketplace' : '/register'}>{plan.featured ? 'Choose Modules' : 'Start Free Trial'} <ArrowRight /></Link></article>)}</div>
        <p className="pricing-note">Usage-based charges apply only when the included allowance for an activated module is exceeded.</p>
      </div>
    </section>

    <section className="saas-section contact-section" id="contact"><div className="shell contact-grid"><div><span className="kicker light">Book a product walkthrough</span><h2>See your first ERP workspace take shape.</h2><p>Tell us which workflow needs fixing first. We’ll show the smallest useful module setup and how it grows with your operation.</p><ul><li><Check /> A focused 30-minute product demo</li><li><Check /> A practical module recommendation</li><li><Check /> Clear monthly and usage pricing</li></ul></div><ContactForm /></div></section>
  </div>
}

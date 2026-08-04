import { createFileRoute } from '@tanstack/react-router'
import { Blocks, BrainCircuit, CircleCheck, ScanSearch } from 'lucide-react'
import { CallToAction } from '@/components/CallToAction'
import { PageHero } from '@/components/PageHero'
import { createSeo } from '@/lib/seo'

export const Route = createFileRoute('/about')({
  head: () => createSeo('About Our Software Company', 'Digital Services Ltd creates modern software solutions that automate operations, improve visibility and help businesses scale.'),
  component: AboutPage,
})

const values = [
  ['Business before features', ScanSearch, 'We understand the process and desired outcome before deciding what to build.'],
  ['Clarity through design', BrainCircuit, 'Complex systems should still feel focused, intuitive and straightforward to use.'],
  ['Foundations that last', Blocks, 'We choose architecture that supports security, reliability and responsible growth.'],
] as const

function AboutPage() {
  return (
    <main id="main-content">
      <PageHero eyebrow="About Digital Services Ltd" title={<>We build the systems behind <em>better businesses.</em></>} description="We create modern software solutions that automate operations, improve visibility, and help businesses scale." />
      <section className="about-manifesto"><div className="container manifesto-grid"><span>Beyond websites</span><h2>A website presents a business. We build software that <em>runs it.</em></h2><p>Digital Services Ltd focuses on operational technology: the platforms, portals, workflows and dashboards that people rely on to get important work done.</p></div></section>
      <section className="section values-section"><div className="container values-grid">
        {values.map(([title, Icon, copy], index) => <article key={title}><span>0{index + 1}</span><Icon /><h3>{title}</h3><p>{copy}</p></article>)}
      </div></section>
      <section className="section partnership-section"><div className="container partnership-grid"><div><span className="eyebrow light">How we partner</span><h2>Close enough to understand. Experienced enough to challenge.</h2></div><div><p>We work collaboratively with business owners, operational leaders and internal teams. That means listening carefully, asking direct questions and making technical decisions in plain language.</p><ul><li><CircleCheck /> Transparent project communication</li><li><CircleCheck /> Practical recommendations</li><li><CircleCheck /> Measured, iterative delivery</li><li><CircleCheck /> Support beyond launch</li></ul></div></div></section>
      <CallToAction title="Looking for a software partner who understands operations?" />
    </main>
  )
}

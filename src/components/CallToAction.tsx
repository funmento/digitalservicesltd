import { Link } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'

export function CallToAction({
  eyebrow = 'Your next operational advantage',
  title = 'Turn a business bottleneck into better software.',
}: { eyebrow?: string; title?: string }) {
  return (
    <section className="cta-section">
      <div className="container cta-panel">
        <span className="eyebrow light">{eyebrow}</span>
        <h2>{title}</h2>
        <p>Start with a free, no-obligation conversation about your processes, goals and opportunities.</p>
        <Link to="/contact" className="button button-light">Book a free consultation <ArrowRight size={18} /></Link>
      </div>
    </section>
  )
}

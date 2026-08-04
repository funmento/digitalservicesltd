import { createFileRoute } from '@tanstack/react-router'
import { ArrowRight, Check, Clock3, Mail, MessageSquareText } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { createSeo } from '@/lib/seo'

export const Route = createFileRoute('/contact')({
  head: () => createSeo('Contact | Book a Free Consultation', 'Tell Digital Services Ltd about your software, ERP, automation, portal or business application requirements.'),
  component: ContactPage,
})

function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('submitting')
    const form = event.currentTarget
    try {
      const response = await fetch('/__forms.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(
          Array.from(new FormData(form).entries()).map(([key, value]) => [key, String(value)]),
        ).toString(),
      })
      if (!response.ok) throw new Error('Submission failed')
      form.reset()
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <main id="main-content" className="contact-page">
      <section className="contact-shell container">
        <div className="contact-intro">
          <span className="eyebrow light">Start a conversation</span>
          <h1>Tell us what your business needs to do <em>better.</em></h1>
          <p>Share the challenge, bottleneck or idea. We'll help you explore the right software approach—without jargon or obligation.</p>
          <div className="contact-details"><a href="mailto:hello@digitalservicesltd.co.uk"><Mail /> <span><small>Email us</small>hello@digitalservicesltd.co.uk</span></a><div><Clock3 /><span><small>What happens next</small>We review every enquiry personally</span></div><div><MessageSquareText /><span><small>Initial conversation</small>Free and focused on your requirements</span></div></div>
        </div>
        <div className="form-card">
          {status === 'success' ? (
            <div className="form-success" role="status"><span><Check /></span><h2>Thank you.</h2><p>Your requirements are on their way. We'll be in touch to arrange the next conversation.</p><button type="button" className="text-link" onClick={() => setStatus('idle')}>Send another enquiry</button></div>
          ) : (
            <form name="project-enquiry" method="POST" data-netlify="true" netlify-honeypot="bot-field" onSubmit={handleSubmit}>
              <input type="hidden" name="form-name" value="project-enquiry" />
              <p className="hidden-field"><label>Do not fill this out: <input name="bot-field" /></label></p>
              <div className="form-heading"><span>Project enquiry</span><h2>Let's understand your requirements.</h2></div>
              <div className="field-grid">
                <label><span>Name *</span><input name="name" type="text" autoComplete="name" required placeholder="Your name" /></label>
                <label><span>Email *</span><input name="email" type="email" autoComplete="email" required placeholder="you@business.com" /></label>
                <label><span>Business Name</span><input name="business-name" type="text" autoComplete="organization" placeholder="Company or organisation" /></label>
                <label><span>Phone Number</span><input name="phone" type="tel" autoComplete="tel" placeholder="Your contact number" /></label>
                <label className="field-full"><span>Budget Range</span><select name="budget-range" defaultValue=""><option value="" disabled>Select a guide budget</option><option>Under £5,000</option><option>£5,000 – £15,000</option><option>£15,000 – £30,000</option><option>£30,000 – £60,000</option><option>£60,000+</option><option>Not sure yet</option></select></label>
                <label className="field-full"><span>Project Requirements *</span><textarea name="project-requirements" required rows={6} placeholder="What process, system or opportunity would you like to improve?" /></label>
              </div>
              {status === 'error' && <p className="form-error" role="alert">Something went wrong. Please try again or email us directly.</p>}
              <button className="button submit-button" type="submit" disabled={status === 'submitting'}>{status === 'submitting' ? 'Sending…' : 'Submit Enquiry'} <ArrowRight size={18} /></button>
              <p className="form-note">By submitting this form, you agree that we may contact you about your enquiry.</p>
            </form>
          )}
        </div>
      </section>
    </main>
  )
}

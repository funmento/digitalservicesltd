'use client'

import { FormEvent, useState } from 'react'
import { ArrowRight, CheckCircle2 } from 'lucide-react'

export function ContactForm() {
  const [sent, setSent] = useState(false)
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const params = new URLSearchParams()
    new FormData(form).forEach((value, key) => params.append(key, String(value)))
    const response = await fetch('/__forms.html', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: params.toString() })
    if (response.ok) { setSent(true); form.reset() }
  }
  if (sent) return <div className="form-success"><CheckCircle2 /><h3>Thank you. We’ll be in touch.</h3><p>A platform specialist typically responds within one business day.</p></div>
  return <form className="contact-form" name="erp-enquiry" method="POST" data-netlify="true" data-netlify-honeypot="bot-field" onSubmit={submit}><input type="hidden" name="form-name" value="erp-enquiry" /><p className="hidden-field"><label>Do not fill: <input name="bot-field" /></label></p><label>Work email<input type="email" name="email" placeholder="you@company.com" required /></label><label>Company name<input name="company" placeholder="Your organisation" required /></label><label>Team size<select name="team-size" defaultValue=""><option value="" disabled>Select size</option><option>1–20</option><option>21–100</option><option>101–500</option><option>500+</option></select></label><label>What do you need?<textarea name="message" rows={4} placeholder="Tell us about your processes and priorities" /></label><button className="button" type="submit">Talk to sales <ArrowRight /></button></form>
}

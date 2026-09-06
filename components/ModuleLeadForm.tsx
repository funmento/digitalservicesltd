'use client'

import { FormEvent, useState } from 'react'
import { ArrowRight, CheckCircle2 } from 'lucide-react'

type LeadFormProps = {
  type: 'early-access' | 'notify'
  moduleName: string
}

export function ModuleLeadForm({ type, moduleName }: LeadFormProps) {
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const isEarlyAccess = type === 'early-access'
  const formName = isEarlyAccess ? 'erp-early-access' : 'erp-module-notify'

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setState('sending')
    const form = event.currentTarget
    const params = new URLSearchParams()
    new FormData(form).forEach((value, key) => params.append(key, String(value)))

    try {
      const response = await fetch('/__forms.html', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: params.toString() })
      if (!response.ok) throw new Error('Submission failed')
      setState('sent')
      form.reset()
    } catch {
      setState('error')
    }
  }

  if (state === 'sent') return <div className="module-form-success" role="status"><CheckCircle2 /><h3>You’re on the list.</h3><p>We’ve saved your interest in {moduleName} and will share the next relevant product update.</p></div>

  return <form className="module-lead-form" name={formName} method="POST" data-netlify="true" data-netlify-honeypot="bot-field" onSubmit={submit}>
    <input type="hidden" name="form-name" value={formName} />
    <input type="hidden" name="module" value={moduleName} />
    <p className="hidden-field"><label>Do not fill: <input name="bot-field" /></label></p>
    <div className="module-form-heading"><span className="kicker">{isEarlyAccess ? 'Join Early Access' : 'Release Updates'}</span><h2>{isEarlyAccess ? `Help shape ${moduleName}.` : `Know when ${moduleName} opens.`}</h2><p>{isEarlyAccess ? 'Tell us who you are and we’ll review your business for the next early-access cohort.' : 'Leave your details and we’ll contact you when this module is ready for customers.'}</p></div>
    <div className="module-form-fields">
      <label>Name<input name="name" autoComplete="name" required /></label>
      <label>Company<input name="company" autoComplete="organization" required /></label>
      <label>Email<input type="email" name="email" autoComplete="email" required /></label>
      {isEarlyAccess && <label>Interested Module<select name="interested-module" defaultValue={moduleName} required><option>{moduleName}</option></select></label>}
    </div>
    {state === 'error' && <p className="form-error" role="alert">We couldn’t save your details. Please try again.</p>}
    <button className="button" type="submit" disabled={state === 'sending'}>{state === 'sending' ? 'Submitting…' : isEarlyAccess ? 'Join Early Access' : 'Notify Me'} <ArrowRight /></button>
  </form>
}

'use client'

import { FormEvent, useMemo, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ArrowRight, Building2, Check, UsersRound } from 'lucide-react'
import { modules } from './product-data'

export function OnboardingForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const requestedModules = useMemo(() => (searchParams.get('modules') || searchParams.get('module') || 'crm').split(',').filter(id => modules.some(module => module.id === id)), [searchParams])
  const [step, setStep] = useState(1)
  const [companyName, setCompanyName] = useState('')
  const [industry, setIndustry] = useState('')
  const [teamSize, setTeamSize] = useState('11-50')
  const [selected, setSelected] = useState(requestedModules)
  const [error, setError] = useState('')

  async function finish(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    const response = await fetch('/api/onboarding', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ companyName, industry, teamSize, modules: selected }) })
    if (response.ok) router.push('/dashboard')
    else {
      const data = await response.json().catch(() => ({})) as { error?: string }
      setError(data.error || 'Unable to create your workspace.')
    }
  }

  return <form className="onboarding-card" onSubmit={finish}>
    <div className="onboarding-progress"><span className={step >= 1 ? 'done' : ''}>1</span><i /><span className={step >= 2 ? 'done' : ''}>2</span><i /><span className={step >= 3 ? 'done' : ''}>3</span></div>
    {step === 1 && <div className="onboarding-step"><div className="step-icon"><Building2 /></div><span className="kicker">Step 1 of 3</span><h1>Create your company workspace.</h1><p>This becomes your isolated tenant and company subdomain.</p><label>Company name<input value={companyName} onChange={event => setCompanyName(event.target.value)} required placeholder="Northstar Operations Ltd" /></label><label>Industry<select value={industry} onChange={event => setIndustry(event.target.value)} required><option value="" disabled>Select your industry</option><option value="professional_services">Professional services</option><option value="retail">Retail & distribution</option><option value="manufacturing">Manufacturing</option><option value="hospitality">Hospitality</option><option value="construction">Construction</option><option value="logistics">Transport & logistics</option></select></label><label>Team size<select value={teamSize} onChange={event => setTeamSize(event.target.value)} required><option>1-10</option><option>11-50</option><option>51-200</option><option>201-500</option><option>500+</option></select></label><button type="button" className="button" disabled={!companyName.trim() || !industry} onClick={() => setStep(2)}>Continue <ArrowRight /></button></div>}
    {step === 2 && <div className="onboarding-step wide-step"><div className="step-icon"><UsersRound /></div><span className="kicker">Step 2 of 3</span><h1>Choose your starting modules.</h1><p>Start with one or choose a connected set. You can change these at any time.</p><div className="onboarding-modules">{modules.map(({ id, shortName, icon: Icon }) => <button type="button" key={id} className={selected.includes(id) ? 'selected' : ''} onClick={() => setSelected(selected.includes(id) ? selected.filter(item => item !== id) : [...selected, id])}><Icon /><span>{shortName}</span>{selected.includes(id) && <Check />}</button>)}</div><div className="step-actions"><button type="button" className="button button-outline" onClick={() => setStep(1)}>Back</button><button type="button" className="button" disabled={!selected.length} onClick={() => setStep(3)}>Continue <ArrowRight /></button></div></div>}
    {step === 3 && <div className="onboarding-step"><div className="step-icon"><Check /></div><span className="kicker">Step 3 of 3</span><h1>Your workspace is ready to build.</h1><p>We’ll create your secure tenant with {selected.length} starting {selected.length === 1 ? 'module' : 'modules'} and a 14-day platform trial.</p><div className="setup-summary"><span>Company URL <b>{companyName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}.digitalservicesltd.com</b></span><span>Selected modules <b>{selected.length}</b></span><span>Trial period <b>14 days</b></span><span>Payment required <b>No</b></span></div>{error && <p className="auth-error">{error}</p>}<div className="step-actions"><button type="button" className="button button-outline" onClick={() => setStep(2)}>Back</button><button className="button">Create workspace <ArrowRight /></button></div></div>}
  </form>
}

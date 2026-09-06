'use client'

import { FormEvent, useEffect, useState } from 'react'

type Job = { id: string; reference: string; recipientName: string; status: string; scheduledDate: string }
type Address = { line1: string; city: string; postcode: string; country: string }
const emptyAddress: Address = { line1: '', city: '', postcode: '', country: 'United Kingdom' }

export function DeliveryWorkspace() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  async function load() {
    const response = await fetch('/api/delivery/jobs')
    const data = await response.json()
    if (response.ok) setJobs(data.jobs)
    else setError(data.error || 'Unable to load delivery jobs.')
  }
  useEffect(() => { void load() }, [])

  async function createJob(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setSaving(true); setError('')
    const data = new FormData(event.currentTarget)
    const payload = { reference: data.get('reference'), scheduledDate: data.get('scheduledDate'), recipientName: data.get('recipientName'), recipientPhone: data.get('recipientPhone'), address: { line1: data.get('line1'), city: data.get('city'), postcode: data.get('postcode'), country: data.get('country') } }
    const response = await fetch('/api/delivery/jobs', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
    const result = await response.json()
    setSaving(false)
    if (!response.ok) { setError(result.error || 'Unable to create delivery job.'); return }
    event.currentTarget.reset(); await load()
  }

  return <div className="dashboard">
    <div className="dashboard-heading"><div><span>DELIVERY MANAGEMENT</span><h1>Dispatch workspace</h1><p>Create, assign and monitor tenant-scoped delivery jobs.</p></div></div>
    <section className="delivery-workspace-card"><h2>Create delivery job</h2><form onSubmit={createJob} className="delivery-job-form">
      <input name="reference" required placeholder="Reference" />
      <input name="scheduledDate" required type="datetime-local" />
      <input name="recipientName" required placeholder="Recipient name" />
      <input name="recipientPhone" placeholder="Recipient phone" />
      <input name="line1" required placeholder="Address line 1" />
      <input name="city" required placeholder="City" />
      <input name="postcode" required placeholder="Postcode" />
      <input name="country" required defaultValue={emptyAddress.country} />
      <button className="button" disabled={saving}>{saving ? 'Creating…' : 'Create delivery job'}</button>
    </form>{error && <p className="auth-error">{error}</p>}
    </section>
    <section className="delivery-workspace-card"><h2>Scheduled jobs</h2><table><thead><tr><th>Reference</th><th>Recipient</th><th>Scheduled</th><th>Status</th></tr></thead><tbody>{jobs.map(job => <tr key={job.id}><td>{job.reference}</td><td>{job.recipientName}</td><td>{new Date(job.scheduledDate).toLocaleString()}</td><td>{job.status}</td></tr>)}{!jobs.length && <tr><td colSpan={4}>No delivery jobs yet.</td></tr>}</tbody></table></section>
  </div>
}
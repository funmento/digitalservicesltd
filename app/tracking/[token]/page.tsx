'use client'

import { useEffect, useState } from 'react'

type Tracking = { job?: { reference: string; status: string; scheduledDate: string; completedAt?: string | null }; stops?: { sequence: number; status: string; completedAt?: string | null }[]; error?: string }

export default function TrackingPage({ params }: { params: { token: string } }) {
  const [tracking, setTracking] = useState<Tracking | null>(null)
  useEffect(() => { fetch('/api/delivery/tracking?token=' + encodeURIComponent(params.token)).then(async response => setTracking(await response.json())).catch(() => setTracking({ error: 'Tracking is unavailable.' })) }, [params.token])
  if (!tracking) return <main className="page-wrap"><p>Loading delivery status…</p></main>
  if (tracking.error || !tracking.job) return <main className="page-wrap"><p>{tracking.error || 'Tracking link is unavailable.'}</p></main>
  return <main className="page-wrap"><section className="page-hero centered"><div className="shell"><span className="kicker">Delivery tracking</span><h1>Delivery {tracking.job.reference}</h1><p>Status: {tracking.job.status.replaceAll('_', ' ')}</p><p>Scheduled: {new Date(tracking.job.scheduledDate).toLocaleString()}</p>{tracking.stops?.map(stop => <p key={stop.sequence}>Stop {stop.sequence}: {stop.status.replaceAll('_', ' ')}</p>)}</div></section></main>
}
import { notFound } from 'next/navigation'

export const metadata = { title: 'Delivery tracking' }

export default async function TrackingPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params
  if (!token || token.length < 20) notFound()
  return <main className="page-wrap"><section className="page-hero centered"><div className="shell"><span className="kicker">Delivery tracking</span><h1>Your delivery status</h1><p>This secure link is ready for the customer tracking experience. The public API exposes only a delivery reference, status, schedule and stop completion state.</p></div></section></main>
}
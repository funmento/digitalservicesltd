import { notFound } from 'next/navigation'
import { TrackingWorkspace } from '@/components/delivery/TrackingWorkspace'

export const metadata = { title: 'Delivery tracking' }

export default async function TrackingPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params
  if (!token || token.length < 20) notFound()
  return <TrackingWorkspace token={token} />
}

import { RoutePlaceholder } from '@/components/RoutePlaceholder'

export const metadata = { title: 'Demos' }

export default function DemosPage() {
  return <RoutePlaceholder kicker="Explore interactive demos" title="See the work. Not just the promise." description="Explore how each module turns everyday operational data into a clear next action." primaryHref="/#demos" primaryLabel="Explore Demos" secondaryHref="/register" secondaryLabel="Start Free Trial" />
}

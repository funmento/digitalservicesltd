import { RoutePlaceholder } from '@/components/RoutePlaceholder'

export const metadata = { title: 'Platform' }

export default function PlatformPage() {
  return <RoutePlaceholder kicker="Platform architecture" title="One core. Every module connected." description="The core platform provides your secure tenant, users, permissions, analytics, automation and subscription controls. You only pay for the business modules you activate." primaryHref="/modules" primaryLabel="Explore Modules" secondaryHref="/#cost-builder" secondaryLabel="Calculate My Cost" />
}

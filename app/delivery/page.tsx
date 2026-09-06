import { AppShell } from '@/components/AppShell'
import { DeliveryWorkspace } from '@/components/delivery/DeliveryWorkspace'
import { ProtectedPage } from '@/components/ProtectedPage'

export const metadata = { title: 'Delivery Management' }

export default function DeliveryPage() {
  return <ProtectedPage><AppShell section="Delivery Management"><DeliveryWorkspace /></AppShell></ProtectedPage>
}
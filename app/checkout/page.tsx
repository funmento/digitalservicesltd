import { Suspense } from 'react'
import { CheckoutPanel } from '@/components/CheckoutPanel'
import { ProtectedPage } from '@/components/ProtectedPage'
export const metadata={title:'Activate modules'}
export default function CheckoutPage(){return <ProtectedPage><div className="page-wrap checkout-page"><div className="shell"><Suspense fallback={<p>Loading order…</p>}><CheckoutPanel/></Suspense></div></div></ProtectedPage>}

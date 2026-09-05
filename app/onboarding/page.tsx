import { Suspense } from 'react'
import { OnboardingForm } from '@/components/OnboardingForm'
import { ProtectedPage } from '@/components/ProtectedPage'
export const metadata={title:'Create workspace'}
export default function OnboardingPage(){return <ProtectedPage><div className="onboarding-page"><Suspense fallback={<p>Loading workspace setup…</p>}><OnboardingForm/></Suspense></div></ProtectedPage>}

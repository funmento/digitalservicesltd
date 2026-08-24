import { OnboardingForm } from '@/components/OnboardingForm'
import { ProtectedPage } from '@/components/ProtectedPage'
export const metadata={title:'Create workspace'}
export default function OnboardingPage(){return <ProtectedPage><div className="onboarding-page"><OnboardingForm/></div></ProtectedPage>}

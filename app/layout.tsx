import type { Metadata } from 'next'
import { Manrope, Space_Grotesk } from 'next/font/google'
import { SiteChrome } from '@/components/SiteChrome'
import './globals.css'

const manrope = Manrope({ subsets: ['latin'], variable: '--font-body' })
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-display' })

export const metadata: Metadata = {
  title: { default: 'Digital Services ERP | ERP App Store for SMEs', template: '%s | Digital Services ERP' },
  description: 'Start with one ERP module and activate CRM, inventory, purchasing, delivery, manufacturing, accounting, HR, and more as your business grows.',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${manrope.variable} ${spaceGrotesk.variable}`}><SiteChrome>{children}</SiteChrome></body></html>
}

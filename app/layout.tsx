import type { Metadata } from 'next'
import { Manrope, Space_Grotesk } from 'next/font/google'
import { SiteChrome } from '@/components/SiteChrome'
import './globals.css'

const manrope = Manrope({ subsets: ['latin'], variable: '--font-body' })
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-display' })

export const metadata: Metadata = {
  title: { default: 'Digital Services ERP | One platform. Every operation.', template: '%s | Digital Services ERP' },
  description: 'A modular SaaS ERP for CRM, people, payroll, inventory, projects, service, fleet, hospitality, and healthcare operations.',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${manrope.variable} ${spaceGrotesk.variable}`}><SiteChrome>{children}</SiteChrome></body></html>
}

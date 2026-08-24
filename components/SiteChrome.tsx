'use client'

import { usePathname } from 'next/navigation'
import { SiteFooter } from './SiteFooter'
import { SiteHeader } from './SiteHeader'

const productRoutes = ['/dashboard', '/admin']

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const productView = productRoutes.some(route => pathname.startsWith(route))
  if (productView) return <main>{children}</main>
  return <><SiteHeader /><main>{children}</main><SiteFooter /></>
}

import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import { SiteFooter } from '@/components/SiteFooter'
import { SiteHeader } from '@/components/SiteHeader'
import '../styles.css'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'Digital Services Ltd | Custom Software & ERP Systems',
      },
      {
        name: 'description',
        content:
          'Digital Services Ltd builds custom software, ERP systems, automation platforms, customer portals and business applications.',
      },
      {
        name: 'theme-color',
        content: '#ffffff',
      },
      {
        property: 'og:site_name',
        content: 'Digital Services Ltd',
      },
      {
        property: 'og:type',
        content: 'website',
      },
    ],
    links: [
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Manrope:wght@500;600;700;800&display=swap',
      },
      { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'ProfessionalService',
              name: 'Digital Services Ltd',
              description: 'Custom software, ERP systems and business applications.',
              email: 'hello@digitalservicesltd.co.uk',
              areaServed: 'United Kingdom',
              serviceType: [
                'Custom Software Development',
                'ERP Systems',
                'Business Automation',
                'Customer Portals',
              ],
            }),
          }}
        />
      </head>
      <body>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <SiteHeader />
        {children}
        <SiteFooter />
        <Scripts />
      </body>
    </html>
  )
}

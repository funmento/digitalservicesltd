import type { ReactNode } from 'react'

export function PageHero({ eyebrow, title, description, children }: {
  eyebrow: string
  title: ReactNode
  description: string
  children?: ReactNode
}) {
  return (
    <section className="page-hero">
      <div className="container page-hero-grid">
        <div>
          <span className="eyebrow">{eyebrow}</span>
          <h1>{title}</h1>
        </div>
        <div className="page-hero-copy">
          <p>{description}</p>
          {children}
        </div>
      </div>
    </section>
  )
}

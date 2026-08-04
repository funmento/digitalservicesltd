# Digital Services Ltd Website

A premium, multi-page marketing website for Digital Services Ltd, focused on custom software development, ERP systems, business automation, customer portals, dashboards and operational applications.

## Technology

- TanStack Start and TanStack Router
- React 19 and TypeScript
- Tailwind CSS 4 with a custom global design system
- Lucide icons
- Netlify Forms for project enquiries
- Netlify deployment configuration

## Pages

- Home
- Services
- Solutions
- Portfolio
- Case Studies
- About
- Contact

## Local Development

```bash
pnpm install
pnpm dev
```

The site is available at `http://localhost:3000` when running the Vite development server. Netlify-specific behavior can be tested with Netlify Dev when required.

## Project Structure

- `src/routes/` contains file-based page routes and page-specific SEO metadata.
- `src/components/` contains the shared header, footer, page hero, CTA and dashboard visual.
- `src/lib/seo.ts` provides reusable metadata generation.
- `src/styles.css` contains design tokens, layouts, responsive rules and interaction states.
- `public/__forms.html` registers the contact form with Netlify at build time.
- `public/robots.txt` and `public/sitemap.xml` support search discovery.

## Netlify Forms

The contact form is registered as `project-enquiry`. Its React fields and the static detection form in `public/__forms.html` must remain in sync. Submissions use an AJAX POST to `/__forms.html` and include honeypot spam protection.

## Deployment

`netlify.toml` configures the production build output for Netlify. Use deploy previews for review and avoid publishing to production until content, contact details and the final domain have been approved.

## Before Production Launch

- Confirm the public contact email address.
- Replace the temporary Netlify URL in `public/sitemap.xml` and `public/robots.txt` with the final domain.
- Add approved project screenshots and client permissions.
- Add privacy and cookie policies if required.

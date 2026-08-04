# Digital Services Ltd Website

## Architecture

This project is a TanStack Start marketing site deployed on Netlify. React routes render the seven public pages, while shared shell components provide global navigation, calls to action and the footer. The site intentionally uses code-generated interface visuals instead of large image assets to keep page weight low and make future content changes straightforward.

## Key Directories

- `src/routes/` — file-based routes. Every public page defines its own SEO title and description with `createSeo`.
- `src/components/` — shared structural and visual components.
- `src/lib/seo.ts` — reusable Open Graph, Twitter and standard metadata helper.
- `src/styles.css` — the complete design system, layout rules, responsive breakpoints and accessibility states.
- `public/` — static form registration, favicon, robots file and sitemap.

## Routes

- `/` — homepage and services overview
- `/services` — detailed software services
- `/solutions` — industry-specific solutions
- `/portfolio` — extensible project showcase
- `/case-studies` — Delife Kitchen featured case study
- `/about` — company positioning and principles
- `/contact` — Netlify Forms project enquiry

## Conventions

- Use TypeScript and functional React components.
- Use PascalCase for components and kebab-case for route filenames.
- Keep repeated site structures in `src/components/` rather than duplicating markup.
- Use semantic HTML, visible focus states and descriptive link or button labels.
- Use the existing CSS variables before introducing new colours or spacing conventions.
- Animate only `transform` and `opacity`, and preserve the reduced-motion media query.
- Do not add stock imagery unless it is optimised and meaningfully improves a case study.

## Netlify Forms

The `project-enquiry` form is implemented in `src/routes/contact.tsx` and registered for build-time detection in `public/__forms.html`. Field names must match in both locations. Keep the hidden `form-name`, honeypot field and AJAX submission target unchanged unless the form is deliberately renamed.

## Future Expansion

Add new marketing pages as routes under `src/routes/`. Blog or knowledge-base content should use a content collection rather than hard-coded route data. Add case studies as dedicated routes when enough approved content is available, and convert the portfolio card data into a shared typed content source when project volume grows.

## Non-Obvious Decisions

- The portfolio mockups are CSS-rendered to avoid unapproved or fabricated client screenshots.
- The sitemap currently uses the assigned Netlify project URL and must be updated when a final custom domain is approved.
- No database is required because the only persistent input is handled by Netlify Forms.

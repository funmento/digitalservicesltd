# Digital Services ERP

A SaaS ERP platform built with Next.js, TypeScript, Tailwind CSS, Netlify Identity, Netlify Functions, Stripe, and Netlify Database with Drizzle ORM.

## Local development

Run `netlify dev --port 8889` to develop with Identity, Functions, Forms, and Database emulation available.

## Environment

Stripe checkout requires `STRIPE_SECRET_KEY` and `STRIPE_WEBHOOK_SECRET` in the Netlify environment. Register `/api/stripe-webhook` as the Stripe webhook endpoint.

## Database

The schema is defined in `db/schema.ts`. Netlify applies migrations from `netlify/database/migrations` during deployment.

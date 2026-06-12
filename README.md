# luckyjeagun.com

My personal portfolio — software development, data analytics, and applied AI/ML work.

**Live:** [luckyjeagun.com](https://luckyjeagun.com)

## How it's built

I built this as a multi-page Next.js 16 (App Router) site in TypeScript, styled with Tailwind CSS v4 and animated with Motion. Theming is dark/light and system-aware via next-themes, and the design leans glassmorphism/neon with an animated background and 3D flip cards.

Each project has its own statically generated case-study page, and blog posts are generated the same way from structured content — adding a post is just adding data, no new wiring. The Data Lab page renders interactive charts and KPIs. The contact form submits to Formspree over AJAX with a honeypot to filter bots. Open Graph and Twitter share images are generated at build time, along with the sitemap, robots and web manifest, and the whole site calms down for visitors with `prefers-reduced-motion` set.

## Running it

```bash
npm install
npm run dev      # http://localhost:3000
```

## Deploying

I host this on Cloudflare Workers through the OpenNext adapter. Pushing to `main` deploys automatically via Workers Builds; `npm run deploy` also works from a Linux shell (the OpenNext bundler currently mangles Windows paths, so I let the CI build handle it). Analytics come from Cloudflare Web Analytics.

---

© Lucky Jeagun Daniel

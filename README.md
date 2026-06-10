# luckyjeagun.com

My personal portfolio — software development, data analytics, and applied AI/ML work.

**Live:** [luckyjeagun.com](https://luckyjeagun.com)

## Features

- Multi-page site with routed case studies for each project
- Glassmorphism/neon design with an animated background and 3D flip cards
- Dark/light theming (system-aware, with manual toggle)
- Data Lab page with interactive charts and KPIs
- Blog with statically generated post pages
- Contact form (Formspree, AJAX submit with honeypot spam filtering)
- SEO: generated Open Graph images, sitemap, robots, web manifest
- Respects `prefers-reduced-motion` for a calmer experience

## Tech stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Motion · next-themes

Deployed on Cloudflare Workers via the OpenNext adapter, with Cloudflare Web Analytics.

## Development

```bash
npm install
npm run dev      # http://localhost:3000
```

## Deployment

```bash
npm run preview  # local preview of the Workers build
npm run deploy   # build + deploy to Cloudflare Workers
```

Pushes to `main` also deploy automatically via Cloudflare Workers Builds.

---

© Lucky Jeagun Daniel

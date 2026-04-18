# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Dev server at localhost:4321
npm run build        # Production build to ./dist/
npm run preview      # Preview built site locally
npm test             # Run Vitest unit tests
npm run test:watch   # Vitest in watch mode
npm run test:e2e     # Playwright E2E tests (headless, port 4322)
npm run test:e2e:headed   # E2E with browser visible
npm run test:e2e:debug    # Debug E2E tests
```

Run a single Vitest test file:
```bash
npx vitest run src/utils/__tests__/category.test.ts
```

## Architecture

**Astro 5 static blog** — Spanish-language tech/AI blog deployed to GitHub Pages at `jesusprodriguezUnir.github.io/blogprogramacion/`.

### Routing

File-based routing under `src/pages/`. Key patterns:
- `src/pages/posts/*.md` — each Markdown file is a blog post, served at `/posts/<filename>`
- `src/pages/posts/[slug].astro` — dynamic post detail page; reads all `.md`/`.mdx` via `import.meta.glob()`
- `src/pages/posts/index.astro` — posts listing; also uses `import.meta.glob()`
- `src/pages/skills/[slug].astro` and `src/pages/prompts/[slug].astro` — dynamic detail pages for the prompts/skills library

### Content (Blog Posts)

Posts live in `src/pages/posts/` as Markdown with frontmatter:
```yaml
---
title: "..."
excerpt: "..."
date: "YYYY-MM-DD"
category: "IA" | "Desarrollo" | "Tendencias"
slug: "post-slug"
readTime: "X min"
author: "Jesús P."
ogImage: "/assets/image.svg"
tags: ["tag1", "tag2"]
layout: "../../layouts/BlogLayout.astro"
---
```

### Layouts & Components

- `src/layouts/Layout.astro` — base HTML shell
- `src/layouts/BlogLayout.astro` — adds header, nav, and footer; used by all blog posts via frontmatter `layout`
- `src/components/` — reusable Astro components (Hero, PostCard, etc.)
- `src/utils/category.ts` — maps category names to CSS color classes
- `src/utils/url.ts` — URL normalization for the dynamic base path

### Base Path

`astro.config.mjs` sets `base: '/'` in dev and `base: '/blogprogramacion/'` in production (detected via `import.meta.env.DEV`, `ASTRO_DEV` env var, or `NODE_ENV`). Use the `url.ts` utility when constructing internal links.

### Testing

- **Vitest** (jsdom): unit tests for utilities and components in `src/**/__tests__/`
- **Playwright**: E2E tests in `tests/e2e/`; runs on port **4322** (not 4321) to avoid dev server collision — the web server starts automatically via `playwright.config.ts`

### Deployment

GitHub Actions (`deploy.yml`) builds the site, adds `.nojekyll`, and deploys to GitHub Pages. CI (`ci.yml`) runs Vitest on push/PR to `main`.

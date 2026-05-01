# AGENTS.md

## Commands

```sh
npm run dev        # Dev server at localhost:4321
npm run build      # Build to ./dist/
npm run preview    # Preview built site locally
npm test           # Vitest unit tests
npm run test:watch # Vitest in watch mode
npm run test:e2e   # Playwright E2E tests (port 4322)
npm run test:e2e:headed  # E2E with visible browser
```

Run a single test: `npx vitest run src/utils/__tests__/category.test.ts`

## Non-obvious quirks

- **Playwright port**: Uses 4322 (not 4321). Configured in `playwright.config.ts:17-18`. Auto-starts dev server.
- **Base path**: Dev uses `/`, production uses `/blogprogramacion/`. Detected via `import.meta.env.DEV`, `ASTRO_DEV`, or `NODE_ENV`. See `astro.config.mjs:26`.

## Project structure

- Blog posts: `src/pages/posts/*.md|mdx`
- Post metadata: `src/data/posts.js`
- E2E tests: `tests/e2e/*.spec.ts`
- Unit tests: `src/**/__tests__/*.test.ts`
- URL utility: `src/utils/url.ts` (use for internal links)

## Architecture

- **Astro 5** static blog (Spanish tech/AI)
- File-based routing in `src/pages/`
- Use `url.ts` for links that must work in both dev and production

## Testing

- Unit tests: Vitest with jsdom environment
- E2E: Playwright auto-starts dev server; base URL via `PLAYWRIGHT_BASE_URL` env var

## CI

- Node 18, runs `npm test` on push/PR to main
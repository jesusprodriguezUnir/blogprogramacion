# AGENTS.md

## Commands

```sh
npm run dev      # Dev server at localhost:4321
npm run build   # Build to ./dist/
npm run test    # Vitest unit tests
npm run test:e2e  # Playwright E2E tests
```

## Non-obvious quirks

- **Playwright port**: Uses port 4322 (not 4321). It auto-starts dev server on 4322 to avoid port collisions. configured in `playwright.config.ts:17-18`.
- **GitHub Pages base path**: Production uses `/blogprogramacion/`, dev uses `/`. See `astro.config.mjs:26`.

## Project structure

- Blog posts: `src/pages/posts/*.md|mdx`
- Post metadata: `src/data/posts.js`
- E2E tests: `tests/e2e/*.spec.ts`
- Unit tests: `src/**/__tests__/*.test.ts`

## Testing

- Unit tests use jsdom via Vitest
- E2E tests auto-start dev server; base URL configurable via `PLAYWRIGHT_BASE_URL` env var
- Run headed E2E: `npm run test:e2e:headed`
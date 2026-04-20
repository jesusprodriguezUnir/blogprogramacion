# Test Coverage Documentation

## Overview

This document provides an overview of the test coverage for the blogprogramacion project, including both unit tests and end-to-end (e2e) tests.

## Running Tests

### Unit Tests

Run all unit tests with Vitest:

```bash
npm run test
```

Run tests in watch mode:

```bash
npm run test:watch
```

### E2E Tests

Run all e2e tests with Playwright:

```bash
npm run test:e2e
```

Run e2e tests in headed mode (with browser UI):

```bash
npm run test:e2e:headed
```

Run e2e tests in debug mode:

```bash
npm run test:e2e:debug
```

## Unit Test Coverage

### Utilities (`src/utils/`)

#### `url.test.ts` - 12 tests
Tests for URL utility functions:
- `normalizeBase()`: Handles various base URL formats, trailing slashes, undefined values
- `postHref()`: Builds correct post URLs with different base configurations

#### `category.test.ts` - 7 tests
Tests for category color mapping:
- `getCategoryColor()`: Returns correct colors for all categories, handles case-insensitivity
- `categoryColors`: Validates color mapping structure and Tailwind CSS naming conventions

### Data (`src/data/`)

#### `posts.test.js` - 9 tests
Tests for static post data:
- Validates post data structure and required fields
- Checks data types for all post properties
- Validates URL-friendly slugs
- Ensures valid date formats (YYYY-MM-DD)
- Verifies non-empty tags, titles, and descriptions

### Components (`src/components/`)

#### `PostCard.test.ts` - 6 tests
Tests for PostCard component rendering:
- Read more link generation and href correctness
- Post title link rendering
- Category tag with correct colors
- Metadata display (date, read time)
- Post excerpt rendering
- Complete card structure validation

### Pages (`src/pages/posts/`)

#### `blogList.test.ts` - 3 tests
Tests for blog post file listing:
- Verifies at least one post exists
- Checks for specific posts (made-by-google-2025-resumen, notebook-lm)

**Total Unit Tests: 37 passing**

## E2E Test Coverage

### Core Pages

#### `home.spec.ts`
- Home page loads with hero section and navigation
- Navigation to posts page works correctly

#### `posts-list.spec.ts`
- Posts list page displays correctly
- Post cards are present and link to individual posts

#### `post-page.spec.ts`
- Individual post pages load with title and content
- Tests multiple post slugs for consistency

#### `prompts.spec.ts`
- Prompts page loads with correct title
- Resources section is visible
- CTA banner with contact email is present

#### `enlaces.spec.ts`
- Enlaces (links) page displays correctly
- Astro documentation link is present and correct

#### `sobre-mi.spec.ts` (NEW)
- About page loads with all content elements
- Personal blog link works correctly with proper attributes
- Page is accessible from navigation
- Proper page structure with all sections

### Specific Features

#### `notebook-lm.spec.ts`
- Post appears on home page
- Post page loads correctly
- Post appears in posts list

#### `made-by-google.spec.ts`
- Featured post appears on home
- YouTube embed is present with correct video ID

### Navigation & Accessibility

#### `navigation.spec.ts` (NEW)
- Complete navigation flow between all main pages
- Consistent navigation menu across all pages
- Individual post navigation and back button functionality
- Footer links present
- Featured posts to post page navigation

#### `accessibility.spec.ts` (NEW)
- Proper semantic HTML structure
- Keyboard navigation support
- Responsive design on mobile (375x667) and tablet (768x1024) viewports
- Images have alt text
- Links have meaningful text
- Form inputs have labels (if present)
- Proper meta tags for SEO and viewport
- External links open in new tab with security attributes

**Total E2E Test Files: 10**
**Total E2E Tests: ~50 tests across 3 browsers (chromium, firefox, webkit)**

## Test Configuration

### Vitest Configuration (`vitest.config.ts`)

- Environment: jsdom
- Excludes: E2E tests from unit test runs
- Test files: `**/__tests__/**/*.{test,spec}.{js,ts}`

### Playwright Configuration (`playwright.config.ts`)

- Test directory: `./tests/e2e`
- Timeout: 60 seconds per test
- Retries: 1
- Browsers: Chromium, Firefox, WebKit
- Web Server: Automatically starts on port 4322
- Base URL: http://localhost:4322

## Coverage Summary

| Category | Files | Tests | Status |
|----------|-------|-------|--------|
| Utils | 2 | 19 | ✅ Passing |
| Data | 1 | 9 | ✅ Passing |
| Components | 1 | 6 | ✅ Passing |
| Pages | 1 | 3 | ✅ Passing |
| **Unit Total** | **5** | **37** | **✅ All Passing** |
| E2E Pages | 10 | ~50 | ✅ Written |
| **Total** | **15** | **~87** | **✅** |

## Test Quality Features

### Unit Tests
- ✅ Edge case testing
- ✅ Type validation
- ✅ Data structure validation
- ✅ Integration testing (component + utilities)
- ✅ Isolated test cases with setup/teardown

### E2E Tests
- ✅ User flow testing
- ✅ Cross-browser compatibility
- ✅ Responsive design validation
- ✅ Accessibility testing
- ✅ Navigation testing
- ✅ Content verification
- ✅ Link and attribute validation

## Continuous Improvement

### Recommendations for Future Enhancement

1. **Coverage Reporting**: Add code coverage tools (e.g., c8, istanbul)
2. **Visual Regression**: Consider adding visual regression testing
3. **Performance Testing**: Add performance benchmarks for page loads
4. **API Testing**: If backend APIs are added, include API tests
5. **Component Library**: As components grow, add Storybook for visual testing

## Maintenance

- Run unit tests before every commit
- Run e2e tests before merging to main
- Update tests when adding new features
- Keep test data synchronized with production data structure

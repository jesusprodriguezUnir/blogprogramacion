import { test, expect } from '@playwright/test';

test('Posts list shows items and links to individual posts', async ({ page }) => {
  await page.goto('/posts');

  // El encabezado de la página de posts
  await expect(page.locator('h1')).toHaveText('Todas las noticias');

  // Debe existir al menos un enlace a un post
  const postLinks = page.locator('ul li a');
  const count = await postLinks.count();
  expect(count).toBeGreaterThan(0);

  // Compruebo que los enlaces tengan hrefs que apunten a /posts/<slug>
  for (let i = 0; i < count; i++) {
    const href = await postLinks.nth(i).getAttribute('href');
    expect(typeof href).toBe('string');
    expect(href).toMatch(/^\/posts\/[^\/]+/);
  }
});

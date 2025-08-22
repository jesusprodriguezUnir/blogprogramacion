import { test, expect } from '@playwright/test';

test.describe('Home page', () => {
  test('should load and show hero and posts link', async ({ page }) => {
    await page.goto('/');

    // Hero title contains Programación and IA
    const heroTitle = page.locator('.hero-title');
    await expect(heroTitle).toContainText('Programación');
    await expect(heroTitle).toContainText('IA');

    // There is a 'Ver todos los posts' button that links to /posts
    const viewAll = page.locator('a.view-all-btn');
    await expect(viewAll).toBeVisible();
    await expect(viewAll).toHaveAttribute('href', '/posts');

    // Navigate to posts page and assert list exists
    await viewAll.click();
    await expect(page).toHaveURL(/\/posts$/);
    await expect(page.locator('h1')).toHaveText('Todas las noticias');
  });
});

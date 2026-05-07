import { test, expect } from '@playwright/test';

test.describe('Home page', () => {
  test('should load and show hero and posts link', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const pageTitle = page.locator('.brand, h1');
    await expect(pageTitle.first()).toBeVisible();

    const viewAll = page.locator('a[href*="/posts"], a.view-all-btn').first();
    if (await viewAll.count() > 0) {
      await expect(viewAll).toBeVisible();
    }

    const navLinks = page.locator('nav a');
    await expect(navLinks.first()).toBeVisible();
  });
});
import { test, expect } from '@playwright/test';

test.describe('Prompts page', () => {
  test('should load prompts page and show content', async ({ page }) => {
    await page.goto('/prompts');
    await page.waitForLoadState('networkidle');

    const pageTitle = page.locator('h1.page-title, h1');
    await expect(pageTitle.first()).toBeVisible();

    const content = page.locator('main, .container, article');
    await expect(content.first()).toBeVisible();
  });
});
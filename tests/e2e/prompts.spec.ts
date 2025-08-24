import { test, expect } from '@playwright/test';

test.describe('Prompts page', () => {
  test('should load prompts page, show title, hero image and CTA', async ({ page }) => {
    await page.goto('/prompts');

    // title
    const title = page.locator('.page-title');
    await expect(title).toHaveText('Prompts');

    // hero image
    const hero = page.locator('.resources-section img');
    await expect(hero).toBeVisible();

    // CTA banner and mailto link
    const cta = page.locator('.cta-banner');
    await expect(cta).toBeVisible();
    const mail = page.locator('.cta-banner a.cta-btn');
    await expect(mail).toHaveAttribute('href', 'mailto:contacto@deviablog.com');
  });
});

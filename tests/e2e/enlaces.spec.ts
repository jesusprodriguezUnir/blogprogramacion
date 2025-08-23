import { test, expect } from '@playwright/test';

test.describe('Enlaces page', () => {
  test('debe mostrar el enlace a la documentación de Astro', async ({ page }) => {
    await page.goto('/enlaces');

    // Localiza el enlace por el título dentro de .link-title
    const astroDocLink = page.locator('a.link-card:has(.link-title:has-text("Astro — Documentación"))');

    await expect(astroDocLink).toBeVisible();
    await expect(astroDocLink).toHaveAttribute('href', 'https://docs.astro.build/en/getting-started/');
  });
});

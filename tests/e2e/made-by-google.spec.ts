import { test, expect } from '@playwright/test';

test.describe('Made By Google post and video embed', () => {
  test('Featured post appears on home and links to post page', async ({ page }) => {
    await page.goto('/');

    // Encontrar enlace al post por texto del título
    const postLink = page.getByRole('link', { name: /Made By Google 2025 — Resumen y novedades clave/i });
    await expect(postLink).toBeVisible();

    await postLink.click();
    await expect(page).toHaveURL(/\/posts\/made-by-google-2025-resumen$/);
  });

  test('Post page contains YouTube embed with correct video id', async ({ page }) => {
    await page.goto('/posts/made-by-google-2025-resumen');

    const iframe = page.locator('iframe[src*="JXCXTQIIvM0"]');
    await expect(iframe).toBeVisible();

    // Compruebo que el atributo src contiene el embed de YouTube
    const src = await iframe.getAttribute('src');
    expect(src).toContain('JXCXTQIIvM0');
  });
});

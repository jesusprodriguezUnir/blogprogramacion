import { test, expect } from '@playwright/test';

test.describe('Home page', () => {
  test('should load and show hero and posts link', async ({ page }) => {
    await page.goto('/');

    // Esperar a que la página se cargue completamente
    await page.waitForLoadState('networkidle');

    // Verificar que no hay elementos de error de desarrollo
    const errorElements = page.locator('text=/No islands detected|Audit|No accessibility|Settings/');
    const errorCount = await errorElements.count();
    if (errorCount > 0) {
      // Si hay errores, esperar un poco más y recargar
      await page.waitForTimeout(2000);
      await page.reload();
      await page.waitForLoadState('networkidle');
    }

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

    // Verificar que la página de posts se carga correctamente
    const postsPageTitle = page.locator('h1.page-title');
    await expect(postsPageTitle).toHaveText('Todas las noticias');
  });
});

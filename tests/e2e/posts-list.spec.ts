import { test, expect } from '@playwright/test';

test('Posts list shows items and links to individual posts', async ({ page }) => {
  await page.goto('/posts');

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

  // El encabezado de la página de posts
  const pageTitle = page.locator('h1.page-title');
  await expect(pageTitle).toHaveText('Todas las noticias');

  // Debe existir al menos un enlace a un post (usando la clase link-card)
  const postLinks = page.locator('.link-card');
  const count = await postLinks.count();
  expect(count).toBeGreaterThan(0);

  // Compruebo que los enlaces tengan hrefs que apunten a /posts/<slug>
  for (let i = 0; i < Math.min(count, 3); i++) { // Solo verificar los primeros 3 para no ser demasiado lento
    const href = await postLinks.nth(i).getAttribute('href');
    expect(typeof href).toBe('string');
    expect(href).toMatch(/^\/posts\/[^\/]+/);
  }
});

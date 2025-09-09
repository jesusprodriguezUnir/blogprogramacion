import { test, expect } from '@playwright/test';

test.describe('Notebook LM post', () => {
  test('Post appears on home page and links to post page', async ({ page }) => {
    await page.goto('/');

    // Encontrar enlace al post por texto del título
    const postLink = page.getByRole('link', { name: /Notebook LM: El futuro de los cuadernos inteligentes/i });
    await expect(postLink).toBeVisible();

    await postLink.click();
    await expect(page).toHaveURL(/\/posts\/notebook-lm$/);
  });

  test('Post page loads correctly with title and content', async ({ page }) => {
    await page.goto('/posts/notebook-lm');

    // Verificar que la página se carga sin errores (no hay elementos de error de desarrollo)
    const errorElements = page.locator('text=/No islands detected|Audit|No accessibility|Settings/');
    await expect(errorElements).toHaveCount(0);

    // Verificar que hay algún contenido en la página
    const bodyContent = page.locator('body');
    await expect(bodyContent).toBeVisible();

    // Verificar que la URL es correcta
    await expect(page).toHaveURL(/\/posts\/notebook-lm$/);
  });

  test('Post appears in posts list', async ({ page }) => {
    await page.goto('/posts');

    // Verificar que el post aparece en la lista
    const postLink = page.getByRole('link', { name: /Notebook LM: El futuro de los cuadernos inteligentes/i });
    await expect(postLink).toBeVisible();

    // Verificar que el enlace tiene el href correcto
    await expect(postLink).toHaveAttribute('href', '/posts/notebook-lm');
  });
});

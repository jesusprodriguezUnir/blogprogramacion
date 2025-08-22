import { test, expect } from '@playwright/test';

const slugs = [
  'resumen-lanzamiento-gpt-5-openai-agosto-2025',
  'como-ia-redefiniendo-futuro-del-trabajo'
];

for (const slug of slugs) {
  test(`Post page ${slug} shows title and content`, async ({ page }) => {
    await page.goto(`/posts/${slug}`);

    // Intentar obtener título principal dentro de `article h1`
    const articleH1 = page.locator('article h1');
    if (await articleH1.count() > 0) {
      await expect(articleH1.first()).toBeVisible();
      const text = await articleH1.first().innerText();
      expect(text.length).toBeGreaterThan(5);
    } else {
      // Fallback: usar el title del documento (head > title)
      const docTitle = await page.title();
      expect(docTitle.length).toBeGreaterThan(5);
    }

    // Contenido: al menos un párrafo de texto
    const paragraphs = page.locator('article p, .container p, main p');
    const pCount = await paragraphs.count();
    expect(pCount).toBeGreaterThan(0);
  });
}

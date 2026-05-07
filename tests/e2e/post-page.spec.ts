import { test, expect } from '@playwright/test';

const slugs = [
  'claude-code-subagents',
  'mcp-futuro-agentes',
  'novedades-dotnet-9'
];

for (const slug of slugs) {
  test(`Post page ${slug} shows title and content`, async ({ page }) => {
    await page.goto(`/posts/${slug}`);

    const articleH1 = page.locator('article h1');
    if (await articleH1.count() > 0) {
      await expect(articleH1.first()).toBeVisible();
      const text = await articleH1.first().innerText();
      expect(text.length).toBeGreaterThan(5);
    } else {
      const docTitle = await page.title();
      expect(docTitle.length).toBeGreaterThan(5);
    }

    const paragraphs = page.locator('article p, .container p, main p');
    const pCount = await paragraphs.count();
    expect(pCount).toBeGreaterThan(0);
  });
}
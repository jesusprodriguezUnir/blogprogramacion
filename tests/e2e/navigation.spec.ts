import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('should navigate between all main pages', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Verify we're on home page
    await expect(page.locator('.hero-title')).toBeVisible();

    // Navigate to Posts
    await page.click('a[href="/posts"]');
    await expect(page).toHaveURL(/\/posts$/);
    await expect(page.locator('h1.page-title')).toHaveText('Todas las noticias');

    // Navigate to Enlaces
    await page.click('.links a[href="/enlaces"]');
    await expect(page).toHaveURL(/\/enlaces$/);
    
    // Navigate to Prompts
    await page.click('.links a[href="/prompts"]');
    await expect(page).toHaveURL(/\/prompts$/);
    await expect(page.locator('.page-title')).toHaveText('Prompts');

    // Navigate to Sobre mí
    await page.click('.links a[href="/sobre-mi"]');
    await expect(page).toHaveURL(/\/sobre-mi$/);
    await expect(page.locator('h1.about-title')).toHaveText('Sobre mí');

    // Navigate back to home via brand link
    await page.click('.brand');
    await page.waitForURL(/^\/$/);
    await expect(page.locator('.hero-title')).toBeVisible();
  });

  test('should have consistent navigation menu on all pages', async ({ page }) => {
    const pages = ['/', '/posts', '/enlaces', '/prompts', '/sobre-mi'];

    for (const pagePath of pages) {
      await page.goto(pagePath);
      await page.waitForLoadState('networkidle');

      // Check navigation links are present
      await expect(page.locator('.links a[href="/posts"]')).toBeVisible();
      await expect(page.locator('.links a[href="/enlaces"]')).toBeVisible();
      await expect(page.locator('.links a[href="/prompts"]')).toBeVisible();
      await expect(page.locator('.links a[href="/sobre-mi"]')).toBeVisible();

      // Check brand link is present
      await expect(page.locator('.brand')).toBeVisible();
    }
  });

  test('should navigate to individual post and back', async ({ page }) => {
    await page.goto('/posts');
    await page.waitForLoadState('networkidle');

    // Get first post link
    const firstPostLink = page.locator('.link-card').first();
    const href = await firstPostLink.getAttribute('href');
    
    expect(href).toBeTruthy();
    expect(href).toMatch(/^\/posts\/[^\/]+$/);

    // Click on the post
    await firstPostLink.click();
    await expect(page).toHaveURL(new RegExp(href as string));

    // Verify we're on a post page
    const articleContent = page.locator('article');
    await expect(articleContent).toBeVisible();

    // Go back using browser navigation
    await page.goBack();
    await expect(page).toHaveURL(/\/posts$/);
  });

  test('should have working footer links', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Check footer exists
    const footer = page.locator('.site-footer');
    await expect(footer).toBeVisible();
  });

  test('should navigate from home featured posts to post page', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Find a post card on home page
    const postCard = page.locator('.post-card').first();
    
    if (await postCard.count() > 0) {
      // Get the read more link
      const readMoreLink = postCard.locator('.read-more').first();
      const href = await readMoreLink.getAttribute('href');
      
      expect(href).toBeTruthy();
      expect(href).toMatch(/^\/posts\/[^\/]+$/);

      // Click and verify navigation
      await readMoreLink.click();
      await expect(page).toHaveURL(new RegExp(href as string));
    }
  });
});

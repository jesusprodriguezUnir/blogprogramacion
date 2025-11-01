import { test, expect } from '@playwright/test';

test.describe('Accessibility and Responsiveness', () => {
  test('home page should have proper semantic HTML', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Check for main landmarks
    await expect(page.locator('main')).toBeVisible();
    await expect(page.locator('header.site-header')).toBeVisible();
    await expect(page.locator('footer.site-footer')).toBeVisible();

    // Check heading hierarchy
    const h1 = page.locator('h1');
    await expect(h1).toBeVisible();
  });

  test('navigation should be keyboard accessible', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Tab through navigation links
    await page.keyboard.press('Tab');
    
    // Should be able to focus on brand
    let focused = await page.evaluate(() => document.activeElement?.className);
    
    // Continue tabbing through nav links
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    
    // Should be able to navigate via Enter
    await page.keyboard.press('Enter');
    
    // Give some time for navigation
    await page.waitForTimeout(500);
  });

  test('responsive design on mobile viewport', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Hero should be visible
    const hero = page.locator('.hero');
    await expect(hero).toBeVisible();

    // Navigation should be present
    const nav = page.locator('.nav');
    await expect(nav).toBeVisible();

    // Go to posts page
    await page.goto('/posts');
    await page.waitForLoadState('networkidle');

    // Post cards should stack vertically
    const postCards = page.locator('.post-card');
    const count = await postCards.count();
    if (count > 0) {
      await expect(postCards.first()).toBeVisible();
    }
  });

  test('responsive design on tablet viewport', async ({ page }) => {
    // Set tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // All main elements should be visible
    await expect(page.locator('.hero')).toBeVisible();
    await expect(page.locator('.nav')).toBeVisible();
  });

  test('images should have alt text', async ({ page }) => {
    await page.goto('/sobre-mi');
    await page.waitForLoadState('networkidle');

    // Check avatar image has alt text
    const avatar = page.locator('.avatar-img');
    const alt = await avatar.getAttribute('alt');
    expect(alt).toBeTruthy();
    expect(alt?.length).toBeGreaterThan(0);
  });

  test('links should have meaningful text', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Get all links
    const links = page.locator('a');
    const count = await links.count();

    for (let i = 0; i < Math.min(count, 10); i++) {
      const text = await links.nth(i).innerText();
      const href = await links.nth(i).getAttribute('href');
      
      // Skip if it's just an icon or empty (some links might have images)
      if (text && text.trim().length > 0) {
        // Link text should not be generic
        expect(text.toLowerCase()).not.toBe('click here');
        expect(text.toLowerCase()).not.toBe('more');
      }
    }
  });

  test('form inputs should have labels (if any exist)', async ({ page }) => {
    // This test checks for forms on various pages
    const pages = ['/', '/posts', '/prompts', '/enlaces'];

    for (const pagePath of pages) {
      await page.goto(pagePath);
      await page.waitForLoadState('networkidle');

      // If there are inputs, they should have labels or aria-label
      const inputs = page.locator('input:not([type="hidden"])');
      const inputCount = await inputs.count();

      for (let i = 0; i < inputCount; i++) {
        const input = inputs.nth(i);
        const ariaLabel = await input.getAttribute('aria-label');
        const id = await input.getAttribute('id');
        
        // Either has aria-label or has an associated label
        if (!ariaLabel && id) {
          const label = page.locator(`label[for="${id}"]`);
          await expect(label).toBeVisible();
        } else if (!ariaLabel) {
          // Input should have some accessibility attribute
          const placeholder = await input.getAttribute('placeholder');
          expect(placeholder || ariaLabel).toBeTruthy();
        }
      }
    }
  });

  test('page should have proper meta tags', async ({ page }) => {
    await page.goto('/');
    
    // Check for essential meta tags
    const title = await page.title();
    expect(title.length).toBeGreaterThan(0);

    // Check for viewport meta tag
    const viewport = await page.locator('meta[name="viewport"]').getAttribute('content');
    expect(viewport).toContain('width=device-width');
  });

  test('external links should open in new tab', async ({ page }) => {
    await page.goto('/sobre-mi');
    await page.waitForLoadState('networkidle');

    // Check external link (personal blog)
    const externalLink = page.locator('a.about-link');
    const target = await externalLink.getAttribute('target');
    const rel = await externalLink.getAttribute('rel');

    expect(target).toBe('_blank');
    expect(rel).toContain('noopener');
  });
});

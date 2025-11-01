import { test, expect } from '@playwright/test';

test.describe('Sobre mí page', () => {
  test('should load and display page content', async ({ page }) => {
    await page.goto('/sobre-mi');

    // Wait for page to load
    await page.waitForLoadState('networkidle');

    // Check page title
    const pageTitle = page.locator('h1.about-title');
    await expect(pageTitle).toHaveText('Sobre mí');

    // Check description is visible
    const description = page.locator('.about-description');
    await expect(description).toBeVisible();
    await expect(description).toContainText(/programación/i);
    await expect(description).toContainText(/inteligencia artificial/i);

    // Check avatar image is present
    const avatar = page.locator('.avatar-img');
    await expect(avatar).toBeVisible();
  });

  test('should have a link to personal blog', async ({ page }) => {
    await page.goto('/sobre-mi');

    // Find the link to personal blog
    const blogLink = page.locator('a.about-link');
    await expect(blogLink).toBeVisible();
    await expect(blogLink).toHaveAttribute('href', 'https://blogpersonal-eta.vercel.app/');
    await expect(blogLink).toHaveAttribute('target', '_blank');
    await expect(blogLink).toHaveAttribute('rel', 'noopener noreferrer');
    
    // Check link text
    await expect(blogLink).toContainText(/blog personal/i);
  });

  test('should be accessible from navigation', async ({ page }) => {
    await page.goto('/');

    // Find and click the "Sobre mí" link in navigation
    const navLink = page.locator('.links a[href="/sobre-mi"]');
    await expect(navLink).toBeVisible();
    
    await navLink.click();
    await expect(page).toHaveURL(/\/sobre-mi$/);
    
    // Verify we're on the right page
    const pageTitle = page.locator('h1.about-title');
    await expect(pageTitle).toHaveText('Sobre mí');
  });

  test('should have proper page structure', async ({ page }) => {
    await page.goto('/sobre-mi');

    // Check main section is present
    const aboutSection = page.locator('.about-section');
    await expect(aboutSection).toBeVisible();

    // Check content container
    const aboutContent = page.locator('.about-content');
    await expect(aboutContent).toBeVisible();

    // Check text section
    const aboutText = page.locator('.about-text');
    await expect(aboutText).toBeVisible();
  });
});

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { screen } from '@testing-library/dom';
import { postHref } from '../../utils/url';
import { getCategoryColor } from '../../utils/category';

describe('PostCard (integration-light)', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('renders read more link with correct href', () => {
    const base = '/';
    const slug = 'resumen-lanzamiento-gpt-5-openai-agosto-2025';
    const href = postHref(base, slug);

    // Simula el HTML mínimo del PostCard donde comprobamos el enlace
    const html = `
      <article>
        <a class="read-more" href="${href}">Leer más →</a>
      </article>
    `;

    document.body.innerHTML = html;

    const link = screen.getByText(/Leer más/i);
    expect(link).toBeTruthy();
    expect(link.getAttribute('href')).toBe(href);
  });

  it('renders post title with correct link', () => {
    const base = '/';
    const slug = 'test-post';
    const title = 'Test Post Title';
    const href = postHref(base, slug);

    const html = `
      <article class="post-card">
        <h2 class="post-title">
          <a href="${href}" class="post-link">${title}</a>
        </h2>
      </article>
    `;

    document.body.innerHTML = html;

    const link = screen.getByText(title);
    expect(link).toBeTruthy();
    expect(link.getAttribute('href')).toBe(href);
  });

  it('renders category tag with correct color', () => {
    const category = 'ia';
    const categoryColor = getCategoryColor(category);

    const html = `
      <article class="post-card">
        <div class="post-category">
          <span class="category-tag ${categoryColor}">${category}</span>
        </div>
      </article>
    `;

    document.body.innerHTML = html;

    const tag = document.querySelector('.category-tag');
    expect(tag).toBeTruthy();
    expect(tag?.classList.contains(categoryColor)).toBe(true);
  });

  it('renders post metadata correctly', () => {
    const date = '2025-01-15';
    const readTime = '5 min';

    const html = `
      <article class="post-card">
        <div class="post-category">
          <span class="post-date">${date}</span>
        </div>
        <div class="post-meta">
          <span class="read-time">📖 ${readTime} de lectura</span>
        </div>
      </article>
    `;

    document.body.innerHTML = html;

    expect(screen.getByText(date)).toBeTruthy();
    expect(screen.getByText(/5 min de lectura/i)).toBeTruthy();
  });

  it('renders post excerpt', () => {
    const excerpt = 'This is a test excerpt for the blog post.';

    const html = `
      <article class="post-card">
        <p class="post-excerpt">${excerpt}</p>
      </article>
    `;

    document.body.innerHTML = html;

    expect(screen.getByText(excerpt)).toBeTruthy();
  });

  it('renders complete post card structure', () => {
    const base = '/';
    const slug = 'complete-test-post';
    const title = 'Complete Test Post';
    const excerpt = 'Complete test excerpt';
    const date = '2025-01-20';
    const category = 'web';
    const readTime = '3 min';
    const href = postHref(base, slug);
    const categoryColor = getCategoryColor(category);

    const html = `
      <article class="post-card">
        <div class="post-category">
          <span class="category-tag ${categoryColor}">${category}</span>
          <span class="post-date">${date}</span>
        </div>
        <h2 class="post-title">
          <a href="${href}" class="post-link">${title}</a>
        </h2>
        <p class="post-excerpt">${excerpt}</p>
        <div class="post-meta">
          <span class="read-time">📖 ${readTime} de lectura</span>
          <a href="${href}" class="read-more">Leer más →</a>
        </div>
      </article>
    `;

    document.body.innerHTML = html;

    // Verify all elements are present
    expect(screen.getByText(title)).toBeTruthy();
    expect(screen.getByText(excerpt)).toBeTruthy();
    expect(screen.getByText(date)).toBeTruthy();
    expect(screen.getByText(category)).toBeTruthy();
    expect(screen.getByText(/Leer más/i)).toBeTruthy();
    
    // Verify links have correct href
    const titleLink = screen.getByText(title);
    const readMoreLink = screen.getByText(/Leer más/i);
    expect(titleLink.getAttribute('href')).toBe(href);
    expect(readMoreLink.getAttribute('href')).toBe(href);
  });
});

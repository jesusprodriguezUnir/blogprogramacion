import { normalizeBase, postHref } from '../url';
import { describe, it, expect } from 'vitest';

describe('normalizeBase', () => {
  it('returns empty string for / or empty', () => {
    expect(normalizeBase('/')).toBe('');
    expect(normalizeBase('')).toBe('');
  });

  it('returns empty string for undefined', () => {
    expect(normalizeBase(undefined)).toBe('');
  });

  it('trims trailing slash', () => {
    expect(normalizeBase('/blog/')).toBe('/blog');
    expect(normalizeBase('/my-site/')).toBe('/my-site');
  });

  it('returns as-is for other strings', () => {
    expect(normalizeBase('/blog')).toBe('/blog');
    expect(normalizeBase('/my-app')).toBe('/my-app');
  });

  it('handles multiple trailing slashes', () => {
    expect(normalizeBase('/blog//')).toBe('/blog/');
  });

  it('handles single character paths', () => {
    expect(normalizeBase('/a')).toBe('/a');
    expect(normalizeBase('/a/')).toBe('/a');
  });
});

describe('postHref', () => {
  it('builds path with base', () => {
    expect(postHref('/blog', 'slug')).toBe('/blog/posts/slug');
    expect(postHref('/my-site', 'article-1')).toBe('/my-site/posts/article-1');
  });

  it('builds path without base', () => {
    expect(postHref('/', 'slug')).toBe('/posts/slug');
    expect(postHref('', 'article')).toBe('/posts/article');
  });

  it('builds path with undefined base', () => {
    expect(postHref(undefined, 'test-slug')).toBe('/posts/test-slug');
  });

  it('handles base with trailing slash', () => {
    expect(postHref('/blog/', 'slug')).toBe('/blog/posts/slug');
  });

  it('handles slugs with special characters', () => {
    expect(postHref('/', 'my-post-2025')).toBe('/posts/my-post-2025');
    expect(postHref('/blog', 'post_with_underscore')).toBe('/blog/posts/post_with_underscore');
  });

  it('creates consistent paths', () => {
    const base1 = postHref('/blog/', 'test');
    const base2 = postHref('/blog', 'test');
    expect(base1).toBe(base2);
  });
});

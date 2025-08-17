import { normalizeBase, postHref } from '../url';
import { describe, it, expect } from 'vitest';

describe('normalizeBase', () => {
  it('returns empty string for / or empty', () => {
    expect(normalizeBase('/')).toBe('');
    expect(normalizeBase('')).toBe('');
  });

  it('trims trailing slash', () => {
    expect(normalizeBase('/blog/')).toBe('/blog');
  });

  it('returns as-is for other strings', () => {
    expect(normalizeBase('/blog')).toBe('/blog');
  });
});

describe('postHref', () => {
  it('builds path with base', () => {
    expect(postHref('/blog', 'slug')).toBe('/blog/posts/slug');
  });

  it('builds path without base', () => {
    expect(postHref('/', 'slug')).toBe('/posts/slug');
  });
});

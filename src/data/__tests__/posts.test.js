import { describe, it, expect } from 'vitest';
import { posts } from '../posts';

describe('posts data', () => {
  it('should export an array of posts', () => {
    expect(Array.isArray(posts)).toBe(true);
  });

  it('should have at least one post', () => {
    expect(posts.length).toBeGreaterThan(0);
  });

  it('each post should have required fields', () => {
    posts.forEach(post => {
      expect(post).toHaveProperty('title');
      expect(post).toHaveProperty('slug');
      expect(post).toHaveProperty('description');
      expect(post).toHaveProperty('date');
      expect(post).toHaveProperty('tags');
      expect(post).toHaveProperty('cover');
    });
  });

  it('post fields should be of correct type', () => {
    posts.forEach(post => {
      expect(typeof post.title).toBe('string');
      expect(typeof post.slug).toBe('string');
      expect(typeof post.description).toBe('string');
      expect(typeof post.date).toBe('string');
      expect(Array.isArray(post.tags)).toBe(true);
      expect(typeof post.cover).toBe('string');
    });
  });

  it('post slugs should be URL-friendly', () => {
    posts.forEach(post => {
      // Slugs should not contain spaces or special characters
      expect(post.slug).toMatch(/^[a-z0-9-]+$/);
    });
  });

  it('post dates should be in valid format', () => {
    posts.forEach(post => {
      // Check if date is in YYYY-MM-DD format
      expect(post.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      // Check if it's a valid date
      expect(new Date(post.date).toString()).not.toBe('Invalid Date');
    });
  });

  it('post tags should not be empty', () => {
    posts.forEach(post => {
      expect(post.tags.length).toBeGreaterThan(0);
    });
  });

  it('post titles should not be empty', () => {
    posts.forEach(post => {
      expect(post.title.trim().length).toBeGreaterThan(0);
    });
  });

  it('post descriptions should not be empty', () => {
    posts.forEach(post => {
      expect(post.description.trim().length).toBeGreaterThan(0);
    });
  });
});

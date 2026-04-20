import { describe, it, expect } from 'vitest';
import { getCategoryColor, categoryColors } from '../category';

describe('getCategoryColor', () => {
  it('returns correct color for known categories', () => {
    expect(getCategoryColor('ia')).toBe('bg-green-500');
    expect(getCategoryColor('Web')).toBe('bg-blue-500');
    expect(getCategoryColor('web')).toBe('bg-blue-500');
  });

  it('returns correct color for all defined categories', () => {
    expect(getCategoryColor('noticias')).toBe('bg-purple-500');
    expect(getCategoryColor('herramientas')).toBe('bg-orange-500');
  });

  it('is case-insensitive', () => {
    expect(getCategoryColor('IA')).toBe('bg-green-500');
    expect(getCategoryColor('WEB')).toBe('bg-blue-500');
    expect(getCategoryColor('NOTICIAS')).toBe('bg-purple-500');
  });

  it('returns default for unknown category', () => {
    expect(getCategoryColor('unknown')).toBe('bg-gray-500');
    expect(getCategoryColor('')).toBe('bg-gray-500');
    expect(getCategoryColor('xyz')).toBe('bg-gray-500');
  });

  it('handles mixed case input', () => {
    expect(getCategoryColor('Ia')).toBe('bg-green-500');
    expect(getCategoryColor('WeB')).toBe('bg-blue-500');
  });
});

describe('categoryColors', () => {
  it('contains all expected category mappings', () => {
    expect(categoryColors).toHaveProperty('ia');
    expect(categoryColors).toHaveProperty('web');
    expect(categoryColors).toHaveProperty('noticias');
    expect(categoryColors).toHaveProperty('herramientas');
  });

  it('all colors follow Tailwind CSS naming convention', () => {
    Object.values(categoryColors).forEach(color => {
      expect(color).toMatch(/^bg-\w+-\d+$/);
    });
  });
});

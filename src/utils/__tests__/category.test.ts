import { describe, it, expect } from 'vitest';
import { getCategoryColor } from '../category';

describe('getCategoryColor', () => {
  it('returns correct color for known categories', () => {
    expect(getCategoryColor('ia')).toBe('bg-green-500');
    expect(getCategoryColor('Web')).toBe('bg-blue-500');
  });

  it('returns default for unknown', () => {
    expect(getCategoryColor('unknown')).toBe('bg-gray-500');
  });
});

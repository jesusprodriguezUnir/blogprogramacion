import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

// Utilidad para obtener los slugs de los posts markdown
function getBlogSlugs() {
  const postsDir = path.resolve(__dirname, '../');
  const files = fs.readdirSync(postsDir);
  return files.filter(f => f.endsWith('.md') || f.endsWith('.mdx'))
    .map(f => f.replace(/\.(md|mdx)$/i, ''));
}

describe('Listado de blogs', () => {
  it('debería encontrar al menos un post', () => {
    const slugs = getBlogSlugs();
    expect(slugs.length).toBeGreaterThan(0);
  });

  it('debería incluir el post "made-by-google-2025-resumen"', () => {
    const slugs = getBlogSlugs();
    expect(slugs).toContain('made-by-google-2025-resumen');
  });

  it('debería incluir el post "notebook-lm"', () => {
    const slugs = getBlogSlugs();
    expect(slugs).toContain('notebook-lm');
  });
});

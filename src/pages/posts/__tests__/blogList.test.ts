import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

function getBlogSlugs() {
  const postsDir = path.resolve(__dirname, '../');
  const files = fs.readdirSync(postsDir);
  return files
    .filter(f => !f.startsWith('_') && (f.endsWith('.md') || f.endsWith('.mdx')))
    .map(f => f.replace(/\.(md|mdx)$/i, ''));
}

describe('Listado de blogs', () => {
  it('debería encontrar al menos un post', () => {
    const slugs = getBlogSlugs();
    expect(slugs.length).toBeGreaterThan(0);
  });

  it('debería incluir posts publicados', () => {
    const slugs = getBlogSlugs();
    const publishedSlugs = ['claude-code-subagents', 'mcp-futuro-agentes', 'novedades-dotnet-9'];
    publishedSlugs.forEach(slug => {
      expect(slugs).toContain(slug);
    });
  });

  it('debería excluir archivos de archive', () => {
    const slugs = getBlogSlugs();
    expect(slugs).not.toContain('made-by-google-2025-resumen');
  });
});
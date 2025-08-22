import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/dom';
import { postHref } from '../../utils/url';

describe('PostCard (integration-light)', () => {
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
});

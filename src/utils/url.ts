export function normalizeBase(rawBase: string | undefined) {
  const base = rawBase || '/';
  if (base === '/' || base === '') return '';
  return base.endsWith('/') ? base.slice(0, -1) : base;
}

export function postHref(base: string | undefined, slug: string) {
  const b = normalizeBase(base);
  return `${b}/posts/${slug}`;
}

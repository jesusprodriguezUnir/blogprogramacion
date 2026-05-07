import rss from '@astrojs/rss';

export const prerender = true;

export async function GET() {
  const postFilesMD = import.meta.glob('./posts/*.md', { eager: true });
  const postFilesMDX = import.meta.glob('./posts/*.mdx', { eager: true });

  const files = Object.values(postFilesMD).concat(Object.values(postFilesMDX));

  const posts = files
    .filter(m => m && m.frontmatter && m.frontmatter.title && m.frontmatter.slug)
    .map(m => m.frontmatter)
    .map(fm => ({
      title: fm.title,
      date: fm.date || '1970-01-01',
      excerpt: fm.excerpt || '',
      link: `/posts/${fm.slug}`
    }))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return rss({
    title: 'jesus_rodriguez // dev_blog',
    description: 'Arquitectura de software, .NET, IA y desarrollo full-stack',
    site: 'https://jesusprodriguezUnir.github.io/blogprogramacion',
    items: posts.map((post) => ({
      title: post.title,
      pubDate: post.date,
      description: post.excerpt,
      link: post.link
    })),
    customData: '<language>es-ES</language>'
  });
}
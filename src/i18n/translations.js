export const translations = {
  es: {
    site: {
      title: 'jesus_rodriguez // dev_blog',
      description: 'Arquitectura de software, .NET, IA y desarrollo full-stack',
    },
    nav: {
      home: '~/home',
      resources: '/recursos',
      skills: '/skills',
      about: '/about',
    },
    common: {
      readMore: 'Leer más',
      previous: 'Anterior',
      next: 'Siguiente',
      back: 'Volver',
    },
    posts: {
      published: 'Publicado',
      readingTime: 'Tiempo de lectura',
    },
  },
  en: {
    site: {
      title: 'jesus_rodriguez // dev_blog',
      description: 'Software architecture, .NET, AI and full-stack development',
    },
    nav: {
      home: '~/home',
      resources: '/resources',
      skills: '/skills',
      about: '/about',
    },
    common: {
      readMore: 'Read more',
      previous: 'Previous',
      next: 'Next',
      back: 'Back',
    },
    posts: {
      published: 'Published',
      readingTime: 'Reading time',
    },
  },
};

export const defaultLocale = 'es';

export function getLocale() {
  return defaultLocale;
}

export function t(key) {
  const keys = key.split('.');
  let value = translations[defaultLocale];
  
  for (const k of keys) {
    value = value?.[k];
  }
  
  return value || key;
}
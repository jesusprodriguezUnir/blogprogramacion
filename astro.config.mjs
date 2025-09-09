// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

// https://astro.build/config
// Ajusta 'site' y 'base' para GitHub Pages
// Detecta ambiente de desarrollo con varios fallbacks.
const isDev = (() => {
	try {
		// Vite/astro en runtime expone import.meta.env.DEV, pero en Node esto puede no existir.
		// Usamos varios checks para cubrir dev en local y CI.
		if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.DEV) return true;
	} catch (e) {
		// ignore
	}
	if (process && process.env) {
		if (process.env.ASTRO_DEV === 'true') return true;
		if (process.env.NODE_ENV && process.env.NODE_ENV !== 'production') return true;
	}
	return false;
})();

export default defineConfig({
	integrations: [mdx()],
	site: 'https://jesusprodriguezUnir.github.io/',
	base: isDev ? '/' : '/blogprogramacion/',
});

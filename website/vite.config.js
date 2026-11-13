import { mdsvex } from 'mdsvex';
import mdsvexConfig from './mdsvex.config.js';
import adapter from '@sveltejs/adapter-netlify';
import preprocess from 'svelte-preprocess';
import { sveltekit } from '@sveltejs/kit/vite';
import { svelteSitemap } from 'svelte-sitemap/vite';

/** @type {import('vite').UserConfig} */ const config = {
	plugins: [
		sveltekit({
			extensions: ['.svelte', ...mdsvexConfig.extensions],
			// Consult https://github.com/sveltejs/svelte-preprocess
			// for more information about preprocessors
			preprocess: [preprocess(), mdsvex(mdsvexConfig)],

			adapter: adapter({
				pages: 'build',
				assets: 'build',
				fallback: undefined,
				precompress: false,
				strict: true
			})
		}),
		svelteSitemap({ domain: 'https://teeline.online' })
	]
};

export default config;

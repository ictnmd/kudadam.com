import { mdsvex } from 'mdsvex';
import mdsvexConfig from './mdsvex.config.js';
import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-node';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', ...mdsvexConfig.extensions],
	kit: {
		adapter: adapter(),
		prerender: {
			default: true
		},
		alias: {
			$components: 'src/components',
			$utils: 'src/utils'
		}
	},
	trailingSlash: 'never',
	preprocess: [
		preprocess({
			postcss: true,
			preserve: ['ld+json']
		}),
		mdsvex(mdsvexConfig)
	]
};

export default config;

import adapter from '@sveltejs/adapter-static';
import configJson from './config.json' with { type: 'json' };

/** @type {import('@sveltejs/kit').Config} */
const config = {
	compilerOptions: {
		// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
		runes: ({ filename }) => (filename.split(/[/\\]/).includes('node_modules') ? undefined : true)
	},
	kit: {
		adapter: adapter(),
		paths: {
			base: process.env.NODE_ENV === 'production' ? `/${configJson.base_path}` : '',
		},
		alias: {
			$root: process.cwd()
		}
	}
};

export default config;

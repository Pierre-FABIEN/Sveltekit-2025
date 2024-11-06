import { sveltekit } from '@sveltejs/kit/vite';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],

	resolve: {
		preserveSymlinks: true
	},

	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	},

	server: {
		port: 1000
	}
};

export default config;

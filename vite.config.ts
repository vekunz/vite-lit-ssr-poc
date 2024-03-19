import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import vitePluginLit from './vite-plugin-lit';

export default defineConfig({
	plugins: [
		vitePluginLit(),
		sveltekit()
	]
});

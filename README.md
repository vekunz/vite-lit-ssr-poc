# Vite & Lit SSR Proof of Concept

**!!Disclaimer: This project is a proof of concept and NOT appropriate for production use!!**

Several years ago, the Lit Team released an experimental package to enrich Lit Web Components with Server-Side Rendering capabilities. More information on that is available in the [Lit Documentation](https://lit.dev/docs/ssr/overview/).

This project tries to connect the Lit SSR Tools to the Vite build system. The file `vite-plugin-lit.js` contains a Vite plugin that injects the Lit SSR logic into the build pipeline. The static folder contains a precompiled script from Lit that is necessary for Lit SSR Hydration that is imported inside `./src/app.html`.

Since this Plugin is just a Proof of Concept, it only supports `*.svelte` files (with Svelte 5) and even there not all use-cases. For example it cannot server-side render Lit components that are imported with a TypeScript path alias (i.e. `$lib`).

A demo component is included in `./src/lib/lit-component.js` and is used in `./src/routes/+page.svelte`. This plugin uses the static-adapter from SvelteKit, so you can see the generated HTML output in the `./build` folder (after run `npm run build`). After building the app you can start a simple HTTP-Server with `npm run preview`.

You can use this project as a basis or an inspiration to build a production ready library for including Lit SSR into SvelteKit or (framework-agnostic) into Vite or Rollup. Since this project uses "The Unlicense", you can use this code in any way, but nobody would mind if you reference me as your source of inspiration.

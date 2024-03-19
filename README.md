# Vite & Lit SSR Proof of Concept

**!!Disclaimer: This project is a proof of concept and NOT appropriate for production use!!**

Several years ago, the Lit Team released an experimental package to enrich Lit Web Components with Server-Side Rendering capabilities. More information on that is available in the [Lit Documentation](https://lit.dev/docs/ssr/overview/).

This project tries to connect the Lit SSR Tools to the Vite build system. The file `vite-plugin-lit.js` contains a Vite plugin that injects the Lit SSR logic into the build pipeline. The static folder contains a precompiled script from Lit that is necessary for Lit SSR Hydration that is imported inside `./src/app.html`.

## Svelte

Since this Plugin is just a Proof of Concept, it only supports `*.svelte` files and even there not all use-cases. For example it cannot server-side render Lit components that are imported with a TypeScript path alias (i.e. `$lib`). Nevertheless there are some problems with Svelte.

The branch `main` contains Svelte 4. After building the App (`npm run build`), you have to modify the `./build/index.html` file. In the `<head>` section you have to comment out or remove all `<link rel="modulepreload">` elements, otherwise hydration duplicates all the elements.

The branch `svelte5` contains Svelte 5. There hydration does not work at all, even if you comment our or remove the `<link rel="modulepreload">` elements. Lit just "discards" the Declarative Shadow DOM and creates a new Shadow DOM.

## Project structure

A demo component is included in `./src/lib/lit-component.js` and is used in `./src/routes/+page.svelte`. This plugin uses the static-adapter from SvelteKit, so you can see the generated HTML output in the `./build` folder (after run `npm run build`). After building the app you can start a simple HTTP-Server with `npm run preview`.

You can use this project as a basis or an inspiration to build a production ready library for including Lit SSR into SvelteKit or (framework-agnostic) into Vite or Rollup. Since this project uses "The Unlicense", you can use this code in any way, but nobody would mind if you reference me as your source of inspiration.

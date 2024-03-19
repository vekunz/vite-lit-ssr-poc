import 'global-jsdom/register';
import { parseDocument } from "htmlparser2";
import domSerializer from "dom-serializer";
import * as typeScriptEstree from "@typescript-eslint/typescript-estree";
import * as path from 'path';
import * as litSsr from '@lit-labs/ssr';
import {collectResult} from '@lit-labs/ssr/lib/render-result.js';
import {unsafeHTML} from 'lit-html/directives/unsafe-html.js';

/** @return {import("vite").Plugin} */
export default function vitePluginLit() {
    return {
        name: 'vite-plugin-lit',
        enforce: 'pre',
        async transform(src, id) {
            if (isSuppertedFile(id) && !inExcludedDirectory(id)) {
                const dom = parseDocument(src);

                /** @type {(childNodes: ChildNode[]) => void} */
                const handleNodes = async (childNodes) => {
                    for (let i = 0; i < childNodes.length; i++) {
                        const child = childNodes[i];
                        if (child.nodeType === 1) {
                            /** @type {string} */
                            const tagName = child.name;
                            if (tagName === 'script') {
                                /** @type {string} */
                                const script = child.childNodes[0].data;
                                const ast = typeScriptEstree.parse(script);
                                const imports = ast.body.filter(b => b.type === 'ImportDeclaration');
                                for (const importStatement of imports) {
                                    await importPath(id, importStatement.source.value);
                                }
                            } else {
                                handleNodes(child.childNodes);
                                if (tagName.startsWith('ex-')) {
                                    const raw = domSerializer(/** @type {Element} */ child, {encodeEntities: 'utf8'});
                                    const ssrResult = litSsr.render(unsafeHTML(raw));
                                    const resultHTML = await collectResult(ssrResult);

                                    const parsedNodes = parseDocument(resultHTML).childNodes;
                                    childNodes.splice(i, 1, ...parsedNodes);
                                    i += (parsedNodes.length - 1);
                                }
                            }
                        }
                    }
                }
                await handleNodes(dom.childNodes);

                const serializedResult = domSerializer(dom, {encodeEntities: 'utf8'});
                return {
                    code: serializedResult,
                    map: null
                };
            }
        }
    }
}

/**
 * @param {string} filePath
 * @return {boolean}
 */
function isSuppertedFile(filePath) {
    return isSvelteFile(filePath);
}

/**
 * @param {string} filePath
 * @return {boolean}
 */
function isSvelteFile(filePath) {
    return filePath.endsWith('.svelte');
}

/**
 * @param {string} filePath
 * @return {boolean}
 */
function inExcludedDirectory(filePath) {
    return filePath.includes('/.svelte-kit/') || filePath.includes('/node_modules/');
}

/**
 * @param {string} origFile
 * @param {string} filePath
 * @return {Promise<void>}
 */
async function importPath(origFile, filePath) {
    if (isSvelteFile(origFile) && (filePath.startsWith('$') || filePath.startsWith('@app/'))) {
        return;
    }
    if (filePath.startsWith('.')) {
        filePath = path.join(path.dirname(origFile), filePath);
    }
    await import(filePath);
}

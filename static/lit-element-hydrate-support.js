import { z, w as w$1, j } from './lit-html-047ab084.js';

/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
let r=null;const i$1={boundAttributeSuffix:z.P,marker:z.A,markerMatch:z.C,HTML_RESULT:z.M,getTemplateHtml:z.L,overrideDirectiveResolve:(e,t)=>class extends e{_$AS(e,r){return t(this,r)}},patchDirectiveResolve:(e,t)=>{if(e.prototype._$AS!==t){r??=e.prototype._$AS.name;for(let i=e.prototype;i!==Object.prototype;i=Object.getPrototypeOf(i))if(i.hasOwnProperty(r))return void(i[r]=t);throw Error("Internal error: It is possible that both dev mode and production mode Lit was mixed together during SSR. Please comment on the issue: https://github.com/lit/lit/issues/4527")}},setDirectiveClass(e,t){e._$litDirective$=t;},getAttributePartCommittedValue:(e,r,i)=>{let o=w$1;return e.j=e=>o=e,e._$AI(r,e,i),o},connectedDisconnectable:e=>({...e,_$AU:!0}),resolveDirective:z.V,AttributePart:z.H,PropertyPart:z.B,BooleanAttributePart:z.N,EventPart:z.U,ElementPart:z.F,TemplateInstance:z.R,isIterable:z.D,ChildPart:z.I};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6};

/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const i=o=>null===o||"object"!=typeof o&&"function"!=typeof o,e=(o,t)=>void 0===t?void 0!==o?._$litType$:o?._$litType$===t,l$1=o=>null!=o?._$litType$?.h,f$1=o=>void 0===o.strings;

/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{TemplateInstance:l,isIterable:s,resolveDirective:d,ChildPart:c,ElementPart:p}=i$1,f=(e,t,r={})=>{if(void 0!==t._$litPart$)throw Error("container already contains a live render");let n,o,i;const a=[],l=document.createTreeWalker(t,NodeFilter.SHOW_COMMENT);let s;for(;null!==(s=l.nextNode());){const t=s.data;if(t.startsWith("lit-part")){if(0===a.length&&void 0!==n)throw Error(`There must be only one root part per container. Found a part marker (${s}) when we already have a root part marker (${o})`);i=m(e,s,a,r),void 0===n&&(n=i),o??=s;}else if(t.startsWith("lit-node"))u(s,a,r);else if(t.startsWith("/lit-part")){if(1===a.length&&i!==n)throw Error("internal error");i=h(s,i,a);}}if(void 0===n){const e=t instanceof ShadowRoot?"{container.host.localName}'s shadow root":t instanceof DocumentFragment?"DocumentFragment":t.localName;console.error(`There should be exactly one root part in a render container, but we didn't find any in ${e}.`);}t._$litPart$=n;},m=(t,r,a,p)=>{let f,m;if(0===a.length)m=new c(r,null,void 0,p),f=t;else {const e=a[a.length-1];if("template-instance"===e.type)m=new c(r,null,e.instance,p),e.instance._$AV.push(m),f=e.result.values[e.instancePartIndex++],e.templatePartIndex++;else if("iterable"===e.type){m=new c(r,null,e.part,p);const t=e.iterator.next();if(t.done)throw f=void 0,e.done=!0,Error("Unhandled shorter than expected iterable");f=t.value,e.part._$AH.push(m);}else m=new c(r,null,e.part,p);}if(f=d(m,f),f===w$1)a.push({part:m,type:"leaf"});else if(i(f))a.push({part:m,type:"leaf"}),m._$AH=f;else if(e(f)){if(l$1(f))throw Error("compiled templates are not supported");const e="lit-part "+w(f);if(r.data!==e)throw Error("Hydration value mismatch: Unexpected TemplateResult rendered to part");{const e=c.prototype._$AC(f),t=new l(e,m);a.push({type:"template-instance",instance:t,part:m,templatePartIndex:0,instancePartIndex:0,result:f}),m._$AH=t;}}else s(f)?(a.push({part:m,type:"iterable",value:f,iterator:f[Symbol.iterator](),done:!1}),m._$AH=[]):(a.push({part:m,type:"leaf"}),m._$AH=f??"");return m},h=(e,t,r)=>{if(void 0===t)throw Error("unbalanced part marker");t._$AB=e;const n=r.pop();if("iterable"===n.type&&!n.iterator.next().done)throw Error("unexpected longer than expected iterable");if(r.length>0)return r[r.length-1].part},u=(e,t$1,n)=>{const o=/lit-node (\d+)/.exec(e.data),i=parseInt(o[1]),l=e.nextElementSibling;if(null===l)throw Error("could not find node for attribute parts");l.removeAttribute("defer-hydration");const s=t$1[t$1.length-1];if("template-instance"!==s.type)throw Error("Hydration value mismatch: Primitive found where TemplateResult expected. This usually occurs due to conditional rendering that resulted in a different value or template being rendered between the server and client.");{const e=s.instance;for(;;){const t$1=e._$AD.parts[s.templatePartIndex];if(void 0===t$1||t$1.type!==t.ATTRIBUTE&&t$1.type!==t.ELEMENT||t$1.index!==i)break;if(t$1.type===t.ATTRIBUTE){const o=new t$1.ctor(l,t$1.name,t$1.strings,s.instance,n),i=f$1(o)?s.result.values[s.instancePartIndex]:s.result.values,d=!(o.type===t.EVENT||o.type===t.PROPERTY);o._$AI(i,o,s.instancePartIndex,d),s.instancePartIndex+=t$1.strings.length-1,e._$AV.push(o);}else {const t=new p(l,s.instance,n);d(t,s.result.values[s.instancePartIndex++]),e._$AV.push(t);}s.templatePartIndex++;}}},w=e=>{const t=new Uint32Array(2).fill(5381);for(const r of e.strings)for(let e=0;e<r.length;e++)t[e%2]=33*t[e%2]^r.charCodeAt(e);const r=String.fromCharCode(...new Uint8Array(t.buffer));return btoa(r)};

globalThis.litElementHydrateSupport=({LitElement:s})=>{const h=Object.getOwnPropertyDescriptor(Object.getPrototypeOf(s),"observedAttributes").get;Object.defineProperty(s,"observedAttributes",{get(){return [...h.call(this),"defer-hydration"]}});const e=s.prototype.attributeChangedCallback;s.prototype.attributeChangedCallback=function(t,i,s){"defer-hydration"===t&&null===s&&n.call(this),e.call(this,t,i,s);};const n=s.prototype.connectedCallback;s.prototype.connectedCallback=function(){this.hasAttribute("defer-hydration")||n.call(this);};const o=s.prototype.createRenderRoot;s.prototype.createRenderRoot=function(){return this.shadowRoot?(this._$AG=!0,this.shadowRoot):o.call(this)};const r=Object.getPrototypeOf(s.prototype).update;s.prototype.update=function(s){const h=this.render();if(r.call(this,s),this._$AG){this._$AG=!1;for(let t=0;t<this.attributes.length;t++){const i=this.attributes[t];if(i.name.startsWith("hydrate-internals-")){const t=i.name.slice(18);this.removeAttribute(t),this.removeAttribute(i.name);}}f(h,this.renderRoot,this.renderOptions);}else j(h,this.renderRoot,this.renderOptions);};};
import { clsx as clsx$1 } from 'clsx';
import { defineComponent, h, createSSRApp } from 'vue';
import { renderToString } from 'vue/server-renderer';
import { l as renderJSX, n as createVNode, o as AstroJSX, p as AstroUserError } from './astro/server_CrGHHT1g.mjs';
import 'kleur/colors';

const HYDRATION_START = '[';
const HYDRATION_END = ']';

const ATTR_REGEX = /[&"<]/g;

/**
 * @template V
 * @param {V} value
 * @param {boolean} [is_attr]
 */
function escape_html(value, is_attr) {
	const str = String(value ?? '');

	const pattern = ATTR_REGEX ;
	pattern.lastIndex = 0;

	let escaped = '';
	let last = 0;

	while (pattern.test(str)) {
		const i = pattern.lastIndex - 1;
		const ch = str[i];
		escaped += str.substring(last, i) + (ch === '&' ? '&amp;' : ch === '"' ? '&quot;' : '&lt;');
		last = i + 1;
	}

	return escaped + str.substring(last);
}

/**
 * Small wrapper around clsx to preserve Svelte's (weird) handling of falsy values.
 * TODO Svelte 6 revisit this, and likely turn all falsy values into the empty string (what clsx also does)
 * @param  {any} value
 */
function clsx(value) {
	if (typeof value === 'object') {
		return clsx$1(value);
	} else {
		return value ?? '';
	}
}

/**
 * @param {any} value
 * @param {string | null} [hash]
 * @param {Record<string, boolean>} [directives]
 * @returns {string | null}
 */
function to_class(value, hash, directives) {
	var classname = value == null ? '' : '' + value;

	{
		classname = classname ? classname + ' ' + hash : hash;
	}

	return classname === '' ? null : classname;
}

const BLOCK_OPEN = `<!--${HYDRATION_START}-->`;
const BLOCK_CLOSE = `<!--${HYDRATION_END}-->`;

class HeadPayload {
	/** @type {Set<{ hash: string; code: string }>} */
	css = new Set();
	out = '';
	uid = () => '';
	title = '';

	constructor(css = new Set(), out = '', title = '', uid = () => '') {
		this.css = css;
		this.out = out;
		this.title = title;
		this.uid = uid;
	}
}

class Payload {
	/** @type {Set<{ hash: string; code: string }>} */
	css = new Set();
	out = '';
	uid = () => '';
	select_value = undefined;

	head = new HeadPayload();

	constructor(id_prefix = '') {
		this.uid = props_id_generator(id_prefix);
		this.head.uid = this.uid;
	}
}

/**
 * Creates an ID generator
 * @param {string} prefix
 * @returns {() => string}
 */
function props_id_generator(prefix) {
	let uid = 1;
	return () => `${prefix}s${uid++}`;
}

/** @import { ComponentType, SvelteComponent } from 'svelte' */
/** @import { Component, RenderOutput } from '#server' */
/** @import { Store } from '#shared' */

/**
 * Array of `onDestroy` callbacks that should be called at the end of the server render function
 * @type {Function[]}
 */
let on_destroy = [];

/**
 * Only available on the server and when compiling with the `server` option.
 * Takes a component and returns an object with `body` and `head` properties on it, which you can use to populate the HTML when server-rendering your app.
 * @template {Record<string, any>} Props
 * @param {import('svelte').Component<Props> | ComponentType<SvelteComponent<Props>>} component
 * @param {{ props?: Omit<Props, '$$slots' | '$$events'>; context?: Map<any, any>; idPrefix?: string }} [options]
 * @returns {RenderOutput}
 */
function render(component, options = {}) {
	const payload = new Payload(options.idPrefix ? options.idPrefix + '-' : '');

	const prev_on_destroy = on_destroy;
	on_destroy = [];
	payload.out += BLOCK_OPEN;

	if (options.context) {
		push();
		/** @type {Component} */ (current_component).c = options.context;
	}

	// @ts-expect-error
	component(payload, options.props ?? {}, {}, {});

	if (options.context) {
		pop();
	}

	payload.out += BLOCK_CLOSE;
	for (const cleanup of on_destroy) cleanup();
	on_destroy = prev_on_destroy;

	let head = payload.head.out + payload.head.title;

	for (const { hash, code } of payload.css) {
		head += `<style id="${hash}">${code}</style>`;
	}

	return {
		head,
		html: payload.out,
		body: payload.out
	};
}

/**
 * @param {any} value
 * @param {string | undefined} [hash]
 * @param {Record<string, boolean>} [directives]
 */
function attr_class(value, hash, directives) {
	var result = to_class(value, hash);
	return result ? ` class="${escape_html(result)}"` : '';
}

/** @import { Component } from '#server' */

/** @type {Component | null} */
var current_component = null;

/**
 * @param {Function} [fn]
 */
function push(fn) {
	current_component = { p: current_component, c: null, d: null };
}

function pop() {
	var component = /** @type {Component} */ (current_component);

	var ondestroy = component.d;

	if (ondestroy) {
		on_destroy.push(...ondestroy);
	}

	current_component = component.p;
}

/** @import { Snippet } from 'svelte' */
/** @import { Payload } from '../payload' */
/** @import { Getters } from '#shared' */

/**
 * Create a snippet programmatically
 * @template {unknown[]} Params
 * @param {(...params: Getters<Params>) => {
 *   render: () => string
 *   setup?: (element: Element) => void | (() => void)
 * }} fn
 * @returns {Snippet<Params>}
 */
function createRawSnippet(fn) {
	// @ts-expect-error the types are a lie
	return (/** @type {Payload} */ payload, /** @type {Params} */ ...args) => {
		var getters = /** @type {Getters<Params>} */ (args.map((value) => () => value));
		payload.out += fn(...getters)
			.render()
			.trim();
	};
}

const contexts$1 = /* @__PURE__ */ new WeakMap();
const ID_PREFIX$1 = "s";
function getContext$1(rendererContextResult) {
  if (contexts$1.has(rendererContextResult)) {
    return contexts$1.get(rendererContextResult);
  }
  const ctx = {
    currentIndex: 0,
    get id() {
      return ID_PREFIX$1 + this.currentIndex.toString();
    }
  };
  contexts$1.set(rendererContextResult, ctx);
  return ctx;
}
function incrementId$1(rendererContextResult) {
  const ctx = getContext$1(rendererContextResult);
  const id = ctx.id;
  ctx.currentIndex++;
  return id;
}

function check$2(Component) {
  if (typeof Component !== "function") return false;
  return Component.toString().includes("$$payload");
}
function needsHydration(metadata) {
  return metadata?.astroStaticSlot ? !!metadata.hydrate : true;
}
async function renderToStaticMarkup$2(Component, props, slotted, metadata) {
  const tagName = needsHydration(metadata) ? "astro-slot" : "astro-static-slot";
  let children = void 0;
  let $$slots = void 0;
  let idPrefix;
  if (this && this.result) {
    idPrefix = incrementId$1(this.result);
  }
  const renderProps = {};
  for (const [key, value] of Object.entries(slotted)) {
    $$slots ??= {};
    if (key === "default") {
      $$slots.default = true;
      children = createRawSnippet(() => ({
        render: () => `<${tagName}>${value}</${tagName}>`
      }));
    } else {
      $$slots[key] = createRawSnippet(() => ({
        render: () => `<${tagName} name="${key}">${value}</${tagName}>`
      }));
    }
    const slotName = key === "default" ? "children" : key;
    renderProps[slotName] = createRawSnippet(() => ({
      render: () => `<${tagName}${key !== "default" ? ` name="${key}"` : ""}>${value}</${tagName}>`
    }));
  }
  const result = render(Component, {
    props: {
      ...props,
      children,
      $$slots,
      ...renderProps
    },
    idPrefix
  });
  return { html: result.body };
}
const renderer$2 = {
  name: "@astrojs/svelte",
  check: check$2,
  renderToStaticMarkup: renderToStaticMarkup$2,
  supportsAstroStaticSlot: true
};
var server_default$2 = renderer$2;

const setup = () => {};

const contexts = /* @__PURE__ */ new WeakMap();
const ID_PREFIX = "s";
function getContext(rendererContextResult) {
  if (contexts.has(rendererContextResult)) {
    return contexts.get(rendererContextResult);
  }
  const ctx = {
    currentIndex: 0,
    get id() {
      return ID_PREFIX + this.currentIndex.toString();
    }
  };
  contexts.set(rendererContextResult, ctx);
  return ctx;
}
function incrementId(rendererContextResult) {
  const ctx = getContext(rendererContextResult);
  const id = ctx.id;
  ctx.currentIndex++;
  return id;
}

const StaticHtml = defineComponent({
  props: {
    value: String,
    name: String,
    hydrate: {
      type: Boolean,
      default: true
    }
  },
  setup({ name, value, hydrate }) {
    if (!value) return () => null;
    let tagName = hydrate ? "astro-slot" : "astro-static-slot";
    return () => h(tagName, { name, innerHTML: value });
  }
});
var static_html_default = StaticHtml;

async function check$1(Component) {
  return !!Component["ssrRender"] || !!Component["__ssrInlineRender"];
}
async function renderToStaticMarkup$1(Component, inputProps, slotted, metadata) {
  let prefix;
  if (this && this.result) {
    prefix = incrementId(this.result);
  }
  const attrs = { prefix };
  const slots = {};
  const props = { ...inputProps };
  delete props.slot;
  for (const [key, value] of Object.entries(slotted)) {
    slots[key] = () => h(static_html_default, {
      value,
      name: key === "default" ? void 0 : key,
      // Adjust how this is hydrated only when the version of Astro supports `astroStaticSlot`
      hydrate: metadata?.astroStaticSlot ? !!metadata.hydrate : true
    });
  }
  const app = createSSRApp({ render: () => h(Component, props, slots) });
  app.config.idPrefix = prefix;
  await setup();
  const html = await renderToString(app);
  return { html, attrs };
}
const renderer$1 = {
  name: "@astrojs/vue",
  check: check$1,
  renderToStaticMarkup: renderToStaticMarkup$1,
  supportsAstroStaticSlot: true
};
var server_default$1 = renderer$1;

const slotName = (str) => str.trim().replace(/[-_]([a-z])/g, (_, w) => w.toUpperCase());
async function check(Component, props, { default: children = null, ...slotted } = {}) {
  if (typeof Component !== "function") return false;
  const slots = {};
  for (const [key, value] of Object.entries(slotted)) {
    const name = slotName(key);
    slots[name] = value;
  }
  try {
    const result = await Component({ ...props, ...slots, children });
    return result[AstroJSX];
  } catch (e) {
    throwEnhancedErrorIfMdxComponent(e, Component);
  }
  return false;
}
async function renderToStaticMarkup(Component, props = {}, { default: children = null, ...slotted } = {}) {
  const slots = {};
  for (const [key, value] of Object.entries(slotted)) {
    const name = slotName(key);
    slots[name] = value;
  }
  const { result } = this;
  try {
    const html = await renderJSX(result, createVNode(Component, { ...props, ...slots, children }));
    return { html };
  } catch (e) {
    throwEnhancedErrorIfMdxComponent(e, Component);
    throw e;
  }
}
function throwEnhancedErrorIfMdxComponent(error, Component) {
  if (Component[Symbol.for("mdx-component")]) {
    if (AstroUserError.is(error)) return;
    error.title = error.name;
    error.hint = `This issue often occurs when your MDX component encounters runtime errors.`;
    throw error;
  }
}
const renderer = {
  name: "astro:jsx",
  check,
  renderToStaticMarkup
};
var server_default = renderer;

const renderers = [Object.assign({"name":"@astrojs/svelte","clientEntrypoint":"@astrojs/svelte/client.js","serverEntrypoint":"@astrojs/svelte/server.js"}, { ssr: server_default$2 }),Object.assign({"name":"@astrojs/vue","clientEntrypoint":"@astrojs/vue/client.js","serverEntrypoint":"@astrojs/vue/server.js"}, { ssr: server_default$1 }),Object.assign({"name":"astro:jsx","serverEntrypoint":"file:///Users/elke/Repositories/elkecodes/node_modules/@astrojs/mdx/dist/server.js"}, { ssr: server_default }),];

export { attr_class as a, clsx as c, renderers as r };

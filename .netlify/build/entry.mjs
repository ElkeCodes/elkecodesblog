import { r as renderers } from './chunks/_@astro-renderers_viVe0l8t.mjs';
import { s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_CvSoi7hX.mjs';
import { manifest } from './manifest_DALz_PPk.mjs';
import { createExports } from '@astrojs/netlify/ssr-function.js';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/blog.astro.mjs');
const _page1 = () => import('./pages/coding/pomodoro/data.astro.mjs');
const _page2 = () => import('./pages/coding/pomodoro/usepomodoro.astro.mjs');
const _page3 = () => import('./pages/coding/pomodoro/usetimer.astro.mjs');
const _page4 = () => import('./pages/coding/pomodoro.astro.mjs');
const _page5 = () => import('./pages/coding/rendez-vous-with-cassidoo.astro.mjs');
const _page6 = () => import('./pages/coding.astro.mjs');
const _page7 = () => import('./pages/images/og/_---route_.astro.mjs');
const _page8 = () => import('./pages/now.astro.mjs');
const _page9 = () => import('./pages/posts/_---slug_.astro.mjs');
const _page10 = () => import('./pages/resume/base.astro.mjs');
const _page11 = () => import('./pages/resume/experience.astro.mjs');
const _page12 = () => import('./pages/resume.astro.mjs');
const _page13 = () => import('./pages/rss.xml.astro.mjs');
const _page14 = () => import('./pages/tags/_tag_.astro.mjs');
const _page15 = () => import('./pages/tags.astro.mjs');
const _page16 = () => import('./pages/talks.astro.mjs');
const _page17 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["src/pages/blog.astro", _page0],
    ["src/pages/coding/pomodoro/data.ts", _page1],
    ["src/pages/coding/pomodoro/usePomodoro.ts", _page2],
    ["src/pages/coding/pomodoro/useTimer.ts", _page3],
    ["src/pages/coding/pomodoro/index.astro", _page4],
    ["src/pages/coding/rendez-vous-with-cassidoo.astro", _page5],
    ["src/pages/coding/index.astro", _page6],
    ["src/pages/images/og/[...route].ts", _page7],
    ["src/pages/now.astro", _page8],
    ["src/pages/posts/[...slug].astro", _page9],
    ["src/pages/resume/base.md", _page10],
    ["src/pages/resume/Experience.md", _page11],
    ["src/pages/resume/index.astro", _page12],
    ["src/pages/rss.xml.js", _page13],
    ["src/pages/tags/[tag].astro", _page14],
    ["src/pages/tags/index.astro", _page15],
    ["src/pages/talks.astro", _page16],
    ["src/pages/index.astro", _page17]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./_noop-actions.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "98023b89-be91-43bb-953b-65db9034583c"
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { __astrojsSsrVirtualEntry as default, pageMap };

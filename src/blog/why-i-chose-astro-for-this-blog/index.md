---
layout: ../../../layouts/MarkdownPostLayout.astro
title: "Why I chose Astro for this blog"
pubDate: 2025-06-28
description: "At the time of writing, I'm on parental leave to support my wife and take care of our newborn son. In the spare time that I can find between changing diapers, I like tinkering around with technology and was eager to start a blog. Here are my key takeaways of what I like about Astro and what made me choose Astro, in no particular order."
shortDescription: "Key takeaways of what I like about Astro and what made me choose Astro"
author: "Elke Heymans"
image:
  url: "rocket.png"
  alt: "The Astro logo on a dark background with a pink glow."
tags: ["astro", "blog", "review", "frontend"]
---

## Ease of setup

When you initialize a new [Astro](https://astro.build) project using:

```shell
npm create astro@latest
```

You'll get a couple of basic questions and that's it.
No need to think too much about what extra framework you need to use, just a quick install and some info on what to do afterwards.
Here's what the final setup prompt looks like:

```bash
❯ npm create astro@latest

> elkecodes@0.0.1 npx
> create-astro


 astro   Launch sequence initiated.

   dir   Where should we create your new project?
         ./test

  tmpl   How would you like to start your new project?
         A basic, helpful starter project

  deps   Install dependencies?
         Yes

   git   Initialize a new git repository?
         Yes

      ✔  Project initialized!
         ■ Template copied
         ■ Dependencies installed
         ■ Git initialized

  next   Liftoff confirmed. Explore your project!

 Enter your project directory using cd ./test
 Run npm run dev to start the dev server. CTRL+C to stop.
 Add frameworks like react or tailwind using astro add.

 Stuck? Join us at https://astro.build/chat

╭─────╮  Houston:
│ ◠ ◡ ◠  Good luck out there, astronaut! 🚀
╰─────╯
```

I always prefer a very basic setup with a lot of customisation possible later on.
For example if I want to add support for a frontend framework, I don't have to lock in my decision just yet.
I love to get started quickly without having to look forward too much.

> “The secret of getting ahead is getting started. The secret of getting started is breaking your complex, overwhelming tasks into small, manageable tasks, and then starting on the first one.”
> — Mark Twain

## Extremely fast dev server

The startup time is lightning fast!
We're talking about 123ms on initial launch...
Even with the knowledge that Astro is built on top of Vite, I was still impressed!

```bash
❯ npm run dev

> test@0.0.1 dev
> astro dev

08:24:09 [types] Generated 1ms
08:24:09 [content] Syncing content
08:24:09 [content] Synced content

 astro  v5.10.0 ready in 123 ms

┃ Local    http://localhost:4321/
┃ Network  use --host to expose

08:24:09 watching for file changes...
```

## Markdown with syntax highlighting

By default, Astro has support for Markdown pages with the bonus that it directly incorporates syntax highlighting.
In the past when I looked at other frameworks like [Gatsby](https://www.gatsbyjs.com/), [Gridsome](https://gridsome.org/), [NextJS](https://nextjs.org/), and others, I've had to add Markdown support and/or syntax highlighting support.
Since this was going to be a blog where I don't want to use a CMS and where I'll share code, Markdown + syntax highlighting was a must for me.
Astro’s built-in syntax highlighting means no extra plugins or config—just write Markdown, and it works.

An example of the syntax highlighting, with the code from [an interview question to check if two strings are anagrams](https://github.com/ElkeCodes/rendezvous-with-cassidoo-interview-questions/blob/0e470bf2c0b86d72a42ad4149574b37ee9837a30/src/days/0003-anagrams/0003.md):

```javascript
function normalize(s: string): string {
  return s
    .replace(/[^\w\s]|_/g, "") // Remove punctuation and underscores
    .replace(/\s+/g, "") // Remove whitespace
    .toLowerCase(); // Convert to lowercase
}

export function isAnagram(a: string, b: string): boolean {
  const lettersToMatchA = normalize(a).split("").sort();
  const lettersToMatchB = normalize(b).split("").sort();

  if (lettersToMatchA.length !== lettersToMatchB.length) {
    return false;
  }

  return lettersToMatchA.every((x, index) => lettersToMatchB[index] === x);
}
```

## Static Site Generation with partial hydration

Many Static Site Generators produce fast websites, but they often rely on hydration to render content.
Hydration is useful for highly dynamic websites like those with real-time user interactions such as comments.
But it's overkill for a static blog where updates only occur when new posts are published.

Full hydration forces the client to download and execute JavaScript just to render HTML and CSS, which is unnecessary for mostly static content.
With [Astro's Islands architecture](https://docs.astro.build/en/concepts/islands/) (based on [Jason Miller's Islands Architecture concept](https://jasonformat.com/islands-architecture/), image also courtesy of him), Astro has introduced the concept of partial hydration.
Instead of hydrating the entire page, Astro performs partial hydration, sending only the JavaScript required for interactive components or none at all if the page is entirely static.
![Jason Miller's Islands Architecture concept](./islands-architecture.png)

By default, Astro renders every component as pure HTML and CSS, eliminating unnecessary client-side JavaScript.
When interactivity is needed, we can use the directive `client:load` to force Astro to ship the JavaScript to the client so that our interactivity is not lost:

```vue
<MyVueComponent client:load />
```

This approach keeps Astro sites lean by default while still supporting dynamic features when required.

## No lock-in to a framework

One of my favorite things about Astro is how flexible it is with JavaScript frameworks.
You're not forced to use a specific one, Astro lets you [mix and match components](https://docs.astro.build/en/guides/framework-components/#mixing-frameworks) from React, Vue, Svelte, and more.
[Next.js](https://nextjs.org/) leans on React, [Nuxt](https://nuxt.com/) leans on Vue, while Astro lets me use Vue for widgets and Svelte for animations

```js
import MyReactComponent from '../components/MyReactComponent.jsx';
import MySvelteComponent from '../components/MySvelteComponent.svelte';
import MyVueComponent from '../components/MyVueComponent.vue';
---
<div>
  <MySvelteComponent />
  <MyReactComponent />
  <MyVueComponent />
</div>
```

Installing one of the supported JavaScript frameworks is literally a one-liner (f.e. Svelte):

```bash
npx astro add svelte
```

## Conclusion

I had this basic blog up and running faster than I expected.
The straightforward setup, intuitive structure, helpful documentation made the entire process smooth, even with a newborn demanding my attention between commits.
I have to mention the [official tutorial](https://docs.astro.build/en/tutorial/0-introduction/) for being so clear and easy to follow, that saved me a lot of time and looking things up.
Overall, I'm very happy with Astro and would definitely recommend it.
Whether you're a junior developer taking your first steps into web development or an experienced developer like me, it's worth checking out.

Now that the foundation is in place, it’s time for the real challenge: actually writing.
No more hiding behind code.
It's time to share thoughts, experiments, and lessons learned, one blogpost at a time.

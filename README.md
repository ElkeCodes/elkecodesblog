# Elkecodes.dev

This is the repository for my personal website that can be found on [https://elkecodes.dev](https://elkecodes.dev).
I'm a frontend developer specializing in React, with a background in Vue, Angular, and some fullstack work (NodeJS & C#).
On this blog, I'm sharing my insights on tech, code snippets, hobbies, and more.
At the same time, it's a bit of a playground for me to try out new tech such as Svelte while also keeping my other web framework knowledge up to par.

## The tech stack

| Technology      | Purpose              | Notes                                                                           |
| --------------- | -------------------- | ------------------------------------------------------------------------------- |
| Astro           | Leveraging the site  |                                                                                 |
| TypeScript      | Typing               | To keep my code more in check                                                   |
| Vite            | Running & building   | Default choice by Astro and I'm all for it as the DX is huge                    |
| Vitest          | Testing (unit)       |                                                                                 |
| happy-dom       | Testing (unit)       | As a way to mock the DOM tree in my unit tests                                  |
| Cypress         | Testing (e2e)        |                                                                                 |
| Testing library | Testing (unit & e2e) | Used to have access to accessibility selectors for my vitests and Cypress tests |
| Markdown        | Blog pages           |                                                                                 |
| Svelte          | BackToTop component  | Added as a way to dip my toes into the world of Svelte                          |
| Vue             | Pomodoro page        | To get back up to speed with my Vue knowledge                                   |
| astro-og-canvas | OpenGraph images     | Helps generate OG images for social media                                       |

## Testing

Yes, I have written all kinds of tests for this blog.
I test all components, utilities and pages in unit tests.
With a test coverage of 100%, I'm still not happy as not all tests are that useful so I'm in the works of upgrading everything.
Thanks to Cypress, I'm able to write even better tests that go beyond the scope of 1 UI element for example.

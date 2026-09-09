---
title: "CRAFT model for better AI prompts"
pubDate: 2026-09-09
description: "Using the CRAFT model as a way to improve my prompts, saving time and tokens"
shortDescription: "Saving time and tokens "
author: "Elke Heymans"
image:
  url: "psychology_alt.png"
  alt: "Shape of a face with a question mark on it, as a visual representation of a mental model"
tags: ["ai", "prompts", "models"]
---

I had never heard about the CRAFT prompting model but it makes so much sense to use it to create better prompts for your AI.

CRAFT:
* Context: what information is relevant, what needs to be taken into account
* Role: what persona should the AI take on
* Action: what is the task to be performed
* Format: what is the desired output
* Tone or Tweaks: defining the style or adding rules to tighten down the results

So a prompt in my frontend work that would follow the CRAFT model is:


> As a React developer, write me a new UI component combobox.
> The combobox should reuse the existing FormInput component.
> Create the new component in its own separate file and reuse other UI components if necessary.
> Use TypeScript and the existing Tailwind classes.
> It should debounce the input values and should filter in an existing set of options that are given as a prop on the component.

In the past I would just write the prompt: 

> Write me a combobox component

But the power of AI lies in the extra information that you give and the context and clarification that you provide. 
I had already learned to extend my prompts with extra info but with the CRAFT prompting model in mind, I now have a mental checklist which will avoid a lot of back and forth with the models to clarify things.

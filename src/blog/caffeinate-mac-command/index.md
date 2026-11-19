---
title: "Keep your Mac awake with caffeinate"
pubDate: 2026-11-19
description: "A quick look at using the macOS caffeinate command to keep your screen or Mac awake."
shortDescription: "Keep your Mac awake from the command line"
author: "Elke Heymans"
image:
  url: "coffee-mug.svg"
  alt: "A steaming coffee mug"
tags: ["macos", "terminal"]
---

Sometimes you need your Mac to stay awake while a download, script, or long-running task is doing its thing.
For my current work, I have to run some scripts overnight where I don't want my mac to go into sleep mode nor do I want it to lock itself.
In the settings I can prevent it from going into sleep but the auto lock was not configurable so I had to find another way to keep my mac "awake".

macOS has a handy command for that: `caffeinate`.

To keep the **display** awake, use `-d`:

```bash
caffeinate -d
```

To keep it awake for a set amount of time, use `-t` with a duration in seconds. For example, this keeps it awake for an hour:

```bash
caffeinate -t 3600
```

And if you want to keep your Mac from going to sleep until a command finishes, use `-i` followed by that command:

```bash
caffeinate -i npm run build
```

Once the command finishes, the sleep prevention stops too.
---
layout: ../../../layouts/MarkdownPostLayout.astro
title: "Key takeaways after 50+ interview questions"
pubDate: 2030-07-01
description: "I've been an avid reader of Cassidoo's weekly newsletter for some time now. Part of her newsletter is a weekly interview question where you mail/tweet/whatever the solution to her. I've started solving these interview questions since a couple of months and have solved older ones as well, here's what I've learned."
author: "Elke Heymans"
tags: ["interviews", "puzzles", "frontend"]
---

## Takeaway #1: consistency matters

## Takeaway #2: being comfortable in the technology helps

## Takeaway #3: Wikipedia is your friend

## Takeaway #4: not every question can be solved the same day

There have been days that I had absolutely no idea how to start on that interview question of the week.
[Newsletter #399](https://buttondown.com/cassidoo/archive/8-you-can-have-a-plan-but-you-have-to-be-flexible/#:~:text=Interview%20question%20of%20the%20week) was especially difficult for a couple of reasons:

- I had never heard of a Leyland number so I had to do some reading on what they actually are
- Reading about Leyland numbers was very confusing as nobody gave a clear breakdown of all the `x` and `y` values to get to the sequence `8, 17, 32, 54, 57, 100, ...`
- When I started tinkering around with `x` and `y` values, it became even more confusing as they weren't properly sequential. There was no correlation between `x`, `y` and the number in the sequence (see table below)

| x value | y value |          Caluclation          | Leyland number |
| :-----: | :-----: | :---------------------------: | -------------- |
|    2    |    2    | 2<sup>2</sup> + 2<sup>2</sup> | 8              |
|    2    |    3    | 2<sup>3</sup> + 3<sup>2</sup> | 17             |
|    2    |    4    | 2<sup>4</sup> + 4<sup>2</sup> | 32             |
|    3    |    3    | 3<sup>3</sup> + 3<sup>3</sup> | 54             |
|    2    |    5    | 2<sup>5</sup> + 5<sup>2</sup> | 57             |
|    2    |    6    | 2<sup>6</sup> + 6<sup>2</sup> | 100            |

It's okay to have to read up on some information and having to dive into some literature.
In the situation that this would have been a question in a real job interview, I would have started asking questions to show how to handle this kind of situation:

- What is a Leyland number?
-

## Takeaway #5: basic algorithms and data structure knowledge comes in handy

In the first 50 interview questions that I solved, I used the following algorithms and principles:

- Breadth First Search
- Depth First Search
- Any kind of sorting
- Recursion
- Iteration
- Generator

And the following data structures:

- Array
- Queue
- Stack
- [BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt) (or the equivalent to store large numbers in the language you use)

## Conclusion

You can find all the solutions on [my GitHub](https://github.com/ElkeCodes/rendezvous-with-cassidoo-interview-questions/tree/main/src/days).
The weekly newsletter can be found on [Cassidoo's website](https://cassidoo.co/newsletter/) and is highly recommended for your weekly dose of what's new and cool in the world of web development along with an interview question, jokes, stories and pictures of mechanical keyboards.

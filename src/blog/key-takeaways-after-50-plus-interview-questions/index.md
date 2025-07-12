---
layout: ../@layouts/MarkdownPostLayout.astro
title: "Key takeaways after 50+ interview questions"
pubDate: 2030-07-11
description: "I've been an avid reader of Cassidoo's weekly newsletter for some time now. Part of her newsletter is a weekly interview question where you mail/tweet/whatever the solution to her. I've started solving these interview questions since a couple of months and have solved older ones as well, here's what I've learned."
shortDescription: "After solving a numerous amount of interview questions, it's time to look back at what I've learned"
author: "Elke Heymans"
image:
  url: "psychology_alt.png"
  alt: "Shape of a face with a question mark on it, as a visual representation of an interview question"
tags: ["interviews", "puzzles", "frontend"]
---

## Takeaway #1: be comfortable in the technology

The very first time I solved one of Cassidoo's interview questions, I had done it using Rust.
As I'm a frontend developer, you wouldn't expect a language like Rust in my repertoire.
The cliché of frontend developers (especially the ones like me that focus on Single Page Applications) is that we can only use JavaScript and hopefully have knowledge about TypeScript.
But I've learned and used other languages in the past.
I was a professional .NET developer for 4 years where I mainly used C# (and for 4 months I had to write COBOL).
During my university years, I've dabbled in numerous other programming languages like C, C++, Assembly (for the 8086), Java, Ruby, Objective-C, Scheme and so on.

I had so many language options to choose from.
And there was definitely a motivation to pick up something new or refresh some old knowledge.
That's why I did my first solve in Rust.
But I knew for a fact that I was going to make it very hard on myself if I wanted to solve ALL interview questions.
So I returned back to what I know best: JavaScript.
It's the language I use in my current career and for which I know a lot of the ins and outs.
The result is that I'm a lot faster in solving a question now than when I was trying to get it solved in Rust.

Still, I'm proud of my Rust solve for the [interview question of issue #397](https://buttondown.com/cassidoo/archive/this-present-moment-was-once-the-unimaginable/) so here's the code:

```rust
use std::cmp;

fn find_longest_streak(input: &[bool], goal: usize) -> usize {
    let mut max = 0;
    let mut current = 0;

    for &value in input {
        if value {
            current += 1;
            max = cmp::max(current, max);
        } else {
            current = 0;
        }
    }

    if max >= goal {
        max
    } else {
        0
    }
}
```

## Takeaway #2: make sure you understand the question fully

In [issue #412](https://buttondown.com/cassidoo/archive/a-genius-is-the-one-most-like-himself-thelonious/), the interview question was:

> Given an array of fireworks representing a series going off, write a function to find the "grand finale" of the show! A grand finale is defined as the longest subarray where the average size is at least 5, the minimum velocity is 3, and the difference between the min and max height is no more than 10. Return the starting index of the grand finale.

After I read that, I immediately tried to solve it by finding the "grand finale".
The issue was, that I thought of the "grand finale" as the last subarray with the correct requirements for average size, minimum velocity and difference in min and max height.
But the "grand finale" is actually the longest subarray!
I was solving it all wrong, just because I presumed that "finale" would mean that we're looking at the final big ending.

## Takeaway #3: Wikipedia is your friend

## Takeaway #4: not every question can be solved the same day

There have been days that I had absolutely no idea how to start on that interview question of the week.
[Newsletter #399](https://buttondown.com/cassidoo/archive/8-you-can-have-a-plan-but-you-have-to-be-flexible/#:~:text=Interview%20question%20of%20the%20week) was especially difficult:

> Write a function that returns the first n Leyland numbers in ascending order. A Leyland number is defined as x^y + y^x for integers x > 1 and y > 1.

The reason for the higher difficulty were:

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
- Are there any constraints to the `x` and `y` values?
- What is the reason behind finding the first n Leyland numbers?
- Is this a question that is asked regularly? I.e. should we cache the result somewhere or do some precalculations?

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

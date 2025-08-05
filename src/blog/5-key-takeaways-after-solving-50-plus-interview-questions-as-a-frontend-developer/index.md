---
layout: ../@layouts/MarkdownPostLayout.astro
title: "5 key takeaways from solving 50+ coding interview questions as a frontend developer"
pubDate: 2025-08-05
description: "I've been an avid reader of Cassidoo's weekly newsletter for some time now. Part of her newsletter is a weekly interview question that I've started to solve. Here's 5 takeaways about solving these questions and why it has made me a better developer."
shortDescription: "After solving a numerous amount of interview questions, it's time to look back at what I've learned"
author: "Elke Heymans"
image:
  url: "psychology_alt.png"
  alt: "Shape of a face with a question mark on it, as a visual representation of an interview question"
tags: ["interviews", "puzzles", "frontend"]
---

## Takeaway #1: being comfortable in the technology helps

The very first time I solved one of Cassidoo's interview questions, I had done it using Rust.
As I'm a frontend developer, you wouldn't expect a language like Rust in my repertoire.
The cliché of frontend developers is that we can only use JavaScript and hopefully have some knowledge about TypeScript.

After 3 hours battling Rust's ownership model for a simple streak counter, I had an epiphany.
Solving an interview question isn't about proving I can use fancy tools.
**It's about reliably solving problems**.
My TypeScript solution took less than 15 minutes and passed all edge cases on the first try.

Still, I'm proud of my Rust solve for the [interview question of issue #397](https://buttondown.com/cassidoo/archive/this-present-moment-was-once-the-unimaginable/) but my Javascript solution was so much shorter and cleaner:

```typescript
export function findLongestStreak(data: Array<boolean>, goal: number): number {
  let max = 0,
    current = 0;
  data.forEach((truthyValue) => {
    current = truthyValue ? current + 1 : 0;
    max = Math.max(max, current);
  }, 0);
  return max >= goal ? max : 0;
}
```

## Takeaway #2: make sure you understand the question fully

In [issue #412](https://buttondown.com/cassidoo/archive/a-genius-is-the-one-most-like-himself-thelonious/), the interview question was:

> Given an array of fireworks representing a series going off, write a function to find the "grand finale" of the show! A grand finale is defined as the longest subarray where the average size is at least 5, the minimum velocity is 3, and the difference between the min and max height is no more than 10. Return the starting index of the grand finale.

After I read that, I immediately tried to solve it by finding the "grand finale".
The issue was, that I thought of the "grand finale" as the last subarray with the correct requirements for average size, minimum velocity and difference in min and max height.
But the "grand finale" is actually the longest subarray!
I was solving it all wrong, just because I presumed that "finale" would mean that we're looking at the final big ending.

Nowadays, **I reread the question to ensure that I fully understand what is actually being asked**.
This way, I avoid solving the wrong thing.

## Takeaway #3: not every question can be solved the same day

There have been days that I had absolutely no idea how to start on that interview question of the week.
[Newsletter #399](https://buttondown.com/cassidoo/archive/8-you-can-have-a-plan-but-you-have-to-be-flexible/#:~:text=Interview%20question%20of%20the%20week) was an example of a difficult question:

> Write a function that returns the first n Leyland numbers in ascending order. A Leyland number is defined as x^y + y^x for integers x > 1 and y > 1.

The reason for the higher difficulty were:

- I had never heard of a Leyland number so I had to do some reading on what they actually are
- Reading about Leyland numbers was very confusing as nobody gave a clear breakdown of all the `x` and `y` values to get to the sequence `8, 17, 32, 54, 57, 100, ...`
- When I started tinkering around with `x` and `y` values, it became even more confusing as they weren't properly sequential. There was no correlation between `x`, `y` and the number in the sequence.

```typescript
function badLeyland(n: number) {
  const result = [];
  for (let x = 2; result.length < n; x++) {
    for (let y = 2; y <= x; y++) {
      result.push(x**y + y**x); 
    }
  }
  return result.sort((a,b) => a-b).slice(0,n); 
}
```

This code had numerous problems: it created duplicates instead of a clean sequence and if the requested n numbers was too high, it started to create a wrong sequence.
In the end, I found this cleaner solution with clever use of a Set and building up a longer temporary sequence (by looping n<sup>2</sup> times instead of n times) that we clean up at the end:

```typescript
export function getLeylandNumbersWithSet(n: number): number[] {
  const result = new Set<number>();
  for (let x = 2; result.size < n**2; x++) {
    for (let y = 2; y <= x; y++) {
      result.add(x**y + y**x);
    }
  }
  return [...result].sort((a, b) => a - b).slice(0, n);
}
```

**It's okay to have to read up on some information and having to dive into some literature**.
I've ended up learning more about certain concepts like [Leyland numbers](https://github.com/ElkeCodes/rendezvous-with-cassidoo-interview-questions/blob/7771c0bde200442d1fa4d0c93974621c8dab585d/src/days/0399-leyland-numbers/get-leyland-numbers.ts) and [the NATO phonetic alphabet](https://github.com/ElkeCodes/rendezvous-with-cassidoo-interview-questions/blob/7771c0bde200442d1fa4d0c93974621c8dab585d/src/days/0387-nato-phonetic-alphabet/natoify.ts).

## Takeaway #4: basic algorithms and data structure knowledge comes in handy

In the first 50 interview questions that I solved, I used algorithms like Breadth First Search, Depth First Search, recursion, generators and so on. 
I also used data structures like Queue, Stack and BigInt.
**Having knowledge of these algorithms, principles and data structures really helps**.
But if you don't know them, solving the interview question is the perfect time to learn more about it!
My knowledge of Breadth First Search and Depth First Search was kind of rusty.
But by using these algorithms, I was able to cut down on the runtime of certain solutions a lot as they're much more efficient.

It's also interesting that I have implemented some of these data structures as they were a question on their own.
For example, I've had to create a [queue with two stacks](https://github.com/ElkeCodes/rendezvous-with-cassidoo-interview-questions/blob/7771c0bde200442d1fa4d0c93974621c8dab585d/src/days/0005-queue-with-two-stacks/queue-with-two-stacks.ts) or [my own hashmap](https://github.com/ElkeCodes/rendezvous-with-cassidoo-interview-questions/blob/7771c0bde200442d1fa4d0c93974621c8dab585d/src/days/0238-hashmap-reimplemented/elkes-hashmap.ts).

## Takeaway #5: you'll be able to learn the quirks and advanced concepts

One question you could be asking yourself is: "why would I even bother solving puzzles and interview questions?".
For me, one of the reasons was that **I could learn more about the quirks and advanced concepts in JavaScript/TypeScript**:

Throughout these interview challenges, I've deepened my understanding of several advanced JavaScript/TypeScript concepts:

- **BigInt**: Used to [handle large numbers safely](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt) and thus avoiding integer overflow issues
- **Generators**: Practiced with [iterator patterns](https://github.com/ElkeCodes/rendezvous-with-cassidoo-interview-questions/blob/7771c0bde200442d1fa4d0c93974621c8dab585d/src/days/0408-traffic-sequence/is-valid-traffic-sequence.ts) by using a generator to create an infinite stream of output
- **Bitwise operations**: Solved IP range problems efficiently in the [IP address validator](https://github.com/ElkeCodes/rendezvous-with-cassidoo-interview-questions/blob/7771c0bde200442d1fa4d0c93974621c8dab585d/src/days/0204-ip-address-in-range/in-range.ts) by using some clever bit calculations
- **Generics**: Implemented [type-safe reusable utilities](https://github.com/ElkeCodes/rendezvous-with-cassidoo-interview-questions/blob/7771c0bde200442d1fa4d0c93974621c8dab585d/src/days/shared/partition.ts) for different data types
- **Complex type systems**: Designed [nested type structures](https://github.com/ElkeCodes/rendezvous-with-cassidoo-interview-questions/blob/7771c0bde200442d1fa4d0c93974621c8dab585d/src/days/0407-nest-array/nest-array.ts) for hierarchical data
- **Algorithms**: Applied [BFS](https://github.com/ElkeCodes/rendezvous-with-cassidoo-interview-questions/blob/7771c0bde200442d1fa4d0c93974621c8dab585d/src/days/0404-add-operators/add-operators.ts) for expression evaluation and [Set operations](https://github.com/ElkeCodes/rendezvous-with-cassidoo-interview-questions/blob/7771c0bde200442d1fa4d0c93974621c8dab585d/src/days/0346-unique-sum/unique-sum.ts) for deduplication

## Conclusion

You can find all the solutions on [my GitHub](https://github.com/ElkeCodes/rendezvous-with-cassidoo-interview-questions/tree/main/src/days).
The weekly newsletter can be found on [Cassidoo's website](https://cassidoo.co/newsletter/) and is highly recommended for your weekly dose of what's new and cool in the world of web development along with an interview question, jokes, stories and pictures of mechanical keyboards.

Will I continue solving interview questions?
Hell yeah!
Thanks to solving these interview questions, I've deepened my knowledge of JavaScript/TypeScript.
I've also refreshed my algorithm skills by having to reimplement algorithms like Breadth First Search.
Lastly, it has made me a better debugger, not just a coder:
- I use the debugger a lot more
- I avoid using too much `console.log` to debug
- I write more test cases and try to find edge cases

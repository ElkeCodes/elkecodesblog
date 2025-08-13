---
title: "The Power of Memoization: A Deep Dive into Caching Functions in TypeScript"
pubDate: 2025-08-11
description: "Memoization is a powerful optimization technique that can supercharge your JavaScript applications by eliminating redundant calculations."
shortDescription: "Eliminate redundant calculations and elevate performance by using memoization"
author: "Elke Heymans"
image:
  url: "memory.png"
  alt: "Icon of a computer memory chip, representing the cache that is utilised in memoization"
tags: ["optimisation", "performance", "frontend"]
---

With memoization, we examine a function's arguments and save its return value on the first call.
Subsequent calls with the same arguments skip computation and return the cached result, thus effectively avoiding having to redo heavy calculations.

Let's take an example of a function that does for example some string formatting:

```typescript
const currencyFormat = (value: number, locale: string, currency: string) => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(value);
};
```

If we end up in a situation that this function needs to be called a couple of times with the same values, we end up with formatting the same thing over and over.
Memoizing the function is very easy with our `memoize` function:

```typescript
const memoizedCurrencyFormat = memoize(currencyFormat);
```

Let us now create some tests by simply calling the `currencyFormat` a 1000 times, everytime with a new input for 5 times for that input.
We do this for both the normal and the memoized version.
The test simulates repeated calls with identical arguments which is a common scenario in UI rendering where components might recalculate with unchanged props.

```typescript
const AMOUNT_OF_CALLS = 1_000;

for (let i = 0; i < AMOUNT_OF_CALLS; i++) {
  currencyFormat(i, "nl-BE", "EUR");
  currencyFormat(i, "nl-BE", "EUR");
  currencyFormat(i, "nl-BE", "EUR");
  currencyFormat(i, "nl-BE", "EUR");
  currencyFormat(i, "nl-BE", "EUR");
}

for (let i = 0; i < AMOUNT_OF_CALLS; i++) {
  memoizedCurrencyFormat(i, "nl-BE", "EUR");
  memoizedCurrencyFormat(i, "nl-BE", "EUR");
  memoizedCurrencyFormat(i, "nl-BE", "EUR");
  memoizedCurrencyFormat(i, "nl-BE", "EUR");
  memoizedCurrencyFormat(i, "nl-BE", "EUR");
}
```

You can see the results for yourself in [this code example](https://www.typescriptlang.org/play/?#code/GYVwdgxgLglg9mABAWwKbLjAXqgPAWAChETEBZdTHAEwCVUoQAnMAGiNPMu1WoDFw0eElQAPKKjDUAzogAUAOiUBDJgHNpALkTKwATwDaAXQCUiALwA+Lhh50GzNkUtzkegZFgJtFWzQ9CCCY+3P6CXkgA3hykEAjSUIgQyhAAFqgWiGCoAO7kygAOuAlMMGBqrDZUvPSMLC4mANxEMSRMDizyiirqWjr6xmZWiNHEnLHxiQDWqHqZAFIAygDyAHIKJWVqMMB6cqoaTa3jO-IAhMlpqAqpytJyM3omZqPjb0kp6RsMD7OVbgEIt0FAdpM9mmM3gBfY6cdp1JCXL5qH6PI6QxBQsx3Kp2QHCCEwwhEOJgBKIYAwABGCBSEBgmTkYG0YBAyCpqCYwSybI5TAs1lepFOTIs5kQAAYzPDHJKIZwRUhzOKAIzSjpIFXy0gyzqUmlgOkwUUAWkQasQAGoKdTaRB6abEAAmdFEkmTFChXh8W2G+0M8VoPyoORMlm8znc1nszkCkbHRViyXqhFyhPAeRK1Up2Va466pBB6r8X1Gx0W61FvGl-2Ol2E9HusmJJWIAAsEohTfJCVUiXFBU5wDgTGQugg1zAcBycnRpOkcAANtdF3A1HJ9XaHWBnt2lyu13IAETtCDMaQwABuGWSi8XiCgcDgUyPlUHTGHo-Hk+ns8QZt7JgoEqAByZBpBAkwWkIedEirGhFigPtMnfT8x0gH8ZzneJ9wUVd13g70a23XcYJw5c8MPI9COoD47wfJ8XzfIcR3QicFCnLD-09YNqEQvtQPAyCgA).

I ran it 5 times to find out how long everything took and came with these results:

|             | Normal function | Memoized function |
| ----------- | --------------: | ----------------: |
| Run 1       |        116.50ms |           19.90ms |
| Run 2       |        116.60ms |           19.70ms |
| Run 3       |        117.60ms |           19.80ms |
| Run 4       |        118.30ms |           20.00ms |
| Run 5       |        113.90ms |           19.60ms |
| **Average** |    **116.58ms** |       **19.80ms** |

<!--
Raw results:
[LOG]: "currencyFormat",  116.5
[LOG]: "memoizedCurrencyFormat",  19.900000035762787
[LOG]: "currencyFormat",  116.60000002384186
[LOG]: "memoizedCurrencyFormat",  19.69999998807907
[LOG]: "currencyFormat",  117.59999996423721
[LOG]: "memoizedCurrencyFormat",  19.80000001192093
[LOG]: "currencyFormat",  118.29999995231628
[LOG]: "memoizedCurrencyFormat",  20
[LOG]: "currencyFormat",  113.89999997615814
[LOG]: "memoizedCurrencyFormat",  19.599999964237213
-->

On average, the memoized version is 5.89 times faster than the normal version.
The only small footnote that we have to make here is that this is an extreme comparison and that the performance gain is highly dependent on the context.

Let's explore how this simple concept can transform your application's efficiency.

## The Memoization Function

```typescript
export function memoize<
  MemoizedReturn,
  MemoizedFunction extends (...args: any[]) => MemoizedReturn,
>(myFunction: MemoizedFunction): MemoizedFunction {
  const cache = new Map<string, MemoizedReturn>();

  return ((...args: any[]) => {
    const key = JSON.stringify(args);
    if (!cache.has(key)) {
      cache.set(key, myFunction(...args));
    }
    return cache.get(key);
  }) as MemoizedFunction;
}
```

In the function definition, we have 2 generic parameters.
The first being `MemoizedReturn` to allow for the user to give a custom type to what the memoized call should return.
The second is the `MemoizedFunction`, which allows us to create the memoized function with the same function signature as the original.

In the `memoize` function, we use a `Map` to allow for O(1) lookup time.
This `Map`, uses a stringified version of all the function arguments as a key.
Each time the memoized function is called, it will stringify the arguments to check whether.
If the stringified arguments are not found as a key, we know that this specific call has not been done yet.
Thus we call the function that we want to memoize and we save the result.
Ultimately, we return the cached result.

## When would you use a memoize function

### Pure functions with heavy computations

An important point to make, is that a function should only be memoized if it's a pure function, i.e. it does not have side effects.
Otherwise you might end up with unexpected behaviour and bugs.

Examples of these functions might be:

- Mathematical calculations e.g., Fibonacci, factorial where you have lots of potential computation to be done
- Data transformations e.g., sorting/filtering large arrays. If filtering an array of 1k objects can be limited to only being done once, then you can save a lot of time and effort
- API response normalization, the process of transforming raw API data into a consistent, predictable structure that's optimized for your frontend application. If you have a complex data structure being returned from an API that undergoes a lot of transformations, you might end up saving time with memoization

### Frequent calls with repeated inputs

A function is a good candidate to be memoized if it is called multiple times with identical arguments (e.g., in React/Vue renders).
In the past, I added memoization to validations of a form.
The reason was that there was some very complex and lengthy validation to be done in a multi step form.
But if the user is clicking back and forth in the steps, it doesn't make sense to revalidate everything on render.
Memoization allowed me to not have to keep track of whether validation should be triggered or not.
I could simply just call the memoized validation and as long as nothing in the form values changed, the result would come back instantly.

## Potential pitfalls and considerations

### Memory

Everytime the memoized function is called, we potentially fill the cache with arguments and the result.
If the arguments never really change between multiple calls, then the cache will stay relatively small.
But in the situation that the memoized function gets called often with different arguments each time, we might end up with a quite the large cache.
You might end up with memory issues if the cache starts growing too large so best to profile the memoized function to ensure you don't switch out the slow calls with a slow cache.

### Key serialisation

For creating the key, we use `JSON.stringify()` in our code.
One of the issues with `JSON.stringify()` is that it can't handle circular references.

```typescript
const foo = { bar: 1 };
foo.foo = foo;
JSON.stringify(foo); // will crash
```

With the use of an alternative like [safe-stable-stringify](https://www.npmjs.com/package/safe-stable-stringify), we avoid these issues.

## Conclusion

Memoization is a valuable tool when:

- Working with pure functions
- Dealing with expensive calculations
- Having frequent function calls with the same inputs

But before you start applying memoization to every function call, you should remember to always profile first.
Try to find out what your bottleneck is and optimise that as best as you can.
Memoization can be a helpful tool in optimising your code but you should monitor the memory usage.
When used sensibly, memoization can deliver great performance improvements with minimal code changes.

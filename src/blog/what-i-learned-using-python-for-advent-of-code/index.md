---
title: "What I learned using Python for Advent of Code"
pubDate: 2025-12-15
description: "In the past I've participated in the yearly Advent of Code puzzles. While I've done it in TypeScript and some failed attempts in Rust and Scheme, I wanted a new challenge. Since I'm using Python in my current fullstack project, this was the perfect time to challenge my Python skills."
shortDescription: "Python’s beautiful syntax, powerful standard library, and efficient data manipulation made this year's AoC very fun."
author: "Elke Heymans"
image:
  url: "python.png"
  alt: "Python logo"
tags: ["adventofcode", "python"]
---

## Python has so many useful modules

The biggest example for this is the `itertools` module that contains so many interesting functions that are just a perfect fit for Advent of Code puzzles.
AoC puzzles often require you to loop over a bunch of data, transfer it, combine it, and so more.
With TypeScript, if I had a string of characters `ABC` and needed to get all possible permutations, I had to write something to manually get all those permutations `AB AC BA BC CA CB`:

```typescript
function permutations(str: string, length: number): string[] {
  const result: string[] = [];

  function permute(current: string, remaining: string) {
    if (current.length === length) {
      result.push(current);
      return;
    }
    for (let i = 0; i < remaining.length; i++) {
      const next = current + remaining[i];
      const newRemaining = remaining.slice(0, i) + remaining.slice(i + 1);
      permute(next, newRemaining);
    }
  }

  permute("", str);
  return result;
}
```

Thanks to `itertools` in Python, that turned into a one-liner: `permutations('ABC', 2) → AB AC BA BC CA CB`.
Want to use that `permutations` function for lists?
No problem: `permutations(['A', 'B', 'C'], 2) → [('A', 'B'), ('A', 'C'), ('B', 'A'), ('B', 'C'), ('C', 'A'), ('C', 'B')]`

## The syntax is so clean

### Looping over a list

I'll give the example of day 5, part 1 of 2025.
We got a list of ranges accompanied by a list of IDs and had to check if the IDs fit in one of the ranges.
To count them, this was enough:

```python
def part_1(lines: list[str]) -> int:
    (ranges, ids) = parse_lines(lines)
    return sum(any(start <= id <= end for (start, end) in ranges) for id in ids)
```

I find it such a clean line to compare the variable `id` to a `start` and `end`, where all 3 variables come from a `ranges` and `ids` list.

Parsing the data was longer and more complex:

```python
def parse_lines(lines: list[str]):
    split = lines.index("")
    ranges = list(
        map(
            lambda line: cast(Tuple[int, int], tuple(int(x) for x in line.split("-"))),
            lines[0:split],
        )
    )
    ids = list(int(x) for x in lines[(split + 1) :])
    return (ranges, ids)
```

This transformed the input into a tuple of the parsed ranges and IDs.

### Slice notation

Another example of the syntax is also seen in this `parse_lines` function above.
When wanting to select a slice of a string or a list, you can use the index with some neat tricks:

```python
data = [1, 2, 3, 4, 5]
second_and_third_element = data[1:3] # [2, 3]
first_two_elements = data[:2] # [1, 2]
all_but_last_two_elements = data[:-2] # [1, 2, 3]
last_three_elements = data[-3:] # [3, 4, 5]
```

### Creating an array with default values

In TypeScript, you have so many different ways to create an array such as for example 5 times a 0:

```typescript
const length = 5;
const value = 0;

const array1 = Array(length).fill(value);
const array2 = Array.from({ length }, () => value);
const array3 = [...Array(length)].map(() => value);

// and a slightly longer example
const array4: number[] = [];
for (let i = 0; i < length; i++) {
  arr.push(value);
}
```

In Python, you have this quick and easy snippet for the Pythonic way:

```python
length = 5
value = 0
data = [value] * length
```

And if your values are mutables, you can write it like this to ensure you don't end up with a bunch of references to the same data:

```python
data = [0 for _ in range(5)]
```

## Named tuples are actually useful!

In TypeScript, this is a named tuple:

```typescript
type Point = [x: number, y: number];

const p1: Point = [1, 2];
const p2: Point = [3, 4];

console.log(`p1: x = ${p1[0]}, y = ${p1[1]}`);
console.log(`p2: x = ${p2[0]}, y = ${p2[1]}`);
```

Now TypeScript knows that the first element in the tuple corresponds to `x` and the second to `y`.
But this is not something that is all that useful in the code as you cannot access `x` and `y`.
This gives a syntax error:

```typescript
p1.x;
```

You have to use the proper index to access your data.
While in Python, `namedtuple` even gives you the option to use keyword arguments as you can see where I create `p2`:

```python
from collections import namedtuple

Point = namedtuple("Point", ["x", "y"])

p1 = Point(1, 2)
p2 = Point(x=3, y=4)

print(f'p1: x = {p1.x}, y = {p1.y}')
print(f'p2: x = {p2.x}, y = {p2.y}')
```

To get a similar functionality in TypeScript, I need to write `Point` as an object.
It's just not the same as a named tuple:

| Feature     | Named Tuple               | Object                        |
| ----------- | ------------------------- | ----------------------------- |
| Order       | Ordered (index matters)   | Unordered (keys matter)       |
| Access      | `tuple[0]`, destructuring | `obj.key`, `obj["key"]`       |
| Mutability  | Fixed length              | Can add/remove properties     |
| Type Safety | Strong (positional types) | Strong (property names/types) |
| Use Case    | Lightweight, ordered data | Structured, named data        |

## Final words

Advent of Code was the perfect playground to explore Python’s strengths.
The language’s clean syntax, rich standard library, and intuitive data structures made solving puzzles not just easier, but genuinely fun.
Coming from TypeScript, I was surprised by how much more expressive and concise my solutions became.
I was able to generate permutations with itertools, slice lists with ease, and used named tuples for clarity.
This experience has deepened my appreciation for Python and its suitability for algorithmic challenges.
I was already a fan of Python in the backend of my current job but the AoC has solidified that.
Next year's AoC, I’ll be reaching for Python first.
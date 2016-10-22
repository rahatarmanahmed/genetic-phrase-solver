# genetic-phrase-solver [![Build Status](https://travis-ci.org/rahatarmanahmed/genetic-phrase-solver.svg?branch=master)](https://travis-ci.org/rahatarmanahmed/genetic-phrase-solver)
Generates desired text thru a genetic algorithm.

## Installing
`npm install genetic-phrase-solver`

## Example
```js
var solver = require('genetic-phrase-solver');

var generator = solver('Hello world!')

for(let str of generator) {
  console.log(str);
}
// Prints out something like:
// !eWeo!HroWd!
// !elrd Hllrd
// Hrddo eolle
// Hrddo eolle
// Hrldo oerle!
// Hrloo dlrle!
// Heooo dlrle!
// Heloo dlrle!
// Helro Wlrle!
// Helro Wlrle!
// Heloo Wlrle!
// Helro Worle!
// Heloo Worle!
// Heldo World!
// Heloo World!
// Hello World!
```

## solver(targetString, [charset])

Creates an ES6 generator that yields random strings that eventually evolve into the `targetString`. Initial random strings are generated from the characters in the `targetString`, but you can specify `charset` as a string of characters you want to generate initial random strings from.

Once the generator generates the targetString, it completes.

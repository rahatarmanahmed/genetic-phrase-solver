'use strict'

const Evolutionary = require('evolutionary')
const makeGenerator = require('evolutionary/generator')
const Chance = require('chance')

const invoker = require('ramda/src/invoker')
const pipe = require('ramda/src/pipe')
const split = require('ramda/src/split')
const uniq = require('ramda/src/uniq')
const sortBy = require('ramda/src/sortBy')
const join = require('ramda/src/join')

const chance = new Chance()

const charCode = invoker(1, 'charCodeAt')(0)

const getCharset = pipe(split(''), uniq, sortBy(charCode), join(''))

const randIndex = (str) => chance.integer({min: 0, max: str.length - 1})

const plusOrMinus1 = () => chance.bool() ? 1 : -1

const wrapLength = (len, n) => (n + len) % len

const replaceCh = (str, index, ch) =>
  str.substr(str, index) + ch + str.substr(index + 1)

module.exports = function* (solution, overrideCharset) {
  const charset = getCharset(overrideCharset || solution)
  const charsetLength = charset.length
  const charIndex = charset.split('').reduce((obj, ch, i) => {
    obj[ch] = i
    return obj
  }, {})

  const mutateCh = (ch) => charset[wrapLength(charsetLength, charIndex[ch] + plusOrMinus1())]

  const mutate = (str) => {
    const index = randIndex(str)
    return replaceCh(str, index, mutateCh(str[index]))
  }

  const seed = () => chance.string({
    length: solution.length,
    pool: charset
  })

  const crossover = (mother, father) => {
    let ca = randIndex(mother)
    let cb = randIndex(mother)
    let temp

    if (ca > cb) {
      temp = ca
      ca = cb
      cb = temp
    }

    var son = father.substr(0, ca) + mother.substr(ca, cb - ca) + father.substr(cb)
    var daughter = mother.substr(0, ca) + father.substr(ca, cb - ca) + mother.substr(cb)
    return [son, daughter]
  }

  const fitness = (str) => {
    var fitness = 0

    for (let i = 0; i < str.length; i++) {
      if (str[i] === solution[i]) {
        fitness += 1
      }
      fitness += (charsetLength - Math.abs(str.charCodeAt(i) - solution.charCodeAt(i))) / charsetLength
    }

    return fitness
  }

  const evolve = Evolutionary({seed, fitness, mutate, crossover})
  const generator = makeGenerator(evolve, (pop) => pop[0] === solution)

  for (let pop of generator) yield pop[0]
}

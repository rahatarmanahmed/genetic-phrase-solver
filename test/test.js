import test from 'ava'
import solver from '../src/index'

test(t => {
  const solution = `A (more) functional genetic algorithm library. Designed to make as few assumptions as possible about how you want your genetic algorithm library to run.`
  const generator = solver(solution)
  let lastStr
  for (let str of generator) {
    lastStr = str
  }
  t.is(lastStr, solution)
})

// zenbu, 全部, bs: 27/08/2018 part of Dapp for ConsenSys Academy
// mocha unit tests. Run the test with: npm test ('test' is a script in package.json with "test": "mocha")

const assert = require('assert')

// first simple mocha test

describe ('1: bool', function () {
  describe ('first simple mocha test', function () {
    it ('should return true', () => {
      assert.equal(true, true)
    })
  })
})

// getting starting test from mocha

describe ('2: Array', function () {
  describe ('#indexOf()', function () {
    it ('should return -1 when the value is not present', function () {
      assert.equal([1, 2, 3].indexOf(4), -1)
    })
  })
})

// pending test

describe ('3: Array', function () {
  describe ('#indexOf() pending test', function () {
    // pending test below
    it ('should pending when the value is not present')
  })
})

// dynamically generating tests

function add () {
  return Array.prototype.slice.call(arguments).reduce(function (prev, curr) {
    return prev + curr
  }, 0)
}

describe ('4: add()', function () {
  var tests = [
    {args: [1, 2], expected: 3},
    {args: [1, 2, 3], expected: 6},
    {args: [1, 2, 3, 4], expected: 10}
  ]

  tests.forEach(function (test) {
    it ('correctly adds ' + test.args.length + ' args', function () {
      var res = add.apply(null, test.args)
      assert.equal(res, test.expected)
    })
  })
})

// test if SWARM is up and responding (please start SWARM node before with port 5000)

describe ('5: SWARM', function () {
  describe ('GET http://localhost:5000/bzz:', function () {
    it ('respond correct if SWARM node is up and running', function () {
      // ...
    })
  })
})

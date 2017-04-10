
const { assert } = require('chai')

require('..')(__dirname)
assert.throws(
    () => require('..')(__dirname),
    'smart-require has been initialized twice'
)

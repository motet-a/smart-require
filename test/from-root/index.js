
const { assert } = require('chai')

require('../..')(__dirname)

assert(require('/a/b/c') === 123)

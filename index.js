
const invariant = require('invariant')
const { dirname, resolve } = require('path')
const Module = require('module')

const originalRequire = Module.prototype.require

const warn = message => console.warn('smart-require: ' + message)

module.exports = root => {
    root = resolve(root)

    // Avoids `require('../../../../somefile.js')` horrors.
    // See https://gist.github.com/branneman/8048520
    function smartRequire(path) {
        const callerPath = this.filename || __filename
        const callerDir = dirname(callerPath)
        const prettyCallerPath = callerPath.slice(root.length)

        invariant(
            !path.startsWith('./..'),
            "Use require('" + path.slice(2) + "') instead of " +
            "require('" + path + "') in " + prettyCallerPath
        )

        if (path.startsWith('../..') &&
            !callerPath.includes('/node_modules/')) {
            warn("Ugly require('" + path + "') in " + prettyCallerPath)
        }

        if (path.startsWith('./') && callerDir === root) {
            warn(
                "Use require('" + path.slice(1) + "') instead of " +
                "require('" + path + "') in " + prettyCallerPath
            )
        }

        if (path.startsWith('/') && !path.includes('/node_modules/')) {
            return originalRequire(root + path)
        }

        return originalRequire.bind(this)(path)
    }

    invariant(
        Module.prototype.require === originalRequire,
        'smart-require has been initialized twice'
    )

    Module.prototype.require = smartRequire
}

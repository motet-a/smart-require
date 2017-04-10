
# smart-require

Avoid ugly `require('../../../some-file')` using absolute paths, from
the root of your project.

This package follows the well-known UNIX convention where `/` is the
root.

For example, in this source tree:

```
.
├── index.js
├── image
│   ├── gif.js
│   ├── jpg.js
│   └── png.js
└── video
    └── mp4.js
```

…if you’re in `image/gif.js`, this package allows you to require
`video/mp4.js` like this:

```js
const video = require('/video/mp4.js')
```

…instead of:

```js
const video = require('../video/mp4.js')
```

Of course, it prohibits you to require anything from the root of your
system (but why doing so?). Since the behavior of `require()` changes,
this is not really safe, even if I never had any problem with it. Use
at your own risk.



## Installation

```sh
yarn add smart-require
```

…or:

```sh
npm install --save smart-require
```

Then, you just have to indicate your project root before any call to
the customized `require`, usually at the beginning of your
entrypoint. If you are in `index.js` in the example above, you can
write:

```js
require('smart-require')(__dirname)
```

…or if your entrypoint is in `image/jpeg.js` and you want the same
behavior:

```js
const root = require('path').join(__dirname, '..')
require('smart-require')(root)
```



## See also

[This gist](https://gist.github.com/branneman/8048520).

[require-root](https://github.com/ccheever/require-root), nice but different.

[babel-plugin-root-require](https://github.com/m59peacemaker/babel-plugin-root-require), needs Babel.

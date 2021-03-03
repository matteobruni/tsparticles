# strip-url-auth [![Build Status](https://travis-ci.org/sindresorhus/strip-url-auth.svg?branch=master)](https://travis-ci.org/sindresorhus/strip-url-auth)

> Strip the [authentication](http://en.wikipedia.org/wiki/Basic_access_authentication) part of a URL


## Install

```
$ npm install --save strip-url-auth
```


## Usage

```js
var stripUrlAuth = require('strip-url-auth');

stripUrlAuth('https://user:pass@sindresorhus.com');
//=> 'https://sindresorhus.com'
```


## License

MIT © [Sindre Sorhus](http://sindresorhus.com)

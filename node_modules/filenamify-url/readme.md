# filenamify-url [![Build Status](https://travis-ci.org/sindresorhus/filenamify-url.svg?branch=master)](https://travis-ci.org/sindresorhus/filenamify-url)

> Convert a URL to a valid filename


## Install

```
$ npm install --save filenamify-url
```


## Usage

```js
var filenamifyUrl = require('filenamify-url');

filenamifyUrl('http://sindresorhus.com/foo?bar=baz');
//=> sindresorhus.com!foo!bar=baz

filenamifyUrl('http://sindresorhus.com/foo', {replacement: '🐴'});
//=> sindresorhus.com🐴foo
```


## API

See the [`filenamify` API](https://github.com/sindresorhus/filenamify#api).


## License

MIT © [Sindre Sorhus](http://sindresorhus.com)

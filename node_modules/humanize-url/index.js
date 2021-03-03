'use strict';
var normalizeUrl = require('normalize-url');
var stripUrlAuth = require('strip-url-auth');

module.exports = function (str) {
	if (typeof str !== 'string') {
		throw new TypeError('Expected a string');
	}

	return normalizeUrl(stripUrlAuth(str)).replace(/^(?:https?:)?\/\//, '');
};

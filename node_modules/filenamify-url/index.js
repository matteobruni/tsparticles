'use strict';
var filenamify = require('filenamify');
var humanizeUrl = require('humanize-url');

module.exports = function (str, opts) {
	if (typeof str !== 'string') {
		throw new TypeError('Expected a string');
	}

	return filenamify(humanizeUrl(str), opts);
};

'use strict';

const path = require('path');
const assert = require('assert');
const {promisify} = require('util');

const fromString = promisify(require('css-b64-images').fromString);

const ONE_KB = 2 ** 10;

const defaultOptions = {
    maxSize: 100 * ONE_KB,
};

/**
 * minify css data.
 * if can not minify return data
 *
 * @param name
 * @param data
 * @param userOptions - (optional) object that may contain an `img` key with an object of options
 */
module.exports = async (name, data, userOptions) => {
    const dir = path.dirname(name);
    const dirRelative = dir + '/../';
    
    const options = {
        ...defaultOptions,
        ...userOptions && userOptions.img || {},
    };
    
    assert(name);
    assert(data);
    
    return fromString(data, dir, dirRelative, options);
};


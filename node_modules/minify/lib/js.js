'use strict';

const terser = require('terser');
const assert = require('assert');

/**
 * minify js data.
 *
 * @param data
 * @param userOptions - (optional) object that may contain a `js` key with an object of options
 */
module.exports = async (data, userOptions) => {
    assert(data);
    
    const options = userOptions && userOptions.js || {};
    const {code} = await terser.minify(data, options);
    
    return code;
};


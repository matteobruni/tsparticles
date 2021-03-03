/* сжимаем код через clean-css */

'use strict';

const assert = require('assert');
const Clean = require('clean-css');

/**
 * minify css data.
 *
 * @param data
 * @param userOptions - (optional) object that may contain a `css` key with an object of options
 */
module.exports = (data, userOptions) => {
    assert(data);
    
    const options = userOptions && userOptions.css || {};
    
    const {
        styles,
        errors,
    } = new Clean(options).minify(data);
    
    const [error] = errors;
    
    if (error)
        throw error;
    
    return styles;
};


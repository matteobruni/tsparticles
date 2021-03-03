'use strict';

const DIR = __dirname + '/';

const {readFile} = require('fs').promises;
const path = require('path');

const tryToCatch = require('try-to-catch');

const log = require('debug')('minify');

for (const name of ['js', 'html', 'css', 'img']) {
    minify[name] = require(DIR + name);
}

module.exports = minify;

function check(name) {
    if (!name)
        throw Error('name could not be empty!');
}

async function minify(name, userOptions) {
    const EXT = ['js', 'html', 'css'];
    
    check(name);
    
    const ext = path.extname(name).slice(1);
    const is = EXT.includes(ext);
    
    if (!is)
        throw Error(`File type "${ext}" not supported.`);
    
    log('optimizing ' + path.basename(name));
    return await optimize(name, userOptions);
}

function getName(file) {
    const notObj = typeof file !== 'object';
    
    if (notObj)
        return file;
    
    return Object.keys(file)[0];
}

/**
 * function minificate js,css and html files
 *
 * @param {string} file - js, css or html file path
 * @param {object} userOptions - object with optional `html`, `css, `js`, and `img` keys, which each can contain options to be combined with defaults and passed to the respective minifier
 */
async function optimize(file, userOptions) {
    check(file);
    
    const name = getName(file);
    
    log('reading file ' + path.basename(name));
    
    const data = await readFile(name, 'utf8');
    return await onDataRead(file, data, userOptions);
}

/**
 * Processing of files
 * @param {string} filename
 * @param {string} data - the contents of the file
 * @param {object} userOptions - object with optional `html`, `css, `js`, and `img` keys, which each can contain options to be combined with defaults and passed to the respective minifier
*/
async function onDataRead(filename, data, userOptions) {
    log('file ' + path.basename(filename) + ' read');
    
    const ext = path.extname(filename).replace(/^\./, '');
    
    const optimizedData = await minify[ext](data, userOptions);
    
    let b64Optimize;
    
    if (ext === 'css')
        [, b64Optimize] = await tryToCatch(minify.img, filename, optimizedData, userOptions);
    
    return b64Optimize || optimizedData;
}


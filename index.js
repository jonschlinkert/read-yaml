/*!
 * read-yaml <https://github.com/assemble/read-yaml>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */
'use strict';

var fs = require('fs');
var YAML = require('js-yaml');
var xtend = require('xtend');

/**
 * ## async
 *
 * Read YAML file asynchronously and parse content as JSON
 *
 * **Example:**
 *
 * ```js
 * var yaml = require('read-yaml');
 * yaml('config.yml', function(err, data) {
 *   if (err) throw err;
 *   console.log(data);
 * });
 * ```
 *
 * @param   {String} `filepath`
 * @param   {Object|String} `options`
 * @param   {Function} `callback`
 */

module.exports = function (filepath, options, callback) {
  if (callback === undefined) {
    callback = options;
    options = {};
  }

  fs.readFile(filepath, options, function (err, buf) {
    if (err) {
      callback(err);
      return;
    }

    options = createYamlOptions(options, filepath);
    var data;
    
    try {
      data = YAML.safeLoad(buf.toString(), options);
    } catch (e) {
      callback(e);
      return;
    }

    callback(null, data);
  });
};

/**
 * ## sync
 *
 * Read YAML file synchronously and parse content as JSON
 *
 * **Example:**
 *
 * ```js
 * var yaml = require('read-yaml').sync;
 * var config = yaml('config.yml');
 * ```
 *
 * @param   {String} `filepath`
 * @return  {Object}
 */

module.exports.sync = function (filepath, options) {
  var str = fs.readFileSync(filepath, options);
  options = createYamlOptions(options, filepath);
  return YAML.safeLoad(str, options);
};

function createYamlOptions (options, filepath) {
  if (typeof options === 'string') {
    return {filename: filepath};
  }
  return xtend(options, {filename: filepath});
}

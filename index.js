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
 * Expose `read`
 */

module.exports = readYaml;

/**
 * Read YAML file asynchronously and parse content as JSON
 *
 * **Example:**
 *
 * ```js
 * var readYaml = require('read-yaml');
 * readYaml('config.yml', function(err, data) {
 *   if (err) throw err;
 *   console.log(data);
 * });
 * ```
 *
 * @param   {String} `filepath`
 * @param   {Object|String} `options`
 * @param   {Function} `callback`
 * @api public
 */

function readYaml(filepath, options, callback) {
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
}

/**
 * Read YAML file synchronously and parse content as JSON
 *
 * **Example:**
 *
 * ```js
 * var read = require('read-yaml');
 * var config = read.sync('config.yml');
 * ```
 *
 * @param   {String} `filepath`
 * @return  {Object}
 * @api public
 */

readYaml.sync = function readYamlSync(filepath, options) {
  var str = fs.readFileSync(filepath, options);
  options = createYamlOptions(options, filepath);
  return YAML.safeLoad(str, options);
};

/**
 * Util to normalize options for js-yaml
 *
 * @api private
 */

function createYamlOptions (options, filepath) {
  if (typeof options === 'string') {
    return {filename: filepath};
  }
  return xtend(options, {filename: filepath});
}

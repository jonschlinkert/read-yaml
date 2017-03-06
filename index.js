/*!
 * read-yaml <https://github.com/jonschlinkert/read-yaml>
 *
 * Copyright (c) 2014, 2017, Jon Schlinkert.
 * Released under the MIT License.
 */
'use strict';

var fs = require('fs');
var tryit = require('tryit');
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
 * @param {String} `fp` Path of the file to read.
 * @param {Object|String} `options` to pass to [js-yaml]
 * @param {Function} `cb` Callback function
 * @return {Object} JSON
 * @api public
 */

function readYaml(fp, options, cb) {
  if (cb === undefined) {
    cb = options;
    options = {};
  }

  fs.readFile(fp, options, function (err, buf) {
    if (err) {
      cb(err);
      return;
    }

    options = createYamlOptions(options, fp);
    var data;

    tryit(function() {
      data = YAML.safeLoad(buf, options);
    }, function(err) {
      if (err) {
        cb(err);
        return;
      }
      cb(null, data);
    });
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
 * @param {String} `fp` Path of the file to read.
 * @param {Object|String} `options` to pass to [js-yaml]
 * @return {Object} JSON
 * @api public
 */

readYaml.sync = function readYamlSync(fp, options) {
  var str = fs.readFileSync(fp, options);
  options = createYamlOptions(options, fp);
  return YAML.safeLoad(str, options);
};

/**
 * Util to normalize options for js-yaml
 *
 * @api private
 */

function createYamlOptions (options, fp) {
  if (typeof options === 'string') {
    return {filename: fp};
  }
  return xtend(options, {filename: fp});
}

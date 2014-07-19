/*!
 * read-yaml <https://github.com/assemble/read-yaml>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */
'use strict';

var fs = require('fs');
var YAML = require('js-yaml');
var async = require('async');


/**
 * ## async
 *
 * Read YAML file asynchronously and parse content as JSON
 *
 * **Example:**
 *
 * ```js
 * var yaml = require('read-yaml');
 * var config = yaml('config.yml');
 * ```
 *
 * @param   {String} `filepath`
 * @return  {Object}
 */

module.exports = function (filepath, callback) {
  async.waterfall([
    function (next) { fs.readFile(String(filepath), 'utf8', next); },
    function (contents, next) {
      try {
        next(null, YAML.load(contents));
      } catch (err) {
        err.message = 'Failed to parse "' + filepath + '": ' + err.message;
        next(err);
      }
    }
  ], callback);
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

module.exports.sync = function (filepath) {
  var str = fs.readFileSync(String(filepath), 'utf8');
  try {
    return YAML.load(str);
  } catch (err) {
    err.message = 'Failed to parse "' + filepath + '": ' + err.message;
    throw err;
  }
};


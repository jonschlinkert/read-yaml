/**
 * read-yaml <https://github.com/jonschlinkert/read-yaml>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var assert = require('assert');
var should = require('should');
var YAML = require('js-yaml');
var readYaml = require('..');


describe('readYaml', function () {
  it('should read the yaml file asynchronously.', function (done) {
    readYaml('test/fixture.yaml', 'utf8', function (err, actual) {
      assert.equal(err == null, true);
      actual.should.eql({foo: {bar: 'baz', qux: true }});
      done();
    });
  });
  it('should support options.', function (done) {
    readYaml('test/fixture.yaml', {schema: YAML.FAILSAFE_SCHEMA}, function (err, actual) {
      assert.equal(err == null, true);
      actual.should.eql({foo: {bar: 'baz', qux: 'true'}});
      done();
    });
  });
  it('should fail when it cannot parse the file as YAML.', function (done) {
    readYaml('index.js', {schema: YAML.FAILSAFE_SCHEMA}, function (err) {
      err.should.be.an.instanceof(YAML.YAMLException);
      err.should.have.property('message');
      err.message.should.containEql('index.js');
      arguments.should.have.length(1);
      done();
    });
  });
  it('should fail when it cannot read the file.', function (done) {
    readYaml('__foo__', function (err) {
      err.should.be.an.instanceof(Error);
      err.should.have.property('message');
      err.message.should.containEql('__foo__');
      arguments.should.have.length(1);
      done();
    });
  });
});

describe('readYaml.sync', function () {
  it('should read the yaml file synchronously.', function () {
    readYaml.sync('test/fixture.yaml', 'utf8').should.eql({foo: {bar: 'baz', qux: true}});
  });
  it('should support options.', function () {
    var actual = readYaml.sync('test/fixture.yaml', {schema: YAML.FAILSAFE_SCHEMA});
    actual.should.eql({foo: {bar: 'baz', qux: 'true'}});
  });
  it('should throw an error when it cannot parse the file as YAML.', function () {
    (function() {
      readYaml.sync('README.md', 'utf8');
    }).should.throw(YAML.YAMLException);
  });
  it('should throw an error when it cannot read the file.', function () {
    (function() {
      readYaml.sync('node_modules');
    }).should.throw(/EISDIR/);
  });
});

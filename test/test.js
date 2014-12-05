/**
 * read-yaml <https://github.com/jonschlinkert/read-yaml>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var expect = require('chai').expect;
var path = require('path');
var readYaml = require('../');
var YAML = require('js-yaml');

var testYamlPath = 'test/fixture.yaml';
var testYamlContents = {
  foo: {
    bar: 'baz',
    qux: true
  }
};

describe('readYaml', function () {
  it('should read the yaml file asynchronously.', function (done) {
    var expected = testYamlContents;
    readYaml(testYamlPath, 'utf8', function (err, actual) {
      expect(err).to.be.null;
      expect(actual).to.eql(expected);
      done();
    });
  });
  it('should support options.', function (done) {
    readYaml(testYamlPath, {schema: YAML.FAILSAFE_SCHEMA}, function (err, actual) {
      var expected = {
        foo: {
          bar: 'baz',
          qux: 'true'
        }
      };
      expect(err).to.be.null;
      expect(actual).to.eql(expected);
      done();
    });
  });
  it('should fail when it cannot parse the file as YAML.', function (done) {
    readYaml('index.js', {schema: YAML.FAILSAFE_SCHEMA}, function (err) {
      expect(err).to.be.instanceof(YAML.YAMLException);
      expect(err).to.have.property('message').to.contain('index.js');
      expect(arguments).to.have.length(1);
      done();
    });
  });
  it('should fail when it cannot read the file.', function (done) {
    readYaml('__foo__', function (err) {
      expect(err).to.be.instanceof(Error);
      expect(err).to.have.property('message').to.contain('__foo__');
      expect(arguments).to.have.length(1);
      done();
    });
  });
});

describe('readYaml.sync', function () {
  it('should read the yaml file synchronously.', function () {
    var expected = testYamlContents;
    var actual = readYaml.sync(testYamlPath, 'utf8');
    expect(actual).to.eql(expected);
  });
  it('should support options.', function () {
    var expected = {
      foo: {
        bar: 'baz',
        qux: 'true'
      }
    };
    var actual = readYaml.sync(testYamlPath, {schema: YAML.FAILSAFE_SCHEMA});
    expect(actual).to.eql(expected);
  });
  it('should throw an error when it cannot parse the file as YAML.', function () {
    var actual = readYaml.sync(testYamlPath);
    expect(function() {
      readYaml.sync('README.md', 'utf8');
    }).to.throw(YAML.YAMLException);
  });
  it('should throw an error when it cannot read the file.', function () {
    var actual = readYaml.sync(testYamlPath);
    expect(function() {
      readYaml.sync('node_modules');
    }).to.throw(/EISDIR/);
  });
});

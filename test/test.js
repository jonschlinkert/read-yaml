/**
 * read-file <https://github.com/assemble/read-file>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

const expect = require('chai').expect;
const path = require('path');
const file = require('../');

var testYamlPath = path.join('test', 'fixtures', 'test.yaml');
var testYamlContents = {"foo": {"bar": "baz"}};

describe('file.readYAMLSync', function () {
  it('should read the yaml file', function () {
    var expected = testYamlContents;
    var actual = file.readYAMLSync(testYamlPath);
    expect(actual).to.eql(expected);
  });
});

describe('file.readYAML', function () {
  it('should read the yaml file (async)', function (done) {
    var expected = testYamlContents;
    file.readYAML(testYamlPath, function (err, actual) {
      expect(actual).to.eql(expected);
      done();
    });
  });
});

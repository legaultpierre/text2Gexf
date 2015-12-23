var assert = require('assert');
var utils = require('../utils.js');

describe('lowerText', function() {
  it('should be in lower case', function() {
    assert.deepEqual(utils.lowerText('Test dlL sdfOds. LSes'),'test dll sdfods. lses');
  });
});

describe('cleanText', function() {
  it('should be the same string', function() {
    assert.deepEqual(utils.cleanText('Hello you. Do you love me?'), 'Hello you. Do you love me?');
  });
  it('should remove "', function() {
    assert.deepEqual(utils.cleanText('Hello" you. "Do you" love me?'), 'Hello you. Do you love me?');
  });
  it('should remove «', function() {
    assert.deepEqual(utils.cleanText('Hello« you. «Do you« love me?'), 'Hello you. Do you love me?');
  });
  it('should remove »', function() {
    assert.deepEqual(utils.cleanText('Hello» you. »Do you» love me?'), 'Hello you. Do you love me?');
  });
  it('should remove “', function() {
    assert.deepEqual(utils.cleanText('Hello“ you. “Do you“ love me?'), 'Hello you. Do you love me?');
  });
  it('should remove ”', function() {
    assert.deepEqual(utils.cleanText('Hello” you. ”Do you” love me?'), 'Hello you. Do you love me?');
  });
  it('should remove  - ', function() {
    assert.deepEqual(utils.cleanText('Hello -  you.  - Do you -  love me?'), 'Hello you. Do you love me?');
  });
  it('should remove ,', function() {
    assert.deepEqual(utils.cleanText('Hello, you. ,Do you, love me?'), 'Hello you. Do you love me?');
  });
  it('should remove ;', function() {
    assert.deepEqual(utils.cleanText('Hello; you. ;Do you; love me?'), 'Hello you. Do you love me?');
  });
  it('should remove :', function() {
    assert.deepEqual(utils.cleanText('Hello: you. :Do you: love me?'), 'Hello you. Do you love me?');
  });
});

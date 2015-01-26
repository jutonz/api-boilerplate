// var assert = require('better-assert')
// var should = require('should')
var should = require('chai').should();
var request = require('request');

var api_root = '0.0.0.0:8000';

describe('GET /', function() {

  before(function(done) {
    var api = require('../index.js');
    this.server = api;
    this.server.connection({ host: 'test' });
    done();
  });

  it('should be connectable', function(done) {
    var request = { url: '/', method: 'GET' };
    this.server.inject(request, function(response) {
      response.should.have.property('statusCode', 200);
      done();
    });
  });

  it('should reply \'It works!\'', function(done) {
    var request = { url: '/', method: 'GET' };
    this.server.inject(request, function(response) {
      response.should.have.property('payload', 'It works!');
      done();
    });
  });

});

describe('GET /greet', function(done) {

  before(function(done) {
    var api = require('../index.js');
    this.server = api;
    this.server.connection({ host: 'test' });
    done();
  });

  it('should respond \'Hello, friend!\'', function() {
    var request = { url: '/greet', method: 'GET' };
    this.server.inject(request, function(response) {
      response.should.have.property('statusCode', 200);
      response.should.have.property('payload', 'Hello, friend!');
    });
  });

});

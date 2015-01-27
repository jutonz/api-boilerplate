var should = require('chai').should();

before(function(done) {
  var app = require('../index.js');
  this.server = app;
  this.server.connection({ host: 'test' });
  done();
});


describe('GET /', function() {

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
      should.exist(response);
      response.should.have.property('payload', 'It works!');
      done();
    });
  });

});

describe('GET /greet', function(done) {

  it('should reply \'Hello, friend!\'', function(done) {
    var request = { url: '/greet', method: 'GET' };
    this.server.inject(request, function(response) {
      should.exist(response);
      response.should.have.property('statusCode', 200);
      response.should.have.property('payload', 'Hello, friend!');
      done();
    });
  });

});

describe('GET /greet/{name}', function(done) {

  it('should reply \'Hello, {name}!\'', function(done) {
    var request = { url: '/greet/bob', method: 'GET' };
    this.server.inject(request, function(response) {
      should.exist(response);
      response.should.have.property('statusCode', 200);
      response.should.have.property('payload', 'Hello, bob!');
      done();
    });
  });

  it('should preserve capitalization', function(done) {
    var request = { url: '/greet/Bob', method: 'GET' };
    this.server.inject(request, function(response) {
      should.exist(response);
      response.should.have.property('statusCode', 200);
      response.should.have.property('payload', 'Hello, Bob!');
      done();
    });
  });

  it('should preserve hyphens', function(done) {
    var request = { url: '/greet/mary-anne', method: 'GET' };
    this.server.inject(request, function(response) {
      should.exist(response);
      response.should.have.property('statusCode', 200);
      response.should.have.property('payload', 'Hello, mary-anne!');
      done();
    });
  });

});

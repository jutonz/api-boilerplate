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

  // it('should be connectable', function() {
  //   request(api_root, function(error, response, body) {
  //     (error == undefined).should.not.be.ok
  //   })
  // })

  // it('should return status code 200', function() {
  //   request('localhost:8000/', function(error, response, body) {
  //     (response == undefined).should.not.be.ok
  //     response.should.have.property('statusCode', 200)
  //   })
  // })
});


// describe('greet', function() {
//   it('should return \"Hello, friend\" when no name is specified', function() {
//     var url = api_root + '/greet'
//     request(url, function(error, response, body) {
//       // assert(undefined != error)
//       // (error == null).should.not.be.ok
//       (response == undefined).should.not.be.ok
//       // response.should.have.property('statusCode', 200)
//       // assert.equal(200, response.statusCode)
//     })
//   })
// })
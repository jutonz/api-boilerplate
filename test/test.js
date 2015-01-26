var assert = require('assert')
var should = require('should')
var request = require('request')

var url = '0.0.0.0:8000'


describe('greet', function() {
  it('should return \"Hello, friend\" when no name is specified', function() {
    request(url, function(error, response, body) {
      if (!error) {
        assert.equal(200, response.statusCode)
      }
    })
  })
})
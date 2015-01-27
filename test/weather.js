var should = require('chai').should();

before(function(done) {
  var app = require('../index');
  this.server = app;
  this.server.connection({ host: 'test' });
  done();
});

describe('GET /weather/{city}', function() {

  it('should 404 if no city specified', function() {
    var request = { url: '/weather', method: 'GET' };
    this.server.inject(request, function(response) {
      should.exist(response);
      response.should.have.property('statusCode', 404);
    });
  });

  it('should get weather for raleigh,nc', function() {
    var request = { url: '/weather/raleigh,nc', method: 'GET' };
    this.server.inject(request, function(response) {
      should.exist(response);
      response.should.have.property('statusCode', 200);
      response.should.have.property('Content-Type', 'application/json');
      response.should.have.property('country', 'United States of America');
      response.should.have.property('name', 'Raleigh');
    }); 
  });

  it('should return error if an invalid city is specified', function() {
    var request = { url: '/weather/-', method: 'GET' };
    this.server.inject(request, function(response) {
      should.exist(response);
      response.should.have.property('statusCode', 404);
      response.should.have.property('message', 'Error: Not found city');
    });
  });

});
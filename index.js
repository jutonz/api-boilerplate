var Hapi = require('hapi');
var Good = require('good');
var request = require('request');
var weather = require('./lib/weather');

var server = new Hapi.Server();
server.connection({
  host: '0.0.0.0'
, port: parseInt(process.env.PORT) || 8000
});

server.route({
  method: 'GET'
, path: '/'
, handler: function(request, reply) {
    reply('It works!');
  }
});

server.route({
  method: 'GET'
, path: '/greet/{name?}'
, handler: function(request, reply) {
    var name = request.params.name ? encodeURIComponent(request.params.name) : 'friend';
    reply('Hello, ' + name + '!');
  }
});

server.route({
  method: 'GET'
, path: '/weather/{city}'
, handler: function(request, reply) {
    var city = request.params.city;
    var units = 'imperial';
    weather.get(city, units, function(weatherInfo) {
      reply(weatherInfo);
    });
  }
});

if (!module.parent) { // Don't start server if testing
  server.register({
    register: Good
  , options: {
      reporters: [{
        reporter: require('good-console')
      , args:[{ log: '*', response: '*' }]
      }]
    }
  },function(error) {
      if (error) { throw error; } // Problem loading Good plugin
      server.start(function() {
        server.log('info', 'Server running at: ' + server.info.uri);
      });
    }
  );
}

// Make the server accessible to other modules for testing
module.exports = server;

exports.request = function(server, request, callback) {
  server.inject(request, function(response) {
    if (response.payload) {
      response.body = JSON.parse(response.payload);
    }
    callback(response);
  });
};

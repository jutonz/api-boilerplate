var Hapi = require('hapi');
var Good = require('good');
var request = require('request');
var weather = require('./lib/weather');
var naruto = require('./lib/naruto');

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
, handler: function(request, reply ) {
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
      reply('The temperature in ' + weatherInfo.name + ', ' + weatherInfo.sys.country + ' is currently ' + weatherInfo.main.temp + '.');
    });
  }
});

server.route({
  method: 'GET'
, path: '/naruto-shippuden/episodes/{episodeNumber}'
, handler: function(request, reply) {
    var episodeNumber = encodeURIComponent(request.params.episodeNumber);
    naruto.getInfoForEpisodeNumber(episodeNumber, function(info) {
      reply(info);
    });
  }
});

server.route({
  method: 'GET'
, path: '/naruto-shippuden/seasons/{seasonNumber}'
, handler: function(request, reply) {
    var seasonNumber = encodeURIComponent(request.params.seasonNumber);
    naruto.getInfoForSeasonNumber(seasonNumber, function(info) {
      reply(info);
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
      if (error) throw error; // Problem loading Good plugin
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
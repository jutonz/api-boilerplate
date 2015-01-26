var Hapi = require('hapi');
var Good = require('good');
var request = require('request');
var weather = require('./weather');
var naruto = require('./naruto');

var server = new Hapi.Server();
server.connection({
  host: '0.0.0.0'
, port: parseInt(process.env.PORT) || 8000
});

server.route({
  method: 'GET'
, path: '/'
, handler: function(request, reply) {
    reply('What a wonderful API you have here')
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
      console.log(weatherInfo);
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
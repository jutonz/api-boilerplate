var request = require('request');

exports.get = function(city, units, callback) {
  var options = {
    uri: 'http://api.openweathermap.org/data/2.5/weather'
  , qs: { 
      q: city
    , units: units
    }
  };
  request(options, function (error, response, body) {
    console.log(response.request.uri.href);
    if (!error && response.statusCode == 200) {
      callback(JSON.parse(body));
    }
  });
};
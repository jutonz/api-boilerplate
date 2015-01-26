var request = require('request');
var cheerio = require('cheerio');

constructJsonFromTR = function constructJsonFromTR(tr) {
  var episodeTitles = tr.find('.summary').text();
  var englishTitle = episodeTitles.split('\n')[0];
  englishTitle = englishTitle.replace(/\"/g, '');

  var originalAirdate = tr.find('td:nth-child(3)').text();

  var englishAirdate = tr.find('td:last-child').text();

  var table = tr.parent();
  var seasonInfo = table.prev().prev().text();
  var season = seasonInfo.split(":")[0];
  season = season.replace('Season ', '');
  
  var seasonYear = seasonInfo.split(": ")[1];
  seasonYear = seasonYear.replace('[edit]', '');

  var episodeNumber = tr.find('th').text();

  var episodeInfo = {
    episodeNumber: episodeNumber
  , title: englishTitle
  , season: season
  , seasonYear: seasonYear
  , originalAirdate: originalAirdate
  , englishAirdate: englishAirdate
  };

  return JSON.stringify(episodeInfo);
};

exports.getInfoForEpisodeNumber = function(episodeNumber, callback) {
  var options = {
    uri: 'http://en.wikipedia.org/wiki/List_of_Naruto:_Shippuden_episodes'
  };

  request(options, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      $ = cheerio.load(body);
      $('#ep' + episodeNumber).each(function() {
        var tr = $(this).parent();
        var json = constructJsonFromTR(tr);
        callback(json);
      });
    }
  });
};

exports.getInfoForSeasonNumber = function(seasonNumber, callback) {
  var options = {
    uri: 'http://en.wikipedia.org/wiki/List_of_Naruto:_Shippuden_episodes'
  };

  request(options, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      $ = cheerio.load(body);
      $('h3').each(function() {
        var text = $(this).text();
        text = text.split(': ')[0];
        var thisSeasonNumber = text.replace('Season ', '');
        if (parseInt(thisSeasonNumber) == seasonNumber) {
          var table = $(this).next().next();
          var jsonArray = [];
          table.find('.vevent').each(function() {
            var episodeJson = constructJsonFromTR($(this));
            var episodeObject = JSON.parse(episodeJson);
            jsonArray.push(episodeObject);
          });
          callback(JSON.stringify(jsonArray));
        }
      });
    }
  });
};

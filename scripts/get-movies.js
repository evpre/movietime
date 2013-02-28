var util = require('util'),
    http = require('http'),
    async = require ('async'),
    moviesDB = require('../app/js/moviesDB');

var options = {
  hostname: 'api.themoviedb.org',
  //port: 80,
  headers: {"Accept": "application/json"},
  method: 'GET'
};
function getMovies(){
  console.log("DB read");
  console.log(moviesDB.findAll('', 'genres', true));
  for (genre in genres = moviesDB.findAll('', 'genres', true)){
    genreId = genres[genre].id;
    options.path = '/3/genre/'+genreId+'/movies?api_key=0250e8e7c9e45a8e7a2c6a72774aec07',
    req = http.request(options, function(res) {
      var data = '';
        res.on('data', function (chunk) {
          data+=chunk;
        });
        res.on('end', function(){
        console.log("movies: "+data+"\n\n");
        //moviesDB.insertOrUpdateGenre(data, res, 'genres');
      });
    });
    req.on('error', function(e) {
      console.log('problem with request: ' + e.message);
    });
    req.end();
  }
}
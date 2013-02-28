var util = require('util'),
    http = require('http'),
    moviesDB = require('../app/js/moviesDB');

var options = {
  hostname: 'api.themoviedb.org',
  //port: 80,
  headers: {"Accept": "application/json"},
  path: '/3/genre/list?api_key=0250e8e7c9e45a8e7a2c6a72774aec07',
  method: 'GET'
};

var req = http.request(options, function(res) {
	var data = '';
  	res.on('data', function (chunk) {
  		data+=chunk;
  	});
  	res.on('end', function(){
		moviesDB.insertOrUpdateGenre(data, res, 'genres');
	});
});
req.on('error', function(e) {
  console.log('problem with request: ' + e.message);
});
req.end();
'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', []).
  value('version', '0.1');

var movietime = angular.module('movietimeServices', ['ngResource']);

movietime.factory('Movie', function($resource){
	var Movie = $resource('database/movies/:movieId', {},{edit: {method: 'PUT'}});
	return Movie;
});

movietime.factory('Genre', function($resource){
	var Genre = $resource('database/genres/:genreId', {},{edit: {method: 'PUT'}});
	return Genre;
});

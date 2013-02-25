'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', []).
  value('version', '0.1');

var movietime = angular.module('movietimeServices', ['ngResource']);

movietime.factory('Movie', function($resource){
	var movies = $resource('database/movies/:movieId', {}, {
		query: {method:'GET', params:{movieId:'all'}, isArray:true}
		});
	return movies;
});

'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', []).
  value('version', '0.1');

angular.module('movietimeServices', ['ngResource']).
    factory('Movie', function($resource){
  		var movies = $resource('database/data.json', {}, {
    		query: {method:'GET', params:{}, isArray:true}
  			});
  		return movies;
	});

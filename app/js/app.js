'use strict';


// Declare app level module which depends on filters, and services
var app = angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives','movietimeServices']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/listMovies', {templateUrl: 'partials/listMovies.html', controller: ListMoviesCtrl});
    $routeProvider.when('/newMovie', {templateUrl: 'partials/newMovie.html', controller: NewMovieCtrl});
    $routeProvider.when('/movies/:movieId', {templateUrl: 'partials/movieDetail.html', controller: MovieDetailCtrl});
    $routeProvider.when('/movies/edit/:movieId', {templateUrl: 'partials/newMovie.html', controller: MovieEditCtrl});
    $routeProvider.when('/listGenres', {templateUrl: 'partials/listGenres.html', controller: ListGenresCtrl});
    $routeProvider.otherwise({redirectTo: '/listMovies'});
  }]);


app.run(function ($rootScope) {
    $rootScope.tmdbThumbImagesPath = 'http://cf2.imgobject.com/t/p/w92/'; 
    $rootScope.tmdbPosterImagesPath = 'http://cf2.imgobject.com/t/p/w185/'; 
    $rootScope.apiKey = '0250e8e7c9e45a8e7a2c6a72774aec07'; 
});
'use strict';


// Declare app level module which depends on filters, and services
var app = angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives','movietimeServices']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/listMovies', {templateUrl: 'partials/listMovies.html', controller: ListMoviesCtrl});
    $routeProvider.when('/view1', {templateUrl: 'partials/partial1.html', controller: MyCtrl1});
    $routeProvider.when('/view2', {templateUrl: 'partials/partial2.html', controller: MyCtrl2});
    $routeProvider.when('/movies/:movieId', {templateUrl: 'partials/movieDetail.html', controller: MovieDetailCtrl});
    $routeProvider.otherwise({redirectTo: '/view1'});
  }]);
app.run(function ($rootScope) {
    $rootScope.tmdbThumbImagesPath = 'http://cf2.imgobject.com/t/p/w92/'; 
    $rootScope.tmdbPosterImagesPath = 'http://cf2.imgobject.com/t/p/w342/'; 
    $rootScope.apiKey = '0250e8e7c9e45a8e7a2c6a72774aec07'; 
});
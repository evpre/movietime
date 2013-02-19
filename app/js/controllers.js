'use strict';

/* Controllers */


function MyCtrl1() {}
MyCtrl1.$inject = [];

function MyCtrl2() {
}
MyCtrl2.$inject = [];

function ListMoviesCtrl($scope, Movie) {
	$scope.movies = Movie.query();
}
ListMoviesCtrl.$inject = ['$scope', 'Movie'];

function MovieDetailCtrl($scope, $routeParams, Movie) {
	$scope.movie = Movie.get({movieId: $routeParams.movieId});
}
ListMoviesCtrl.$inject = ['$scope', 'Movie'];
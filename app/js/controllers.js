'use strict';

/* Controllers */

/*
* Movie controllers
*/
function ListMoviesCtrl($scope, $location, Movie) {
	$scope.movies = Movie.query({movieId: 'all'});
	$scope.remove = function(id){
		Movie.remove({movieId: id}, function(){
			$location.path('/');
		});
	}
	$scope.edit = function(id){
		$location.path('movies/edit/'+id);
	}
}
ListMoviesCtrl.$inject = ['$scope','$location','Movie'];

function MovieDetailCtrl($scope, $routeParams, Movie) {
	$scope.movie = Movie.get({movieId: $routeParams.movieId});
}
MovieDetailCtrl.$inject = ['$scope','$routeParams','Movie'];

function NewMovieCtrl($scope, $location, Movie) {
    console.log(Movie);
  $scope.save = function() {
    Movie.save($scope.movie, function() {
      $location.path('/listMovies');
    });
  }
}
NewMovieCtrl.$inject = ['$scope','$location','Movie'];

function MovieEditCtrl($scope, $location,$routeParams,Movie) {
	var self = this;
	Movie.get({movieId: $routeParams.movieId}, function(movie) {
	    self.original = movie;
	    $scope.movie = new Movie(self.original);
	  });
  	$scope.save = function() {
    	$scope.movie.$edit({movieId: $routeParams.movieId}, function() {
      		$location.path('/listMovies');
    	});
  	}
}
MovieEditCtrl.$inject = ['$scope','$location', '$routeParams','Movie'];

/*
* Genre controllers
*/
function ListGenresCtrl($scope, $location, Genre) {
	$scope.genres = Genre.query({genreId: 'all'});
	$scope.remove = function(id){
		Genre.remove({genreId: id}, function(){
			$location.path('/');
		});
	}
	$scope.edit = function(id){
		$location.path('genres/edit/'+id);
	}
}
ListGenresCtrl.$inject = ['$scope','$location','Genre'];
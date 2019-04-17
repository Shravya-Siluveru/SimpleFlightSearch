angular.module('flightController', [])

	.controller('mainController', ['$scope','$http','Flights', function($scope, $http, Flights) {
		$scope.formData = {};

		Flights.get()
			.success(function(data) {
				$scope.flights = data;
			});

		$scope.searchFlight = function() {

			if($scope.formData.date != undefined){
				if (($scope.formData.origin != undefined && $scope.formData.destination != undefined) || 
				($scope.formData.flightNumber != undefined) ){

				Flights.searchFlight($scope.formData)

					.success(function(data) {
						$scope.formData = {}; 
						$scope.flights = data;
					});
				}
			}
			
		};

	}]);
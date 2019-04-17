angular.module('flightController', [])

	.controller('mainController', ['$scope','$http','Flights', function($scope, $http, Flights) {
		$scope.formData = {};
		console.log("sfdsf");
		Flights.get()
			.success(function(data) {
				console.log("in get");
				$scope.flights = data;
			});

		$scope.searchFlight = function() {

			if (($scope.formData.origin != undefined && $scope.formData.destination != undefined) || 
				($scope.formData.flightNumber != undefined) ){
				$scope.loading = true;

				Flights.searchFlight($scope.formData)

					.success(function(data) {
						$scope.formData = {}; 
						$scope.flights = data;
					});
			}
		};

	}]);
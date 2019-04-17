angular.module('flightService', [])

	.factory('Flights', ['$http',function($http) {
		return {
			get : function() {
				console.log("here");
				return $http.get('/api/flights');
			},
			searchFlight : function(data) {
				console.log("here1");
				return $http.post('/api/flights', data);
			}
		}
	}]);
angular.module('flightService', [])

	.factory('Flights', ['$http',function($http) {
		return {
			get : function() {
				return $http.get('/api/flights');
			},
			searchFlight : function(data) {
				return $http.post('/api/flights', data);
			}
		}
	}]);
var fs = require('fs');

var flights;

var flightService = {

    allFlights: function () { 
        if(flights == undefined)
            parseFlightsInformation().then(function(data) { flights = data; });
        
        return flights;
    },

    searchByPlaces: function(origin, destination) { 
        var res = [];
        if(flights == undefined)
            parseFlightsInformation().then(function(data) { flights = data; });

        flights.forEach(function(flight) {
            if(flight.origin == origin && flight.destination == destination) {
                res.push(flight);
            }
        });

        if(res.length > 0)
            return res;
    },
    
    searchByNumber: function (flightNum) {
        var res;
        if(flights == undefined)
            parseFlightsInformation().then(function(data) { flights = data; });
        
        if(flightNum.length == 6 && flightNum[0] == 'U' && flightNum[1] == 'A') {
           flightNum = flightNum.substring(2);
        }
        flights.forEach(function(flight) {
            if(flight.flightNumber == flightNum) {
                res = [flight];
            }
        });
        if(res)
            return res;
    }
};

function parseFlightsInformation() {
    flights = JSON.parse(fs.readFileSync('flight-docs/flight-sample.json', 'utf8'));
    
    return new Promise(function(resolve, reject) {

        fs.readFile('light-docs/flight-sample.json', 'utf8', function(err, data) {
            if(err)
                reject(err);
            else
                resolve(data);
        });
    });
}

module.exports = flightService
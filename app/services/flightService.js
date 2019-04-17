var fs = require('fs');

var flights;

var flightService = {

    allFlights: function () { 
        if(flights == undefined)
            parseFlightsInformation().then(function(data) { flights = data; });
        
        return flights;
    },

    searchByPlaces: function(origin, destination, date) { 
        var res = [];
        if(flights == undefined)
            parseFlightsInformation().then(function(data) { flights = data; });

        flights.forEach(function(flight) {
            if(flight.origin == origin && flight.destination == destination && compareDates(flight.departure, date)) {
                res.push(flight);
            }
        });

        if(res.length > 0)
            return res;
    },
    
    searchByNumber: function (flightNum, date) {
        var res;
        if(flights == undefined)
            parseFlightsInformation().then(function(data) { flights = data; });
        
        if(flightNum.length == 6 && flightNum[0] == 'U' && flightNum[1] == 'A') {
           flightNum = flightNum.substring(2);
        }
        flights.forEach(function(flight) {
            if(flight.flightNumber == flightNum && compareDates(flight.departure, date)) {
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

        fs.readFile('flight-docs/flight-sample.json', 'utf8', function(err, data) {
            if(err)
                reject(err);
            else
                resolve(JSON.parse(data));
        });
    });
}

function compareDates(date1, date2) {

    date1 = new Date(date1);
    date2 = new Date(date2 + " CST");
    date1.setHours(0,0,0,0);
    date2.setHours(0,0,0,0);  

    return date1.getTime() === date2.getTime();
}

module.exports = flightService
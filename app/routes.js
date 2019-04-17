var flightService = require('./services/flightService');

module.exports = function (app) {

    //backend
    app.get('/api/flights', function (req, res) {
        console.log("called get backend");
        res.send(flightService.allFlights());
    });

    app.post('/api/flights', function (req, res) {
        console.log("called post backend");
        if(req.body.flightNumber != undefined){
            var details = flightService.searchByNumber(req.body.flightNumber);
            res.send(details);
        }
        else if(req.body.origin != undefined && req.body.destination != undefined)
            res.send(flightService.searchByPlaces(req.body.origin, req.body.destination));
    });

    // frontend
    app.get('*', function (req, res) {
        res.sendFile('index.html', { root: 'public'}); 
    });
};

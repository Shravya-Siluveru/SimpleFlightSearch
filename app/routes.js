var flightService = require('./services/flightService');

module.exports = function (app) {

    //backend
    app.get('/api/flights', function (req, res) {
        res.send(flightService.allFlights());
    });

    app.post('/api/flights', function (req, res) {
        
        if(req.body.flightNumber != undefined && req.body.date != undefined){
            var details = flightService.searchByNumber(req.body.flightNumber, req.body.date);
            res.send(details);
        }
        else if(req.body.origin != undefined && req.body.destination != undefined && req.body.date != undefined)
            res.send(flightService.searchByPlaces(req.body.origin, req.body.destination, req.body.date));
    });

    // frontend
    app.get('*', function (req, res) {
        res.sendFile('index.html', { root: 'public'}); 
    });
};

// calling the express function gives us an application 
// instance; a web API server that accepts HTTP requests
// on the root path 

// require express library, and assign an application instance 
// of this to the variable app
var express = require('express');
var app = express();

// add middleware to the application stack
app.use(express.static('public'));

// All requests to the /blocks url are dispatched
// to the blocks router
var blocks = require('./routes/blocks');
app.use('/blocks', blocks);

var locations = {
    'Fixed': 'First floor', 
    'Moveable': 'Second floor',
    'Rotating': 'Penthouse'
};


app.get('/locations/:name', function(req, res) {
   // var name = req.params.name;
   // var block = name[0].toUpperCase() + name.slice(1).toLowerCase();
    var location = locations[req.blockName];
});


app.listen(8080, function() {
    console.log('Listening on port 8080');   
});
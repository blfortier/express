// calling the express function gives us an application 
// instance; a web API server that accepts HTTP requests
// on the root path 

// require express library, and assign an application instance 
// of this to the variable app
var express = require('express');
var app = express();

var logger = require('./logger');
app.use(logger);

/*app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});*/

// add middleware to the application stack
app.use(express.static('public'));


// ?? Why is there no folder called blocks?
app.get('/blocks', function(req, res) {
   var blocks = ['Fixed', 'Movable', 'Rotating'];
   res.json(blocks); 
});


app.listen(8080, function() {
    console.log('Listening on port 8080');   
});
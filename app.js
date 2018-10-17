// calling the express function gives us an application 
// instance; a web API server that accepts HTTP requests
// on the root path 

// require express library, and assign an application instance 
// of this to the variable app
var express = require('express');
var app = express();

// get function creates a route that accepts HTTP get requests

app.get('/', function(req, res) {
    // response object sends back text 'Hello world'
    // res.send('Hello world'); --> using Express API
    // res.write and res.end are Node functions
     res.write('Hello world');
     res.end();
});

app.get('/blocks', function(req, res) {
    // redirecting a path
    // status code 301 shows the path was moved permanently
    res.redirect(301, '/parts');
    
    // passing an array
    // var blocks = ['Fixed', 'Movable', 'Rotating'];
    // res.json(blocks);
    // the send function converts objects and arrays to JSON
    // JS Object Notation
    // res.send(blocks);
    
    // passing a string to the send function (not typical)
    var blocks = '<ul><li>Fixed</li><li>Movable</li></ul>';
    res.send(blocks);
    
    
});





app.listen(8080, function() {
    console.log('Listening on port 8080');   
});
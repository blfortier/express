// calling the express function gives us an application 
// instance; a web API server that accepts HTTP requests
// on the root path 

// require express library, and assign an application instance 
// of this to the variable app
var express = require('express');
var app = express();

var blocks = {
    'Fixed': 'Fastened securely in position', 
    'Movable': 'Capable of being moved', 
    'Rotating': 'Moving in a circle around its center'
};

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

// add middleware to the application stack
app.use(express.static('public'));


// ?? Why is there no folder called blocks?
app.get('/blocks', function(req, res) {
 
   
   if (req.query.limit >= 0) {
       res.json(blocks.slice(0, req.query.limit));
   } else {
       res.json(blocks); 
   }
});

// create a dynamic route
app.get('/blocks/:name', function(req, res) {
    var description = blocks[req.params.name];
    // handle error if no property is found for a given Block name
    // check for presence of a description
    if (!description) {
        // display the status and a message
        res.status(404).json('No description found for ' + req.params.name);
    } else {
         res.json(description);
    }
   
});










app.listen(8080, function() {
    console.log('Listening on port 8080');   
});
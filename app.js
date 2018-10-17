// calling the express function gives us an application 
// instance; a web API server that accepts HTTP requests
// on the root path 

// require express library, and assign an application instance 
// of this to the variable app
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
// extended: false  --> forces the use of the native querystring Node lib.
var parseUrlencoded = bodyParser.urlencoded({ extended: false });

var blocks = {
    'Fixed': 'Fastened securely in position', 
    'Movable': 'Capable of being moved', 
    'Rotating': 'Moving in a circle around its center'
};


var locations = {
    'Fixed': 'First floor', 
    'Moveable': 'Second floor',
    'Rotating': 'Penthouse'
};

// Using app.route is recommended approach for avoiding duplicate route naemes
// chain functions
app.route('/blocks')
// ?? Why is there no folder called blocks?
    .get(function(req, res) {
       if (req.query.limit >= 0) {
           res.json(blocks.slice(0, req.query.limit));
       } else {
           res.json(Object.keys(blocks)); 
       }
    })
    // Routes can take multiple handlers as args and will
    // call them sequentially
    .post(parseUrlencoded, function(req, res) {
        // return form data
        var newBlock = req.body;
        
        // each element in the form becomes a property
        // add new block to the Block object
        blocks[newBlock.name] = newBlock.description;
        
        // set the 201 created status code
        res.status(201).json(newBlock.name);
    });


app.route('/blocks/:name')

    // create a dynamic route
    .get('/blocks/:name', function(req, res) {
        var description = blocks[req.blockName];
        
        // handle error if no property is found for a given Block name
        // check for presence of a description
        if (!description) {
            // display the status and a message
            res.status(404).json('No description found for ' + req.params.name);
        } else {
             res.json(description);
        }
    })
    
    // Delete route
    .delete('/blocks/:name', function(req, res) {
       delete blocks[req.blockName];
       res.sendStatus(200);
    });


// the app.param function maps placeholders to callback functions
// It's  useful for runing pre=conditions on dynamic routes
app.param('name', function(req, res, next) {
    var name = req.params.name;
    var block = name[0].toUpperCase() + name.slice(1).toLowerCase();
    
    // properties set on the request object can be accessed
    // from all subsequent routes in the application
    req.blockName = block;
    
    next();
});


/*app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});*/


// add middleware to the application stack
app.use(express.static('public'));


app.get('/locations/:name', function(req, res) {
   // var name = req.params.name;
   // var block = name[0].toUpperCase() + name.slice(1).toLowerCase();
    var location = locations[req.blockName];
});


app.listen(8080, function() {
    console.log('Listening on port 8080');   
});
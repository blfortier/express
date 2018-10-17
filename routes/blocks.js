var express = require('express');
// Returns router instance which can be mounted
// as a middleware
var router = express.Router();
var bodyParser = require('body-parser');
// extended: false  --> forces the use of the native querystring Node lib.
var parseUrlencoded = bodyParser.urlencoded({ extended: false });

var blocks = {
    'Fixed': 'Fastened securely in position', 
    'Movable': 'Capable of being moved', 
    'Rotating': 'Moving in a circle around its center'
};

router.route('/')
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
    

router.route('/:name')
    .all(function(req, res, next) {
        var name = req.params.name;
        var block = name[0].toUpperCase() + name.slice(1).toLowerCase();
        req.blockName = block;
        next();
    })
    
    // create a dynamic route
    .get(function(req, res) {
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
    .delete(function(req, res) {
       delete blocks[req.blockName];
       res.sendStatus(200);
    });


// export router 
module.exports = router;
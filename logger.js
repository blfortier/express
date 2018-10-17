// create a logger middleware


module.exports = function(req, res, next) {
    // plus sign converts date object to milliseconds
    var start = +new Date();
    var stream = process.stdout;
    var url = req.url;
    var method = req.method;
    
    res.on('finish', function() {
        var duration = +new Date() - start;
        var message = method + ' to ' + url +
            '\ntook ' + duration + ' ms \n\n';
        stream.write(message);
    });
    
    
    next();
}
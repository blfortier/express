/* global $*/

// returns a list of blocks in JSON format
$(function() {
    $.get('/blocks', appendToList);
    
    function appendToList(blocks) {
        var list = [];
        var content, block;
        for(var i in blocks) {
            block = blocks[i];
            // link to each Blocks description
            content = '<a href="/blocks/'+block+'">'+block+'</a>';
            list.push($('<li>', { html: content }));
        }
        $('.block-list').append(list);
    }
    
    // add listener to the submit event on the form element
    $('form').on('submit', function(event) {
        // prevent form from being immediately submitted
        event.preventDefault
        
        // wrap the object 'this' in a jquery object, then assign to 
        // variable form
        var form = $(this);
        
        // call the serialize function on the form object and assign it 
        // to the variable blockData -- serialize() transforms form data 
        // to URL-encoded notation
        var blockData = form.serialize();
        
        // Data is sent in a POST request to the /blocks endpoint
        $.ajax({
            type: 'POST', url: '/blocks', data: blockData
        }).done(function(blockName){
           appendToList([blockName]);
           // clear the input text fields
           form.trigger('reset');
        });
    });
});
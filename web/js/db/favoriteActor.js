/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$(document).ready(function() {
     $(function() {
        function split( val ) {
          return val.split( /,\s*/ );
        }

        function extractLast( term ) {
          return split( term ).pop();
        }
        
        $("#favoriteActors").autocomplete({
            source : function(request, response) {
               $.ajax({
                    url : "SearchController",
                    type : "GET",
                    data : {
                           term : extractLast(request.term)
                    },
                    dataType : "json",
                    success : function(data) {
                          response(data);
                    }
             });
          },
            select: function( event, ui ) {
            // Add the selected term appending to the current values with a comma
            var terms = split( this.value );
            // remove the current input
            terms.pop();
            // add the selected item
            terms.push( ui.item.value );
            // join all terms with a comma
            this.value = terms.join( ", " );
            return false;
          }
      });
   });
});

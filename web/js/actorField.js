/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function() {
    $("#actors").on('change keyup paste', function(){
        var genreBoxlenght = $(".dropdown").height();
        var actorBoxlenght;
        var height = 0;
        
        if (!$.trim($(this).val())) {
            $(this).css('height',''+genreBoxlenght);
            $(this).css('padding','13 19 12 10');
        }
        else{
            $(this).css('height','auto');
            $(this).height(this.scrollHeight-15);
            $(this).css('min-height',(this.scrollHeight-10));
        }
    });
    $("#actors").attr('rows', '1');
}); 

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function() {
    $("#actors").on('change keyup paste', function(){
        var OriginalHeight = $(".dropdown").height();
        if (!$.trim($(this).val())) {
            $(this).css('height','');
            $('.dropdown dt a').css('min-height','');
            $(this).css('padding','13 19 12 10');
        }
        else{
            $(this).css('height','auto');
            $(this).height(this.scrollHeight-15);
            $('.dropdown dt a').css('min-height',this.scrollHeight-15);
        }
        $("#actors").attr('rows', '1');
    });
    
    $("#favoriteActors").on('change keyup paste', function(){
        var OriginalHeight = $(".dropdown").height();
        if (!$.trim($(this).val())) {
            $(this).css('height','');
            $('.dropdown dt a').css('min-height','');
            $(this).css('padding','13 19 12 10');
        }
        else{
            $(this).css('height','auto');
            $(this).height(this.scrollHeight-15);
            $('.dropdown dt a').css('min-height',this.scrollHeight-15);
        }
        $("#favoriteActors").attr('rows', '1');
    });
}); 

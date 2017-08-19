/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function() {
    $("#search").on('change keyup paste', function(){
        var OriginalHeight = $(".dropdown").height();

        if (!$.trim($(this).val())) {
            $(this).css('height',''+OriginalHeight);
            $(this).css('padding','13 19 12 10');
        }
        else{
            $(this).css('height','auto');
            $(this).height(this.scrollHeight);
        }
    });
    $("#search").attr('rows', '1');
}); 

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function() {
    $(document).on("click", ".rating input", function(event){
        var value = $(this).val();
        var range_star = $('.range_star');

        if (value<10) {
            $(range_star).html(value);
            var val = (value - $('#star input[type="range"]').attr('min')) / ($('#star input[type="range"]').attr('max') - $('#star input[type="range"]').attr('min'));
            
            $('#star input[type="range"]').val(""+value);
            $('#star .min').css('background-image',
            '-webkit-gradient(linear, left top, right top, '
            + 'color-stop(' + val + ', #C5C5C5), '
            + 'color-stop(' + val + ', #ee7d13)'
            + ')');
        }
        if(value == 10){
            var defVal = 9; 
            $('#star' + defVal).prop('checked', true); 

            $(range_star).html(defVal);
            var val = (defVal - $('#star input[type="range"]').attr('min')) / ($('#star input[type="range"]').attr('max') - $('#star input[type="range"]').attr('min'));

            $('#star input[type="range"]').val(""+defVal);
            $('#star .min').css('background-image',
            '-webkit-gradient(linear, left top, right top, '
            + 'color-stop(' + val + ', #C5C5C5), '
            + 'color-stop(' + val + ', #ee7d13)'
            + ')');
        }
    });
}); 

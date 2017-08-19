/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function() {
    var url = $(location).attr('href');
    var username = url.split("=")[1];
    $('.nav-element_right').text('Welcome '+username);
    
    function rangeInputChangeEventHandler(e){
        var value = $(this).val();
        range_star = $(this).parent().children('.range_star');
        //alert(value);
        if (value >= 0 && value<10) {
            for (i = value; i <=10; i++) { 
                if(i>=value)
                {
                    $('#star' + value).prop('checked', true); 
                }
            }
        }
        else
        {
            for (i = 0; i <=10; i++) 
            { 
                $('#star' + i).prop('checked', false); 
            }
        }
        $(range_star).html(value);
        var val = ($(this).val() - $(this).attr('min')) / ($(this).attr('max') - $(this).attr('min'));

        $(this).css('background-image',
        '-webkit-gradient(linear, left top, right top, '
        + 'color-stop(' + val + ', #C5C5C5), '
        + 'color-stop(' + val + ', #ee7d13)'
        + ')'
        );
    }

 $('#star input[type="range"]').on( 'input', rangeInputChangeEventHandler);
});

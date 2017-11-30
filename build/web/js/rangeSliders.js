/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function() {
    function rangeInputChangeEventHandler(e){
        var rangeGroup = $(this).attr('name'),
            minBtn = $(this).parent().children('.min'),
            maxBtn = $(this).parent().children('.max'),
            range_min = $(this).parent().children('.range_min'),
            range_max = $(this).parent().children('.range_max'),
            minVal = parseInt($(minBtn).val()),
            maxVal = parseInt($(maxBtn).val()),
            origin = $(this).context.className;            
            var parent = $(this).parent().attr('id');
            
        if(origin === 'min' && minVal > maxVal-1){
            $(minBtn).val(maxVal-1);
        }
        var minVal = parseInt($(minBtn).val());
        $(range_min).html(minVal);


        if(origin === 'max' && maxVal-1 < minVal){
            $(maxBtn).val(1+ minVal);
        }
        var maxVal = parseInt($(maxBtn).val());
        $(range_max).html(maxVal);

        if(origin === 'min'){
            $("#" + parent + " .min").css("z-index", "1");
        }
        if(origin === 'max'){
            $("#" + parent + " .min").css("z-index", "");
        }


        var startval = (minVal - $(this).attr('min')) / ($(this).attr('max') - $(this).attr('min'));
        var endval = (maxVal - $(this).attr('min')) / ($(this).attr('max') - $(this).attr('min'));
        $(this).css('background-image',
        '-webkit-gradient(linear, left top, right top, '
        + 'color-stop(' + startval + ', #c5c5c5),'
        + 'color-stop(' + startval + ', #ee7d13),'
        + 'color-stop(' + endval + ', #ee7d13),'
        + 'color-stop(' + endval + ', #c5c5c5)'
        + ')'
        );
    }
 $('input[type="range"]').on( 'input', rangeInputChangeEventHandler);
});

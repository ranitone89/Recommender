/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function() {
    
    /*Lenght Range Ranking slider*/
    $('#star1').prop('checked', true); 
    $('#star input[type="range"]').on( 'input', rangeInputChangeEventHandler);
    $('input[type="range"]').on( 'input', rangeInputChangeEventHandlerAll);
    
    function rangeInputChangeEventHandlerAll(e){
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
 
    /*Actor Field*/
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
    
    /*Genre Boxes*/
    $(document).on("click", ".dropdown dt a", function(event){
        $(".dropdown dd ul").slideToggle('fast');
    });

    $(document).on("click", ".dropdown dd ul li a", function(event){
        $(".dropdown dd ul").hide();
    });

    function getSelectedValue(id) {
         return $("#" + id).find("dt a span.value").html();
    }

    $(document).bind('click', function(e) {
      var $clicked = $(e.target);
      if (!$clicked.parents().hasClass("dropdown")){
            $(".dropdown dd ul").hide();
      }
    });


    $(document).on('click', '.mutliSelect input[type="checkbox"]', function(event){
        var title = $(this).closest('.mutliSelect').find('input[type="checkbox"]').val(),title = $(this).val() + ",";
        var genreLengt = $('.multiSel').children().length;
        var genreEmpty = (genreLengt == 1);
        var genreHeight = 0;
        
        if ($(this).is(':checked')) {
          var html = '<span title="' + title + '">' + title + '</span>';
          $('.multiSel').append(html);
          $(".hida").hide();
          genreHeight = $(".dropdown").height();
        } 
        else {
            if(genreEmpty){
                $(".hida").show();
                $('#actors').css('height','');
                $(this).css('min-height','25');
            }
            $('span[title="' + title + '"]').remove();
            var ret = $(".hida");
            $('.dropdown dt a').append(ret);
            genreHeight = $(".dropdown").height();
          }
          $('#actors').css('height',genreHeight);
    });
    
    /*$("#actors").on('change keyup paste', function(){
        var OriginalHeight = $(".dropdown").height();

        if (!$.trim($(this).val())) {
            actorHeight = $(this).height();
            $(this).css('height','');
            $('.dropdown dt a').css('min-height','');
            $(this).css('padding','13 19 12 10');
        }
        else{
            $(this).css('height','auto');
            $(this).height(this.scrollHeight-15);
            $('.dropdown dt a').css('min-height',this.scrollHeight-15);
            actorHeight = $(this).height();
        }
        $("#actors").attr('rows', '1');
    });*/
 
    /************************Ranking*******************************/
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
    
    function rangeInputChangeEventHandler(e){
        var value = $(this).val();
        range_star = $(this).parent().children('.range_star');

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


}); 

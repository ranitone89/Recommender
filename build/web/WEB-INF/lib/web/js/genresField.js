/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function() {
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
    
    $("#actors").on('change keyup paste', function(){
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
    });
   
});
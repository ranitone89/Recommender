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
      var title = $(this).closest('.mutliSelect').find('input[type="checkbox"]').val(),
        title = $(this).val() + ",";
        var OriginalHeight;
        var genreLengt = $('.multiSel').children().length;
        var actorBoxlenght = $("#actors").height();
        $("span.multiSel").each(function(){
            if($.trim($("span.multiSel").html()).length==0)
            alert('Empty');
        });

        if ($(this).is(':checked')) {
          var html = '<span title="' + title + '">' + title + '</span>';
          $('.multiSel').append(html);
          OriginalHeight = $(".dropdown").height();
          $(".hida").hide();
        } 
        else {
            if(genreLengt == 1){
                $(".hida").show();
            }
            $('span[title="' + title + '"]').remove();
            var ret = $(".hida");
            $('.dropdown dt a').append(ret);
            OriginalHeight = $(".dropdown").height();
          }
          $('#actors').css('height',OriginalHeight);
    });
    

});
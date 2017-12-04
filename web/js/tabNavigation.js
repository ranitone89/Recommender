
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function() {
        $(document).on("click", ".tab-back-nav", function(event){
        var $movie = $(this).closest('.Movie');
        $('.title').css('display', 'none');
        $('.methods').css('display', 'none');
        $('.survey').css('display','none');
        $('#TopRated').css('display','block');
        
        var $activeTab = $('.tab-nav li.active');
        var indexActive = $activeTab.index();

        if(indexActive==0){
        $('#TopRated').children('.Movie').children('.RatedMovie').show();
        $('#TopRated').show();
        }
    
        if(indexActive==1){
        $('#New').children('.Movie').children('.RatedMovie').show();
        $('#New').show();
        }
        
        if(indexActive==2){
            $('#Cooming').children('.Movie').children('.RatedMovie').show();
            $('#Cooming').show();
        }
        $('.tab-nav').show();
        $('#Result').hide();
        $('.Movie').show();
        $('.Content').hide();
        $('.tab-back-nav').hide();
        $('.recom-text').hide();
   });
}); 

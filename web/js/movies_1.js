/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function() {
    var movieContent;
    var movies;
    var movie;
    var ratedMovies;
    
    $(document).on("click", ".RatedMovie img", function(event){
        $('.survey').css('display', 'none');
  
        var $movie = $(this).closest('.Movie');
        var method = $(this).parents().eq(3).attr('class').match(/\d+/)[0];
        var cluster = $(this).parents().eq(2).attr('id').match(/\d+/)[0];
        resizeMethod(method, 865);
       
        $('#ck-buttons').css('display','none');
        showMovie(method,cluster);
        movie = $(this).closest('.Movie');
        movies = $(".Movie").not($movie);
        movieContent = $(this).closest('.Movie').children('.Content');
        movies.hide();
        movieContent.show();  
        ratedMovies = $(this).closest('.Movie').children('.RatedMovie');
        ratedMovies.hide();
        
        $('.tab-back-nav').hide();
        $('.search-back-nav').show();
        
        var method = checkMethod($(movie).parents().eq(1).attr('class'))+1;
        checkStatistics(method);
        $('.Statistic'+method).css('display','none');
        $('.btnStatistics').css('display','none');
        
   });
   
    $(document).on("click", ".search-back-nav ", function(event){
        $('.survey').css('display', 'block');
        $('#ck-buttons').css('display','block');
        $('.btnStatistics').css('display','block');
        $('.Method1').css("width","643");
        $('.Method2').css("width","643");
        
        statisticsShow();
        movieContent.hide();
        var method = $(movieContent).parents().eq(3).attr('class');
        resizeMethod(method, 643);
        
        ratedMovies.show().removeAttr( 'style' );
        $(".Movie").show().removeAttr( 'style' );
        showAfterCheck(statistic);
        $(".btn").show();
        $('.search-back-nav').hide();
        $('.tab-back-nav').hide();
   });
});


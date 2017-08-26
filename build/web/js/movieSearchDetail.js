
$(document).ready(function() {
    var movieContent;
    var movies;
    var ratedMovies;
    
    $(document).on("click", ".RatedMovie img", function(event){
        var $movie = $(this).closest('.Movie');
        var cluster = $(this).parents().eq(3).attr('class');
        var row = $(this).parents().eq(2).attr('id');
        showMovie(cluster,row);
        
        movies = $(".Movie").not($movie);
        movieContent = $(this).closest('.Movie').children('.Content');
        
        movies.hide();
        movieContent.show();
        
        ratedMovies = $(this).closest('.Movie').children('.RatedMovie');
        ratedMovies.hide();
        $('.tab-back-nav').hide();
        $('.search-back-nav').show();
   });
   
    $(document).on("click", ".search-back-nav ", function(event){
        movieContent.hide();
        $(".Movie").show().removeAttr( 'style' );
        ratedMovies.show().removeAttr( 'style' );

        $(".cluster1").css('border','1px solid #f1f1f1');
        $(".cluster2").css('border','1px solid #f1f1f1');

        $(".cluster1").show();
        $(".cluster2").show();
        
        $('#Row1').show();
        $('#Row2').show();
        $('#Row3').show();
        
        $("#Row1").css('width', '621px');
        $("#Row1").css('height', '255px');
        
        $("#Row2").css('width', '621px');
        $("#Row2").css('height', '255px');
        
        $("#Row3").css('width', '621px');
        $("#Row3").css('height', '255px');
        
        $(".btn").show();
        $('.search-back-nav').hide();
        $('.tab-back-nav').show();
   });
   
    /**
     * Comment
     */
    function showMovie(cluster,row) {
        if(cluster =="cluster1"){
            $(".cluster2").hide();
            $(".cluster1").css('border','none');
            if(row=="Row1"){
                $("#Row2").hide();
                $("#Row3").hide();
                $("#Row1").css('width', 'auto');
                $("#Row1").css('height', 'auto');
            }
            if(row=="Row2"){
                $("#Row1").hide();
                $("#Row3").hide();
                $("#Row2").css('width', 'auto');
                $("#Row2").css('height', 'auto');
            }
            if(row=="Row3"){
                $("#Row1").hide();
                $("#Row2").hide();
                $("#Row3").css('width', 'auto');
                $("#Row3").css('height', 'auto');
            }
        }
        if(cluster =="cluster2"){
            $(".cluster1").hide();
            $(".cluster2").css('border','none');
            if(row=="Row1"){
                $("#Row2").hide();
                $("#Row3").hide();
                $("#Row1").css('width', 'auto');
                $("#Row1").css('height', 'auto');
            }
            if(row=="Row2"){
                $("#Row1").hide();
                $("#Row3").hide();
                $("#Row2").css('width', 'auto');
                $("#Row2").css('height', 'auto');
            }
            if(row=="Row3"){
                $("#Row1").hide();
                $("#Row2").hide();
                $("#Row3").css('width', 'auto');
                $("#Row3").css('height', 'auto');
            }
        }
        $(".btn").hide();
    }
}); 

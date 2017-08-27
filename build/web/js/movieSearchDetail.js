
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
        $(".cluster1").css('margin-left','0');
        var i;
        var cluster = ['cluster1','cluster2'];
        for(i=0; i<cluster.length; i++){
            $('.'+cluster[i]).css('border','1px solid #f1f1f1');
            $('.'+cluster[i]).show();
            $('.'+cluster[i]+ ' #Row1').show();
            $('.'+cluster[i]+ ' #Row2').show();
            $('.'+cluster[i]+ ' #Row3').show();
            $('.'+cluster[i]+ ' #Row1').css('width', '621px');
            $('.'+cluster[i]+ ' #Row1').css('height', '255px');
            $('.'+cluster[i]+ ' #Row2').css('width', '621px');
            $('.'+cluster[i]+ ' #Row2').css('height', '255px');
            $('.'+cluster[i]+ ' #Row3').css('width', '621px');
            $('.'+cluster[i]+ ' #Row3').css('height', '255px');
        }
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
            $("."+cluster).css('border','none');
            $(".cluster1").css('margin-left','130px');
            if(row=="Row1"){
                $("."+cluster+" #Row2").hide();
                $("."+cluster+" #Row3").hide();
                $("."+cluster+" #Row1").css('width', 'auto');
                $("."+cluster+" #Row1").css('height', 'auto');
            }
            if(row=="Row2"){
                $("."+cluster+" #Row1").hide();
                $("."+cluster+" #Row3").hide();
                $("."+cluster+" #Row2").css('width', 'auto');
                $("."+cluster+" #Row2").css('height', 'auto');
            }
            if(row=="Row3"){
                $("."+cluster+" #Row1").hide();
                $("."+cluster+" #Row2").hide();
                $("."+cluster+" #Row3").css('width', 'auto');
                $("."+cluster+" #Row3").css('height', 'auto');
            }
        }
        if(cluster =="cluster2"){
            $(".cluster1").hide();
            $("."+cluster).css('border','none');
            
            if(row=="Row1"){
                $("."+cluster+" #Row2").hide();
                $("."+cluster+" #Row3").hide();
                $("."+cluster+" #Row1").css('width', 'auto');
                $("."+cluster+" #Row1").css('height', 'auto');
            }
            if(row=="Row2"){
                $("."+cluster+" #Row1").hide();
                $("."+cluster+" #Row3").hide();
                $("."+cluster+" #Row2").css('width', 'auto');
                $("."+cluster+" #Row2").css('height', 'auto');
            }
            if(row=="Row3"){
                $("."+cluster+" #Row1").hide();
                $("."+cluster+" #Row2").hide();
                $("."+cluster+" #Row3").css('width', 'auto');
                $("."+cluster+" #Row3").css('height', 'auto');
            }
        }
        $(".btn").hide();
    }
}); 

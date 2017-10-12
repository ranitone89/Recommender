$(document).ready(function() {
    var movieContent;
    var movies;
    var ratedMovies;
    
    $(document).on("click", ".RatedMovie img", function(event){
        $('.survey').css('display', 'none');
        $('.title').css('display', 'none');
        $('.titles').css('display', 'none');

        var $movie = $(this).closest('.Movie');
        var method = $(this).parents().eq(3).attr('class').match(/\d+/)[0];
        var cluster = $(this).parents().eq(2).attr('id').match(/\d+/)[0];
        alert("Detail Num lenght: "+num.lenght);
        $('#ck-buttons').css('display','none');
        showMovie(method,cluster);
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
        
        $('.title').css('display', 'block');
        $('.titles').css('display', 'block');
        $('.survey').css('display', 'block');
        $('#ck-buttons').css('display','block');
        
        movieContent.hide();
        ratedMovies.show().removeAttr( 'style' );
        $(".Movie").show().removeAttr( 'style' );
        
        alert("Detail: "+num.length+1);
        for(var method=1; method<num.length+1; method++){
            $('.Method'+method + ' #ck-button').css('display','block');
            $('.Method'+method).css('border','1px solid #f1f1f1');
            $('.Method'+method).show();
            
            for(var cluster=1; cluster<[method]+1; cluster++){
                $('.Method'+method+ ' #Cluster'+cluster).show();
                $('.Method'+method+ ' #Cluster'+cluster).css('width', '621px');
                $('.Method'+method+ ' #Cluster'+cluster).css('height', '255px');
                $('.Method'+method).css('margin-left','');
            }
        }
        $(".btn").show();
        $('.search-back-nav').hide();
        $('.tab-back-nav').show();
   });
   
    /**
     * Comment
     */
    function showMovie(method,cluster) {

        for(var m=1; m<num.length+1; m++){
            var mt = ''+m;
            if(method===mt){
                $('.Method'+method).css('margin-left','130px');
                $('.Method'+method).css('border','none');
            }
            if(method!==mt){
                $('.Method'+mt).hide();
            }
            for(var c=1; c<num[m]+1; c++){
                var cl = ''+c;
                if(cluster===cl){
                    $('.Method'+method+' #Cluster'+cluster).css('width', 'auto');
                    $('.Method'+method+' #Cluster'+cluster).css('height', 'auto');                    
                }
                if(cluster!==cl){
                    $('.Method'+method+' #Cluster'+cl).hide();
                    $('.Method'+method+' #Cluster'+cl).hide();                    
                }
                
            }
            
        }
        $(".btn").hide();
    }
}); 

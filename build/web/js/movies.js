
    var divColors = ['#666','#f1f1f1','#d9f5da','#ffeaea','#c0fef1','#ffd6b3','#fae9be','#d4e3ff','#eafec0'];
    var focus = 5;
    var slideIndex = [[],[]];
    
    /* get movies for tab on start site*/
    $(document).ready(function() {
        getRatedMovies();
        getNewMovies();
        getCoomingMovies();
        document.getElementById('default').click();
        //document.getElementById('defaultEval').click();
        
        
    });

    /*Get new movies for the tab on start site*/
    function getNewMovies(){  
    var randomMovieArray = ['Wish Upon','War for the Planet of the Apes','The Big Sick','Lady Macbeth', 'Chasing Coral', 'Blind'];

      for (var i = 0; i < randomMovieArray.length; i++) {
        $.getJSON('http://www.omdbapi.com/?t='+ encodeURI(randomMovieArray[i])+ '&apikey=dc2f6d3a').then(function(response){
        $('<div></div>')
          .addClass('Movie').append('<div class="RatedMovie">' +
                                            '<img src="'+ response.Poster + 
                                            'alt="' + response.Title + '" ' + 
                                            'class="movieImage">' +  
                                            '<div id="textBlock">' + 
                                            '<h4>' + response.Title + '</h4>' + 
                                            '<h5>Realese: ' + response.Released + '</h5>' + 
                                            '<div class ="detail">' + 
                                            '<img src="img/info.png"><p class="detailLink">Detail</p></div>' + 
                                            '</div>'+
                                        '</div>'+
                                    '<div class="Content">' +
                                        '<div class="MovieImage">' +
                                        '<img width="204" height="350" src="'+ response.Poster + 
                                        'alt="' + response.Title + '"> '+ 
                                        '</div>' +
                                        '<div class="MovieInfos">'+
                                        '<h1 class="MovieTitle">'+ response.Title +
                                        '</h1>' + 
                                        '<div id="MovieDur">' + 
                                        '<span class="pg">G</span>' + 
                                        '<span class="duration">' + 
                                        '<i class="fa fa-clock-o"></i>'+ response.Runtime + '</span>' + 
                                        '</div>'+
                                        '<ul class="info-list">' + 
                                            '<li><label>Actors:</label>' +
                                            '<span>'+response.Actors + '</span></li>'+
                                            '<li><label>Director:</label>' +
                                            '<span>'+response.Director + '</span></li>'+
                                            '<li><label>Writer:</label>' +
                                            '<span>'+response.Writer + '</span></li>'+
                                            '<li><label>Genre:</label>' +
                                            '<span>'+response.Genre + '</span></li>'+
                                            '<li><label>Released:</label>' +
                                            '<span>'+response.Released + '</span></li>'+
                                            '<li><label>Language:</label>' +
                                            '<span>'+response.Language + '</span></li>'+
                                            '<li><label>Production:</label>' +
                                            '<span>'+response.Production + '</span></li>'+
                                            '<li><label>Website:</label>' +
                                            '<span>'+response.Website + '</span></li>'+
                                          '</ul>'+
                                          '<div class="entry-action">'+
                                            '<div class="mrate user-rate has-rate">'+
                                                  '<ul class="mv-rating-stars">'+
                                                    '<li class="mv-current-rating user-rating" data-point="92%" style="width: 92%;">'+
                                                    '</li>'+
                                                  '</ul>'+    
                                                  '<span class="mcount">'+response.imdbVotes+' votes</span>'+
                                                  '<span class="rate">'+response.imdbRating+'</span>'+
                                            '</div>'+
                                        '</div>'+  
                                    '</div>'+
                                    /*'<div class="clearfix"></div>'+*/
                                    '<div class="Synopsis" itemprop="description articleBody">'+
                                        '<h3 class="Action">Synopsis</h3>'+
                                        '<p>'+response.Plot+'</p>'+
                                    '</div>'+
                                '</div>')
          .appendTo('#New');
       });
     }
    }


    /*Get coming movies for the tab on start site*/
    function getCoomingMovies(){  
    var randomMovieArray = ['Baby Driver','Girls Trip','Landline','Atomic Blonde', 'Menashe'];

      for (var i = 0; i < randomMovieArray.length; i++) {
        $.getJSON('http://www.omdbapi.com/?t='+ encodeURI(randomMovieArray[i])+ '&apikey=dc2f6d3a').then(function(response){
        $('<div></div>')
          .addClass('Movie').append('<div class="RatedMovie">' +
                                            '<img src="'+ response.Poster + 
                                            'alt="' + response.Title + '" ' + 
                                            'class="movieImage">' +  
                                            '<div id="textBlock">' + 
                                            '<h4>' + response.Title + '</h4>' + 
                                            '<h5>Realese: ' + response.Released + '</h5>' + 
                                            '<div class ="detail">' + 
                                            '<img src="img/info.png"><p class="detailLink">Detail</p></div>' + 
                                            '</div>'+
                                        '</div>'+
                                    '<div class="Content">' +
                                        '<div class="MovieImage">' +
                                        '<img width="204" height="350" src="'+ response.Poster + 
                                        'alt="' + response.Title + '"> '+ 
                                        '</div>' +
                                        '<div class="MovieInfos">'+
                                        '<h1 class="MovieTitle">'+ response.Title +
                                        '</h1>' + 
                                        '<div id="MovieDur">' + 
                                        '<span class="pg">G</span>' + 
                                        '<span class="duration">' + 
                                        '<i class="fa fa-clock-o"></i>'+ response.Runtime + '</span>' + 
                                        '</div>'+
                                        '<ul class="info-list">' + 
                                            '<li><label>Actors:</label>' +
                                            '<span>'+response.Actors + '</span></li>'+
                                            '<li><label>Director:</label>' +
                                            '<span>'+response.Director + '</span></li>'+
                                            '<li><label>Writer:</label>' +
                                            '<span>'+response.Writer + '</span></li>'+
                                            '<li><label>Genre:</label>' +
                                            '<span>'+response.Genre + '</span></li>'+
                                            '<li><label>Released:</label>' +
                                            '<span>'+response.Released + '</span></li>'+
                                            '<li><label>Language:</label>' +
                                            '<span>'+response.Language + '</span></li>'+
                                            '<li><label>Production:</label>' +
                                            '<span>'+response.Production + '</span></li>'+
                                            '<li><label>Website:</label>' +
                                            '<span>'+response.Website + '</span></li>'+
                                          '</ul>'+
                                          '<div class="entry-action">'+
                                            '<div class="mrate user-rate has-rate">'+
                                                  '<ul class="mv-rating-stars">'+
                                                    '<li class="mv-current-rating user-rating" data-point="92%" style="width: 92%;">'+
                                                    '</li>'+
                                                  '</ul>'+    
                                                  '<span class="mcount">'+response.imdbVotes+' votes</span>'+
                                                  '<span class="rate">'+response.imdbRating+'</span>'+
                                            '</div>'+
                                        '</div>'+  
                                    '</div>'+
                                    '<div class="clearfix"></div>'+
                                    '<div class="Synopsis" itemprop="description articleBody">'+
                                        '<h3 class="Action">Synopsis</h3>'+
                                        '<p>'+response.Plot+'</p>'+
                                    '</div>'+
                                '</div>')
          .appendTo('#Cooming');
       });
     }
    }
    
    /*Get Rated movies for the tab on start site*/
    function getRatedMovies(){  
    var randomMovieArray = ['The Shawshank Redemption','The Godfather','The Godfather: Part II','The Dark Knight', 'Pulp Fiction', 'Lord of the Rings', 'Fight Club'];

      for (var i = 0; i < randomMovieArray.length; i++) {
        $.getJSON('http://www.omdbapi.com/?t='+ encodeURI(randomMovieArray[i])+ '&apikey=dc2f6d3a').then(function(response){
        $('<div></div>')
          .addClass('Movie').append('<div class="RatedMovie">' +
                                            '<img src="'+ response.Poster + 
                                            'alt="' + response.Title + '" ' + 
                                            'class="movieImage">' +  
                                            '<div id="textBlock">' + 
                                            '<h4>' + response.Title + '</h4>' + 
                                            '<h5>Realese: ' + response.Released + '</h5>' + 
                                            '<div class ="detail">' + 
                                            '<img src="img/info.png"><p class="detailLink">Detail</p></div>' + 
                                            '</div>'+
                                        '</div>'+
                                    '<div class="Content">' +
                                        '<div class="MovieImage">' +
                                        '<img width="204" height="350" src="'+ response.Poster + 
                                        'alt="' + response.Title + '"> '+ 
                                        '</div>' +
                                        '<div class="MovieInfos">'+
                                        '<h1 class="MovieTitle">'+ response.Title +
                                        '</h1>' + 
                                        '<div id="MovieDur">' + 
                                        '<span class="pg">G</span>' + 
                                        '<span class="duration">' + 
                                        '<i class="fa fa-clock-o"></i>'+ response.Runtime + '</span>' + 
                                        '</div>'+
                                        '<ul class="info-list">' + 
                                            '<li><label>Actors:</label>' +
                                            '<span>'+response.Actors + '</span></li>'+
                                            '<li><label>Director:</label>' +
                                            '<span>'+response.Director + '</span></li>'+
                                            '<li><label>Writer:</label>' +
                                            '<span>'+response.Writer + '</span></li>'+
                                            '<li><label>Genre:</label>' +
                                            '<span>'+response.Genre + '</span></li>'+
                                            '<li><label>Released:</label>' +
                                            '<span>'+response.Released + '</span></li>'+
                                            '<li><label>Language:</label>' +
                                            '<span>'+response.Language + '</span></li>'+
                                            '<li><label>Production:</label>' +
                                            '<span>'+response.Production + '</span></li>'+
                                            '<li><label>Website:</label>' +
                                            '<span>'+response.Website + '</span></li>'+
                                          '</ul>'+
                                          '<div class="entry-action">'+
                                            '<div class="mrate user-rate has-rate">'+
                                                  '<ul class="mv-rating-stars">'+
                                                    '<li class="mv-current-rating user-rating" data-point="92%" style="width: 92%;">'+
                                                    '</li>'+
                                                  '</ul>'+    
                                                  '<span class="mcount">'+response.imdbVotes+' votes</span>'+
                                                  '<span class="rate">'+response.imdbRating+'</span>'+
                                            '</div>'+
                                        '</div>'+  
                                    '</div>'+
                                    '<div class="clearfix"></div>'+
                                    '<div class="Synopsis" itemprop="description articleBody">'+
                                        '<h3 class="Action">Synopsis</h3>'+
                                        '<p>'+response.Plot+'</p>'+
                                    '</div>'+
                                '</div>')
          .appendTo('#TopRated');
       });
      }
    }

    /*Display movies to div according to query*/
    movieObject.displayMovies = function(movies,method,cluster){
      $('#TopRated').css("display","none");
      $('#New').css("display","none");
      $('#Cooming').css("display","none");
      $('.Method'+method+' #Cluster'+cluster).empty();
      $('#Result').css("display","block");

      $('.Method'+method+ ' #Cluster'+cluster).css("background-color",""+setDivColor(cluster));
      $('.Method'+method+ ' #Cluster'+cluster).css("display","block");
      

      var movieClass ='';
      for (var i = 0; i < movies.length; i++) {
        var movieNum = 0;
        var poster = "";
        var title = "";

        $.getJSON('http://www.omdbapi.com/?t='+ encodeURI(movies[i])+ '&apikey=dc2f6d3a').then(function(response){

            poster = checkPoster(response.Poster);
            title = checkTitle(response.Title);
            if(title!==undefined){
                //movieClass = showHideMovie(movieNum);
                movieClass = movieObject.showHideMovie(movieNum);
                $('<div></div>')
                .addClass(''+movieClass).append('<div class="RatedMovie">' +
                                            '<img src="'+ poster + '" '+
                                            'alt="' + title + '" ' +
                                            'class="movieImage">' +
                                            '<div id="textBlock">' +
                                            '<h4>' + title + '</h4>' +
                                            '<h5>Realese: ' + response.Released + '</h5>' +
                                            '</div>'+
                                        '</div>'+
                                    '<div class="Content">' +
                                        '<div class="MovieImage">' +
                                        '<img width="204" height="350" src="'+ poster + '" '+
                                        'alt="' + response.Title + '"> '+
                                        '</div>' +
                                        '<div class="MovieInfos">'+
                                        '<h1 class="MovieTitle">'+ response.Title +
                                        '</h1>' +
                                        '<div id="MovieDur">' +
                                        '<span class="pg">G</span>' +
                                        '<span class="duration">' +
                                        '<i class="fa fa-clock-o"></i>'+ response.Runtime + '</span>' +
                                        '</div>'+
                                        '<ul class="info-list">' +
                                            '<li><label>Actors:</label>' +
                                            '<span>'+response.Actors + '</span></li>'+
                                            '<li><label>Director:</label>' +
                                            '<span>'+response.Director + '</span></li>'+
                                            '<li><label>Writer:</label>' +
                                            '<span>'+response.Writer + '</span></li>'+
                                            '<li><label>Genre:</label>' +
                                            '<span>'+response.Genre + '</span></li>'+
                                            '<li><label>Language:</label>' +
                                            '<span>'+response.Language + '</span></li>'+
                                            '<li><label>Production:</label>' +
                                            '<span>'+response.Production + '</span></li>'+
                                            '<li><label>Website:</label>' +
                                            '<span>'+response.Website + '</span></li>'+
                                          '</ul>'+
                                          '<div class="entry-action">'+
                                            '<div class="mrate user-rate has-rate">'+
                                                  '<ul class="mv-rating-stars">'+
                                                    '<li class="mv-current-rating user-rating" data-point="92%" style="width: 92%;">'+
                                                    '</li>'+
                                                  '</ul>'+
                                                  '<span class="mcount">'+response.imdbVotes+' votes</span>'+
                                                  '<span class="rate">'+response.imdbRating+'</span>'+
                                            '</div>'+
                                        '</div>'+
                                    '</div>'+
                                    '<div class="clearfix"></div>'+
                                    '<div class="Synopsis" itemprop="description articleBody">'+
                                        '<h3 class="Action">Synopsis</h3>'+
                                        '<p>'+response.Plot+'</p>'+
                                    '</div>'+
                                '</div>')
                .appendTo('.Method'+method+' #Cluster'+cluster);
                movieNum = movieNum+1; 
                }
               
            });
        }
        var cb = 'cb_cluster'+method+cluster;
        var lb = 'lb_'+cluster;
        var bt = 'bt_'+method;

        if (!$('.Method'+method+' .btnStatistics').length)
        {    
            $('.Method'+method).append('<input type="submit" id="'+bt+'" class="btnStatistics" value="Statistiken">');
        }

        
        $('.Method'+method+' #Cluster'+cluster).append('<button class="btn" id="btn_prev">&#10094</button>');
        $('.Method'+method+' #Cluster'+cluster).append('<button class="btn" id="btn_next">&#10095</button>');
        $('.Method'+method+' #Cluster'+cluster).append('<input id="'+cb+'" type="checkbox" class="cb_cluster" value="'+cluster+'">');
        $('.Method'+method+' #Cluster'+cluster).append('<label class="cb_text" for="'+cb+'"></label>');
        $('.Method'+method+' #Cluster'+cluster).append('<label id="'+lb+'" class="cb_text_label"></label>');
       
    }
    
    /*Show movie of one method and particular cluster*/
    movieObject.showMovie = function(method,cluster,num) {
        for(var m=0; m<num.length; m++){
            var mt = ''+(m+1);
            if(method===mt){
                $('.Method'+method).css('margin-left','130px');
                $('.Method'+method).css('border','none');
            }
            if(method!==mt){
                $('.Method'+mt).hide();
            }
            for(var c=0; c<num[m]; c++){
                var cl = ''+(c+1);
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
    };
    
    /*Show movie in slider*/
    movieObject.showHideMovie = function(movieNum) {
        var movieClass ='';
        if(movieNum<focus){
            movieClass ='Movie';
        }
        else{
            movieClass ='Movie hide';
        }
        return movieClass;
    };
    
    /*Show movie tab after evaluation*/
    movieObject.showMovies = function(){
        $('.tab-nav').css("display","block");
        $('.tab-back-nav').css("display","none");
        $('.recom-text').css("display","none");
        $('.search-tab-close').css("display","block");;
        $('#TopRated').css("display","block");
        $('#Result').css("display","none");
        $('.submitSurvey').css("display","block");
        $('.search').css("display","block");    
   };
   
    /*Hide movie tab from start site on evaluation mode*/
    movieObject.hideMovies = function(){
      $('.tab-nav').css("display","block");
      $('.tab-back-nav').css("display","none");
      $('.recom-text').css("display","none");
      $('.search-tab-close').css("display","none");;
      $('#TopRated').css("display","block");
      $('#Result').css("display","none");
      $('.submitSurvey').css("display","none");
      $('.search').css("display","none");    
   };
   
    /*Check current inex of movie slide*/
    movieObject.checkIndex = function(id,lenght,method,cluster,slideIndex) {
        if(id=="btn_prev"){
            if(slideIndex[method][cluster]<=0){
                slideIndex[method][cluster] = 0;
            }
            else{
                slideIndex[method][cluster] = slideIndex[method][cluster]-1;
            }
        }
        if(id=="btn_next"){
            if(lenght>focus){
                if(slideIndex[method][cluster]>=(lenght-focus)){
                    slideIndex[method][cluster] = (lenght-focus);
                }
                else{
                    slideIndex[method][cluster] = slideIndex[method][cluster]+1;
                }
            }
            else{
                slideIndex[method][cluster] = 0;
            }
        }
    };
    
     /* Slide Movies
     * 
     */
    movieObject.slide = function(slider,lenght,cluster,row,slideIndex) {
        for(var i=0; i<lenght;i++ ){
            $(slider).eq(i).addClass('hide');
        }
        for(i=slideIndex[cluster][row]; i<(slideIndex[cluster][row]+focus);i++ ){
            $(slider).eq(i).removeClass('hide');
        }
    };
    
    /*If poster dont exist than the placeholder will be used*/
    function checkPoster(moviePoster) {
        var poster = "";
        if(moviePoster ==="N/A"){
            poster = "img/no_poster.png";
        }
        else{
            poster = moviePoster;
        } 
        
        return poster;
    }
    
    /** Check if title is known 
     * 
     */
    function checkTitle(movieTitle) {
        var title = "";
        if(movieTitle ==="N/A"){
            title = "Unknown";
        }
        else{
            title = movieTitle;
        } 
        
        return title;
    }
    
    /*Set div color*/
    function setDivColor(cluster){
        return divColors[cluster];
    }
    
    /*Slider buttons*/
    $(document).on("click", ".btn", function(event){
        var buttonid = $(this).attr('id');
        var method = $(this).parents().eq(1).attr('class');
        var cluster = $(this).parents().eq(0).attr('id');
        var slider = $('.'+method+' #'+cluster+' .Movie');
        
        var lenght = slider.length;
        method = checkMethod(method);
        cluster = checkCluster(cluster);
        //checkIndex(buttonid,lenght,method,cluster);
        movieObject.checkIndex(buttonid,lenght,method,cluster,slideIndex);
        //slide(slider,lenght,method,cluster);
        movieObject.slide(slider,lenght,method,cluster,slideIndex);
   });
   
       /*
     * 
     * @param {type} method
     * @returns {Number}
     */
    function checkMethod(method) {
        var method = parseInt(method.replace(/Method/, ''))-1;
        return method;

    }
    
     /*
      * 
      * @param {type} cluster
      * @returns {Number}
      */
    function checkCluster(cluster) {
        var r = parseInt(cluster.replace(/Cluster/, ''))-1;
        return r;
    }
    
    movieObject.setSlideIndex = function(method, cluster, value){
        slideIndex[method][cluster] = value;
    };
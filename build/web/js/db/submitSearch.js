$(document).ready(function() {
    var slideIndex = [[0, 0, 0],[0, 0,0]];
    var focus = 5;
    
    $(document).on("click", ".btn", function(event){
        var buttonid = $(this).attr('id');
        var cluster = $(this).parents().eq(1).attr('class');
        var row = $(this).parents().eq(0).attr('id');
        var slider = $('.'+cluster+' #'+row+' .Movie');

        var lenght = slider.length;
        cluster = checkCluster(cluster);
        row = checkRow(row);
        checkIndex(buttonid,lenght,cluster,row);
        slide(slider,lenght,cluster,row);
   });
   
    /**
     * Check Index 
     */
    function checkIndex(id,lenght,cluster,row) {
        if(id=="btn_prev"){

            if(slideIndex[cluster][row]<=0){
                slideIndex[cluster][row] = 0;
            }
            else{
                slideIndex[cluster][row] = slideIndex[cluster][row]-1;
            }
        }
        if(id=="btn_next"){
            if(slideIndex[cluster][row]>=(lenght-focus)){
                slideIndex[cluster][row] = (lenght-focus);
            }
            else{
                slideIndex[cluster][row] = slideIndex[cluster][row]+1;                
            }
        }
    }
    /**
     * Slide movies in intervall
     */
    function slide(slider,lenght,cluster,row) {
        var i;

        for(i=0; i<lenght;i++ ){
            $(slider).eq(i).addClass('hide');
        }
 
        for(i=slideIndex[cluster][row]; i<(slideIndex[cluster][row]+focus);i++ ){
            $(slider).eq(i).removeClass('hide'); 
        }
    }
    
    /**
     * Cluster
     */
    function checkCluster(cluster) {
        var cluster = parseInt(cluster.replace(/cluster/, ''))-1;
        return cluster;

    }
     /**
     * Row
     */
    function checkRow(row) {
        var r = parseInt(row.replace(/Row/, ''))-1;
        return r;
    }
    
    
    /************************** Submit Search *********************/
    
    $(document).on("click", ".submitBtn", function(event){
        slideIndex = [[0, 0, 0],[0, 0,0]];
        alert('submitBtn');
        var actors = removeLastComma($('#actors').val());
        var genres = removeLastComma($('.multiSel').text());

        var maxReleased = $('#released .range_max').text();
        var minReleased = $('#released .range_min').text();
        var maxLenght = $('#lenght .range_max').text();
        var minLenght = $('#lenght .range_min').text();
        var minStar = $('#star .range_star').text();

         if(actors == ""){
             $('#messageSearch').css("display","block");
             $('#messageSearch').html("<font color='red'>Insert at least the Name of one Actor </font>")
             return;
         }
         if(genres == ""){
             $('#messageSearch').css("display","block");
             $('#messageSearch').html("<font color='red'>Select at least one Genre </font>")
             return;
         }
         else{
             alert('Message None');
             var actorList = covertToArray(actors,'a');
             var genreList = covertToArray(genres,'g');

             $.ajax({
             url : "SearchServlet",
             type : "GET",
             beforeSend: function(){
                 $('#loading').show();
                 $('#loading').css("visibility", "visible");
                 alert('Before');
             },
             data : {
                 actorList : actorList,
                 genreList : genreList,
                 maxLenght : maxLenght,
                 minLenght : minLenght,
                 minReleased : minReleased,
                 maxReleased : maxReleased,
                 minStar     : minStar
             },
             complete: function(){
                 $('#loading').hide();
             },
             success : function(results){
                 if(results != null && results != "")
                 {
                     showMessage(results);
                 }
                 else
                 {
                     $('#messageSearch').css("display","block");
                     $('#messageSearch').html("<font color='red'>Please chnage yourparameters </font>");
                     alert("Some exception occurred! Please try again.");
                 }
             }
            });
         }     
     });


    //function to display message to the user
    function showMessage(results){
        if(results != null){
            var recommendation = covertToArray(results,'r');
            getMovies(recommendation,1,1);
            getMovies(recommendation,1,2);
            getMovies(recommendation,1,3);

            getMovies(recommendation,2,1);
            getMovies(recommendation,2,2);
            getMovies(recommendation,2,3);


            $('.tab-nav').hide();
            $('.tab-back-nav').show();
            $('.recom-text').show();
            $('.search').hide();
            $('.search-tab-close').hide();
        }
        else if(results == 'FAILURE'){
            alert('fehler');
        }
    }

    function getMovies(movies,klaster,row){ 
      $('#TopRated').css("display","none");
      $('#New').css("display","none");
      $('#Cooming').css("display","none");
      $('.cluster'+klaster+' #Row'+row).empty();
      $('#Result').css("display","block");
      $('.cluster'+klaster+ '#Row'+row).css("display","block");

      var focus = 5;
      var movieClass ='';
      for (var i = 0; i < movies.length; i++) {
        var movieNum = 0;
        var poster = "";

        $.getJSON('http://www.omdbapi.com/?t='+ encodeURI(movies[i])+ '&apikey=dc2f6d3a').then(function(response){
            if(movieNum<focus){
            movieClass ='Movie';
            }
            else{
                movieClass ='Movie hide';
            }
            movieNum = movieNum+1;
            /*+ response.Poster +*/
            if(response.Poster =="N/A"){
                poster = "img/no_poster.png";
            }
            else{
                poster = response.Poster;
            }
            $('<div></div>')
                .addClass(''+movieClass).append('<div class="RatedMovie">' +
                                            '<img src="'+ poster + '" '+ 
                                            'alt="' + response.Title + '" ' +
                                            'class="movieImage">' +  
                                            '<div id="textBlock">' + 
                                            '<h4>' + response.Title + '</h4>' + 
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
                .appendTo('.cluster'+klaster+' #Row'+row);
            });
            }
        var cb = 'cb_cluster'+klaster+row;
        $('.cluster'+klaster+' #Row'+row).append('<button class="btn" id="btn_prev">&#10094</button>');
        $('.cluster'+klaster+' #Row'+row).append('<button class="btn" id="btn_next">&#10095</button>');
        $('.cluster'+klaster+' #Row'+row).append('<input id="'+cb+'" type="checkbox" class="cb_cluster">');
        $('.cluster'+klaster+' #Row'+row).append('<label class="cb_text" for="'+cb+'"></label>');
    }
    
    function covertToArray(array, string) 
    {
        var theArray = '';

        if(string =='a'){
            theArray = array.split(", ");
            for (var i = 0; i < theArray.length; i++) {
                if (theArray[i].length > 0) {
                    var tmp = theArray[i].split(" ");
                    if(tmp.length>=3){
                        if(tmp[tmp.length-1]=="Jr."){ //|| tmp[tmp.length-1]=="Sr."
                            theArray[i] = tmp[1] + " " + tmp[tmp.length-1] + ", " + tmp[0]+"%";
                            alert(theArray[i]);
                            alert("1");
                        }
                        if(tmp[1]=="De"){
                            theArray[i] = tmp[1]+ " " +tmp[tmp.length-1]+ ", " + tmp[0]+"%";
                            alert(theArray[i]);
                        }
                    }
                    else{
                        theArray[i] = tmp[tmp.length-1]+ ", " + tmp[0] +"%";
                        alert(theArray[i]);
                    }
                }
            }
            
        }

        if(string =='g'){
            theArray = array.split(",");
            for (var i = 0; i < theArray.length; i++) {
                if(theArray[i]!=="") {
                  var tmp = theArray[i]; 
                  theArray[i] = tmp;
                }
            }
        }

        if(string =='r'){
            theArray = array.split(", ");
            for (var i = 0; i < theArray.length; i++) { 
                var tmp = theArray[i].substring(0, theArray[i].indexOf('('));
                tmp = tmp.replace('[','');
                theArray[i] = tmp;
                }
            }

        return unique(theArray);
    }

    function unique(list) {
      var result = [];
      $.each(list, function(i, e) {
        if ($.inArray(e, result) == -1) result.push(e);
      });
      return result;
    }

    function removeLastComma(str) {
       return str.replace(/,(\s+)?$/, '');   
    }
}); 
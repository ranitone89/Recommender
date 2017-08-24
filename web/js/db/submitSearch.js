function search(evt) {
   
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
        $('#messageSearch').css("display","none");
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
                $('#messageSearch').css("display","block");
            }
            else
            {
                $('#messageSearch').css("display","none");
                $('#messageSearch').html("");
                alert("Some exception occurred! Please try again.");
            }
        }
        });
    }     
}


//function to display message to the user
function showMessage(results){
    if(results != null){
        var recommendation = covertToArray(results,'r');
        getMovies(recommendation);
        $('.tab-nav').hide();
        $('.search-back-nav').show();
        $('.recom-text').show();
        $('.search').hide();
        $('.search-tab-close').hide();
    }
    else if(results == 'FAILURE'){
        alert('fehler');
    }
}

function getMovies(movies){ 
  $('#TopRated').css("display","none");
  $('#New').css("display","none");
  $('#Cooming').css("display","none");
  $('#Result').empty();
  $('#Result').css("display","block");
  
  
  for (var i = 0; i < movies.length; i++) {
    $.getJSON('http://www.omdbapi.com/?t='+ encodeURI(movies[i])+ '&apikey=dc2f6d3a').then(function(response){
    $('<div></div>')
      .addClass('Movie').append('<div class="RatedMovie">' +
                                        '<img src="'+ response.Poster + 
                                        'alt="' + response.Title + '" ' + 
                                        'class="movieImage">' +  
                                        '<div id="textBlock">' + 
                                        '<h4>' + response.Title + '</h4>' + 
                                        '<h5>Realese: ' + response.Released + '</h5>' + 
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
      .appendTo('#Result');
   });
 }
 $("#Result").append('<button class="btn" id="btn_prev">&#10094</button>');
 $("#Result").append('<button class="btn" id="btn_next">&#10095</button>');
}



function covertToArray(array, string) 
{
    var theArray = '';
    
    if(string =='a'){
        theArray = array.split(", ");
        for (var i = 0; i < theArray.length; i++) {
          if (theArray[i].length > 0) {
            var tmp = theArray[i].split(" ");
                theArray[i] = tmp[tmp.length-1]+ ", " + tmp[0];
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
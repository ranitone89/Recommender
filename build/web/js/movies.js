/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function() {
    getRatedMovies();
    getNewMovies();
    getCoomingMovies();
    document.getElementById('default').click();
    //document.getElementById('defaultEval').click();
});


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

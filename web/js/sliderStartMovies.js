$(document).ready(function() {
    var randomMovieArray = ['Dunkirk','War for the Planet of the Apes', 'Spider-Man: Homecoming', 'Baby Driver','To the Bone','Lady Macbeth'
                            ,'The Dark Knight','Pulp Fiction','The Godfather','Forrest Gump','The Matrix','The Lord of the Rings','The Silence of the Lambs',
                            'Se7en','Gladiator','American Beauty','Ice Age','Django Unchained'];

      for (var i = 0; i < randomMovieArray.length; i++) {
        $.getJSON('http://www.omdbapi.com/?t='+ encodeURI(randomMovieArray[i])+ '&apikey=dc2f6d3a').then(function(response){
        $('<div></div>').append('<img data-u="image" src="'+ response.Poster+'">').appendTo('.slides');
       });
     }
});
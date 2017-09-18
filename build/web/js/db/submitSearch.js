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
             var actorList = covertToArray(actors,'a');
             var genreList = covertToArray(genres,'g');

             $.ajax({
             url : "SearchServlet",
             type : "GET",
             beforeSend: function(){
                 $('#loading').show();
                 $('#loading').css("visibility", "visible");
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
             dataType: "json",
             complete: function(){
                 $('#loading').hide();
             },
             success : function(response){
                        if(response != null && response != "")
                        {
                            var jsonStr = JSON.stringify(response);
                            var jsonObj = JSON.parse(jsonStr);
                            getMovies(jsonObj);
                            alert("Aufruf display Charts");
                            
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
    function showMessage(movies,cluster){
        if(movies !== null){
            //var recommendation = covertToArray(movies,'r');
            $('.survey').css('display', 'block');
            $('.title').css('display', 'block');
            $('.methods').css('display', 'block');
            
            displayMovies(covertToArray(movies,'r'),1,cluster);

            $('.tab-nav').hide();
            $('.tab-back-nav').show();
            $('.recom-text').show();
            $('.search').hide();
            $('.search-tab-close').hide();
        }
        else if(movies == 'FAILURE'){
            alert('fehler');
        }
    }

    function getCharts(dataList,cluster)
    {
        var ag = new Array();
        var gl = new Array();
        var lr = new Array();
        var rr = new Array();
        
        //number of movie objects
        for(var i =0; i<dataList.length; i++){
            //number of scores
            for(var j=0; j<dataList[i].scores.length; j++){
                if(j==0){
                    ag.push({ x : dataList[i].scores[j], y: dataList[i].scores[j+1], title: dataList[i].title });
                }
                if(j==1){
                    gl.push({ x : dataList[i].scores[j], y: dataList[i].scores[j+1],title: dataList[i].title });
                }
                if(j==2){
                    lr.push({ x : dataList[i].scores[j], y: dataList[i].scores[j+1],title: dataList[i].title });
                }                
                if(j==3){
                    rr.push({ x : dataList[i].scores[j], y: dataList[i].scores[j+1],title: dataList[i].title });
                }
            }
        }
        displaytCharts(ag,cluster, "actor","genre","actor_genre");
        displaytCharts(gl,cluster, "genre","lenght","genre_len");
        displaytCharts(lr,cluster, "lenght","release year","len_rel");
        displaytCharts(rr,cluster, "release year","rating","rel_rank");
    }

    function displaytCharts(jsonData,cluster, column1,column2,div_name)
    {
        alert("Get CHarts");

        Highcharts.chart(''+div_name, {

            chart: {
                type: 'scatter',
                //plotBorderWidth: 1,
                zoomType: 'xy'
            },

            legend: {
                enabled: false
            },

            title: {
                text: 'Scores'
            },
            credits: false,
            subtitle: {
                text: ''+column1+'/'+column2
            },
            exporting: {
                enabled: false
            },
            xAxis: {
                //gridLineWidth: 1,
                title: {
                    text: ''+column1
                },
                labels: {
                    format: '{value}'
                },
            },

            yAxis: {
                startOnTick: false,
                endOnTick: false,
                title: {
                    text: ''+column2
                },
                labels: {
                    format: '{value}'
                },
                maxPadding: 0.2,
            },

            tooltip: {
                //useHTML: true,
                headerFormat: '<table>',
                pointFormat: '<b>{point.title}</b><br>'+ ' '+column1+' :{point.x}'+ ' '+column2+' :{point.y}'
            },
            series: [{
                data: jsonData
            }]
        });
    }

    function getMovies(jsonObj)
    {
        var dataList = [];
        for(var i = 0; i < jsonObj.length+1; i++)
        {
            var movies = "";
            var cluster = i+1;
            
            var score = [];
            for(var j = 0; j<jsonObj[i].movies.length; j++){
                movies += jsonObj[i].movies[j].title+", ";
                score.push({title: jsonObj[i].movies[j].title, scores: jsonObj[i].movies[j].scores});
            }
            alert(JSON.stringify(score));
            getCharts(score,i);
            showMessage(movies,cluster);
        }
    }


    function displayMovies(movies,klaster,row){
      $('#TopRated').css("display","none");
      $('#New').css("display","none");
      $('#Cooming').css("display","none");
      $('.cluster'+klaster+' #Row'+row).empty();
      $('#Result').css("display","block");
      $('.cluster'+klaster+ '#Row'+row).css("display","block");

      
      var movieClass ='';
      for (var i = 0; i < movies.length; i++) {
        var movieNum = 0;
        var poster = "";
        var title = "";

        $.getJSON('http://www.omdbapi.com/?t='+ encodeURI(movies[i])+ '&apikey=dc2f6d3a').then(function(response){
            movieClass = showHideMovie(movieNum);
            poster = checkPoster(response.Poster);
            title = checkTitle(response.Title);
                    
            movieNum = movieNum+1;
            
            if(title!==undefined){
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
                .appendTo('.cluster'+klaster+' #Row'+row);
                }
            });
        }
        var cb = 'cb_cluster'+klaster+row;
        var lb = 'lb_'+klaster+row;
        $('.cluster'+klaster+' #Row'+row).append('<button class="btn" id="btn_prev">&#10094</button>');
        $('.cluster'+klaster+' #Row'+row).append('<button class="btn" id="btn_next">&#10095</button>');
        $('.cluster'+klaster+' #Row'+row).append('<input id="'+cb+'" type="checkbox" class="cb_cluster">');
        $('.cluster'+klaster+' #Row'+row).append('<label class="cb_text" for="'+cb+'"></label>');
        $('.cluster'+klaster+' #Row'+row).append('<label id="'+lb+'" class="cb_text_label"></label>');
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
                        }
                        if(tmp[1]=="De"){
                            theArray[i] = tmp[1]+ " " +tmp[tmp.length-1]+ ", " + tmp[0]+"%";
                        }
                    }
                    else{
                        theArray[i] = tmp[tmp.length-1]+ ", " + tmp[0] +"%";
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
                if(theArray[i]!=="") {
                    var tmp = theArray[i].substring(0, theArray[i].indexOf('('));
                    tmp = tmp.replace('[','');
                    theArray[i] = tmp;
                }
            }
        }

        return unique(removeEmptyElements(theArray));
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

    function removeEmptyElements(array) {
        var newArray = [];
        for (var i = 0; i < array.length; i++) {
            if (array[i] !== "" && array[i] !== null) {
                newArray.push(array[i]);
            }
        }
        return newArray;
    }
    
    function showHideMovie(movieNum) {
        var movieClass ='';
        var focus = 5;
        if(movieNum<focus){
            movieClass ='Movie';
        }
        else{
            movieClass ='Movie hide';
        }
        return movieClass;
    }
    
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
    
    function checkTitle(movieTitle) {
        var title = "";
        if(movieTitle ==="N/A"){
            title = "img/no_poster.png";
        }
        else{
            title = movieTitle;
        } 
        
        return title;
    }
});
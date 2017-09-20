$(document).ready(function() {
    
    var focusStat = 4;
    var focus = 5;
    var activeStat ='';
    var movieContent;
    var movies;
    var ratedMovies;
    var num = [];
    var slideIndex = new Array();
    var statcsIndex  = 0;
    
    
    $(document).on("click", ".RatedMovie img", function(event){
        $('.survey').css('display', 'none');
        $('.title').css('display', 'none');
        $('.titles').css('display', 'none');

        var $movie = $(this).closest('.Movie');
        var method = $(this).parents().eq(3).attr('class').match(/\d+/)[0];
        var cluster = $(this).parents().eq(2).attr('id').match(/\d+/)[0];
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
        
        for(var method=0; method<num.length; method++){
            var m = method + 1;
            $('.Method'+m + ' #ck-button').css('display','block');
            $('.Method'+m).css('border','1px solid #f1f1f1');
            $('.Method'+m).show();
        
            for(var cluster=0; cluster<num[method]; cluster++){
                var c = cluster +1; 
                $('.Method'+m+ ' #Cluster'+c).show();
                $('.Method'+m+ ' #Cluster'+c).css('width', '621px');
                $('.Method'+m+ ' #Cluster'+c).css('height', '255px');
                $('.Method'+m).css('margin-left','');
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
    }
    
    
    $(document).on("click", ".btn", function(event){
        var buttonid = $(this).attr('id');
        var method = $(this).parents().eq(1).attr('class');
        var cluster = $(this).parents().eq(0).attr('id');
        var slider = $('.'+method+' #'+cluster+' .Movie');
        
        var lenght = slider.length;
        method = checkMethod(method);
        cluster = checkCluster(cluster);
        checkIndex(buttonid,lenght,method,cluster);
        slide(slider,lenght,method,cluster);
   });

    $(document).on("click", ".btn_statc", function(event){
        var buttonid = $(this).attr('id');
        var slider = $(''+activeStat+' .clstats');
        checkIndexStat(buttonid,slider.length);
        slideStatcs(slider);
   });
   
    function checkIndexStat(id,lenght) {
        if(id==="btn_next_stat"){
            if(statcsIndex>=(lenght-focusStat)){
                statcsIndex = statcsIndex;
            }
            else{
                statcsIndex = statcsIndex+4;
            }
        }
        if(id==="btn_prev_stat"){
            if(statcsIndex<=0){
                statcsIndex = 0;
            }
            else{
                statcsIndex = statcsIndex-4;
            }
        }
    }
    /**
     * Check Index
     */
    function checkIndex(id,lenght,method,cluster) {
        if(id=="btn_prev"){
            if(slideIndex[method][cluster]<=0){
                slideIndex[method][cluster] = 0;
            }
            else{
                slideIndex[method][cluster] = slideIndex[method][cluster]-1;
            }
        }
        if(id=="btn_next"){
            if(slideIndex[method][cluster]>=(lenght-focus)){
                slideIndex[method][cluster] = (lenght-focus);
            }
            else{
                slideIndex[method][cluster] = slideIndex[method][cluster]+1;
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

    function slideStatcs(slider) {
        for(var i=0; i<slider.length;i++ ){
            $(slider).eq(i).addClass('hide');
        }

        for(var i=statcsIndex; i<(statcsIndex+focusStat);i++ ){
            $(slider).eq(i).removeClass('hide');
        }
    }
    /**
     * Cluster
     */
    function checkMethod(method) {
        var method = parseInt(method.replace(/Method/, ''))-1;
        return method;

    }
     /**
     * Row
     */
    function checkCluster(cluster) {
        var r = parseInt(cluster.replace(/Cluster/, ''))-1;
        return r;
    }

    $(document).on("click", ".Clusters", function(event){

        var method = checkMethod($(this).parents().eq(0).attr('class'))+1;
        var cluster = checkCluster($(this).attr('id'))+1;
        statcsIndex = 0;
        
        for(var m=0; m<num.length; m++){
            var mt = m+1;
            if(method===mt){
                $('.Statistic'+method).css('display', 'block');
                alert("Method1");
            }
            if(method!==mt){
                alert("Method2");
                $('.Method'+mt).css('display', 'none');
                $('.Statistic'+mt).css('display', 'none');
            }
            for(var c=0; c<num[m]; c++){
                var cl = c+1;
                if(cluster===cl){
                    $('.Statistic'+method+' #statCl'+cluster).css('display', 'block');
                    activeStat = '.Statistic'+method+' #statCl'+cluster;                    
                }
                if(cluster!==cl){
                    $('.Statistic'+method+' #statCl'+cl).css('display', 'none');
                }
                
            }
            
        }
       
    });
    $(document).on("click", ".statistics-close", function(event){
        for(var m=0; m<num.length; m++){
            var mt = m+1;
            $('.Method'+mt).css('display', 'block');
            $('.Statistic'+mt).css('display', 'none');
            
            /*for(var c=0; c<num[m]; c++){
                var cl = c+1;
                if(cluster===cl){
                    $('.Statistic'+method+' #statCl'+cluster).css('display', 'block');
                    activeStat = '.Statistic'+method+' #statCl'+cluster;                    
                }
                if(cluster!==cl){
                    $('.Statistic'+method+' #statCl'+cl).css('display', 'none');
                }
                
            }*/
            
        }
        activeStat = 0;
    });

    /************************** Submit Search *********************/

    $(document).on("click", ".submitBtn", function(event){
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
                            getData(jsonObj);

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
    function showMessage(method,cluster,movies){
        if(movies !== null){
            $('.survey').css('display', 'block');
            $('.title').css('display', 'block');
            $('.titles').css('display', 'block');
            
            displayMovies(covertToArray(movies,'r'),method,cluster);

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

    function getCharts(dataList,method,cluster)
    {
        var data = new Array();

        //number of movie objects
        var dataDim = 0;
        for(var j=0; j<dataList[0].scores.length; j++){
            for(var z = j+1; z <dataList[0].scores.length; z++ )
            {   
                data.push( [] );
                dataDim = dataDim+1;
            }
        }
        
        for(var i =0; i<dataList.length; i++){
            var dim = 0;
            for(var j=0; j<dataList[i].scores.length; j++){
                
                for(var z = j+1; z <dataList[i].scores.length; z++ ){        
                    data[dim].push({ x : dataList[i].scores[j], y: dataList[i].scores[z], title: dataList[i].title });
                    dim = dim+1;
                }
                
            } 
        }
        var labels = getStatcsLabel(['actor','genre','lenght','year','rating']);

        for(var i=0; i<data.length; i++){
            displaytCharts(data[i],method,cluster,labels[i],i);
        }
    }


    function getStatcsLabel(labels){
        var label = [];
        for(var j=0; j<labels.length; j++){
            for(var z = j+1; z <labels.length; z++ )
            {   
                label.push(labels[j]+" "+labels[z]);
            }
        }
        
        return label;
    }
    
    function displaytCharts(jsonData,method,cluster, label,i)
    {   
        var stats = showHideStat(i);
        var axis = label.split(" ");

        $('#Result .Statistic'+method+' #statCl'+cluster).append('<div id='+axis[0]+'_'+axis[1]+ '_'+method+cluster+' ></div>');
        $('#Result .Statistic'+method+' #statCl'+cluster+' #'+axis[0]+'_'+axis[1]+ '_'+method+cluster).addClass(stats);

        Highcharts.chart(''+axis[0]+'_'+axis[1]+ '_'+method+cluster,{
            chart: {
                type: 'scatter',
                zoomType: 'xy'
            },

            legend: {
                enabled: false
            },

            title: {
                text: ''
            },
            credits: false,
            subtitle: {
                text: ''+axis[0]+'/'+axis[1]
            },
            exporting: {
                enabled: false
            },
            xAxis: {
                //gridLineWidth: 1,
                title: {
                    text: ''+axis[0]
                },
                labels: {
                    format: '{value}'
                },
            },

            yAxis: {
                startOnTick: false,
                endOnTick: false,
                title: {
                    text: ''+axis[1]
                },
                labels: {
                    format: '{value}'
                },
                maxPadding: 0.2,
            },

            tooltip: {
                //useHTML: true,
                headerFormat: '<table>',
                pointFormat: '<b>{point.title}</b><br>'+ ' '+axis[0]+' :{point.x}'+ ' '+axis[1]+' :{point.y}'
            },
            series: [{
                data: jsonData
            }]
        });
    }

    
    function getData(jsonObj)
    {
        /********************* Get Movies **********************/
        for(var mt = 0; mt < jsonObj.length; mt++)
        {
            num.push(jsonObj[mt].length);
            for(var cl = 0; cl<jsonObj[mt].length; cl++){
                
                var movies = "";
                var cluster= jsonObj[mt][cl].clusterid+1;
                var method = jsonObj[mt][cl].methodid +1;
                $('.Method'+method).append('<div id=Cluster'+cluster+' class=Clusters></div>');
                $('.Statistic'+method).append('<div id=statCl'+cluster+' class=Statics></div>');
                
                for(var j = 0; j<jsonObj[mt][cl].movies.length; j++){
                    movies += jsonObj[mt][cl].movies[j].title+", ";
                }
                showMessage(method,cluster,movies);
            }
        }
        
        /********************* Statistics **********************/

        for(var mt = 0; mt < jsonObj.length; mt++)
        {
            for(var cl = 0; cl<jsonObj[mt].length; cl++){
                
                var cluster= jsonObj[mt][cl].clusterid+1;
                var method = jsonObj[mt][cl].methodid +1;

                var score = [];
                for(var j = 0; j<jsonObj[mt][cl].movies.length; j++){
                    score.push({title: jsonObj[mt][cl].movies[j].title, scores: jsonObj[mt][cl].movies[j].scores});
                }
                getCharts(score,method,cluster);
            }
        }        
        initIndex(num);
    }
    
    function initIndex(num) {
        for(var i=0;i<num.length;i++) {
            slideIndex[i]=new Array();
            for(var j=0;j<num[i];j++) {
                slideIndex[i][j] = 0;
            } 
        }
    }
    
    function displayMovies(movies,method,cluster){
      $('#TopRated').css("display","none");
      $('#New').css("display","none");
      $('#Cooming').css("display","none");
      $('.Method'+method+' #Cluster'+cluster).empty();
      $('#Result').css("display","block");
      $('.Method'+method+ '#Cluster'+cluster).css("display","block");

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
                .appendTo('.Method'+method+' #Cluster'+cluster);
                }
            });
        }
        var cb = 'cb_cluster'+method+cluster;
        var lb = 'lb_'+method+cluster;
        $('.Method'+method+' #Cluster'+cluster).append('<button class="btn" id="btn_prev">&#10094</button>');
        $('.Method'+method+' #Cluster'+cluster).append('<button class="btn" id="btn_next">&#10095</button>');
        $('.Method'+method+' #Cluster'+cluster).append('<input id="'+cb+'" type="checkbox" class="cb_cluster">');
        $('.Method'+method+' #Cluster'+cluster).append('<label class="cb_text" for="'+cb+'"></label>');
        $('.Method'+method+' #Cluster'+cluster).append('<label id="'+lb+'" class="cb_text_label"></label>');
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

    
    function showHideStat(movieNum) {
        var movieClass ='';
        var focus = 4;
        if(movieNum<focus){
            movieClass ='clstats';
        }
        else{
            movieClass ='clstats hide';
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
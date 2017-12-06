$(document).ready(function() {
    var evalNum = 1;
    var scenarioNum = 0;
    var focusStat = 4;
    var focus = 5;
    var movieContent;
    var movies;
    var movie;
    var ratedMovies;
    var num = [];
    var slideIndex = [[],[]];
    var searchPrameter = [[]];
    var statcsIndex  = 0;
    var statistic = 0;
    var charts = new Array();
    var numStats;
    var method1Parameter = [];
    var method2Parameter = [];
    var scenarios = [];
    var evalShowInfos = true;
    var errorevalShowInfos = false;
    var mode = 1;
    var divColors = ['#666','#f1f1f1','#d9f5da','#ffeaea','#c0fef1','#ffd6b3','#fae9be','#d4e3ff','#eafec0'];
    var activeStatistic = 0;
    var surveryInfor = false;
    var surveyIndex = 1;
    var scenarioIndex = 2;
    var surveyPar = false;
    
    var userId = getUserId();
    initMode();
    getScenariosDB();
    //initMode();
    initWelcomeScreen();
    
    $(document).scroll(function(e) {
        
        var header = $(".Statistic"+activeStatistic);
        if(activeStatistic!==0){
            var elTop = $('.Method'+activeStatistic).offset().top;
            var elBottom = $('.Method'+activeStatistic).offset().top + $('.Method'+activeStatistic).height();
            if($(this).scrollTop() >= elTop && $(this).scrollTop() <= elBottom)  {
                if(activeStatistic===1){
                    $(".Statistic"+activeStatistic).css({position: "fixed", "top" : "0", "margin-left":"694px"});
                }
                if(activeStatistic===2){
                   header.css({position: "fixed", "top" : "0"});
                   $(".Method"+activeStatistic).css({"float":"right","margin-right":"2px","margin-left":""});
                }
            } else {
                if(activeStatistic===1){
                   header.css({position:"relative","margin-left":"50px"});
                   $(".Method"+activeStatistic).css({"float":"left"});
                }
                if(activeStatistic===2){
                    header.css({position:"relative","margin-left":"0px"});
                    $(".Method"+activeStatistic).css({"float":"left", "margin-left":"50px","margin-right":""});
                }
            }
        }
    });
    
    $(document).on("click", ".RatedMovie img", function(event){
        $('.survey').css('display', 'none');
  
        var $movie = $(this).closest('.Movie');
        var method = $(this).parents().eq(3).attr('class').match(/\d+/)[0];
        var cluster = $(this).parents().eq(2).attr('id').match(/\d+/)[0];
        resizeMethod(method, 865);
       
        $('#ck-buttons').css('display','none');
        showMovie(method,cluster);
        movie = $(this).closest('.Movie');
        movies = $(".Movie").not($movie);
        movieContent = $(this).closest('.Movie').children('.Content');
        movies.hide();
        movieContent.show();  
        ratedMovies = $(this).closest('.Movie').children('.RatedMovie');
        ratedMovies.hide();
        
        $('.tab-back-nav').hide();
        $('.search-back-nav').show();
        
        var method = checkMethod($(movie).parents().eq(1).attr('class'))+1;
        checkStatistics(method);
        $('.Statistic'+method).css('display','none');
        $('.btnStatistics').css('display','none');
        
   });
   
    $(document).on("click", ".search-back-nav ", function(event){
        $('.survey').css('display', 'block');
        $('#ck-buttons').css('display','block');
        $('.btnStatistics').css('display','block');
        $('.Method1').css("width","643");
        $('.Method2').css("width","643");
        
        statisticsShow();
        movieContent.hide();
        var method = $(movieContent).parents().eq(3).attr('class');
        resizeMethod(method, 643);
        
        ratedMovies.show().removeAttr( 'style' );
        $(".Movie").show().removeAttr( 'style' );
        showAfterCheck(statistic);
        $(".btn").show();
        $('.search-back-nav').hide();
        $('.tab-back-nav').hide();
   });

    /*
     * 
     * @returns {undefined}
     */
    function getUserId() {
        var url = window.location.href;
        var userid = url.substring(url.lastIndexOf('=') + 1);
        return userid;
    }

    /*
     * 
     * @returns {undefined}
     */
    function resizeMethod(method, width) {
        $('.Method'+method).css('width',''+width);
    }
    /*
     * 
     * @returns {undefined}
     */
    function statisticsShow() {
        if(statistic !==0){
            $('.Statistic'+statistic).css('display','block');
        }
    }
    
    /* @
     * @param {type} method
     * @returns {undefined}
     */
    function checkStatistics(method) {
        if($('.Statistic'+method).css('display') == 'block'){
            statistic = method;
        }
        else{
            statistic = 0;
        }
    }
    
    /*
     * 
     * @returns {undefined}
     */
    function showAfterCheck(statistic){
        if(statistic !==0){
            showAfterDetailStat(statistic);
        }
        else{
            showAfterDetail();
        }
    }    
    /**
     * 
     * @param {type} method
     * @param {type} cluster
     * @returns {undefined}
     */
    function showAfterDetail(){
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
    }

    /**
     * 
     * @param {type} method
     * @param {type} cluster
     * @returns {undefined}
     */
    function showAfterDetailStat(statistic){
        for(var method=0; method<num.length; method++){
            var mt = method + 1;
            if(statistic===mt){
                $('.Method'+statistic + ' #ck-button').css('display','block');
                $('.Method'+statistic).css('border','1px solid #f1f1f1');
                $('.Method'+statistic).show();            }
            if(statistic!==mt){
                $('.Method'+mt).hide();
            }
        
            for(var cluster=0; cluster<num[method]; cluster++){
                var c = cluster +1; 
                $('.Method'+statistic+ ' #Cluster'+c).show();
                $('.Method'+statistic+ ' #Cluster'+c).css('width', '621px');
                $('.Method'+statistic+ ' #Cluster'+c).css('height', '255px');
                $('.Method'+statistic).css('margin-left','');
            }
        }
    }
    
    
    /*
     * 
     * @param {type} method
     * @param {type} cluster
     * @returns {undefined}
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

    $(document).on("mouseover",".RatedMovie", function(event){
        var text = $(this).closest('.Movie').find('.MovieTitle').text().trim();

        var method = $(this).parents().eq(2).attr('class').match(/\d+/)[0]-1;
        var myData = charts[method][0].series[0].data;
        
        for(var j = 0; j<10; j++){
            for ( var i = 0; i < myData.length; i++ )
            {
                var tmp = myData[i].title.substring(0, myData[i].title.indexOf('('));
                
                if(tmp.toString().indexOf('"')=== 0){
                    tmp = tmp.match(/\"(.*?)\"/)[1];
                }
                
                if(text==$.trim(tmp)){
                    charts[method][j].series[0].data[i].setState('hover');
                    
                }
                else{
                    charts[method][j].series[0].data[i].setState('');
                }
            } 
        }
    });
       
    
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
        var method = $(this).parents().eq(0).attr('class');
        var slider = $('.'+method+' .clstats');
        checkIndexStat(buttonid,slider.length);
        slideStatcs(slider);
   });
   
   /*
    * 
    * @param {type} id
    * @param {type} lenght
    * @returns {undefined}
    */
    function checkIndexStat(id,lenght) {
        if(id==="btn_next_stat"){
            if(statcsIndex>=(lenght-focusStat) || statcsIndex>=8){
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
    
    /*
     * 
     * @param {type} id
     * @param {type} lenght
     * @param {type} method
     * @param {type} cluster
     * @returns {undefined}
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
    }
    
    /*
     * 
     * @param {type} slider
     * @param {type} lenght
     * @param {type} cluster
     * @param {type} row
     * @returns {undefined}
     */
    function slide(slider,lenght,cluster,row) {
        for(var i=0; i<lenght;i++ ){
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

    $(document).on("click", ".btnStatistics", function(event){
        var method = checkMethod($(this).parents().eq(0).attr('class'))+1;
        activeStatistic = method;
        statcsIndex = 0;
        $('.ck-button').css('display', 'none');
        $('.survey').css('display', 'none');
        for(var m=0; m<num.length; m++){
            var mt = m+1;
            if(method===mt){
                $('.Statistic'+method).css('display', 'block');
                $('#tMethod'+method).css('display', 'block');
                $('#tStat'+method).css('display', 'block');
                
            }
            if(method!==mt){
                $('.Method'+mt).css('display', 'none');
                $('.Statistic'+mt).css('display', 'none');
                $('#tMethod'+mt).css('display', 'none');
                $('#tStat'+mt).css('display', 'none');
            }            
        }
       
    });
    $(document).on("click", ".statistics-close", function(event){
        var activeStatic = $(this).parents().eq(0).attr('class');
        activeStatistic = 0;
        $('.ck-button').css('display', 'block');
        $('.survey').css('display', 'block');
        for(var m=0; m<num.length; m++){
            var mt = m+1;
            $('.Method'+mt).css('display', 'block');
            $('.Statistic'+mt).css('display', 'none');
            $('.Statistic'+mt).css('position', '');
            $('.Statistic'+mt).css('margin-left', '');
            $('.Statistic'+mt).css('top', '');
            $('#tMethod'+mt).css('display', 'block');
            $('#tStat'+mt).css('display', 'none');
            
        }
        resetStats(activeStatic);
    });

    /************************** Submit Search *********************/

    $(document).on("click", ".submitBtn", function(event){
        $('.statistics-close').trigger('click');       
        mode = getMode();
        //getParameterMode(mode);
        getModeParameter(mode);
        
        
        activeStatistic = 0;
        statcsIndex = 0;
        
        var actors = removeLastComma($('#actors').val());
        var genres = removeLastComma($('.multiSel').text());
        var maxReleased = $('#released .range_max').text();
        var minReleased = $('#released .range_min').text();
        var maxLenght = $('#lenght .range_max').text();
        var minLenght = $('#lenght .range_min').text();
        var minStar = $('#star .range_star').text();
        
            
         if(actors == ""){
             $('#messageSearch').css("display","block");
             $('#messageSearch').html("<font color='red'>Geben Sie bitte mindestens einen Namen ein. </font>")
             return;
         }
         if(genres == ""){
             $('#messageSearch').css("display","block");
             $('#messageSearch').html("<font color='red'>Wählen Sie bitte mindestens ein Genre </font>")
             return;
         }
         else{
             $('#messageSearch').css("display","none");
             var actorList = covertToArray(actors,'a');
             var genreList = covertToArray(genres,'g');
             $('#id02').css("display","none");
             delDivContent();
             surveryInfor==false;
             
             $.ajax({
             url : "SearchServlet",
             type : "GET",
             beforeSend: function(){
                 showLoading();
                 hideResult();
             },
             data : {
                 actorList : actorList,
                 genreList : genreList,
                 maxLenght : maxLenght,
                 minLenght : minLenght,
                 minReleased : minReleased,
                 maxReleased : maxReleased,
                 minStar     : minStar,
                 method1    : method1Parameter,
                 method2    : method2Parameter
                 
             },
             dataType: "json",
             complete: function(){
                    hideLoading();
                    showResult();
             },
             success : function(response){
                        if(response != null && response != "")
                        {
                            errorevalShowInfos = false;
                            var jsonStr = JSON.stringify(response);
                            var jsonObj = JSON.parse(jsonStr);
                            sortData(jsonObj);

                        }
                    else
                        {
                            errorevalShowInfos = true;
                            $('#messageSearch').css("display","block");
                            $('#messageSearch').html("<font color='red'>Die angegebene Parameter sind zu spezifisch. </font>");
                            alert("Some exception occurred! Please try again.");
                        }
                }
            });
         }
     });

     function setSearchParameter(parameter){
        setActorParam(parameter[0]);
        setGenreParam(parameter[1]);
        setLenghtParam(parameter[2]);
        setReleasedParam(parameter[3]);
        setRankingParam(parameter[4]);
     }

    /*
     * 
     * @returns {undefined}
     */
    function delDivContent(){
        $('.Method1').empty();
        $('.Method2').empty();
        $('.Statistics1').empty();
        $('.Statistics2').empty();
    }

    /*
     * 
     * @returns {undefined}
     */
    function resetStats(statistic){
        var slider = $('.'+statistic+' .clstats');
        for(var i=0; i<slider.length;i++ ){
            $(slider).eq(i).addClass('hide');
        }

        for(var i=0; i<focusStat;i++ ){
            $(slider).eq(i).removeClass('hide');
        }
    }

    /*
     * 
     * @param {type} method
     * @param {type} cluster
     * @param {type} movies
     * @returns {undefined}
     */
    function showMessage(method,cluster,movies){
        if(movies !== null){
            $('.survey').css('display', 'block');
            
            displayMovies(covertToArray(movies,'r'),method,cluster);

            $('.tab-nav').hide();
            $('.tab-back-nav').show();
            $('.recom-text').show();
            $('.search').hide();
            $('.search-tab-close').hide();
            $('.submitSurvey').css('display', 'block');
        }
        else if(movies == 'FAILURE'){
            alert('fehler');
        }
    }
    
    function getParameterMode(mode) {
       if(mode == 0){
            getTestPrametar();
       }
        if(mode == 1){
            getEvalPrametar();
        }  
    }    
    

    /*
     * 
     * @param {type} dataList
     * @param {type} method
     * @param {type} cluster
     * @returns {undefined}
     */
    function getCharts(dataList,method)
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
                    data[dim].push({ x : dataList[i].scores[j], y: dataList[i].scores[z], title: dataList[i].title, color:dataList[i].color});
                    dim = dim+1;
                }
                
            } 
        }
        var labels = getStatcsLabel(['actor','genre','lenght','year','rating']);
        numStats = data.length;
        
        for(var i=0; i<data.length; i++){
            
            displaytCharts(data[i],method,labels[i],i);
            
        }
    }

    /*
     * 
     * @param {type} labels
     * @returns {Array}
     */
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
    
    /*
     * 
     * @param {type} jsonData
     * @param {type} method
     * @param {type} cluster
     * @param {type} label
     * @param {type} i
     * @returns {undefined}
     */
    function displaytCharts(jsonData,method,label,i)
    {   
        var stats = showHideStat(i);
        var axis = label.split(" ");


        $('#Result .Statistic'+method).append('<div id='+axis[0]+'_'+axis[1]+ '_'+method+' ></div>');
        $('#Result .Statistic'+method+' #'+axis[0]+'_'+axis[1]+ '_'+method).addClass(stats);

        charts[method-1][i] = Highcharts.chart(''+axis[0]+'_'+axis[1]+ '_'+method,{
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
                text: '<br>'+axis[0]+'/'+axis[1]+'</br>'
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
            plotOptions: {
            scatter: {
                marker: {
                    radius: 5,
                    states: {
                        hover: {
                            enabled: true,
                            lineColor: 'rgb(100,100,100)'
                        }
                    }
                },
                states: {
                    hover: {
                        marker: {
                            enabled: true,
                        }
                    }
                },
                tooltip: {
                    //useHTML: true,
                    headerFormat: '<table>',
                    pointFormat: '<b>{point.title}</b><br>'+ ' '+axis[0]+' :{point.x}'+ ' '+axis[1]+' :{point.y}'
                }
            }
            
                /*tooltip: {
                    //useHTML: true,
                    headerFormat: '<table>',
                    pointFormat: '<b>{point.title}</b><br>'+ ' '+axis[0]+' :{point.x}'+ ' '+axis[1]+' :{point.y}'
                }*/
            },
            series: [{
                    data: jsonData
            }]
        });
    }

    /*
     * 
     * @param {type} jsonObj
     * @returns {undefined}
     */
    function getData(jsonObj)
    {
        for(var mt = 0; mt < jsonObj.length; mt++)
        {
            charts[mt] = new Array();
            num.push(jsonObj[mt].length);
            
            for(var cl = 0; cl<jsonObj[mt].length; cl++){
                
                var movies = "";
                var cluster= jsonObj[mt][cl].clusterid+1;
                var method = jsonObj[mt][cl].methodid +1;
                $('.Method'+method).append('<div id=Cluster'+cluster+' class=Clusters></div>');
                
                for(var j = 0; j<jsonObj[mt][cl].movies.length; j++){
                    movies += jsonObj[mt][cl].movies[j].title+", ";
                    //alert("FIlm ID: "+jsonObj[mt][cl].movies[j].movieId+" Cluster: "+cluster);
                }
                showMessage(method,cluster,movies);
                //initIndex(method,cluster);
                slideIndex[mt][cl] = 0;
            }
        }
        /********************* Statistics **********************/

        for(var mt = 0; mt < jsonObj.length; mt++)
        {
            var score = [];
            for(var cl = 0; cl<jsonObj[mt].length; cl++){
                var cluster= jsonObj[mt][cl].clusterid+1;
                var method = jsonObj[mt][cl].methodid +1;
                
                for(var j = 0; j<jsonObj[mt][cl].movies.length; j++){
                    score.push({title: jsonObj[mt][cl].movies[j].title, scores: jsonObj[mt][cl].movies[j].scores, color: setColor(method, cluster)});
                }
            }
            getCharts(score,method);
        }     
    }
    
    /**
     * 
     * @param {type} jsonObj
     * @returns {undefined}
     */
    function sortData(jsonObj)
    {
        for(var mt = 0; mt < jsonObj.length; mt++){
            for(var cl = 0; cl<jsonObj[mt].length; cl++){
                jsonObj[mt]=jsonObj[mt].sort(function(a, b) {
                    return (a.clusterid > b.clusterid) ? 1 : ((a.clusterid < b.clusterid) ? -1 : 0);
                });
            }   
        }
        getData(jsonObj);
    }
    
    function setColor(method, cluster){
        var color =  $('.Method'+method+' #Cluster'+cluster).css('background-color');
        return shadeRGBColor(color, -0.05);
    }
    
    function shadeRGBColor(color, percent) {
        var f=color.split(","),t=percent<0?0:255,p=percent<0?percent*-1:percent,R=parseInt(f[0].slice(4)),G=parseInt(f[1]),B=parseInt(f[2]);
        return "rgb("+(Math.round((t-R)*p)+R)+","+(Math.round((t-G)*p)+G)+","+(Math.round((t-B)*p)+B)+")";
    }
    
    
    /**
     * 
     * @param {type} num
     * @returns {undefined}
     */
    function initIndex(num) {
        for(var i=0;i<num.length;i++) {
            //slideIndex[i]=new Array();
            for(var j=0;j<num[i];j++) {
                slideIndex[i][j] = 0;
            } 
        }
    }
    
    /*
     * 
     * @param {type} movies
     * @param {type} method
     * @param {type} cluster
     * @returns {String} 
     */
    function getDivColor(cluster){
        return divColors[cluster];
    }
    /**
     * 
     * @param {type} movies
     * @param {type} method
     * @param {type} cluster
     * @returns {undefined}
     */
    function displayMovies(movies,method,cluster){
      $('#TopRated').css("display","none");
      $('#New').css("display","none");
      $('#Cooming').css("display","none");
      $('.Method'+method+' #Cluster'+cluster).empty();
      $('#Result').css("display","block");

      $('.Method'+method+ ' #Cluster'+cluster).css("background-color",""+getDivColor(cluster));
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
                movieClass = showHideMovie(movieNum);
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
        $('.Method'+method+' #Cluster'+cluster).append('<input id="'+cb+'" type="checkbox" class="cb_cluster">');
        $('.Method'+method+' #Cluster'+cluster).append('<label class="cb_text" for="'+cb+'"></label>');
        $('.Method'+method+' #Cluster'+cluster).append('<label id="'+lb+'" class="cb_text_label"></label>');
       
    }

    /**
     * 
     * @param {type} array
     * @param {type} string
     * @returns {Array}
     */
    function covertToArray(array, string)
    {
        var theArray = '';

        if(string =='a'){
            theArray = array.split(", ");
            for (var i = 0; i < theArray.length; i++) {
                if (theArray[i].length > 0) {
                    var tmp = theArray[i].split(" ");
                    if(tmp.length>=3){
                        if(tmp[tmp.length-1]=="Jr." || tmp[tmp.length-1]=="Sr."){
                            theArray[i] = tmp[1] + " " + tmp[tmp.length-1] + ", " + tmp[0]+"%";
                        }
                        if(tmp[1]=="De"){
                            theArray[i] = tmp[1]+ " " +tmp[tmp.length-1]+ ", " + tmp[0]+"%";
                        }
                        if(tmp[1].indexOf(".")> -1){
                            theArray[i] = tmp[tmp.length-1]+ ", " + tmp[0]+ " "+tmp[1] +"%";
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

    /**
     * 
     * @param {type} list
     * @returns {Array}
     */
    function unique(list) {
      var result = [];
      $.each(list, function(i, e) {
        if ($.inArray(e, result) == -1) result.push(e);
      });
      return result;
    }

    /**
     * 
     * @param {type} str
     * @returns {unresolved}
     */
    function removeLastComma(str) {
       return str.replace(/,(\s+)?$/, '');
    }

    /**
     * 
     * @param {type} array
     * @returns {Array}
     */
    function removeEmptyElements(array) {
        var newArray = [];
        for (var i = 0; i < array.length; i++) {
            if (array[i] !== "" && array[i] !== null) {
                newArray.push(array[i]);
            }
        }
        return newArray;
    }
    
    /**
     * 
     * @param {type} movieNum
     * @returns {String}
     */
    function showHideMovie(movieNum) {
        var movieClass ='';
        if(movieNum<focus){
            movieClass ='Movie';
        }
        else{
            movieClass ='Movie hide';
        }
        return movieClass;
    }

    /**
     * 
     * @param {type} movieNum
     * @returns {String}
     */
    function showHideStat(movieNum) {
        var movieClass ='';
        if(movieNum<focusStat){
            movieClass ='clstats';
        }
        else{
            movieClass ='clstats hide';
        }
        return movieClass;
    }    
    
    /**
     * 
     * @param {type} moviePoster
     * @returns {String}
     */
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
    
    /**
     * 
     * @param {type} movieTitle
     * @returns {String}
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
    
    function shadeColor(color, percent) {

        var R = parseInt(color.substring(1,3),16);
        var G = parseInt(color.substring(3,5),16);
        var B = parseInt(color.substring(5,7),16);

        R = parseInt(R * (100 + percent) / 100);
        G = parseInt(G * (100 + percent) / 100);
        B = parseInt(B * (100 + percent) / 100);

        R = (R<255)?R:255;  
        G = (G<255)?G:255;  
        B = (B<255)?B:255;  

        var RR = ((R.toString(16).length==1)?"0"+R.toString(16):R.toString(16));
        var GG = ((G.toString(16).length==1)?"0"+G.toString(16):G.toString(16));
        var BB = ((B.toString(16).length==1)?"0"+B.toString(16):B.toString(16));

        return "#"+RR+GG+BB;
    }
    
    $(document).on("click", ".submitSurvey", function(event){
        
        var m = 1;
        
        for(var cluster=0; cluster<num[m]; cluster++){
            var c = cluster +1; 
            if($('.Method'+m+ ' #Cluster'+c + ' .cb_cluster').is(':checked')==false && $('.Method'+(m+1)+ ' #Cluster'+c + ' .cb_cluster').is(':checked')==false){
                $('#messageSurvey').css("display","block");
                $('#messageSurvey').html("<font color='red'>Wählen Sie bitte mindestens eine der gleichfarbigen Filmgruppen </font>")
                $('#Cluster'+c + ' #lb_'+c).text("Bitte auswählen");
                return;
            }
            else{
                $('#messageSurvey').css("display","none");
                $('#Cluster'+c +' #lb_'+c).text("");
            }
        }
        
        if($('#cl0_like').is(':checked')==true && $('#cl1_like').is(':checked')==true && $('#cl2_like').is(':checked')==true ){
           $('#messageSurvey').css("display","block");
           $('#messageSurvey').html("<font color='red'>Sie können nur eine der Möglichkeiten auswählen</font>");
           return;
        }           
        if($('#cl0_like').is(':checked')==false && $('#cl1_like').is(':checked')==false && $('#cl2_like').is(':checked')==false ){
           $('#messageSurvey').css("display","block");
           $('#messageSurvey').html("<font color='red'>Wählen Sie mindestens eine Option</font>");
           return;
        } 
        else{
            $('#messageSurvey').css("display","none");
            $('#Cluster'+c +' #lb_'+c).text("");
            checkEvalNum(mode);
        }

    });
    
    /**
     * 
     * @param {type} moviePoster
     * @returns {String}
     */
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
   
   /**************************Fragebogen komplett dann Scenario Messasge zeigen*/
   $(document).on("click", ".sv_complete_btn", function(event){
       if($(this).val()=='Complete' && surveyIndex>1){
           $('#id02').css("display","none");
           surveyIndex  = 0;
           displayScenario(scenarioNum);
       }
       surveyIndex = surveyIndex +1;

   });
   
   $(document).on("click", ".search-tab-cluster", function(event){
       $('#id01').css("display","block");
       $('.tab-back-nav').trigger('click');
       $('.search-tab').appendTo('#id01 .tab');
       hideAllModes();
       document.getElementById('defaultEval').click();
   });
   

   $(document).on("click", ".clusterbtn", function(event){
       if(mode==0){
            $('.search-tab').appendTo('.search .tab');
            $('.search-tab-cluster').appendTo('.search .search-tab');
            showTestMode();
            hideEvalMode();
            $('#testSearch').css("display","block");
            $('#evalSearch').css("display","none");
       }
       else{
            $('.search-tab').appendTo('#id01 .tab');
            $('.search-tab-cluster').appendTo('.header-right');
            showEvalMode();
            hideTestMode();
            $('#testSearch').css("display","none");
            $('#evalSearch').css("display","block");
           
            //get scenarion including message for each scenario
            getScenarios();
            getModeParameter(mode);
       }
       
       initWelcomeScreen();
   });
   
   
    /* Change design is value is Borda
    * 
    */
    $('.alg').change(function(){
        var parent = $(this).parents().eq(1).attr('class');
        
        if($(this).val() == 0){
            hideBordaDivs(parent);
        }
        if($(this).val() == 1){
            showBordaDivs(parent);
        }
    });   
    
    $("#copyBtn").click(function(){
        var selected = $("#nScenarios").val();
        var textVallue = $("#output").val();
        var word = selected+', ';
        
        if(selected>0){
            if (textVallue.indexOf(word)==-1)
            {
                $("#output").append(selected+", ");
            }
        }
    });
    
    $("#deleteBtn").click(function(){;
        $('#output').html('');
    });
    
    
   /* Change Dispay element depending on mode
    * 
    */
    $('#nMode').change(function(){
        if($(this).val() == 1){
            setMode(1);
            hideTestMode();
            showEvalMode();
            surveryInfor = false;
        }
        else{
            setMode(0);
            showTestMode();
            hideEvalMode();
        }
    });

    $(document).on("click", ".surveyclose ", function(event){
        surveryInfor = true;
        $('.submitBtn').trigger('click');
    });    
    
    /*$(document).on("click", "#nScenarios",function(event){
        var lastOption = $('#nScenarios option').length;
        var lenOptions = $('#nScenarios option:nth-child('+lastOption+')').val();

        
        if((scenarioIndex+1)<lenOptions){
           $('#newBtn').trigger('click');
           $('#defineBtn').css("display","none");
           $('#loopBtn').css("display","block");
           $('search-tab-close').css("display","none");
           $('#messageEval').css("display","block");
           $('#messageEval').html("<font color='red'>Einige Szenarien haben keine definierte suchparameter</font>")
        }
        else{
           //$('#defineBtn').css("display","block");
           $('#loopBtn').css("display","none");
           $('#id01 .search-tab').css("display","none");
           $('search-tab-close').css("display","block");
        }
    });*/

    $(document).on("click", "#loopBtn",function(event){
        var actors = removeLastComma($('#actors').val());
        var genres = removeLastComma($('.multiSel').text());
        var maxReleased = $('#released .range_max').text();
        var minReleased = $('#released .range_min').text();
        var maxLenght = $('#lenght .range_max').text();
        var minLenght = $('#lenght .range_min').text();
        var minStar = $('#star .range_star').text();

        if(actors == ""){
             $('#messageEval').css("display","block");
             $('#messageEval').html("<font color='red'>Geben Sie bitte mindestens einen Namen ein. </font>")
             return;
         }
         if(genres == ""){
             $('#messageEval').css("display","block");
             $('#messageEval').html("<font color='red'>Wählen Sie bitte mindestens ein Genre </font>")
             return;
         }
         else{
            scenarioIndex = scenarioIndex+1;
            addSearchParameter(actors,genres,minLenght, maxLenght,minReleased,maxReleased,minStar);
            resetSearchPram();
            $('#nScenarios').trigger('click');
         }
    });    

    
    function chechScenarios(){
        var error = false;
        $('#messageEval').css("display","none");
            if (getScenarioLenght()<3)
            {
               $('#messageEval').css("display","block");
               $('#messageEval').html("<font color='red'>Wählen Sie bitte mind drei Szenarien </font>");
               error = true;
            }
            else{
                $('#messageEval').css("display","none");
                error = false;
            }
            
            return error;
    
    }
       /**
     * 
     * @param {type} moviePoster
     * @returns {String}
     */
    function getModeParameter(mode) {
        //alert("Get Mode Parameter");

        if(mode == 0){
            getTestPrametar();
       }
        if(mode == 1){
            getEvalPrametar(evalNum);
        }  
    }

    
    /*************IF evail ist finisched*/
    function checkEvalNum(mode){
        //first scenario allready shown
        if(mode == 1){
            if(scenarioNum < getNumberScenario()-1){
                if(evalNum < getNumberComparations()){
                    evalNum = evalNum+1;
                    $('.submitBtn').trigger('click');
                    getSurveyVaues();
                    resetSurvey();
                }
                else{
                    hideMovies();
                    getSurveyVaues();
                    evalNum = 1;
                    resetSurvey();
                    resetSearchPram();
                    scenarioNum = scenarioNum+1;
                    //setScenarioText(scenarioNum);
                    unbindSearchButtons();
                    displayScenario(scenarioNum);
                    
                }
                
            }
            else{                
                if(evalNum < getNumberComparations()){
                    evalNum = evalNum+1;
                    $('.submitBtn').trigger('click');
                    getSurveyVaues();
                    resetSurvey();
                }
                else{
                    hideMovies();
                    getSurveyVaues();
                    evalNum = 1;
                    resetSurvey();
                    resetSearchPram();
                    hideScenarioMessages();
                    removeScenarioMessage();
                    closeScenarioMessages();
                    showGoodbye();
                    scenarioNum = 0;
                    //setScenarioText(scenarioNum);
                    surveryInfor=false;
                }
            }
            evalShowInfos = false;
            errorevalShowInfos = false;
        }
        
        if(mode == 0){
            hideResult();
            showMovies();
            hideGoodbye();
            resetSearchPram();
            scenarioNum = 0;
            evalShowInfos = false;
            errorevalShowInfos = false;
        }
    }
    
   // Hide recommendation 
   function hideMovies(){
      $('.tab-nav').css("display","block");
      $('.tab-back-nav').css("display","none");
      $('.recom-text').css("display","none");
      $('.search-tab-close').css("display","none");;
      $('#TopRated').css("display","block");
      $('#Result').css("display","none");
      $('.submitSurvey').css("display","none");
      $('.search').css("display","none");    
   }

   function showMovies(){
      $('.tab-nav').css("display","block");
      $('.tab-back-nav').css("display","none");
      $('.recom-text').css("display","none");
      $('.search-tab-close').css("display","block");;
      $('#TopRated').css("display","block");
      $('#Result').css("display","none");
      $('.submitSurvey').css("display","block");
      $('.search').css("display","block");    
   }
   function hideResult(){
      $('#Result').css("display","none");
      $('.survey').css("display","none");
      $('.recom-text').css("display","none");
      $('.tab-back-nav').css("display","none");
   }
   function showResult(){
        bindSearchButtons();
        if(errorevalShowInfos==false){
            $('#Result').css("display","block");
            $('.survey').css("display","block");
            $('.recom-text').css("display","block");
            $('.tab-back-nav').css("display","none");       
        }
        showEvalInfo(evalShowInfos,errorevalShowInfos);
   }
   
   function hideLoading(){
      $('#loading').css("display","none");
   }
   function showLoading(){
        $('#loading').css("display","block");
   }
   
   function hideBordaDivs(div){
          $('.'+div+' .row-3').css("display","none");
          $('.'+div+' .row-4').css("display","none");
   }
   function showBordaDivs(div){
          $('.'+div+' .row-3').css("display","block");
          $('.'+div+' .row-4').css("display","block");
   }   
    
   
   function getTestPrametar(){
        method1Parameter[0] = $( ".method-1 .evalAlg" ).val();
        method1Parameter[1] = $( ".method-1 .evalCluster" ).val();
        method1Parameter[2] = $( ".method-1 .evalDistance" ).val();
        method1Parameter[3] = $( ".method-1 .evalSorting" ).val();

        method2Parameter[0] = $( ".method-2 .evalAlg" ).val();
        method2Parameter[1] = $( ".method-2 .evalCluster" ).val();
        method2Parameter[2] = $( ".method-2 .evalDistance" ).val();
        method2Parameter[3] = $( ".method-2 .evalSorting" ).val();
        
   }
   
   function getEvalPrametar(comparationAt){
        method1Parameter[0] = $('#evalCom'+comparationAt+' #evalMeth1 .evalAlg').val();
        method1Parameter[1] = $('#evalCom'+comparationAt+' #evalMeth1 .evalCluster').val();
        method1Parameter[2] = $('#evalCom'+comparationAt+' #evalMeth1 .evalDistance').val();
        method1Parameter[3] = $('#evalCom'+comparationAt+' #evalMeth1 .evalSorting').val();
        
        method2Parameter[0] = $('#evalCom'+comparationAt+' #evalMeth2 .evalAlg').val();
        method2Parameter[1] = $('#evalCom'+comparationAt+' #evalMeth2 .evalCluster').val();
        method2Parameter[2] = $('#evalCom'+comparationAt+' #evalMeth2 .evalDistance').val();
        method2Parameter[3] = $('#evalCom'+comparationAt+' #evalMeth2 .evalSorting').val();

   }   

   function showEvalMode(){
        $('.evalTab').css('display', 'block');
        $('#EvalScenario').css('display', 'block');
        $('#EvalMethod').css('display', 'none');       
        $('#messageEval').css('display', 'none');
   }
   
   function hideEvalMode(){
        $('.evalTab').css('display', 'none');
        $('#EvalScenario').css('display', 'none');
        $('#EvalMethod').css('display', 'none');       
        $('#messageEval').css('display', 'none');
   }
   
   function showTestMode(){
       $('.testMode').css('display', 'block');
       $('.testMode  .evalChoise').trigger('click');
   }
   
   function hideTestMode(){
        $('.testMode').css('display', 'none');
   }
   
   function getMode(){
       var mode = $( ".mode #nMode" ).val();
       return mode;
   }
   
   function setMode(value){
       $( ".mode #nMode" ).val(value);
       mode = value;
   }

   function getAlgorithmus(){
       var alg = $(".alg").val();
       return alg;
   }
   
   function setAlgorithmus(value){
       $(".alg").val(value);
   }
   
   function initMode(){
        setMode(1);
        setAlgorithmus(1);
   }
   
   
   function resetSearchPram(){
       resetGenreParam();
       resetActorParam();
       resetRankingParam();
       resetLenghtParam();
       resetReleasedParam();
   }

   function setGenreParam(temp){

        resetGenreParam();
        var genre = temp[0].split(',');
        //alert(genre[0]);
        $('.mutliSelect input[type="checkbox"]').each(function() {
            for(var i =0; i<genre.length; i++){
                if($(this).val()==genre[i]){
                    $(this).trigger('click');
                } 
            }
        });
        //$('.mutliSelect input[type="checkbox"]').trigger('click');
   }
   
   function resetGenreParam(){
        $('.mutliSelect input:checked').each(function() {
            $(this).attr('checked', false);
        });
        $('.multiSel span').remove();
        $('.dropdown').css('padding','12 20 5 10');
        $('.hida').css('display', 'block');
        $('.dropdown dt a').css('min-height','');
   }
   
   /*
    * Names muss String that contains  actor names as Johny Depp, Kevin Spacey
    * @returns {undefined}
    **/
   function setActorParam(names){
       alert(names)
       $('#actors').val(names);
   }
   function resetActorParam(){
       $('#actors').val("");
       $('#actors').css('padding','13 19 12 10');
       $('#actors').css('height','');
   }
   
   function setReleasedParam(released){
        var min = released[0];
        var max = released[1];

       if(min>=1970 && max<=2017){
           $('#released input.min').val(min);
           $('#released input.max').val(max);
           $('#released .range_min').text(min);
           $('#released .range_max').text(max); 
           $('#released input.min').trigger('change');
       }
   }
   
   function setLenghtParam(lenght){
       var min = lenght[0];
       var max = lenght[1];

       if(min>=60 && max<=240){
            $('#lenght input.min').val(min);
            $('#lenght .range_min').text(min);
            $('#lenght input.max').val(max);
            $('#lenght .range_max').text(max);
            $('#lenght input.min').trigger('change');
            var maxVal = $('#lenght input.min').attr('max');
            var minVal = $('#lenght input.min').attr('min');
            var startval = (min - minVal) / (maxVal - minVal);
            var endval = (max - minVal) / (maxVal - minVal);
            
            $('#lenght input.min').css('background-image',
            '-webkit-gradient(linear, left top, right top, '
            + 'color-stop(' + startval + ', #c5c5c5),'
            + 'color-stop(' + startval + ', #ee7d13),'
            + 'color-stop(' + endval + ', #ee7d13),'
            + 'color-stop(' + endval + ', #c5c5c5)'
            + ')'
            );
        }
   }
   
   function setRankingParam(rating){
       $('#star'+rating).prop('checked', true);
       $('#star .range_star').text(rating);
       $('#star input.min').val(rating);
       
       var val = (rating - $('#star input[type="range"]').attr('min')) / ($('#star input[type="range"]').attr('max') - $('#star input[type="range"]').attr('min'));
            
        $('#star input[type="range"]').val(""+rating);
        $('#star .min').css('background-image',
        '-webkit-gradient(linear, left top, right top, '
        + 'color-stop(' + val + ', #C5C5C5), '
        + 'color-stop(' + val + ', #ee7d13)'
        + ')');
       
   }   
   function resetLenghtParam(){   
       $('#lenght input.min').val(60);
       $('#lenght .range_min').text(60);
       $('#lenght input.max').val(240);
       $('#lenght .range_max').text(240);
       $('#lenght input.min').css('background-image',
        '-webkit-gradient(linear, left top, right top, '
        + 'color-stop(' + 0 + ', #ee7d13),'
        + 'color-stop(' + 0 + ', #ee7d13),'
        + 'color-stop(' + 1 + ', #ee7d13),'
        + 'color-stop(' + 0 + ', #ee7d13)'
        + ')'
        );
   }
   
   function resetReleasedParam(){   
       $('#released input.min').val(1970);
       $('#released input.max').val(2017);
       $('#released .range_min').text(1970);
       $('#released .range_max').text(2017);
       $('#released input.min').css('background-image',
        '-webkit-gradient(linear, left top, right top, '
        + 'color-stop(' + 0 + ', #ee7d13),'
        + 'color-stop(' + 0 + ', #ee7d13),'
        + 'color-stop(' + 1 + ', #ee7d13),'
        + 'color-stop(' + 0 + ', #ee7d13)'
        + ')'
        );
   }
   function resetRankingParam(){
       $('#star1').prop('checked', true);
       $('#star .range_star').text(0);
       $('#star input.min').val(0);
       $('#star input.min').css('background-image',
        '-webkit-gradient(linear, left top, right top, '
        + 'color-stop(' + 0 + ', #ee7d13), '
        + 'color-stop(' + 1 + ', #ee7d13)'
        + ')'
        );
   }
   
   function resetSurvey(){
       $('input#cl0_like').attr('checked', false);
       $('input#cl1_like').attr('checked', false);
       $('input#cl2_like').attr('checked', false);
   }
   
    function getSurveyVaues(){    
        alert("Method: "+getSurveyMethod());
    }
   
   function getSurveyMethod(){
       var method = 0;
       
       if($('#cl1_like').is(':checked')==true){
           method = 1;
       }
       if($('#cl2_like').is(':checked')==true){
           method = 2;
       }
       return method;
   }
   
   /**Create explanations for every scenario**/
   function createScenarioMessage(){
       removeScenarioMessage();
       for(var i=0; i<scenarios.length; i++){
           $('.explanationBox').append('<div class="explanation"><p>'+$('#desc'+scenarios[i]).val()+'</p></span></div>');
        }
    }

    /**Remove all explanations**/
   function removeScenarioMessage(){
        $('.explanationBox').empty();
   }
   
    function setScenarioText(value){
        var textNum = value+1;
        var text = "Szenario: "+textNum +" von "+getNumberScenario();
       $('.scenLabels').text(text);
    }
    
   function getNumberScenario(){
       return scenarios.length;
   }

   function getNumberComparations(){
       return $('#nComparation').val();
   }
   
    function displayScenario(scenarioAt){
        $('#id03').css("display","block");
        setScenarioText(scenarioNum);
        displayScenarioMessage(scenarioAt);
    }
 
   function displayScenarioMessage(messageAt){
           var position = messageAt;
           hideScenarioMessages();
           $('.explanationBox .explanation').eq(position).addClass('showScenario');
           $('#id03').css("display","block");
   }
   
   function hideScenarioMessages(){
        for(var i=0; i<getNumberScenario();i++ ){
            $('.explanationBox .explanation').eq(i).removeClass('showScenario');
        }
   }
   
   function closeScenarioMessages(){
       $('#id03').css("display","none");
   }
   
   function openScenarioMessages(){
       $('#id03').css("display","none");
   }

    $(document).on("click", "#id05 .infoClose", function(event){
        $('#id05').css("display","none");
        location.href = "index.html"
   });
    
   
    $(document).on("click", ".explainClose", function(event){
       closeScenarioMessages();
       hideScenarioMessages();
   });
    
    $(document).on("click", ".information_icon", function(event){
        displayScenarioMessage(scenarioNum);
   });

    $(document).on("click", "#id05 #infoClose", function(event){
        $(".nav-element").trigger('click');
   });    
   
    $(document).on("click", ".information_eval_icon", function(event){
        $('#id06').css("display","block");
    });

    function initWelcomeScreen(){
        if(getMode()==1){
            $('#id04').css("display","block");
        }
        else{
            $('#id04').css("display","none");
        }
    }
    
    function initScenarios(){
        getScenarios();
        getModeParameter(mode);
    }
    
    
    function showGoodbye(){
        $('#id05').css("display","block");
    }
    function hideGoodbye(){
        $('#id05').css("display","none");
    }
    
    function bindSearchButtons(){
        $('.button-container .closee').addClass("active");
        $('.button-container .open').addClass("active");         
    }
    function unbindSearchButtons(){
        $('.button-container .closee').removeClass("active");
        $('.button-container .open').removeClass("active"); 
    }
    
    function showEvalInfo(message,error){
        if(message==true && error==false && mode==1){
            $('#id06').css("display","block");
            //evalShowInfos = false;
        }
    }

   
   
    function getScenarioLenght(){
        var temp = $('#output').val().split(', ');
        return temp.length-1;
    }
   
    function getScenarios(){
        scenarios = [];
        var temp = $('#output').val().split(', ');
        for(var i=0; i<temp.length; i++){
            if(temp[i]!=''){
                scenarios[i] = temp[i];
            }
        }
        //create Messages
        createScenarioMessage();
    }
    
    function initSearchParameter(){
        searchPrameter = [['Johnny Depp, Leonardo DiCaprio','Comedy, Action',60,120,1980,2000,2],
                      ['Leonardo DiCaprio','Comedy, Action',60,120,1980,2000,2],
                      ['Johnny Depp','Comedy, Action, Thriller',75,240,2000,2012,6]
                      ];
    }
   
  
    function addSearchParameter(actors,genre,minLen, maxLen,minRel,maxRel,rat){
        searchPrameter[scenarioIndex] = [actors,genre,minLen, maxLen,minRel,maxRel,rat];
        
        for(var i=0; i<searchPrameter.length; i++){
             alert(searchPrameter[i]);
        }
    }
    $(document).on("click", ".seachScenario", function(event){
        setSearchParameter(searchPrameter[scenarios[scenarioNum]-1]);
        $('.submitBtn').trigger('click');
        $('#id03').css("display","none");
    });
    
    $(document).on("click", "#id04 #infoClose", function(event){
        initScenarios();
    });
    
    $(document).on("click", "#evalSearch", function(event){
        if(surveyPar==false){
        $('.search-tab-cluster').css("display","none");
             $('#id02').css("display","block");
                window.survey = new Survey.Model({ 
                    pages: [
                        { title: "Demographische Daten",
                            questions: [
                                {type:"radiogroup", name:"geschlecht", title: "Geschlecht:", isRequired: true, 
                                    choices:["weiblich", "männlich"]},
                                
                                {type:"radiogroup", name:"alter",title:"Alter: ",
                                 colCount: 4, isRequired: true,
                                 choices:["18-24", "25-34", "35-44", "45-59", "60-69", "70 und älter"]},
                             
                                {type:"radiogroup", name:"beschäftigung", title: "Sind Sie berufstätig?", isRequired: true, 
                                choices:["ja", "nein"]},
                                
                                {type: "text", name: "email",isRequired: true,
                                    title: "Was ist Ihr derzeitiger / was war Ihr letzter Beruf?"}
                            ],                           
                        },
                        { title: "Allgemeine Nutzungsfragen",
                            questions: [
                                {type:"radiogroup", name:"filme", title: "Wie häufig nutzen Sie Videoinhalte wie z.B Filme und Serien?", isRequired: true, 
                                    choices:["Täglich oder fast täglich", "Mindestens einmal pro Woche", "Mindestens einmal im Monat", 
                                        "Seltener", "Nie"]},
                                
                                {type:"radiogroup", name:"zahlbereitschaft", title: "Wären Sie bereit für Videoinhalte zu zahlen?", isRequired: true, 
                                    choices:["Ja", "Nein"]},
                                
                                { type: "matrix", name: "plattformen", title: "Wie häufig verwenden Sie foglende Platformen für die Nutzung von Videoinhalten?", isRequired: true,
                                    columns: [{ value: 1, text: "nie" },
                                        { value: 2, text: "selten" },
                                        { value: 3, text: "manchmal" },
                                        { value: 4, text: "meistens" },
                                        { value: 5, text: "immer" }],
                                    rows: [{
                                        value: "stream",
                                        text: "Video-Streaming-Dienste"
                                    }, {
                                        value: "tv",
                                        text: "TV-Sendern"
                                    }, {
                                        value: "portale",
                                        text: "Kostenlose Portale(z.B YouTube)"
                                    }]
                                }, 
                                                               
                                { type: "radiogroup", name: "empfehlung", title: "Wie oft werden Ihnen Filme auf  Ihr Lieblingsplattform empfohlen?", isRequired: true,
                                 choices:["nie", 
                                     "selten","manchmal","meistens","immer"]},
                                                                                 
                            ],                           
                        },
                        { title: "Zufriedenheit", 
                            questions: [
                                { type: "radiogroup", name: "sinn", title: "Halten Sie automatisch generierte Filmempfehlugen für lästig?", isRequired: true,
                                 choices:["nie","selten","manchmal","meistens","immer"]},
                             
                                {type:"radiogroup", name:"zufriedenheit", title: "Treffen solche Empfehlungen in der Regel ihr Geschmack?", isRequired: true, 
                                choices:["nie","selten","manchmal","meistens","immer"]},
                            ],                           
                        }]
                });

            $("#surveyElement").Survey({ 
                model: survey 
            });
            surveyPar = true;
            return;
            
        }
    });
    
    $(document).on("click","#defineBtn", function(event){
        var actors = removeLastComma($('#id01 .search-tab #actors').val());
        var genres = removeLastComma($('#id01 .search-tab .multiSel').text());
        var description = $('#description').val();
        var parameter = $('.searchParameter input[type="checkbox"]:checked').length;
        
        var maxReleased = $('#id01 .search-tab #released .range_max').text();
        var minReleased = $('#id01 .search-tab #released .range_min').text();
        var maxLenght = $('#id01 .search-tab #lenght .range_max').text();
        var minLenght = $('#id01 .search-tab #lenght .range_min').text();
        var minStar = $('#id01 .search-tab #star .range_star').text();

        if(actors == ""){
             $('#messageEval').css("display","block");
             $('#messageEval').html("<font color='red'>Geben Sie bitte mindestens einen Namen ein. </font>")
             return;
         }
         if(genres == ""){
             $('#messageEval').css("display","block");
             $('#messageEval').html("<font color='red'>Wählen Sie bitte mindestens ein Genre </font>")
             return;
         }
         if(description == ""){
             $('#messageEval').css("display","block");
             $('#messageEval').html("<font color='red'>Geben Sie bitte Beschreibung ein</font>")
             return;
         }
         if(parameter < 3){
             $('#messageEval').css("display","block");
             $('#messageEval').html("<font color='red'>Wählen Sie bitte mind. drei Suchparameter aus</font>")
             return;
         }
         
       else{
            var released = [minReleased,maxReleased];
            var lenght = [minLenght,maxLenght];
            //var actorList = covertToArray(actors,'g');
            var genreList = covertToArray(genres,'g');
            var paramList = getSearchPreference();
            resetGenreParam();
            
            $('.clusterbtn').css("display","block");
            $('#defineBtn').css("display","none");
            $('#id01 .search-tab').css("display","none"); 
            $('#messageEval').css("display","none");
            $('.scen_param').css("display","none");
            $('.scen_desc').css("display","none");
            $('.search_param').css("display","none");
            $('hr').css("display","none");
            $('#description').css("display","none");
            $('.searchParameter').css("display","none");
            
            
            $.ajax({
             url : "InsertScenarioServlet",
             type : "GET",
             data : {
                 description : description,
                 actors : actors,
                 genreList : genreList,
                 lenght : lenght,
                 released : released,
                 paramList : paramList,
                 minStar  : minStar
                 
             },
             success : function(response){
                        if(response != null && response != "")
                        {
                            getScenariosDB();
                        }
                    else
                        {
                            $('#messageSearch').css("display","block");
                            $('#messageSearch').html("<font color='red'>Die angegebene Parameter sind zu spezifisch. </font>");
                            alert("Insert Error");
                        }
                }
            });
        }
    });
    
    function getScenariosDB(){
       $.ajax({
             url : "ScenarioRequest",
             type : "GET",
             dataType: "json",
             success : function(response){
                        if(response != null && response != "")
                        {
                            var jsonStr = JSON.stringify(response);
                            var jsonObj = JSON.parse(jsonStr);
                            parseScenarios(jsonObj);

                        }
                    else
                        {
                            alert("Some exception occurred! Please try again.");
                        }
                }
            });
            
   }
   
      function parseScenarios(jsonObj){
        removeAllScenarios();
        removeAllScenariosMessages();
        initEvalScenarios(1,2,3);
        for(var i = 0; i < jsonObj.length; i++)
        {   
            searchPrameter[i]=[jsonObj[i].actors,jsonObj[i].genres,jsonObj[i].lenght,jsonObj[i].released,jsonObj[i].rating]
            $('#nScenarios').append('<option value="'+jsonObj[i].id+'"'+'>Szenario ' + jsonObj[i].id + '</option>');
            $('#EvalScenario').append('<textarea id="desc'+jsonObj[i].id+'" rows="1" class="descriptions" contenteditable="true">'+jsonObj[i].desc+'</textarea>');
        }
   }
   
    function getSearchPreference() {         
        var searchParams = [];
        $('.searchParameter input[type="checkbox"]:checked').each(function() {
            searchParams.push($(this).val());
        });
        return searchParams;
    }
  
    function initEvalScenarios(s1,s2,s3){
        removeAllSelectedScenarios();
       $("#output").append(s1+", ");
       $("#output").append(s2+", ");
       $("#output").append(s3+", ");
    }
    
   function removeAllScenarios(){
       $('#nScenarios option').remove();
   }
   
   function removeAllScenariosMessages(){
       $('#EvalScenario .descriptions').remove();
   }
   
   function removeAllSelectedScenarios(){
       $("#deleteBtn").trigger('click');
   }
      
});
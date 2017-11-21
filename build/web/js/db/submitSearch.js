$(document).ready(function() {
    var evalNum = 1;
    var focusStat = 4;
    var focus = 5;
    var movieContent;
    var movies;
    var movie;
    var ratedMovies;
    var num = [];
    var slideIndex = [[],[]];
    var statcsIndex  = 0;
    var statistic = 0;
    var charts = new Array();
    var numStats;
    var method1Parameter = [];
    var method2Parameter = [];
    var mode;
    var divColors = ['#666','#f1f1f1','#d9f5da','#ffeaea','#c0fef1','#ffd6b3','#fae9be','#d4e3ff','#eafec0'];
    var activeStatistic = 0;
    var surveryInfor = false;

    //setMode(1);
    //setAlgorithmus(1);
    initTestMode();
    
    /*
     * Statistics move on scroll
     */
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
        $('.title').css('display', 'none');
  
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
        $('.title').css('display', 'block');
        //$('.Titles').css('display', 'block');
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
        $('.tab-back-nav').show();
   });


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
                alert("Limit: "+statcsIndex);

            }
            else{
                statcsIndex = statcsIndex+4;
            }
            alert(statcsIndex);
        }
        if(id==="btn_prev_stat"){
            if(statcsIndex<=0){
                statcsIndex = 0;
            }
            else{
                statcsIndex = statcsIndex-4;
            }
            alert(statcsIndex);
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
            /*$('.Method'+mt).css('float', '');
            $('.Method'+mt).css('margin-left', '');*/
            
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
        mode = getMode(); /*$( ".mode #nMode" ).val();*/
        
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
             $('#messageSearch').html("<font color='red'>Insert at least the Name of one Actor </font>")
             return;
         }
         if(genres == ""){
             $('#messageSearch').css("display","block");
             $('#messageSearch').html("<font color='red'>Select at least one Genre </font>")
             return;
         }
         
         if(mode == 1 && surveryInfor==false){
             alert(1);
             $('#id02').css("display","block");
                window.survey = new Survey.Model({ 
                    pages: [
                        { title: "Nutzen Sie derzeit einen Musikstreaming-Dienst?",
                            questions: [
                                {type:"checkbox", name:"opSystem", title: "OS", hasOther: true, isRequired: true, 
                                    choices:["Ich nutze derzeit keinen Musikstreaming-Dienst", "Ich nutze einen kostenlosen Musikstreaming-Dienst", "Ich nutze ein kostenpflichtiges Abonnement"]}
                            ]  
                        },
                        {   title: "What language(s) are you currently using?",
                            questions: [
                            {type:"checkbox", name:"langs",title:"Plese select from the list",
                                 colCount: 4, isRequired: true,
                                choices:["Javascript", "Java", "Python", "CSS", "PHP", "Ruby", "C++", "C", 
                                    "Shell", "C#", "Objective-C", "R", "VimL", "Go", "Perl", "CoffeeScript", 
                                    "TeX", "Swift", "Scala", "Emacs List", "Haskell", "Lua", "Clojure", 
                                    "Matlab", "Arduino", "Makefile", "Groovy", "Puppet", "Rust", "PowerShell"]
                            }
                        ]},        
                        { title: "Please enter your name and e-mail",
                            questions: [ 
                            {type: "text", name: "name", title: "Name:"}, 
                            {type: "text", name: "email", title: "Your e-mail"}]
                        }]
                });

            $("#surveyElement").Survey({ 
                model: survey 
            });
            return;
         }
         else{
             $('#messageSearch').css("display","none");
             var actorList = covertToArray(actors,'a');
             var genreList = covertToArray(genres,'g');
             $('#id02').css("display","none");
             delDivContent();
             alert("Mode: "+mode);
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
                            var jsonStr = JSON.stringify(response);
                            var jsonObj = JSON.parse(jsonStr);
                            sortData(jsonObj);

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
            $('.title').css('display', 'block');
            //$('.Titles').css('display', 'block');
            
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
            $('.Method'+method).append('<input type="submit" id="'+bt+'" class="btnStatistics" value="Statistics">');
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
                    
                    alert(theArray[i]);
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
            if($('.Method'+m+ ' #Cluster'+c + ' .cb_cluster').is(':checked')==true && $('.Method'+(m+1)+ ' #Cluster'+c + ' .cb_cluster').is(':checked')==true){
                $('#messageSurvey').css("display","block");
                $('#messageSurvey').html("<font color='red'>You can only choose one group of recommendations in this row </font>");
                $('#Cluster'+c + ' #lb_'+c).text("Select only one of these");
                return;
            }
            if($('.Method'+m+ ' #Cluster'+c + ' .cb_cluster').is(':checked')==false && $('.Method'+(m+1)+ ' #Cluster'+c + ' .cb_cluster').is(':checked')==false){
                $('#messageSurvey').css("display","block");
                $('#messageSurvey').html("<font color='red'>Select at least one recommendation group in this row </font>")
                $('#Cluster'+c + ' #lb_'+c).text("Please Select one of these");
                return;
            }
            else{
                $('#messageSurvey').css("display","none");
                $('#Cluster'+c +' #lb_'+c).text("");
            }
        }
        
        if($('#cl1_like').is(':checked')==true && $('#cl2_like').is(':checked')==true ){
           $('#messageSurvey').css("display","block");
           $('#messageSurvey').html("<font color='red'>Please select just one method</font>");
           return;
        }           
        if($('#cl1_like').is(':checked')==false && $('#cl2_like').is(':checked')==false ){
           $('#messageSurvey').css("display","block");
           $('#messageSurvey').html("<font color='red'>Select one method</font>");
           return;
        } 
        else{
            $('#messageSurvey').css("display","none");
            $('#Cluster'+c +' #lb_'+c).text("");
            checkEvalNum();

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
   
   $(document).on("click", ".sv_complete_btn", function(event){
       alert("CLose");
       alert($(this).val());
       /*$('#id02').css("display","none");*/
       //$('.tab-back-nav').trigger('click');
   });
   
   $(document).on("click", ".search-tab-cluster", function(event){
       $('#id01').css("display","block");
       $('.tab-back-nav').trigger('click');
   });
   

   $(document).on("click", ".clusterbtn", function(event){
       mode = getMode();
       checkMode(mode);
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
    
    
    
   /* Change Dispay element depending on mode
    * 
    */
    $('#nMode').change(function(){
        if($(this).val() == 1){
            hideTestMethods();
            surveryInfor = false;
        }
        else{
            showTestMethods();
        }
    });

    $(document).on("click", ".surveyclose ", function(event){
        surveryInfor = true;
        $('.submitBtn').trigger('click');
    });    
    
       /**
     * 
     * @param {type} moviePoster
     * @returns {String}
     */
    function checkMode(mode) {
       if(mode == 0){
            alert("Test");
            getTestPrametar();
       }
        if(mode == 1){
            alert("Check Eval")
            if(evalNum<3){
               /*alert("Eval");
               evalNum = evalNum+1;*/
                alert("Check Eval");
            }
            
            /*method1Parameter[0] = $( ".method-1 #nAlg" ).val();
            method1Parameter[1] = $( ".method-1 #nCluster" ).val();
            method1Parameter[2] = $( ".method-1 #distance" ).val();
            method1Parameter[3] = $( ".method-1 #sorting" ).val();

            method2Parameter[0] = $( ".method-2 #nAlg" ).val();
            method2Parameter[1] = $( ".method-2 #nCluster" ).val();
            method2Parameter[2] = $( ".method-2 #distance" ).val();
            method2Parameter[3] = $( ".method-2 #sorting" ).val();
       */
            }  
    }
    
    function checkEvalNum(){
        alert(evalNum);
        if(evalNum<2){
            evalNum = evalNum+1;
            $('.submitBtn').trigger('click');
        }
        else{
            hideMovies();
            evalNum = 1;
            resetSearchPram();
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
      $('.title').css("display","none");
      $('.submitSurvey').css("display","none");
      $('.search').css("display","block");    
   }
   
   function hideResult(){
      $('#Result').css("display","none");
      $('.title').css("display","none");
      $('.survey').css("display","none");
      $('.recom-text').css("display","none");
      $('.tab-back-nav').css("display","none");
   }
   function showResult(){
        $('#Result').css("display","block");
        $('.title').css("display","block");
        $('.survey').css("display","block");
        $('.recom-text').css("display","block");
        $('.tab-back-nav').css("display","block");
   }
   
   function hideLoading(){
      $('#loading').css("display","none");
   }
   function showLoading(){
        $('#loading').css("display","block");
   }
   
   function hideBordaDivs(div){
       alert("Hide");
          $('.'+div+' .row-3').css("display","none");
          $('.'+div+' .row-4').css("display","none");
   }
   function showBordaDivs(div){
       alert("Show");
          $('.'+div+' .row-3').css("display","block");
          $('.'+div+' .row-4').css("display","block");
   }   
    
   
   function getTestPrametar(){
        method1Parameter[0] = $( ".method-1 #nAlg" ).val();
        method1Parameter[1] = $( ".method-1 #nCluster" ).val();
        method1Parameter[2] = $( ".method-1 #distance" ).val();
        method1Parameter[3] = $( ".method-1 #sorting" ).val();

        method2Parameter[0] = $( ".method-2 #nAlg" ).val();
        method2Parameter[1] = $( ".method-2 #nCluster" ).val();
        method2Parameter[2] = $( ".method-2 #distance" ).val();
        method2Parameter[3] = $( ".method-2 #sorting" ).val();
   }
   
   function showTestMethods(){
        $('.method-1').css('display', 'block');
        $('.method-2').css('display', 'block'); 
   }
   
   function hideTestMethods(){
        $('.method-1').css('display', 'none');
        $('.method-2').css('display', 'none');       
   }
   
   function getMode(){
       var mode = $( ".mode #nMode" ).val();
       return mode;
   }
   
   function setMode(value){
       $( ".mode #nMode" ).val(value);
   }

   function getAlgorithmus(){
       var alg = $(".alg").val();
       return alg;
   }
   
   function setAlgorithmus(value){
       $(".alg").val(value);
   }
   
   function initTestMode(){
        setMode(1);
        setAlgorithmus(1); 
   }
   
   function resetSearchPram(){
       alert('Reset All Parameter');
       resetGenreParam();
       resetActorParam();
       resetRankingParam();
       resetLenghtParam();
       resetReleasedParam();
       resetSurvey()
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
   
   function resetActorParam(){
       $('#actors').val("");
       $('#actors').css('padding','13 19 12 10');
       $('#actors').css('height','');
   }

   function resetLenghtParam(){   
       $('#lenght input.min').val(0);
       $('#lenght .range_min').text(0);
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
       $('#released .range_min').text(1970);
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
       $('.ck-button span.like').css('display', 'none');
       $('.ck-button span.unlike').css('display', 'block');
       $('#cl1_like').click();
       $('#cl2_like').click();
   }
});

    var numStats;
    var focusStat = 4;    
    
    statisticObject.checkStatistics = function(method){
        alert("Check Statistics");
        var statistic = 0;
        
        if($('.Statistic'+method).css('display') == 'block'){
            statistic = method;
        }
        else{
            statistic = 0;
        }
        
        return statistic;
    };



     /* Show chosen statistic after movie detail clicked
     * 
     */
     statisticObject.statisticsShow = function(statistic) {
        alert("Show: "+statistic);
        if(statistic !==0){
            $('.Statistic'+statistic).css('display','block');
        }
    };


   /*
    * 
    * @check actuell statistic site
    * @param {type} lenght
    * @returns {undefined}
    */
    statisticObject.checkIndexStat = function(statcsIndex, id,lenght) {
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
        
        return statcsIndex;
    };
    

    /* Move statistic slider
    * 
    **/
    statisticObject.slideStatcs = function(statcsIndex,slider) {
        for(var i=0; i<slider.length;i++ ){
            $(slider).eq(i).addClass('hide');
        }
        for(var i=statcsIndex; i<(statcsIndex+focusStat);i++ ){
            $(slider).eq(i).removeClass('hide');
        }
    };
    
    /*
     * Reset all statistics
     * @param {type} labels
     * @returns {Array|statisticObject.getStatcsLabel.label}
     */
    statisticObject.resetStats = function(statistic){
        var slider = $('.'+statistic+' .clstats');
        for(var i=0; i<slider.length;i++ ){
            $(slider).eq(i).addClass('hide');
        }

        for(var i=0; i<focusStat;i++ ){
            $(slider).eq(i).removeClass('hide');
        }
        alert("reset Stats");
    };
    
     /* Get Labels for dimensionen that are included in statistics
     * 
     * @returns {Array}
     */
    statisticObject.getStatcsLabel = function(labels){
        var label = [];
        for(var j=0; j<labels.length; j++){
            for(var z = j+1; z <labels.length; z++ )
            {   
                label.push(labels[j]+" "+labels[z]);
            }
        }
        return label;
    };
    
     /** Show and hide statistics in slide
     * 
     * @param {type} movieNum
     * @returns {String}
     */
    statisticObject.showHideStat = function(movieNum) {
        var movieClass ='';
        if(movieNum<focusStat){
            movieClass ='clstats';
        }
        else{
            movieClass ='clstats hide';
        }
        return movieClass;
    }  


    /* After Detail about movie if statistic was opened go to previous condition*/
    statisticObject.showAfterCheck = function(statistic,num){
        if(statistic !==0){
            showAfterDetailStat(statistic,num);
        }
        else{
            showAfterDetail(num);
        }
    }
    
    
    
        /**
     * 
     * @param {type} method
     * @param {type} cluster
     * @returns {undefined}
     */
    function showAfterDetail(num){
        alert("showAfterDetail");
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
    function showAfterDetailStat(statistic,num){
        alert("showAfterDetailStat");
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
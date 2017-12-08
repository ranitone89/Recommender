    var focusStat = 4;
     /* Check if  statistic chosen after movie detail clicked
     * 
     */
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
    

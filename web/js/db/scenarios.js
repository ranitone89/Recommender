/* global scenarioObject */

$(document).ready(function() {
   loadScenariosDB();
   //init scenarios for evaluation
   initEvalScenarios(1,2,3);

   var searchPrameter = [[]];
   var comparIndex = 1;
   var evalIndex = 0;
   
   //initMethod();
   

    /* Define new scenario and insert it to database
     * 
     */
    $(document).on("click","#defineBtn", function(event){
        var actors = removeLastComma($('#id01 .search-tab #actors').val());
        var genres = removeLastComma($('#id01 .search-tab .multiSel').text());
        var description = $('#description').val();
        var parameter = $('.searchParameter input[type="checkbox"]:checked').length;
        var paramList = scenarioObject.getSearchPreference();
        var maxReleased = 0;
        var minReleased = 0;
        var maxLenght = 0;
        var minLenght = 0;
        var minStar = 0;        
        var minStar = 11;
        var actorList = [""];
        var genreList = [""];
        
        
        if(getNumMethod()<=0){
            $('#messageEval').css("display","block");
            $('#messageEval').html("<font color='red'>Wählen Sie bitte mindestens zwei Methoden </font>");
            return;
        }
        if(getNumCompar()<=0){
            $('#messageEval').css("display","block");
            $('#messageEval').html("<font color='red'>Bitte geben Sie gwünschte Vergleiche </font>");
            return;            
        }
        if(paramList.indexOf('actor')>=0){
            if(actors == ""){
                $('#messageEval').css("display","block");
                $('#messageEval').html("<font color='red'>Geben Sie bitte mindestens einen Namen ein. </font>")
               return;
            }
            else{
               actorList = searchObject.covertToArray(actors,'a'); 
            }
        }
        
        if(paramList.indexOf('genre')>=0){
            if(genres == ""){
                $('#messageEval').css("display","block");
                $('#messageEval').html("<font color='red'>Wählen Sie bitte mindestens ein Genre </font>")
                return;
            }
            else{
                genreList = searchObject.covertToArray(genres,'g');
            }
        }

        if(paramList.indexOf('year')>=0){
            maxReleased = $('#id01 .search-tab #released_slider .range_max').text();
            minReleased = $('#id01 .search-tab #released_slider .range_min').text();
        }
        
        if(paramList.indexOf('lenght')>=0){
            maxLenght = $('#id01 .search-tab #lenght_slider .range_max').text();
            minLenght = $('#id01 .search-tab #lenght_slider .range_min').text();
        }

        if(paramList.indexOf('rating')>=0){
            minStar = $('#id01 .search-tab #star_slider .range_star').text();
        }
        if(description == ""){
             $('#messageEval').css("display","block");
             $('#messageEval').html("<font color='red'>Geben Sie bitte Beschreibung ein</font>")
             return;
        }
        
        if(parameter < 2){
             $('#messageEval').css("display","block");
             $('#messageEval').html("<font color='red'>Wählen Sie bitte mind. zwei Suchparameter aus</font>")
             return;
         }
         
       else{
            var searchParameterMethods = getSearchParameterMethods();
            var comparation = getComparations();
            
            searchObject.resetSearchPram();
             
            $.ajax({
             url : "InsertScenarioServlet",
             type : "GET",
             beforeSend: function(){
                 showLoading();
                 hideDiv();
             },
             data : {
                 description : description,
                 actorList : actorList,
                 genreList : genreList,
                 maxLenght : maxLenght,
                 minLenght : minLenght,
                 minReleased : minReleased,
                 maxReleased : maxReleased,
                 minStar     : minStar,
                 paramList : paramList,
                 searchParameterMethods : searchParameterMethods,
                 comparation : comparation
                 
             },
             complete: function(){
                    hideLoading();
                    hideDiv();
             },
             success : function(response){
                        if(response != null && response != "")
                        {
                            resetScenario();
                            loadScenariosDB();
                            $('.clusterbtn').css("display","block");
                            $('#defineBtn').css("display","none");
                            $('#id01 .search-tab').trigger('click');
                            $('#messageEval').css("display","none");
                            openEval(event, 'EvalScenario');
                        }
                    else
                        {
                            resetScenario();
                            $('#messageEval').css("display","block");
                            $('#messageEval').html("<font color='red'>Die angegebene Parameter sind zu spezifisch. </font>");
                        }
                }
            });
        }
    });
    
    /**
     * On success created new scenario
     * @returns {undefined}
     */
    function resetScenario(){
        $('.searchMethodParameterSlider').empty();
        resetComparationsLabels();
        $('.evalSlider').empty();
        resetMethodLabels();
        $('#description').val("");
    }
    
    /* Load all defined scenarios from database
     * @param {type} jsonObj
     * @returns {undefined}
     */
    function loadScenariosDB(){
       $.ajax({
             url : "LoadScenariosServlet",
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
   

    /* Parse informations from scenarios
     * Initalisation: Scenario 1, Scenario 1, Scenario 1 
     * @param {type} jsonObj
     * @returns {undefined}
     */
    function parseScenarios(jsonObj){
        removeAllScenarios();
        removeAllScenariosMessages();

        for(var i = 0; i < jsonObj.length; i++)
        {   
            $('#nScenarios').append('<option value="'+jsonObj[i].id+'"'+'>Szenario ' + jsonObj[i].id + '</option>');
            $('#EvalScenario').append('<textarea id="desc'+jsonObj[i].id+'" rows="1" class="descriptions" contenteditable="true">'+jsonObj[i].desc+'</textarea>');
        }
   }
   

    /* Get all scenarios from database for evaluation
     * 
     * @param {type} jsonObj
     * @returns {undefined}
     */
    scenarioObject.getScenariosEvaluation = function(){

       var scenarios = scenarioObject.getUserChoise();

       $.ajax({
             url : "GetScenarioServlet",
             type : "GET",
             dataType: "json",
             data : {
                 scenarios : scenarios     
             },
             
            success : function(response){
                        if(response != null && response != "")
                        {
                            var jsonStr = JSON.stringify(response);
                            var jsonObj = JSON.parse(jsonStr);
                            parseEvalScenarios(jsonObj);

                        }
                    else
                        {
                            alert("Some exception occurred! Please try again.");
                        }
                }
            });
            
   }
   
    /* Parse informations from scenarios
     * Initalisation: Scenario 1, Scenario 1, Scenario 1 
     * @param {type} jsonObj
     * @returns {undefined}
     */
    function parseEvalScenarios(jsonObj){
        removeAllScenarios();
        removeAllScenariosMessages();
        
        searchPrameter = new Array(jsonObj.length); 
        for(var i = 0; i < jsonObj.length; i++)
        {   
            searchPrameter[i] = new Array(jsonObj[i].comparations.length);
            for(var j=0; j<jsonObj[i].comparations.length; j++){
                searchPrameter[i][j] = jsonObj[i].comparations[j];
            }

            $('#nScenarios').append('<option value="'+jsonObj[i].id+'"'+'>Szenario ' + jsonObj[i].id + '</option>');
            $('#EvalScenario').append('<textarea id="desc'+jsonObj[i].id+'" rows="1" class="descriptions" contenteditable="true">'+jsonObj[i].desc+'</textarea>');
        }
   }
   
   /* Slide methods that should be defined for new scenario
    * 
    */
    $(document).on("click", ".eval_method_param", function(event){
            var buttonid = $(this).attr('id');
            var method = $('.searchMethodParameterSlider .evalComparation');
            checkIndexEval(buttonid,method.length);
    });
    
    /*
     * 
     * @returns {undefined}
     */
    function initMethod(){
        setNumMethod(1);
        addMethodParam(1);
        setLabelText(1);
        initSearchMethods();
    }
    
    /* 
    * 
    * @param {type} id
    * @param {type} lenght
    * @returns {undefined}
    */
    function checkIndexEval(id,lenght) {
        if(id==="btn_next_method_param"){
            if(lenght-1>evalIndex){
                evalIndex = evalIndex+1;
            }
            else{
                evalIndex = evalIndex+0;
            } 
        }
        if(id==="btn_prev_method_param"){
            if(evalIndex>0){
                evalIndex = evalIndex-1;
            }
            else{
                evalIndex = 0;
            } 
        }
        setLabelText(evalIndex+1);
        slideSearchMethodParameter(evalIndex);
        
    }
    
    /* On scenario method selected
     * 
     */
    $('#nMethods').change(function(){
        comparIndex = $(this).val();
        $('.searchMethodParameterSlider').css("display","block");
        removeMethodParam();
        addMethodParam(comparIndex);
        initSearchMethods();
        setLabelText(1);
        evalIndex = 0;
    });
    
    /* Set label text method
     * 
     * @param {type} value
     * @returns {undefined}
     */
    function setLabelText(value){
        var text = "Method: "+value +" von "+getNumMethod();
       $('.methodParamLabels').text(text);
    }

    function setNumMethod(num){
        $( "#nMethods" ).val(num);
    }
    
    /* Get number of methods of new scenario
     * 
     * @returns {jQuery}
     */
    function getNumMethod(){
        return $( "#nMethods" ).val();
    }
    
    /* Get number of comparations
     * 
     * @returns {jQuery}
     */
    function getNumCompar(){
        return $( "#nComparation" ).val();
    }
    
    /* Add method of new scenario to div
     * 
     * @param {type} comparIndex
     * @returns {undefined}
     */
    function addMethodParam(comparIndex){
        for(var i =1; i<=comparIndex; i++){
            appendSearchMethodParameter(i);
        }
    }
    
    /* Remove all methods of new scenario
     * 
     * @returns {undefined}
     */
    function removeMethodParam(){
        $('.searchMethodParameterSlider').empty();
    }
    
    /* Create div for each method of new scenario
     * 
     * @returns {Array}
     */
    function appendSearchMethodParameter(num) {
        $('.searchMethodParameterSlider').append('<div class="evalComparation"'+ ' id="evalCom'+num+'">'
                          + '<div class="evalMethods" id="evalMeth1">'
                            + '<div class="rowEval">'
                              + '<select class="evalChoise" name="Choise">'
                              + '<option value="0">Euclidean</option>'
                              + '<option value="1">Canberra</option>'
                              + '<option value="2">Bray Curtis</option>'
                              + '<option value="3">Manhattan</option>'
                              + '<option value="4">Borda</option>'
                            + '</select></div>'
                            + '<div class="rowEval"><select class="evalAlg" name="Algorithm">'
                              + '<option value="0">Borda</option>'
                              + '<option value="1">Cluster</option>'
                            + '</select></div>'
                            + '<div class="rowEval"><select class="evalCluster" name="Number of Clusters">'
                              + '<option value="1">1</option>'
                              + '<option value="2">2</option>'
                              + '<option value="3">3</option>'
                              + '<option value="4">4</option>'
                              + '<option value="5">5</option>'
                              + '<option value="6">6</option>'
                              + '<option value="7">7</option>'
                            + '</select></div>'
                            + '<div class="rowEval"><select class="evalDistance" name="Distance">'
                                  +'<option value="0">Euclidean</option>'
                                  +'<option value="1">Canberra</option>'
                                  +'<option value="2">Bray Curtis</option>'
                                  +'<option value="3">Manhattan</option>'
                                  +'<option value="4">Borda</option>'
                                +'</select></div>'
                            +'<div class="rowEval">' 
                              +'<select class="evalSorting" name="Sorting">'
                              +'<option value="0">simple initializiation of centroids</option>'
                              +'<option value="1">k-means++</option>'
                            +'</select></div>'
                          +'</div>'
                    +'</div>');
        showSearchMethodParameter(0);
     }    
    
    /* Show methods of new scenario
     * 
     * @param {type} positionAt
     * @returns {undefined}
     */
    function showSearchMethodParameter(positionAt){
        $('.searchMethodParameterSlider .evalComparation').eq(positionAt).addClass('active');
    }
    
    /* Slide methods of new scenario
     * 
     * @param {type} positionAt
     * @returns {undefined}
     */
    function slideSearchMethodParameter(positionAt){
        for(var i =0; i<$('.searchMethodParameterSlider .evalComparation').length; i++){
            $('.searchMethodParameterSlider .evalComparation').eq(i).removeClass('active');
        }
        showSearchMethodParameter(positionAt);
    }
    
    /*****************************************////////////////////////////////////****************
    scenarioObject.getSearchPreference = function() {         
        var searchParams = [];
        $('.searchParameter input[type="checkbox"]:checked').each(function() {
            searchParams.push($(this).val());
        });
        return searchParams;
    };
    
    /* Init scenarios for evaluation
     * 
     * @param {type} s1
     * @param {type} s2
     * @param {type} s3
     * @returns {undefined}
     */
    function initEvalScenarios(s1,s2,s3){
        removeAllSelectedScenarios();
       $("#output").append(s1+", ");
       $("#output").append(s2+", ");
       $("#output").append(s3+", ");
    }
    
    /*
     * 
     * @returns {undefined}
     */
    function removeAllScenarios(){
       $('#nScenarios option').remove();
    }
   
    function removeAllScenariosMessages(){
       $('#EvalScenario .descriptions').remove();
    }
   
    function removeAllSelectedScenarios(){
       $("#deleteBtn").trigger('click');
    }
   
    /* Get all chosen scenarios fro evaluation
     * 
     * @returns {Array}
     */
    scenarioObject.getUserChoise = function(){
        var scenarios = [];
        var temp = $('#output').val().split(', ');
        for(var i=0; i<temp.length; i++){
            if(temp[i]!=''){
                scenarios[i] = temp[i];
            }
        }
        return scenarios;
    };
    
   /* Set text for slider
    * 
    * @param {type} value
    * @returns {undefined}
    */
    function setScenarioText(value){
        var textNum = value+1;
        var text = "Szenario: "+textNum +" von "+getNumberScenario();
       $('.scenLabels').text(text);
    }
    
    /* Get number of scenarios
     * 
     * @returns {scenarios.length}
     */
    function getNumberScenario(){
       return searchObject.getNumberScenario();
    }
    
    /**
     * 
     * @param {type} str
     * @returns {unresolved}
     */
    function removeLastComma(str) {
       return str.replace(/,(\s+)?$/, '');
    }
   
    function openScenarioMessages(){
       $('#id03').css("display","none");
    }
   
    $(document).on("click", ".explainClose", function(event){
       scenarioObject.closeScenarioMessages();
       scenarioObject.hideScenarioMessages();
    });
    
    /* Get Number of comparations of new scenario
     * 
     * @returns {String}
     */
    function getComparations(){
        var comparation= "";
        
        for(var i =0; i<getNumCompar(); i++){
            var eval = i+1;
            comparation += $('.evalSlider #evalCom'+eval+' #evalMeth1 .evalChoise').val();
            comparation += ",";
            comparation += $('.evalSlider #evalCom'+eval+' #evalMeth2 .evalChoise').val();
            comparation += ";";
        }
        return comparation;
    }
    
    /* Get Method parameters of new scenario
     * 
     * @returns {String}
     */
    function getSearchParameterMethods(){
        var searchMethosParameter= "";
        
        for(var i =0; i<getNumMethod(); i++){
            var eval = i+1;
            searchMethosParameter += $('.searchMethodParameterSlider #evalCom'+eval+' #evalMeth1 .evalAlg').val();
            searchMethosParameter += ",";
            searchMethosParameter += $('.searchMethodParameterSlider #evalCom'+eval+' #evalMeth1 .evalCluster').val();
            searchMethosParameter += ",";
            searchMethosParameter += $('.searchMethodParameterSlider #evalCom'+eval+' #evalMeth1 .evalDistance').val();
            searchMethosParameter += ",";
            searchMethosParameter += $('.searchMethodParameterSlider #evalCom'+eval+' #evalMeth1 .evalSorting').val();
            searchMethosParameter += ",";
            searchMethosParameter += $('.searchMethodParameterSlider #evalCom'+eval+' #evalMeth1 .evalChoise').val();
            searchMethosParameter += ";";
        }
        return searchMethosParameter;
    }
    
    /* Init div
     * 
     * @returns {undefined}
     */
    function initSearchMethods(){
        /*Init first Comparation*/
        
        for(var i =0; i<getNumMethod(); i++){
            var eval = i+1;
            $('.searchMethodParameterSlider #evalCom'+eval+' #evalMeth1 .evalAlg').val(1);
            $('.searchMethodParameterSlider #evalCom'+eval+' #evalMeth1 .evalCluster').val(3);
            $('.searchMethodParameterSlider #evalCom'+eval+' #evalMeth1 .evalDistance').val(0);
            $('.searchMethodParameterSlider #evalCom'+eval+' #evalMeth1 .evalSorting').val(0);
            $('.searchMethodParameterSlider #evalCom'+eval+' #evalMeth1 .evalChoise').val(0);
        }
    }
    






     /* Same number of clusters for all methods
     *  Eval mode
     */
    $(document).on('click','.searchMethodParameterSlider .evalCluster', function(){
        var value = $(this).val();

        for(var i =0; i<getNumMethod(); i++){
            var eval = i+1;
            $('.searchMethodParameterSlider #evalCom'+eval+' #evalMeth1 .evalCluster').val(value);
        }
        
    });
    
    
     /* Same number of clusters for all methods
     *  Test mode
     */
    $(document).on('click','.testMode .evalCluster', function(){
        var value = $(this).val();
        $('.method-1 .evalCluster').val(value);
        $('.method-2 .evalCluster').val(value);
    });
    
    /* Set Parameter of new scenatio depending of user choise
     * 
     */
    $(document).on('click','.searchMethodParameterSlider .evalChoise', function(){
        var firstParent = $(this).parents().eq(2).attr('id');
        var value = $(this).val();
        
        resetComparationsLabels();        
  
        if(value < 4){
            setAlgorithmus(firstParent, 1);
            setDistance(firstParent, value);
        }
        
        else{
            setAlgorithmus(firstParent, 0);
            setDistance(firstParent, 4);
        }
       
    });
    
    /**
     * Reset comparations labels
     * @returns {undefined}
     */
    function resetMethodLabels(){
        $( ".searchMethodParameter #nMethods" ).val(0);
        $( ".searchMethodParameterSlider").css("display","none");
        var text = "Method: "+0 +" von "+0;
        $('.methodParamLabels').text(text);
    }    
    
    /**
     * Reset comparations labels
     * @returns {undefined}
     */
    function resetComparationsLabels(){
        $( ".comparation #nComparation" ).val(0);
        $( ".evalSlider").css("display","none");
        var text = "Vergleich: "+0 +" von "+0;
        $('.compLabels').text(text);        
    }
    /*
     * 
     * @param {type} first
     * @param {type} value
     * @returns {undefined}
     */
    function setAlgorithmus(first, value){
        $('.searchMethodParameterSlider #'+first+' #evalMeth1 .evalAlg option[value=' + value + ']').prop("selected",true);
    }
    
    /*
     * 
     * @param {type} first
     * @param {type} value
     * @returns {undefined}
     */
    function setDistance(first,value){
        $('.searchMethodParameterSlider #'+first+' #evalMeth1 .evalDistance option[value=' + value + ']').prop("selected",true);
    }   
    
    /*
     * 
     * @returns {undefined}
     */
    function hideLoading(){
      $('#loading').css("display","none");
    }
    
    /*
     * 
     * @returns {undefined}
     */
    function hideDiv(){
      $('.searchMethodParameterSlider').css("display","none");
    }
    
    /*
     * 
     * @returns {undefined}
     */
    function showLoading(){
        $('#loading').css("display","block");
    }
    
    /* Get comparations of scenario from db
     * 
     * @returns {Array}
     */
    scenarioObject.getSearchParameter = function(){
        return searchPrameter;
    };
    
    /* Show message for scenario at position
     * 
     * @param {type} scenarioAt
     * @returns {undefined}
     */
    scenarioObject.displayScenario = function(scenarioAt){
        $('#id03').css("display","block");
        setScenarioText(scenarioAt);
        scenarioObject.displayScenarioMessage(scenarioAt);
    };
    
    /* Remove all explanations
     * 
     */
    scenarioObject.removeScenarioMessage = function(){
        $('.explanationBox').empty();
    };
    
    /* Close message of one scenario
     * 
     */
    scenarioObject.closeScenarioMessages = function(){
       $('#id03').css("display","none");
    };
    
    /* Display scenario message
     * 
     */
    scenarioObject.displayScenarioMessage = function(messageAt){
           scenarioObject.hideScenarioMessages();
           $('.explanationBox .explanation').eq(messageAt).addClass('showScenario');
           $('#id03').css("display","block");
   };
   
   /* Cretae scenario message
    * 
    */
    scenarioObject.createScenarioMessage = function(scenarios){
        scenarioObject.removeScenarioMessage();
        for(var i=0; i<scenarios.length; i++){
           $('.explanationBox').append('<div class="explanation"><p>'+$('#desc'+scenarios[i]).val()+'</p></span></div>');
        }
    };
    
    /* Hide scenario message
     * 
     */
    scenarioObject.hideScenarioMessages = function(){
        for(var i=0; i<getNumberScenario();i++ ){
            $('.explanationBox .explanation').eq(i).removeClass('showScenario');
        }
    };
});
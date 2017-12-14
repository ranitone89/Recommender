/* global scenarioObject */

$(document).ready(function() {
   loadScenariosDB();
   initEvalScenarios(19,20,21);

   var searchPrameter = [[]];
   var comparIndex = 1;
   var evalIndex = 0;
   
   initMethod();
   

    /* Define new scenario and insert it to database
     * 
     */
    $(document).on("click","#defineBtn", function(event){
        var actors = removeLastComma($('#id01 .search-tab #actors').val());
        var genres = removeLastComma($('#id01 .search-tab .multiSel').text());
        var description = $('#description').val();
        var parameter = $('.searchParameter input[type="checkbox"]:checked').length;
        var paramList = getSearchPreference();
        
        var maxReleased = $('#id01 .search-tab #released .range_max').text();
        var minReleased = $('#id01 .search-tab #released .range_min').text();
        var maxLenght = $('#id01 .search-tab #lenght .range_max').text();
        var minLenght = $('#id01 .search-tab #lenght .range_min').text();
        var minStar = $('#id01 .search-tab #star .range_star').text();
        
        
        if(paramList.indexOf('actor')>=0){
            if(actors == ""){
                $('#messageEval').css("display","block");
                $('#messageEval').html("<font color='red'>Geben Sie bitte mindestens einen Namen ein. </font>")
               return;
            }
        }
        
        if(paramList.indexOf('genre')>=0){
            if(genres == ""){
                $('#messageEval').css("display","block");
                $('#messageEval').html("<font color='red'>Wählen Sie bitte mindestens ein Genre </font>")
                return;
            }
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
            var searchParameterMethods = getSearchParameterMethods();
            var comparation = getComparations();
            var actorList = searchObject.covertToArray(actors,'a');
            var genreList = searchObject.covertToArray(genres,'g');
            
            if(paramList.indexOf('lenght')<0){
                maxReleased = 0;
                minReleased = 0;
            }

            if(paramList.indexOf('year')<0){
                maxLenght = 0;
                minLenght = 0;
            }

            if(paramList.indexOf('rating')<0){
                minStar = -1;
            }
            
            alert("Search einschränkungen:  "+paramList);
            searchObject.resetSearchPram();
            
            $('.clusterbtn').css("display","block");
            $('#defineBtn').css("display","none");
            $('#id01 .search-tab').css("display","none"); 
            $('#messageEval').css("display","none");
            openEval(event, 'EvalScenario');

            
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
                            alert("After insert get inserted");
                            loadScenariosDB();
                        }
                    else
                        {
                            alert("After insert error");
                            $('#messageSearch').css("display","block");
                            $('#messageSearch').html("<font color='red'>Die angegebene Parameter sind zu spezifisch. </font>");
                            alert("Insert Error");
                        }
                }
            });
        }
    });
    
    /* Load all defined scenarios from database
     * 
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
        //removeAllScenarios();
        removeAllScenariosMessages();
        for(var i = 0; i < jsonObj.length; i++)
        {   
            searchPrameter[i]=[jsonObj[i].comparations[0],jsonObj[i].comparations[1]];
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
        removeMethodParam();
        addMethodParam(comparIndex);
        //initSearchMethods();
        setLabelText(1);
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
                            + '<div class="rowEval"><select class="evalChoise" name="Choise">'
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
    function getSearchPreference() {         
        var searchParams = [];
        $('.searchParameter input[type="checkbox"]:checked').each(function() {
            searchParams.push($(this).val());
        });
        return searchParams;
    }
    
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
    
    
    /* Set Parameter of new scenatio depending of user choise
     * 
     */
    $(document).on('click','.searchMethodParameterSlider .evalChoise', function(){
        var firstParent = $(this).parents().eq(2).attr('id');
        var value = $(this).val();
        
        /*Borda*/
        if(value == 4){
            alert("Borda");
            setAlgorithmus(firstParent, 0);
        }
        /*Cluster*/
        else{
            setAlgorithmus(firstParent, 1);
            setDistance(firstParent, value);
        }
       
    });
    
    /*
     * 
     * @param {type} first
     * @param {type} value
     * @returns {undefined}
     */
    function setAlgorithmus(first, value){
        $('.searchMethodParameterSlider #'+first+' #evalMeth1 .evalAlg').val(value);
    }


    /*
     * 
     * @param {type} first
     * @param {type} value
     * @returns {undefined}
     */
    function setDistance(first,value){
       $('.searchMethodParameterSlider #'+first+' #evalMeth1 .evalDistance').val(value);
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
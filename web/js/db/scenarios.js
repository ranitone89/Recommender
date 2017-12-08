/* global scenarioObject */

$(document).ready(function() {
   getScenariosDB();
   var searchPrameter = [[]];

    
    $(document).on("click","#defineBtn", function(event){
        alert("define btn");
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
            var genreList = searchObject.covertToArray(genres,'g');
            var paramList = getSearchPreference();
            searchObject.resetSearchPram();
            
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
        alert("Scenarien Holen");
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
   
   
    function getScenarioLenght(){
        var temp = $('#output').val().split(', ');
        return temp.length-1;
    }
   
    scenarioObject.getScenarios = function(){
        var scenarios = [];
        var temp = $('#output').val().split(', ');
        for(var i=0; i<temp.length; i++){
            if(temp[i]!=''){
                scenarios[i] = temp[i];
            }
        }
        return scenarios;
    };
    
   
    function setScenarioText(value){
        var textNum = value+1;
        var text = "Szenario: "+textNum +" von "+getNumberScenario();
       $('.scenLabels').text(text);
    }
    
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
    

    /*$(document).on("click", "#id04 #infoClose", function(event){
        initScenarios();
    });*/
    
    scenarioObject.getSearchParameter = function(){
        alert("get search parameter");
        return searchPrameter;
    };
    
    scenarioObject.displayScenario = function(scenarioAt){
        $('#id03').css("display","block");
        setScenarioText(scenarioAt);
        scenarioObject.displayScenarioMessage(scenarioAt);
    };
    
    /**Remove all explanations**/
    scenarioObject.removeScenarioMessage = function(){
        $('.explanationBox').empty();
    };
    
    scenarioObject.closeScenarioMessages = function(){
       $('#id03').css("display","none");
    };
   
    scenarioObject.displayScenarioMessage = function(messageAt){
           scenarioObject.hideScenarioMessages();
           $('.explanationBox .explanation').eq(messageAt).addClass('showScenario');
           $('#id03').css("display","block");
   };
   
    scenarioObject.createScenarioMessage = function(scenarios){
        scenarioObject.removeScenarioMessage();
        for(var i=0; i<scenarios.length; i++){
           $('.explanationBox').append('<div class="explanation"><p>'+$('#desc'+scenarios[i]).val()+'</p></span></div>');
        }
    };
    
    scenarioObject.hideScenarioMessages = function(){
        alert("Remove showScenario");
        for(var i=0; i<getNumberScenario();i++ ){
            $('.explanationBox .explanation').eq(i).removeClass('showScenario');
        }
    };
});
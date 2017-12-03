

$(document).ready(function() {
    //getScenariosDB();
    
    var clusterClicked = false;
    $(document).on("click", ".button-container .open", function(event){
        if ( $(this).hasClass('active')==false){
            $(this).removeClass("open");
            $(this).addClass("closee");
            $('.search').hide();
            $('.search-tab-close').hide();
        }
   });
   
    $(document).on("click", ".button-container .closee", function(event){
        if ( $(this).hasClass('active')==false){
            $(this).removeClass("closee");
            $(this).addClass("open");
            $('.search').show();
            $('.search-tab-close').show();

            if(clusterClicked==false){
               $('.clusterbtn').trigger('click');
               clusterClicked=true;
            }
        }
   });
   
   $(document).on("click", ".search .search-tab-close", function(event){
        $('.button-container .open').trigger("click");
        $('.clusterbtn').css("display","block");
   });
   $(document).on("click","#newBtn", function(event){
        $('#id01 .tab').css("display","block");
        $('#id01 .search-tab').css("display","block");
        $('#defineBtn').css("display","block"); 
        $('.clusterbtn').css("display","none");
        $('#id01 .tab').css("display","block");
        $('.scen_param').css("display","block");
        $('.scen_desc').css("display","block");
        $('hr').css("display","block");
        $('#description').css("display","block");
   });
   
   /*$(document).on("click","#defineBtn", function(event){
        var actors = removeLastComma($('#id01 .search-tab #actors').val());
        var genres = removeLastComma($('#id01 .search-tab .multiSel').text());
        var description = $('#description').val();
        
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
       else{
            var released = [minReleased,maxReleased];
            var lenght = [minLenght,maxLenght];

            $('.clusterbtn').css("display","block");
            $('#defineBtn').css("display","none");
            $('#id01 .search-tab').css("display","none"); 
            $('#messageEval').css("display","none");
            $('.scen_param').css("display","none");
            $('.scen_desc').css("display","none");
            $('hr').css("display","none");
            $('#description').css("display","none");
            
            $.ajax({
             url : "InsertScenarioServlet",
             type : "GET",
             data : {
                 description : description,
                 actors : actors,
                 genres : genres,
                 lenght : lenght,
                 released : released,
                 minStar  : minStar
                 
             },
             success : function(response){
                        if(response != null && response != "")
                        {
                            alert("OK");
                            getScenariosDB();
                        }
                    else
                        {
                            $('#messageSearch').css("display","block");
                            $('#messageSearch').html("<font color='red'>Die angegebene Parameter sind zu spezifisch. </font>");
                            alert("Some exception occurred! Please try again.");
                        }
                }
            });
        }
    });*/

    $(document).on("click","#id01 .search-tab-close", function(event){
        $('.clusterbtn').css("display","block");
        $('#defineBtn').css("display","none");
        $('#id01 .tab').css("display","none");
        $('#messageEval').css("display","none");
        $('.scen_param').css("display","none");
        $('.scen_desc').css("display","none");
        $('hr').css("display","none");
        $('#description').css("display","none");
   });
   
    function removeLastComma(str) {
       return str.replace(/,(\s+)?$/, '');
    }
    
    /*function getScenariosDB(){
       var searchPrameter = [[],[]];
       $.ajax({
             url : "ScenarioRequest",
             type : "GET",
             dataType: "json",
             success : function(response){
                        if(response != null && response != "")
                        {
                            var jsonStr = JSON.stringify(response);
                            alert(jsonStr);
                            var jsonObj = JSON.parse(jsonStr);
                            searchPrameter = parseScenarios(jsonObj);

                        }
                    else
                        {
                            alert("Some exception occurred! Please try again.");
                            searchPrameter = [[],[]];
                        }
                }
            });
            
            return searchPrameter;
   }*/
   
   /*function parseScenarios(jsonObj){
        var searchPrameter = [[],[]];
        removeAllScenarios();
        removeAllScenariosMessages();
        initScenarios(1,2,3);
        
        for(var i = 0; i < jsonObj.length; i++)
        {   
            alert("Get")
            searchPrameter[i]=[jsonObj[i].actors,jsonObj[i].genres,jsonObj[i].lenght,jsonObj[i].released,jsonObj[i].rating]
            alert(searchPrameter[i]);
            $('#nScenarios').append('<option value="'+jsonObj[i].id+'"'+'>Szenario ' + jsonObj[i].id + '</option>');
            $('#EvalScenario').append('<textarea id="desc'+jsonObj[i].id+'" rows="1" class="descriptions" contenteditable="true">'+jsonObj[i].desc+'</textarea>');
        }
       return searchPrameter;
   }*/
   
   /*function removeAllScenarios(){
       $('#nScenarios option').remove();
   }
   
   function removeAllScenariosMessages(){
       $('#EvalScenario .descriptions').remove();
   }
   
   function removeAllSelectedScenarios(){
       $("#deleteBtn").trigger('click');
   }*/
    
    /*function initScenarios(s1,s2,s3){
        removeAllSelectedScenarios();
       $("#output").append(s1+", ");
       $("#output").append(s2+", ");
       $("#output").append(s3+", ");
   }*/
   
}); 

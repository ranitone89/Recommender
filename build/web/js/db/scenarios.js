/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function() {
    getScenarios();
   
   function getScenarios(){
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
        for(var i = 0; i < jsonObj.length; i++)
        {   
            alert(jsonObj[i].id);
            alert(jsonObj[i].desc);
            $('#nScenarios').append('<option value="'+jsonObj[i].id+'"'+'>Szenario ' + jsonObj[i].id + '</option>');
            $('#EvalScenario').append('<textarea id="desc'+jsonObj[i].id+'" rows="1" class="descriptions" contenteditable="true">'+jsonObj[i].desc+'</textarea>');
        }
       initScenarios(1,2,3);
   }
   
    function initScenarios(s1,s2,s3){
       $("#output").append(s1+", ");
       $("#output").append(s2+", ");
       $("#output").append(s3+", ");
   }
   
}); 
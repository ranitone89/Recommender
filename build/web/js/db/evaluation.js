/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/* global evaluationObject */

$(document).ready(function() {
    evaluationObject.insertEvaluation = function(userId, scenarioId, alg1, alg2, methodEval, cluster1Eval, cluster2Eval){ 
        var message = "";
        $.ajax({
             url : "InsertEvaluationServlet",
             type : "GET",
             data : {
                 userId : userId,
                 scenarioId : scenarioId,
                 alg1 : alg1,
                 alg2 : alg2,
                 methodEval : methodEval,
                 cluster1Eval : cluster1Eval,
                 cluster2Eval : cluster2Eval      
             },
             success : function(response){
                        if(response != null && response != "")
                        {
                            showMessage(response);
                        }
                    else
                        {
                            showMessage(response);
                        }
                }
            });
            
       }
       
    /**
     * Display message to the user
     * @param {type} results
     * @returns {undefined}
     */
    function showMessage(results){
        if(results == ""){
            alert("Fehler Fragebogen");
        }
    }
});

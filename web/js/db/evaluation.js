/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/* global evaluationObject */

$(document).ready(function() {
    evaluationObject.insertEvaluation = function(userId, scenarioId, alg1, alg2, methodEval, cluster1Eval, cluster2Eval){ 
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
                            alert("Insert success");
                        }
                    else
                        {
                            alert("Fehler beim eintragen von fragebogen ergebnissen");
                        }
                }
            });
            
       } 
});

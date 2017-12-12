

    /* global surveyObject */
    
    
    surveyObject.insertSurveyResults = function(result, user) {
        var surveyResults = [];
        var inserted = false;
        surveyResults.push(result.data.geschlecht);
        surveyResults.push(result.data.alter);
        surveyResults.push(result.data.beschäftigung);
        surveyResults.push(result.data.beruf);
        surveyResults.push(result.data.filme);
        
        surveyResults.push(result.data.zahlbereitschaft);
        surveyResults.push(result.data.plattformen.stream);
        surveyResults.push(result.data.plattformen.tv);
        surveyResults.push(result.data.plattformen.portale);
        surveyResults.push(result.data.empfehlung);
        surveyResults.push(result.data.sinn);
        surveyResults.push(result.data.zufriedenheit);

        $.ajax({
             url : "InsertSurveyServlet",
             type : "GET",
             async: false,
             data : {
                 surveyResults : surveyResults,
                 user : user
             },
             success : function(response){
                        if(response != null && response != "")
                        {
                            inserted = true;
                            alert("Insert Survey");
                        }
                    else
                        {
                            alert("Fehler beim eintragen von fragebogen ergebnissen");
                            inserted = false;                            
                        }
                } 
        });
        
        alert("Inserted: "+inserted);
        return inserted;
    };


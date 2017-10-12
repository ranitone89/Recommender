/*$(document).ready(function() {
    $(document).on("click", ".submitSurvey", function(event){
        
        
        
        /*if($('#cb_cluster11').is(':checked')==true && $('#cb_cluster21').is(':checked')==true ){
            $('#messageSurvey').css("display","block");
            $('#messageSurvey').html("<font color='red'>You can only choose one group of recommendations in the first row </font>");
            $('#lb_11').text("Select only one of these");
            $('#lb_21').text("Select only one of these");
            return;
        }
        if($('#cb_cluster11').is(':checked')==false && $('#cb_cluster21').is(':checked')==false ){
            $('#messageSurvey').css("display","block");
            $('#messageSurvey').html("<font color='red'>Select at least one recommendation group in the first row </font>")
            $('#lb_11').text("Please Select one of these");
            $('#lb_21').text("Please Select one of these");
            return;
        }
        
        if($('#cb_cluster12').is(':checked')==true && $('#cb_cluster22').is(':checked')==true ){
            $('#messageSurvey').css("display","block");
            $('#messageSurvey').html("<font color='red'>You can only choose one group of recommendations in the second row </font>");
            $('#lb_11').text("");
            $('#lb_21').text("");
            $('#lb_12').text("Select only one of these");
            $('#lb_22').text("Select only one of these");
            return;
        }
        if($('#cb_cluster12').is(':checked')==false && $('#cb_cluster22').is(':checked')==false ){
            $('#messageSurvey').css("display","block");
            $('#messageSurvey').html("<font color='red'>Select at least one recommendation group in the second row</font>")
            $('#lb_11').text("");
            $('#lb_21').text("");
            $('#lb_12').text("Please Select one of these");
            $('#lb_22').text("Please Select one of these");
            return;
        }
        if($('#cb_cluster13').is(':checked')==true && $('#cb_cluster23').is(':checked')==true ){
            $('#messageSurvey').css("display","block");
            $('#messageSurvey').html("<font color='red'>You can only choose one group of recommendations in 3th row </font>")
            $('#lb_12').text("");
            $('#lb_22').text("");
            $('#lb_13').text("Select one of these");
            $('#lb_23').text("Select one of these")
            return;
        }
        if($('#cb_cluster13').is(':checked')==false && $('#cb_cluster23').is(':checked')==false ){
            $('#messageSurvey').css("display","block");
            $('#messageSurvey').html("<font color='red'>Select at least one recommendation group in 3th row</font>");
            $('#lb_12').text("");
            $('#lb_22').text("");
            $('#lb_13').text("Please Select one of these");
            $('#lb_23').text("Please Select one of these");
            return;
        }
        if($('#cl1_like').is(':checked')==false && $('#cl2_like').is(':checked')==false ){
            $('#messageSurvey').css("display","block");
            $('#messageSurvey').html("<font color='red'>Please select at least one method</font>");
            $('#lb_13').text("");
            $('#lb_23').text("");
            return;
        }
        if($('#cl1_like').is(':checked')==true && $('#cl2_like').is(':checked')==true ){
            $('#messageSurvey').css("display","block");
            $('#messageSurvey').html("<font color='red'>Please select just one method</font>");
            $('#lb_13').text("");
            $('#lb_23').text("");
            return;
        }
        else{
            $('#messageSurvey').css("display","none");
            $('#id02').css("display","block");
            $('#lb_11').text("");
            $('#lb_12').text("");
            $('#lb_13').text("");
            $('#lb_21').text("");
            $('#lb_22').text("");
            $('#lb_23').text("");
        }
   });
   
   $(document).on("click", "#id02", function(event){
       $('#id02').css("display","none");
       $('.tab-back-nav').trigger('click');
   });
}); */
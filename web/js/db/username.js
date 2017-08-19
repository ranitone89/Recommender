/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function(){
    $("#username_reg").on('change keyup paste', function(){
                var username = $("#username_reg").val();
                if(username == ""){
                    $('#messageRegistration').css("display","block");
                    $('#messageRegistration').html("<font color='red'>Username is required </font>")
                    return;
                }
                $.ajax({
                    url : "UsernameServlet",
                    type : "GET",
                    data : {
                        username : username,
                    },
                    success : function(results){
                        if(results != null && results != ""){
                            showMessage(results);
                            $('#messageRegistration').css("display","block");
                        }else{
                            $('#messageRegistration').css("display","none");
                            $('#messageRegistration').html("");
                        }
                    }
                });
            });
             
            //function to display message to the user
            function showMessage(results){
                if(results == 'SUCCESS'){
                    $('#messageRegistration').html("<font color='red'>Username allready used</font>");
                }else if(results == 'FAILURE'){
                    $('#messageRegistration').html("<font color='green'>Username unique</font>");
                }
        }
});

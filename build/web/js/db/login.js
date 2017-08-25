/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function(){
    $("#login").on('click', function(){
                var username = $("#username").val();
                var password = $("#password").val();
                if(username == ""){
                    $('#messageDiv').css("display","block");
                    $('#messageDiv').html("<font color='red'>Username is required </font>")
                    return;
                }
                if(password == ""){
                    $('#messageDiv').css("display","block");
                    $('#messageDiv').html("<font color='red'>Password is required </font>")
                    return;
                }
                $.ajax({
                    url : "LoginServlet",
                    type : "GET",
                    data : {
                        username : username,
                        password : password
                    },
                    success : function(results){
                        if(results != null && results != ""){
                            showMessage(results);
                            $('#messageDiv').css("display","block");
                        }else{
                            $('#messageDiv').css("display","none");
                            $('#messageDiv').html("");
                            alert("Some exception occurred! Please try again.");
                        }
                    }
                });
            });
             
            //function to display message to the user
            function showMessage(results){
                if(results == 'SUCCESS'){
                    window.location="start.html?username="+$("#username").val();
                }else if(results == 'FAILURE'){
                    $('#messageDiv').html("<font color='red'>Username or password incorrect </font>")
                }
        }
});

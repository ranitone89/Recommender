/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function(){
    $("#submit").on('click', function(){
        var checked = $(".genre input:checked").length > 3;
        
        var genres = [];
        
        var username = $("#username_reg").val();
        var email = $("#email_reg").val();
        var password_1 = $("#password_1_reg").val();
        var password_2 = $("#password_2_reg").val();
        

        if (!checked){
            $('#messageQuastionaire').css("display","block");
            $('#messageQuastionaire').html("<font color='red'>You need to select at leaast 4 genres </font>");
            return;
        }
        else{
            $('.genre input:checked').each(function() {
                genres.push($(this).val());
            });
            alert(genres);
            
            $.ajax({
                url : "RegisterServlet",
                type : "GET",
                data : {
                    username : username,
                    password : password_1,
                    email    : email,
                    genres   : genres
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
        }
    });
    
    //function to display message to the user
    function showMessage(results){
        if(results == 'SUCCESS'){
            window.location="start.html?username="+$("#username_reg").val();
        }else if(results == 'FAILURE'){
            $('#messageDiv').html("<font color='red'>Username or password incorrect </font>")
        }
    }
});


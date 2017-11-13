/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function(){
    $("#register").on('click', function(){
                var username = $("#username_reg").val();
                var email = $("#email_reg").val();
                var password_1 = $("#password_1_reg").val();
                var password_2 = $("#password_2_reg").val();
                var messeageText = $('#messageRegistration').text();
                
                if(username == "" || messeageText=="Username allready used" || messeageText=="Username is required"){
                    $('#messageRegistration').css("display","block");
                    $('#messageRegistration').html("<font color='red'>Username is required</font>")
                    return;
                }
                if(email == ""){
                    $('#messageRegistration').css("display","block");
                    $('#messageRegistration').html("<font color='red'>Email is required</font>")
                    return;
                }
                if(password_1 == ""){
                    $('#messageRegistration').css("display","block");
                    $('#messageRegistration').html("<font color='red'>Password is required</font>")
                    return;
                }
                if(password_2 == ""){
                    $('#messageRegistration').css("display","block");
                    $('#messageRegistration').html("<font color='red'>Please reenter Password</font>")
                    return;
                }
                if(password_2 != password_1){
                    $('#messageRegistration').css("display","block");
                    $('#messageRegistration').html("<font color='red'>Passwords doesn't match </font>")
                    return;
                }
                else{
                    $('#id03').css("display","block");
                }
            });
});


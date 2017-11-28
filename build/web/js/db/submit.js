/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/*$(document).ready(function(){
    
    var username = "";
    var email = "";
    var password_1 = "";
    var password_2 = "";
    var genres = [];
    var actorList = [];
    
    $("#submit1").on('click', function(){
        alert("Submit1");
        var checked = $(".genre input:checked").length > 3;
        
        username = $("#username_reg").val();
        email = $("#email_reg").val();
        password_1 = $("#password_1_reg").val();
        password_2 = $("#password_2_reg").val();
        

        if (!checked){
            $('#messageQuastionaire').css("display","block");
            $('#messageQuastionaire').html("<font color='red'>You need to select at leaast 4 genres </font>");
            return;
        }
        else{
            $('.genre input:checked').each(function() {
                genres.push($(this).val());
                
            });
            $('.formular-container-genre').css("display","none");
            $('.formular-container-actor').css("display","block");
        }
    });
    
    $("#submit2").on('click', function(){
        var actors = removeLastComma($('#favoriteActors').val());
        actorList = covertToArray(actors,'a');
        alert(actors);
        if(actorList.length==0){
             $('#messageQuastionaireActor').css("display","block");
             $('#messageQuastionaireActor').html("<font color='red'>Insert at least the Name of one Actor </font>")
             return;
         }
        
        else{
            $.ajax({
                url : "RegisterServlet",
                type : "GET",
                data : {
                    username : username,
                    password : password_1,
                    email    : email,
                    genres   : genres,
                    actors   : actorList
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
    
    /**
     * 
     * @param {type} array
     * @param {type} string
     * @returns {Array}
     */
    /*function covertToArray(array, string)
    {
        var theArray = '';

        if(string =='a'){
            theArray = array.split(", ");
            for (var i = 0; i < theArray.length; i++) {
                if (theArray[i].length > 0) {
                    var tmp = theArray[i].split(" ");
                    if(tmp.length>=3){
                        if(tmp[tmp.length-1]=="Jr." || tmp[tmp.length-1]=="Sr."){
                            theArray[i] = tmp[1] + " " + tmp[tmp.length-1] + ", " + tmp[0];
                        }
                        if(tmp[1]=="De"){
                            theArray[i] = tmp[1]+ " " +tmp[tmp.length-1]+ ", " + tmp[0];
                        }
                        if(tmp[1].indexOf(".")> -1){
                            theArray[i] = tmp[tmp.length-1]+ ", " + tmp[0]+ " "+tmp[1];
                        }
                    }
                    else{
                        theArray[i] = tmp[tmp.length-1]+ ", " + tmp[0];
                    }
                }
            }

        }

        if(string =='g'){
            theArray = array.split(",");
            for (var i = 0; i < theArray.length; i++) {
                if(theArray[i]!=="") {
                  var tmp = theArray[i];
                  theArray[i] = tmp;
                }
            }
        }

        if(string =='r'){
            theArray = array.split(", ");
            for (var i = 0; i < theArray.length; i++) {
                if(theArray[i]!=="") {
                    var tmp = theArray[i].substring(0, theArray[i].indexOf('('));
                    tmp = tmp.replace('[','');
                    theArray[i] = tmp;
                }
            }
        }

        return unique(removeEmptyElements(theArray));
    }

    /**
     * 
     * @param {type} list
     * @returns {Array}
     */
    /*function unique(list) {
      var result = [];
      $.each(list, function(i, e) {
        if ($.inArray(e, result) == -1) result.push(e);
      });
      return result;
    }

    /**
     * 
     * @param {type} str
     * @returns {unresolved}
     */
    /*function removeLastComma(str) {
       return str.replace(/,(\s+)?$/, '');
    }

    /**
     * 
     * @param {type} array
     * @returns {Array}
     */
    /*function removeEmptyElements(array) {
        var newArray = [];
        for (var i = 0; i < array.length; i++) {
            if (array[i] !== "" && array[i] !== null) {
                newArray.push(array[i]);
            }
        }
        return newArray;
    }    
    
    
    
});*/


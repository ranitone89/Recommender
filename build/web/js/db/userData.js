$(document).ready(function() {
    var ip;
    var genres = [];
    var actorList = [];
    
    /** Get ip adress from user
     * 
     */
    $.getJSON("http://jsonip.com/?callback=?", function (data) {
        ip = data.ip;
        chechLoginData();
        
    });
    
    /* Check if user allready in databaase
     * 
     * @returns {undefined}
     */
    function chechLoginData(){
        $.ajax({
                url : "LoginServlet",
                type : "GET",
                data : {
                    ip : ip
                },
                success : function(response){
                    if(response != null && response != ""){
                        checkMessage(response);
                    }
                }
        });
        
    }
    
    /* Check response of db request
     * 
     * @param {type} response
     * @returns {undefined}
     */
    function checkMessage(response){
        if(response == 'USER EXIST'){
            $('#id05').css("display","block");
        }else if(response == 'NEW USER'){
            $('#id04').css("display","block");
        }
    }
    
    $(document).on("click", "#id04 #infoClose", function(event){
        $('#id03').css("display","block");
    });
    
    /**
     * After favorite genres are entered show actor field
     */
    $("#submit1").on('click', function(){
        var checked = $(".genre input:checked").length > 3;

        if (!checked){
            $('#messageQuastionaire').css("display","block");
            $('#messageQuastionaire').html("<font color='red'>Wählen Sie bitte mindestens vier Genre</font>");
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

    /**
     * After favorite genres are entered show actor field
     */
    $("#submit2").on('click', function(){
        var actors = removeLastComma($('#favoriteActors').val());
        actorList = covertToArray(actors,'a');
        if(actorList.length==0){
             $('#messageQuastionaireActor').css("display","block");
             $('#messageQuastionaireActor').html("<font color='red'>Geben Sie bitte zumindest einen Namen </font>")
             return;
         }
        
        else{
            $('.formular-container-actor').css("display","none");
            $('.formular-container-email').css("display","block");
        }
        
    });    
    
    /** Register user if unique
     * 
     */
    $("#registerUser").on('click', function(){
        var email = $('#email').val();
        if(email.length==0){
             $('#messageQuastionaireEmail').css("display","block");
             $('#messageQuastionaireEmail').html("<font color='red'> Überprüfen Sie ihre E-Mail Adresse</font>");
             return;
         }
        
        else{
            $.ajax({
                url : "RegisterServlet",
                type : "GET",
                data : {
                    ip       : ip,
                    genres   : genres,
                    actors   : actorList,
                    email : email
                },
                success : function(results){
                    if(results != null && results != ""){
                        showMessage(results);
                        $('#messageDiv').css("display","block");
                    }
                }
            });
        }
    });
    
    
    //function to display message to the user
    function showMessage(results){
        if(results != ""){
            window.location="start.html?userId="+results;
        }/*else if(results == ""){
            //$('#messageDiv').html("<font color='red'>Username or password incorrect </font>");
            alert("");
        }*/
    }
    
    /**
     * 
     * @param {type} array
     * @param {type} string
     * @returns {Array}
     */
    function covertToArray(array, string)
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
    function unique(list) {
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
    function removeLastComma(str) {
       return str.replace(/,(\s+)?$/, '');
    }

    /**
     * 
     * @param {type} array
     * @returns {Array}
     */
    function removeEmptyElements(array) {
        var newArray = [];
        for (var i = 0; i < array.length; i++) {
            if (array[i] !== "" && array[i] !== null) {
                newArray.push(array[i]);
            }
        }
        return newArray;
    }    
    
    
    
});


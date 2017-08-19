function search(evt) {
   
   var actors = removeLastComma($('#actors').val());
   var genres = removeLastComma($('.multiSel').text());
   
   var maxReleased = $('#released .range_max').text();
   var minReleased = $('#released .range_min').text();
   var maxLenght = $('#lenght .range_max').text();
   var minLenght = $('#lenght .range_min').text();
   var maxStar = 10;
   var minStar = $('#star .range_star').text();
   
   
    if(actors == ""){
        $('#messageSearch').css("display","block");
        $('#messageSearch').html("<font color='red'>Insert at least the Name of one Actor </font>")
        return;
    }
    if(genres == ""){
        $('#messageSearch').css("display","block");
        $('#messageSearch').html("<font color='red'>Select at least one Genre </font>")
        return;
    }
    else{
        $('#messageSearch').css("display","none");
        var actorList = covertToArray(actors,'a');
        var genreList = covertToArray(genres,'g');
        
        $.ajax({
        url : "SearchServlet",
        type : "GET",
        data : {
            actorList : actorList,
            genreList : genreList,
            maxLenght : maxLenght,
            minLenght : minLenght,
            minReleased : minReleased,
            maxReleased : maxReleased,
            minStar     : minStar
        },
        success : function(results){
            if(results != null && results != "")
            {
                showMessage(results);
                $('#messageSearch').css("display","block");
            }
            else
            {
                $('#messageSearch').css("display","none");
                $('#messageSearch').html("");
                alert("Some exception occurred! Please try again.");
            }
        }
        });
    }     
}


//function to display message to the user
function showMessage(results){
    if(results == 'SUCCESS'){
        alert('Success');
    }else if(results == 'FAILURE'){
        alert('fehler');
    }
}

function covertToArray(array, string) 
{
    var theArray = '';
    
    if(string =='a'){
        theArray = array.split(", ");
        for (var i = 0; i < theArray.length; i++) {
          if (theArray[i].length > 0) {
            var tmp = theArray[i].split(" ");
                theArray[i] = tmp[tmp.length-1]+ ", " + tmp[0];
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
    
    return unique(theArray);
}

function unique(list) {
  var result = [];
  $.each(list, function(i, e) {
    if ($.inArray(e, result) == -1) result.push(e);
  });
  return result;
}

function removeLastComma(str) {
   return str.replace(/,(\s+)?$/, '');   
}
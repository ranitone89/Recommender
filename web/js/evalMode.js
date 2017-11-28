$(document).ready(function() {
    
    var evalIndex = 0;
    var comparIndex = 1;
    
    initEvalMode();
    
    /*SCENARIOS*/
    $("span.add").on('click', function(){
        $('.block:last').before('<div class="block"><input type="text" /><span class="remove">Delete</span></div>');
    });
    
    $(document).on('click','.remove', function(){
        alert("Remove");
        $(this).parent().remove();
    });
    
    
    /*METHODS*/
    $(document).on("click", ".eval_statc", function(event){
            var buttonid = $(this).attr('id');
            var method = $('.evalComparation');
            checkIndexEval(buttonid,method.length);
       });
    
       /*
    * 
    * @param {type} id
    * @param {type} lenght
    * @returns {undefined}
    */
    function checkIndexEval(id,lenght) {
        if(id==="btn_next_eval"){
            if(lenght-1>evalIndex){
                evalIndex = evalIndex+1;
            }
            else{
                evalIndex = evalIndex+0;
            } 
        }
        if(id==="btn_prev_eval"){
            if(evalIndex>0){
                evalIndex = evalIndex-1;
            }
            else{
                evalIndex = 0;
            } 
        }
        setLabelText(evalIndex+1);
        slideComparation(evalIndex);
        
    }
    
    /* Add number of comparation depending on user enter
    * 
    */
    $('#nComparation').change(function(){
        comparIndex = $(this).val();
        removeComparations();
        addComparations(comparIndex);
    });

    /* Add comparations to div
    * 
    * @param {type} id
    * @param {type} lenght
    * @returns {undefined}
    */
    function appendComparations(num) {
        $('.evalSlider').append('<div class="evalComparation"'+ ' id="evalCom'+num+'">'
                          + '<div class="evalMethods" id="evalMeth1">'
                            + '<div class="rowEval"><select class="evalAlg" name="Algorithm">'
                              + '<option value="0">Borda</option>'
                              + '<option value="1">Cluster</option>'
                            + '</select></div>'
                            + '<div class="rowEval"><select class="evalCluster" name="Number of Clusters">'
                              + '<option value="1">1</option>'
                              + '<option value="2">2</option>'
                              + '<option value="3">3</option>'
                              + '<option value="4">4</option>'
                              + '<option value="5">5</option>'
                              + '<option value="6">6</option>'
                              + '<option value="7">7</option>'
                            + '</select></div>'
                            + '<div class="rowEval"><select class="evalDistance" name="Distance">'
                                  +'<option value="0">Euclidean</option>'
                                  +'<option value="1">Canberra</option>'
                                  +'<option value="2">Bray Curtis</option>'
                                  +'<option value="3">Manhattan</option>'
                                +'</select></div>'
                            +'<div class="rowEval">' 
                              +'<select class="evalSorting" name="Sorting">'
                              +'<option value="0">simple initializiation of centroids</option>'
                              +'<option value="1">k-means++</option>'
                            +'</select></div>'
                          +'</div>'+
                        '<div class="evalMethods" id="evalMeth2">'
                          + '<div class="rowEval"><select class="evalAlg" name="Algorithm">'
                            + '<option value="0">Borda</option>'
                            + '<option value="1">Cluster</option>'
                          + '</select></div>'
                          + '<div class="rowEval"><select class="evalCluster" name="Number of Clusters">'
                            + '<option value="1">1</option>'
                            + '<option value="2">2</option>'
                            + '<option value="3">3</option>'
                            + '<option value="4">4</option>'
                            + '<option value="5">5</option>'
                            + '<option value="6">6</option>'
                            + '<option value="7">7</option>'
                          + '</select></div>'
                          + '<div class="rowEval"><select class="evalDistance" name="Distance">'
                                +'<option value="0">Euclidean</option>'
                                +'<option value="1">Canberra</option>'
                                +'<option value="2">Bray Curtis</option>'
                                +'<option value="3">Manhattan</option>'
                              +'</select></div>'
                          +'<div class="rowEval">' 
                            +'<select class="evalSorting" name="Sorting">'
                            +'<option value="0">simple initializiation of centroids</option>'
                            +'<option value="1">k-means++</option>'
                          +'</select></div>'
                          +'</div>'
                    +'</div>');
        showComparation(0);
    }    
    
    function addComparations(comparIndex){
        for(var i =1; i<=comparIndex; i++){
            appendComparations(i);
        }
    }
    function removeComparations(){
        $('.evalSlider').empty();
    }
    
    function showComparation(positionAt){
        $('.evalComparation').eq(positionAt).addClass('active');
    }
    
    function slideComparation(positionAt){
        for(var i =0; i<$('.evalComparation').length; i++){
            $('.evalComparation').eq(i).removeClass('active');
        }
        showComparation(positionAt);
    }
    
    /*
     */
    function initEvalMode(){
        setNumCom(2);
        addComparations(2);
        setLabelText(1);
        initEvalMethods();
    }
    
    /*
     * Algorithmus: 0 Borda, 1 Clustering
     * #Cluster: 1...7
     * Distance: 0 Euclidean, 1 Canberra, 2 Bray Curtis, 3 Manhattan
     * Initialisation: 0 simple initialization of centroids, 1 kmeans++
     * Comparation 1: Borda, Cluster Euclidian
     * Comparation 2: Borda, Cluster Canberra 
     * @returns {jQuery}
     */
    
    function initEvalMethods(){
        /*Init first Comparation*/
        $('#evalCom1 #evalMeth1 .evalAlg').val(0);
        $('#evalCom1 #evalMeth1 .evalCluster').val(3);
        $('#evalCom1 #evalMeth1 .evalDistance').val(0);
        $('#evalCom1 #evalMeth1 .evalSorting').val(0);
        
        $('#evalCom1 #evalMeth2 .evalAlg').val(1);
        $('#evalCom1 #evalMeth2 .evalCluster').val(3);
        $('#evalCom1 #evalMeth2 .evalDistance').val(0);
        $('#evalCom1 #evalMeth2 .evalSorting').val(0);
        
        /*Init second Comparation*/
        $('#evalCom2 #evalMeth1 .evalAlg').val(0);
        $('#evalCom2 #evalMeth1 .evalCluster').val(3);
        $('#evalCom2 #evalMeth1 .evalDistance').val(0);
        $('#evalCom2 #evalMeth1 .evalSorting').val(0);
        
        $('#evalCom2 #evalMeth2 .evalAlg').val(1);
        $('#evalCom2 #evalMeth2 .evalCluster').val(3);
        $('#evalCom2 #evalMeth2 .evalDistance').val(1);
        $('#evalCom2 #evalMeth2 .evalSorting').val(0);
    }
    /*Eval Parameter*/

   
    function setLabelText(value){
        var text = "Comparasion: "+value +" of "+getNumCom();
       $('.compLabels').text(text);
    }

    function getAlgorithmus(){
       var alg = $(".evalAlg").val();
       return alg;
    }
   
    function setAlgorithmus(div, value){
       $(".evalAlg").val(value);
    }
    
    function setNumCom(num){
        $( ".comparation #nComparation" ).val(num);
    }
    
    function getNumCom(){
        return $( ".comparation #nComparation" ).val();
    }
    
    /**/
});

function openEval(evt, cityName) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("evalcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}
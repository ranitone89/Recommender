
/*activeTab, backToTab, TabNavigatio*/
/*Open tab*/
function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
    
    if(tabName == "TopRated"){
        $('#TopRated').children('.Movie').children('.RatedMovie').show();
    }
    
    if(tabName == "New"){
        $('#New').children('.Movie').children('.RatedMovie').show();
    }
    if(tabName == "Cooming"){
        $('#Cooming').children('.Movie').children('.RatedMovie').show();
    }
       
    $('.Movie').show();
    $('.Content').hide();
    $('.tab-back-nav').hide();
    
}

/*Navigate to tab after detail informations*/
function backToTab(evt) {
    alert("backTab");
    var $activeTab = $('.tab-nav li.active');
    var indexActive = $activeTab.index();

    if(indexActive==0){
       document.getElementById("topRated").click();
    }
    
    if(indexActive==1){
       document.getElementById("newMovies").click();
    }
    if(indexActive==2){
       $('#Cooming').show();
    }
}


$(document).ready(function() {   
   /*Tab Navigation*/
   $(document).on("click", ".tab-back-nav", function(event){
        alert("tab-back-nav");
        resetAllTabs();
        var $movie = $(this).closest('.Movie');
        $('.title').css('display', 'none');
        $('.methods').css('display', 'none');
        $('.survey').css('display','none');
        //$('#TopRated').css('display','block');
        
        var $activeTab = $('.tab-nav li.active');
        var indexActive = $activeTab.index();

        if(indexActive==0){
            $('#TopRated').children('.Movie').children('.RatedMovie').show();
            $('#TopRated').css('display','block');
        }
    
        if(indexActive==1){
            $('#New').children('.Movie').children('.RatedMovie').show();
            $('#New').css('display','block');
        }
        
        if(indexActive==2){
            $('#Cooming').children('.Movie').children('.RatedMovie').show();
            $('#Cooming').css('display','block');
        }
        $('.tab-nav').css('display','block');
        $('#Result').css('display','none');
        $('.Movie').css('display','block');
        $('.Content').css('display','none');
        $('.tab-back-nav').css('display','none');
        $('.recom-text').css('display','none');
   });
   
   function resetAllTabs(){
       alert('reset');
       $('#TopRated').css('display','none');
       $('#New').css('display','none');
       $('#Cooming').css('display','none');
   }

    /*Generated Movie Detail*/
    $(document).on("click", ".detailLink", function(event){
        var $movie = $(this).closest('.Movie');
        $(".Movie").not($movie).hide();
        $(this).closest('.Movie').children('.Content').show();
        $(this).closest('.Movie').children('.RatedMovie').hide();
        $('.tab-back-nav').show();
   });
}); 

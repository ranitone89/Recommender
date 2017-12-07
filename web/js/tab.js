
/*activeTab, backToTab, searchTab*/
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
        $(document).on("click", ".tab-back-nav", function(event){
        var $movie = $(this).closest('.Movie');
        $('.title').css('display', 'none');
        $('.methods').css('display', 'none');
        $('.survey').css('display','none');
        $('#TopRated').css('display','block');
        
        var $activeTab = $('.tab-nav li.active');
        var indexActive = $activeTab.index();

        if(indexActive==0){
        $('#TopRated').children('.Movie').children('.RatedMovie').show();
        $('#TopRated').show();
        }
    
        if(indexActive==1){
        $('#New').children('.Movie').children('.RatedMovie').show();
        $('#New').show();
        }
        
        if(indexActive==2){
            $('#Cooming').children('.Movie').children('.RatedMovie').show();
            $('#Cooming').show();
        }
        $('.tab-nav').show();
        $('#Result').hide();
        $('.Movie').show();
        $('.Content').hide();
        $('.tab-back-nav').hide();
        $('.recom-text').hide();
   });
}); 
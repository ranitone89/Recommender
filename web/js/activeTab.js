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
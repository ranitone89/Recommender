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

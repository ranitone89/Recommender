function backToTab(evt) {
    var $activeTab = $('.tab-nav li.active');
    var indexActive = $activeTab.index();
    alert(indexActive);
       
    if(indexActive==0){
       alert('TopRated zuruck');
       document.getElementById("topRated").click();
    }
    
    if(indexActive==1){
       alert('New zuruck');
       document.getElementById("newMovies").click();
    }
    if(indexActive==2){
       alert('Cooming');
       $('#Cooming').show();
    }
}

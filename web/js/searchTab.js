$(document).ready(function() {
    var clusterClicked = false;
    $(document).on("click", ".button-container .open", function(event){
        $(this).removeClass("open");
        $(this).addClass("closee");
        $('.search').hide();
        $('.search-tab-close').hide();
   });
   
    $(document).on("click", ".button-container .closee", function(event){
        $(this).removeClass("closee");
        $(this).addClass("open");
        $('.search').show();
        $('.search-tab-close').show();
        if(clusterClicked==false){
           $('.clusterbtn').trigger('click');
           clusterClicked=true;
        }

   });
   
   $(document).on("click", ".search-tab-close", function(event){
        $('.button-container .open').trigger("click");
   });
}); 

$(document).ready(function() {    
    $(document).on("click", ".button-container .open", function(event){
        $(this).removeClass("open");
        $(this).addClass("closee");
        $('.search').show();
        $('.search-tab-close').show();
   });
   
    $(document).on("click", ".button-container .closee", function(event){
        $(this).removeClass("closee");
        $(this).addClass("open");
        $('.search').hide();
        $('.search-tab-close').hide();
   });
}); 

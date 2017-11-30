$(document).ready(function() {
    var clusterClicked = false;
    $(document).on("click", ".button-container .open", function(event){
        if ( $(this).hasClass('active')==false){
            $(this).removeClass("open");
            $(this).addClass("closee");
            $('.search').hide();
            $('.search-tab-close').hide();
        }
   });
   
    $(document).on("click", ".button-container .closee", function(event){
        if ( $(this).hasClass('active')==false){
            $(this).removeClass("closee");
            $(this).addClass("open");
            $('.search').show();
            $('.search-tab-close').show();

            if(clusterClicked==false){
               $('.clusterbtn').trigger('click');
               clusterClicked=true;
            }
        }
   });
   
   $(document).on("click", ".search-tab-close", function(event){
        $('.button-container .open').trigger("click");
        $('.clusterbtn').css("display","block");
   });
   $(document).on("click","#newBtn", function(event){
        $('#defineBtn').css("display","block"); 
        $('.clusterbtn').css("display","none");
        $('.search-tab-eval').css("display","block");
   });
   
   $(document).on("click","#defineBtn", function(event){
        $('.clusterbtn').css("display","block");
        $('.search-tab-eval').css("display","none");
        $('#defineBtn').css("display","none"); 
   });

    $(document).on("click",".search-tab-eval-close", function(event){
        $('.search-tab-eval').css("display","none");
   });
}); 



$(document).ready(function() {
    //getScenariosDB();
    
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
   
   $(document).on("click", ".search .search-tab-close", function(event){
        $('.button-container .open').trigger("click");
        $('.clusterbtn').css("display","block");
   });
   $(document).on("click","#newBtn", function(event){
        
        $('#ScenarioDetail').css("display","block");
        $('#id01 .tab').css("display","block");
        $('#id01 .search-tab').css("display","block");
        $('#defineBtn').css("display","block"); 
        $('.clusterbtn').css("display","none");

        openEval(event, 'EvalMethod');

   });
   
    $(document).on("click","#id01 .search-tab-close", function(event){
        $('.clusterbtn').css("display","block");
        $('#defineBtn').css("display","none");
        $('#ScenarioDetail').css("display","none");
        $('#defaultEval').trigger('click');
   });
   
    function removeLastComma(str) {
       return str.replace(/,(\s+)?$/, '');
    }
    
   /*CloseSearch*/
   $(document).on("click", ".search .search-tab-close", function(event){
        $('.search').hide();
        $('.search .search-tab-close').hide();
   });
   

}); 

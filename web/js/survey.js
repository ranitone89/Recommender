
$(document).ready(function() {
    
    $(document).on("click", ".title .more", function(event){
        $(this).removeClass("more");
        $(this).addClass("less");
        $('.question_icon').attr('src',"img/minus_default.png");
        $('.question_icon_hover').attr('src',"img/minus.png");
        $('.more_details').toggle().css('display','block');
        
   });
   
    $(document).on("click", ".title .less", function(event){
        $(this).removeClass("less");
        $(this).addClass("more");
        $('.question_icon').attr('src',"img/add_default.png");
        $('.question_icon_hover').attr('src',"img/add.png");
        $('.more_details').hide();
        
   });
   
   
}); 

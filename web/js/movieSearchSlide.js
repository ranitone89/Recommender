
$(document).ready(function() {
    var slideIndex = 0;
    
    $(document).on("click", ".btn", function(event){
        var id = $(this).attr('id');
        var sliderWidth = 90;
        var slider = $('#Result');
        var lenght = slider.length;
        alert(lenght);
        
        if(id=="btn_prev"){
            alert(id);
            slideIndex -=1;
        }
        if(id=="btn_next"){
            alert(id);
            slideIndex +=1;
        }
        $('#Result').eq(slideIndex).hide(400);
   });
}); 

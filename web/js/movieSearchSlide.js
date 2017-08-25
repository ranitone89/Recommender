$(document).ready(function() {
    var slideIndex = 0;
    $(document).on("click", ".btn", function(event){
        var id = $(this).attr('id');
        var slider = $('#Result .Movie');
        var lenght = slider.length;

        checkIndex(id,lenght);
        slide(slider,lenght);
   });
   
    /**
     * Check Index 
     */
    function checkIndex(id,lenght) {
        if(id=="btn_prev"){
            if(slideIndex<=0){
                slideIndex = 0;
            }
            else{
                slideIndex = slideIndex-1;
            }
        }
        if(id=="btn_next"){
            if(slideIndex>=(lenght-6)){
                slideIndex = (lenght-6);
            }
            else{
                slideIndex = slideIndex+1;
            }
        }
    }
    /**
     * Slide movies in intervall
     */
    function slide(slider,lenght) {
        var i;
        for(i=0; i<lenght;i++ ){
            $(slider).eq(i).addClass('hide');
        }
        for(i=slideIndex; i<(slideIndex+6);i++ ){
            $(slider).eq(i).removeClass('hide'); 
        }
    }
}); 


$(document).ready(function() {
    $(document).on("click", ".RatedMovie img", function(event){
        var $movie = $(this).closest('.Movie');
        $(".Movie").not($movie).hide();
        $(this).closest('.Movie').children('.Content').show();
        $(this).closest('.Movie').children('.RatedMovie').hide();
        $('.tab-back-nav').show();
   });
}); 

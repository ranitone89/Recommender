/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function() {
    $(document).on("click", ".detailLink", function(event){
        var $movie = $(this).closest('.Movie');
        $(".Movie").not($movie).hide();
        $(this).closest('.Movie').children('.Content').show();
        $(this).closest('.Movie').children('.RatedMovie').hide();
        $('.tab-back-nav').show();
   });
}); 

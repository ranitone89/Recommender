/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function() {
    $(document).on("click", ".search .search-tab-close", function(event){
        $('.search').hide();
        $('.search .search-tab-close').hide();
   });
}); 

$(document).ready(function() {
    $(document).on("click", ".statistics-close", function(event){
        $('.cluster2').css('display','block');
        $('#method2').css('display','block');
        $('#statistics #statcs_cl2').css('display', 'none');
        $('#statistics #statcs_cl1').css('display', 'none');
        $('#statistics #statcs_cl3').css('display', 'none');
        $('#statistics').css('display', 'none');
   });
}); 

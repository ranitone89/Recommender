/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/* global noUiSlider */

$(document).ready(function() {
    var released;
    var releasedText = [
	$('#released_slider .range_min'), // 0
	$('#released_slider .range_max')  // 1
    ];    
    var lenght;
    var lenghtText = [
	$('#lenght_slider .range_min'), // 0
	$('#lenght_slider .range_max')  // 1
    ];
    
    var rating;   
    
    createSiders();
    /*Lenght Range Ranking slider*/
    $('#star1').prop('checked', true); 
    
 
    /************************* Actor Field *************************************/
    $("#actors").on('change keyup paste', function(){
        var OriginalHeight = $(".dropdown").height();
        if (!$.trim($(this).val())) {
            $(this).css('height','');
            $('.dropdown dt a').css('min-height','');
            $(this).css('padding','13 19 12 10');
        }
        else{
            $(this).css('height','auto');
            $(this).height(this.scrollHeight-15);
            $('.dropdown dt a').css('min-height',this.scrollHeight-15);
        }
        $("#actors").attr('rows', '1');
    });
    
    $("#favoriteActors").on('change keyup paste', function(){
        var OriginalHeight = $(".dropdown").height();
        if (!$.trim($(this).val())) {
            $(this).css('height','');
            $('.dropdown dt a').css('min-height','');
            $(this).css('padding','13 19 12 10');
        }
        else{
            $(this).css('height','auto');
            $(this).height(this.scrollHeight-15);
            $('.dropdown dt a').css('min-height',this.scrollHeight-15);
        }
        $("#favoriteActors").attr('rows', '1');
    });
    
    /******************************* Genre Boxes *************************************/
    $(document).on("click", ".dropdown dt a", function(event){
        $(".dropdown dd ul").slideToggle('fast');
    });

    $(document).on("click", ".dropdown dd ul li a", function(event){
        $(".dropdown dd ul").hide();
    });

    function getSelectedValue(id) {
         return $("#" + id).find("dt a span.value").html();
    }

    $(document).bind('click', function(e) {
      var $clicked = $(e.target);
      if (!$clicked.parents().hasClass("dropdown")){
            $(".dropdown dd ul").hide();
      }
    });


    $(document).on('click', '.mutliSelect input[type="checkbox"]', function(event){
        var title = $(this).closest('.mutliSelect').find('input[type="checkbox"]').val(),title = $(this).val() + ",";
        var genreLengt = $('.multiSel').children().length;
        var genreEmpty = (genreLengt == 1);
        var genreHeight = 0;
        
        if ($(this).is(':checked')) {
          var html = '<span title="' + title + '">' + title + '</span>';
          $('.multiSel').append(html);
          $(".hida").hide();
          genreHeight = $(".dropdown").height();
        } 
        else {
            if(genreEmpty){
                $(".hida").show();
                $('#actors').css('height','');
                $(this).css('min-height','25');
            }
            $('span[title="' + title + '"]').remove();
            var ret = $(".hida");
            $('.dropdown dt a').append(ret);
            genreHeight = $(".dropdown").height();
          }
          $('#actors').css('height',genreHeight);
    });
    
 
    /************************Ranking*******************************/
    $(document).on("click", ".rating input", function(event){
        var value = $(this).val();
        var range_star = $('.range_star');

        if (value<10) {
            $(range_star).html(value);
            rating.noUiSlider.set([value, null]);
        }
        if(value == 10){
            var defVal = 9; 
            $('#star' + defVal).prop('checked', true); 

            $(range_star).html(defVal);
            rating.noUiSlider.set([defVal, null]);
        }
        
        /******************* On star click ***************/
        for (var i = 0; i <value; i++) {
            alert(i);
            $('#star' + i).prop('checked', false); 
        }
        
    });
    

    /**
     * If Actor search enabled
     */
    $(document).on("click",".searchParameter input[name=actor]", function(){       
        var checked = $(this).is(":checked");
        if(checked==true){
            enableActor();
        }
        else{
            disableActor();
        }
    });
    

    $(document).on("click",".searchParameter input[name=genre]", function(){       
        var checked = $(this).is(":checked");
        if(checked==true){
            enableGenre();
        }
        else{
            disableGenre();
        }
    });
    
    $(document).on("click",".searchParameter input[name=lenght]", function(){       
        var checked = $(this).is(":checked");
        if(checked==true){
            enableLenght();
        }
        else{
            disableLenght();
        }
    });
    
    /**
     * Rating enable 
     */
    $(document).on("click",".searchParameter input[name=rating]", function(){       
        var checked = $(this).is(":checked");
        if(checked==true){
            enableRanking();
        }
        else{
            disableRanking();
        }
    });    
    
    /**
     * Year enable
     */
    $(document).on("click",".searchParameter input[name=year]", function(){       
        var checked = $(this).is(":checked");
        if(checked==true){
            enableRealeaseYear();
        }
        else{
            disableRealeaseYear();
        }    
    });
    
    
    /**
     * enable and disable actor
     * @returns {undefined}
     */
    function enableActor(){
        $("#actors").prop('disabled',false);
        $('#actors').css('background-color' , '');
    }
    function disableActor(){
        $("#actors").prop('disabled',true);
        $('#actors').css('background-color' , '#DEDEDE');
    }

    /*
     * eanable and disable genre 
     * @returns {undefined}
     */
    function enableGenre(){
        $(".dropdown dt a").prop('disabled',false);
        //$(".dropdown dd ul li a").prop('disabled',true);
        $('.dropdown dt a').css('background-color' , '');
    }
    function disableGenre(){
        $(".dropdown dt a").prop('disabled',true);
        //$(".dropdown dd ul li a").prop('disabled',true);
        $('.dropdown dt a').css('background-color' , '#DEDEDE');
    }

    /*
     * eanable and disable release year 
     * @returns {undefined}
     */
    function enableRealeaseYear(){
        released.removeAttribute('disabled');
    }
    function disableRealeaseYear(){
        released.setAttribute('disabled', true);
    }
    /*
     * eanable and disable release lenght 
     * @returns {undefined}
     */    
    function enableLenght(){
        lenght.removeAttribute('disabled');
    }
    function disableLenght(){
        lenght.setAttribute('disabled', true);
    }
    
    /*
     * eanable and disable release rating 
     * @returns {undefined}
     */   
    function enableRanking(){
        rating.removeAttribute('disabled');
        $(".rating").children().prop('disabled',false);
        $(".rating").css('background-color' , '');
    }    
    function disableRanking(){
        rating.setAttribute('disabled', true);
        $(".rating").children().prop('disabled',true);
        $(".rating").css('background-color' , '#DEDEDE');
    }
    
    /**
     * Create range slider for movie lenght, released year and rating
     * @returns {undefined}
     */
    function createSiders(){
        //lenght slider range
        lenght = document.getElementById('lenght');

        noUiSlider.create(lenght, {
                start: [60, 240],
                step: 15,
                connect: true,
                range: {
                        'min': 60,
                        'max': 240
                }
        });
        
        //lenght slider range
        released = document.getElementById('released');

        noUiSlider.create(released, {
                start: [1970, 2017],
                step: 1,
                connect: true,
                range: {
                        'min': 1970,
                        'max': 2017
                }
        });        

        //lenght slider range
        rating = document.getElementById('star');

        noUiSlider.create(rating, {
                start: 0,
                step: 1,
                connect: [false, true],
               
                range: {
                        'min': 0,
                        'max': 9
                }
        });  
    }
     
    lenght.noUiSlider.on('update', function( values, handle ){
        lenghtText[handle].html(Math.round(values[handle]));
    });
    
    released.noUiSlider.on('update', function( values, handle ){
        releasedText[handle].html(Math.round(values[handle]));
    });
    
    rating.noUiSlider.on('update', function( values, handle ){
        $('#star_slider .range_star').html(Math.round(values[handle]));
        
        for (var i = 0; i <Math.round(values[handle]); i++) {
            $('#star' + Math.round(values[handle])).prop('checked', false); 
        }
        
        for (var i = Math.round(values[handle]); i <=10; i++) { 
            $('#star' + Math.round(values[handle])).prop('checked', true); 
        }
        
    });

}); 


/*activeTab, backToTab, TabNavigatio*/
/*Open tab*/
function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
    
    if(tabName == "TopRated"){
        $('#TopRated').children('.Movie').children('.RatedMovie').show();
    }
    
    if(tabName == "New"){
        $('#New').children('.Movie').children('.RatedMovie').show();
    }
    if(tabName == "Cooming"){
        $('#Cooming').children('.Movie').children('.RatedMovie').show();
    }
       
    $('.Movie').show();
    $('.Content').hide();
    $('.tab-back-nav').hide();
    
}

/*Navigate to tab after detail informations*/
function backToTab(evt) {
    var $activeTab = $('.tab-nav li.active');
    var indexActive = $activeTab.index();

    if(indexActive==0){
       document.getElementById("topRated").click();
    }
    
    if(indexActive==1){
       document.getElementById("newMovies").click();
    }
    if(indexActive==2){
       $('#Cooming').show();
    }
}


$(document).ready(function() {
    
    /*Search Tab*/
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
        $('#id01 .tab').css("display","block");
        $('#id01 .search-tab').css("display","block");
        $('#defineBtn').css("display","block"); 
        $('.clusterbtn').css("display","none");
        $('#id01 .tab').css("display","block");
        $('.scen_param').css("display","block");
        $('.scen_desc').css("display","block");
        $('hr').css("display","block");
        $('#description').css("display","block");
        $('.searchParameter').css("display","block");
        $('.search_param').css("display","block");
   });
   
   $(document).on("click","#id01 .search-tab-close", function(event){
        $('.clusterbtn').css("display","block");
        $('#defineBtn').css("display","none");
        $('#id01 .tab').css("display","none");
        $('#messageEval').css("display","none");
        $('.scen_param').css("display","none");
        $('.scen_desc').css("display","none");
        $('hr').css("display","none");
        $('#description').css("display","none");
   });
   
   /*Tab Navigation*/
   $(document).on("click", ".tab-back-nav", function(event){
        var $movie = $(this).closest('.Movie');
        $('.title').css('display', 'none');
        $('.methods').css('display', 'none');
        $('.survey').css('display','none');
        $('#TopRated').css('display','block');
        
        var $activeTab = $('.tab-nav li.active');
        var indexActive = $activeTab.index();

        if(indexActive==0){
        $('#TopRated').children('.Movie').children('.RatedMovie').show();
        $('#TopRated').show();
        }
    
        if(indexActive==1){
        $('#New').children('.Movie').children('.RatedMovie').show();
        $('#New').show();
        }
        
        if(indexActive==2){
            $('#Cooming').children('.Movie').children('.RatedMovie').show();
            $('#Cooming').show();
        }
        $('.tab-nav').show();
        $('#Result').hide();
        $('.Movie').show();
        $('.Content').hide();
        $('.tab-back-nav').hide();
        $('.recom-text').hide();
   });
   
   /*CloseSearch*/
   $(document).on("click", ".search .search-tab-close", function(event){
        $('.search').hide();
        $('.search .search-tab-close').hide();
   });
   
   $(document).on("click", ".statistics-close", function(event){
        $('.cluster2').css('display','block');
        $('#method2').css('display','block');
        $('#statistics #statcs_cl2').css('display', 'none');
        $('#statistics #statcs_cl1').css('display', 'none');
        $('#statistics #statcs_cl3').css('display', 'none');
        $('#statistics').css('display', 'none');
   });
   
}); 

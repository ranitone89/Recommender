function openEval(evt, cityName) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}

/*$('.add').on('click', function(){
    alert("Add");
}
$('.remove').on('click', function(){
    alert("Remove");
});*/


/*

$('.add').click(function() {
    alert("Remove");
    $('.block:last').before('<div class="block"><input type="text" /><span class="remove">Remove Option</span></div>');
});*/
/*$('.optionBox').on('click','.remove',function() {
    alert("Remove");
    $(this).parent().remove();
});*/
$(document).ready(function(){
    $("span.add").on('click', function(){
        $('.block:last').before('<div class="block"><input type="text" /><span class="remove">Delete</span></div>');
    });
});

$(document).on('click','.remove', function(){
    alert("Remove");
    $(this).parent().remove();
});
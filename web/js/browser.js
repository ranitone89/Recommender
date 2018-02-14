(function (global) {

	if(typeof (global) === "undefined")
	{
		throw new Error("window is undefined");
	}

    var _hash = "!";
    var noBackPlease = function () {
    	global.location.href += "#";

		// making sure we have the fruit available for juice....
		// 50 milliseconds for just once do not cost much (^__^)
        global.setTimeout(function () {
        	global.location.href += "!";
        }, 50);
    };
	
	// Earlier we had setInerval here....
    global.onhashchange = function () {
        if (global.location.hash !== _hash) {
            global.location.hash = _hash;
        }
    };
    
    
   
    
    
    global.onload = function () {    
		noBackPlease();		
    };
    
    global.onkeydown = function(e) {
        // keycode for F5 function
        if (e.keyCode === 116) {
          return false;
        }
        // keycode for backspace
        if (e.keyCode === 8) {
          // try to cancel the backspace
          return false;
        }
      };

})(window);


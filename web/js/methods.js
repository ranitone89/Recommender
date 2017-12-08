    /*Resize div which contains method
     * 
     */
    methodObject.resizeMethod = function(method, width){
        $('.Method'+method).css('width',''+width); 
    };
    
     /* Check id of method
     * 
     */
    methodObject.checkMethod = function(method) {
        alert("Cheeck method");
        var method = parseInt(method.replace(/Method/, ''))-1;
        return method;
    }
    
    methodObject.delDivContent = function(){
        $('.Method1').empty();
        $('.Method2').empty();
        $('.Statistics1').empty();
        $('.Statistics2').empty();
    }
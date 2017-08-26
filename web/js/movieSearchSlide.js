$(document).ready(function() {
    var slideIndex = [[0, 0, 0],[0, 0,0]];
    var focus = 6;
    
    $(document).on("click", ".btn", function(event){
        var buttonid = $(this).attr('id');
        var cluster = $(this).parents().eq(1).attr('class');
        var row = $(this).parents().eq(0).attr('id');
        var slider = $('.'+cluster+' #'+row+' .Movie');

        var lenght = slider.length;
        cluster = checkCluster(cluster);
        row = checkRow(row);
        //alert("C"+cluster+' Row'+row);
        checkIndex(buttonid,lenght,cluster,row);
        slide(slider,lenght,cluster,row);
   });
   
    /**
     * Check Index 
     */
    function checkIndex(id,lenght,cluster,row) {
        if(id=="btn_prev"){

            if(slideIndex[cluster][row]<=0){
                slideIndex[cluster][row] = 0;
            }
            else{
                slideIndex[cluster][row] = slideIndex[cluster][row]-1;
            }
        }
        if(id=="btn_next"){
            if(slideIndex[cluster][row]>=(lenght-focus)){
                slideIndex[cluster][row] = (lenght-focus);
            }
            else{
                slideIndex[cluster][row] = slideIndex[cluster][row]+1;                
            }
        }
    }
    /**
     * Slide movies in intervall
     */
    function slide(slider,lenght,cluster,row) {
        var i;

        for(i=0; i<lenght;i++ ){
            $(slider).eq(i).addClass('hide');
        }
 
        for(i=slideIndex[cluster][row]; i<(slideIndex[cluster][row]+focus);i++ ){
            $(slider).eq(i).removeClass('hide'); 
        }
    }
    
    /**
     * Cluster
     */
    function checkCluster(cluster) {
        var cluster = parseInt(cluster.replace(/cluster/, ''))-1;
        return cluster;

    }
     /**
     * Row
     */
    function checkRow(row) {
        var r = parseInt(row.replace(/Row/, ''))-1;
        return r;
    }
}); 

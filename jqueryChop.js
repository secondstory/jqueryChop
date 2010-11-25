(function($) {

$.imageSquareToCanvas = function(imageElem, posX, posY, boxWidth, boxHeight) {
  if ((posX + boxWidth) > imageElem.width) {
    boxWidth = imageElem.width - posX;
  }
  
  if ((posY + boxHeight) > imageElem.height) {
    boxHeight = imageElem.height - posY;
  }
  
  var canvasEl    = document.createElement('canvas');
  canvasEl.width  = boxWidth;
  canvasEl.height = boxHeight;
  
  canvasEl.getContext('2d').drawImage(imageElem,
    posX,     posY,       // Start X/Y
    boxWidth, boxHeight,  // Width/Height
    0,        0,          // Draw at destination X/Y
    boxWidth, boxHeight); // Scale X/Y
  
  return canvasEl;
},
  
$.chop = function(imageElem, boxWidth, boxHeight) {
  var results = [];

  var totalHeight = 0, i = 0;
  while (totalHeight < imageElem.height) {
    var yOffset = i * boxHeight;
    var totalWidth = 0, j = 0;
    
    while (totalWidth < imageElem.width) {
      var xOffset = j * boxWidth;
      
      var elem = $.imageSquareToCanvas(
        imageElem,
        xOffset,
        yOffset,
        boxWidth, 
        boxHeight
      );
      
      $(elem).css({
        position: 'absolute',
        left: xOffset,
        top:  yOffset
      });
      
      results.push(elem);
      
      totalWidth += boxWidth;
      j++;
    }
    
    totalHeight += boxHeight;
    i++;
  }
  
  return results;
}

$.fn.squares = function(x, y) {
  this.each(function() {
    var container = $("<div />").css({ 
      position: 'relative',
      width:    this.width,
      height:   this.height
    }).append($.chop(this, x, y));
    
    $(this).replaceWith(container);
  });
};

$.fn.ribbons = function(x) {
  this.each(function() {
    $(this).squares(x, this.height);
  });
};

})(jQuery);

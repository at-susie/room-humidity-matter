

// Socket
$(function () {
  var socket = io();
  
  socket.on('tempLevel', function(tempLevel){
    //console.log("The temp is!!!" + tempLevel);

    if (tempLevel >= 15) {
      $("body").css("background", "Orange");
    } else if (tempLevel > 30) {
      $("body").css("background", "Red");
    } else if (tempLevel < 15) {
      $("body").css("background", "yellow");
    } else if (tempLevel < 7) {
      $("body").css("background", "blue");
    }

  });
});
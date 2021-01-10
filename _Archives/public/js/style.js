

// Socket
$(function () {
  var socket = io();
  
  socket.on('tempLevel', function(tempLevel){
    console.log("The humidity level is!!!" + tempLevel);

    if (tempLevel >= 20) {
      $("body").css("background", "Orange");
    } else if (tempLevel > 30) {
      $("body").css("background", "Red");
    } else if (tempLevel < 20) {
      $("body").css("background", "yellow");
    } else if (tempLevel < 10) {
      $("body").css("background", "blue");
    }

  });
});
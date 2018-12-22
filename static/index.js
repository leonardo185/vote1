document.addEventListener('DOMContentLoaded', ()=>{

  //Connect to the websocket.
  var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);

  //When connected configure buttons.
  socket.on('connect', ()=>{

    //Each button should should emit a "submit vote" event.
    document.querySelectorAll('button').forEach(button=>{
      button.onclick = ()=>{
        const selection = button.dataset.vote;
        socket.emit('submit vote',{'selection':selection});
      }
    });
  })





});

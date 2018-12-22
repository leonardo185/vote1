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
  });

  //When a vote is announced, add to the counter.
  socket.on('vote totals', data=>{
    //Update the value of votes in the client side.
    documnet.querySelector('#yes').innerHTML = data.yes;
    documnet.querySelector('#no').innerHTML = data.no;
    documnet.querySelector('#maybe').innerHTML = data.maybe;
  });



});

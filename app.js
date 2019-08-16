var socket = io.connect();

function start(){
  anime({
    targets: '.far',
    rotateZ: '-30deg',
    easing: 'easeOutElastic',
    duration: 2000,
    delay: anime.stagger(200, {easing: 'easeOutQuad'})
  });
}



$('#createbutton').on('click', () => {
  var username = $('#username-c').val();
  socket.emit('createRoom', {name: username});
});

$('#joinbutton').on('click', () => {
  var username = $('#username-j').val();
  var roomcode = $('#roomcode-j').val();
  socket.emit('joinRoom', {name: username, roomCode: roomcode});
});

socket.on('newRoom', (data) => {
  $('.container').hide();
  $('.game-container').show();
  $('#player1name').html(data.name);
  $('#roomname').html(data.roomCode);
});

socket.on('codeError', () =>{
  alert("Room Code doesn't exist");
});


socket.on('host', (data) =>{
  alert(data.player2 + " joined the room");
  $('#player2name').html(data.player2);
});

socket.on('guest', (data) =>{
  $('.container').hide();
  $('.game-container').show();
  $('#player1name').html(data.player1);
  $('#roomname').html(data.roomCode);
  $('#player2name').html(data.player2);
});

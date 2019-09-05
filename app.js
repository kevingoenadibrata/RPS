var socket = io.connect();
var roomcode = '';

const ROCK_ID = 0;
const PAPER_ID = 1;
const SCISSORS_ID = 2;

var decision = -1;
var p1Ready = false;
var p2Ready = false;

const P1_ID = 0;
const P2_ID = 1;


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
  roomcode = $('#roomcode-j').val();
  socket.emit('joinRoom', {name: username, roomCode: roomcode});
});

socket.on('newRoom', (data) => {
  $('.container').hide();
  $('.game-container').show();
  $('#player1name').html(data.name);
  $('#roomname').html(data.roomCode);
  roomcode = data.roomCode;
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
  roomcode = data.roomCode
});



/* down here not working */

$('.fa-hand-peace').on('click', () => {
  io.to(roomcode).emit('decision_made');
  p1Ready = true;
  decision = SCISSORS_ID;

  if(p2Ready){
    io.to(roomcode).emit('results', decision);
  }
});

$('.fa-hand-rock').on('click', () => {
  io.to(roomcode).emit('decision_made');
  p1Ready = true;
  decision = ROCK_ID;

  if(p2Ready){
    io.to(roomcode).emit('results', decision);
  }
});

$('.fa-hand-paper').on('click', () => {
  io.to(roomcode).emit('decision_made');
  p1Ready = true;
  decision = PAPER_ID;

  if(p2Ready){
    io.to(roomcode).emit('results', decision);
  }
});


socket.on('decision_made', () => {
  p2Ready = true;
  if(p1Ready){
    io.to(roomcode).emit('results', decision);
  }
});

socket.on('results', (data) => {
  var winner = -1;
  if(data == ROCK_ID && decision == PAPER_ID) winner = P1_ID;
  else if(data == SCISSORS_ID && decision == PAPER_ID) winner = P2_ID;
  else if(data == PAPER_ID && decision == SCISSORS_ID) winner = P1_ID;
  else if(data == ROCK_ID && decision == SCISSORS_ID) winner = P2_ID;
  else if(data == SCISSORS_ID && decision == ROCK_ID) winner = P1_ID;
  else if(data == PAPER_ID && decision == ROCK_ID) winner = P2_ID;

  var ret_obj = {};
  ret_obj.winner = winner;
  ret_obj.p1 = data;
  ret_obk.p2 = decision;
  io.to(roomcode).emit('winner', ret_obj);
});


socket.on('winner', (data) => {
  console.log(data);
})

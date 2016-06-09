var connect = require('connect');
var io = require('socket.io');
var handle = require('./checkersHandler');
var plyrcnt;


var app = connect().use(connect.static('public')).listen(3000);
var GameRoom = io.listen(app);

GameRoom.sockets.on('connection', function(socket){
	
	
	//add players 
	socket.on('addPlayer', function(username){
		socket.username= username;
	 	plyrcnt = handle.playersHandler(socket.username);				
		socket.emit('iAmPlyr', {message: plyrcnt});
		
	});	

	socket.on('disconnect', function(){
		console.log("disconnect", socket.username);
		handle.removePlyr(socket.username);
	});	
	
	
	socket.on('move', function(data){		
		handle.movesHandler(data, GameRoom, socket);		
	});

	socket.on('resetBoard', function(){
		handle.resetServerBoard();
		GameRoom.sockets.emit('resetBoard');

	});

	
	

});
console.log("Node server is running..."); 
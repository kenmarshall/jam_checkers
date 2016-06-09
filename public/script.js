$(document).ready(function() {


	
	var canv = $("#canvas").get(0);
	var body = $("#pageBody").get(0);
	var button =$("#button").get(0);
	//var socket = io.connect('localhost:3000');
	body.onselectstart = function () { return false; }
	
	var stage = new createjs.Stage(canv);
	var key = new createjs.Bitmap("Keys.svg")
	stage.x = 250;
	stage.y = 250;
	stage.regX = 250;
	stage.regY = 250;

	stage.addChild(key);
	var board;
	
	
	
	
	//var iAmPlyr = 1;
	//socket.emit('move', {message: "hello"});

	

	

	/*socket.on('connect', function(){
		console.log("connect");
		socket.emit('addPlayer', prompt("What's your name?","player 1"));		
		socket.on('iAmPlyr', function(data){
			console.log(data.message, "iAmPlyr");
			board = new Board(data.message);			
			board.setupBoard(socket, data.message);
			//board.removePiece(7,7);
			stage.addChild(board);	

		
		});
		//console.log(test, "test in script");
		
	});

	socket.on('move', function(data){
		console.log("script on move", data.message[0], data.message[1] ,data.message[2], data.message[3] );
		
		board.update(data.message[0], data.message[1], data.message[2], data.message[3], data.message[4],data.message[5],data.message[6]);

	});

	socket.on('resetBoard', function(){
		console.log("resetBoard");
		board.resetBoard();
		
		

	});


	socket.on('noMove', function(data){
		console.log("script on nomove", data.message[0], data.message[1] ,data.message[2], data.message[3] );
		board.update( data.message[0], data.message[1], data.message[2], data.message[3]);
	});

	button.onclick = function(){
		
		socket.emit('resetBoard');
		

	}*/

	
		
	createjs.Ticker.setFPS(30);
	createjs.Ticker.addListener(function(){
		//stage.rotation += 8;
		stage.update();
	});

});
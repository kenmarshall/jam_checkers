// this mod handles data from clients through websockets
var gameEngine = require('./checkersMod');
var coord = require('./coord');
var players ={};
var i = 0;
var movesInfo;
var plyrObjArry = new Array();

function movesHandler(data, GameRoom, socket){
	//creates coordinates from the data via sockets
	var from = coord(data.message[0],data.message[1]);
	var to =  coord(data.message[2],data.message[3]);

	movesInfo = gameEngine.move(from, to);
	
	if(movesInfo.whoseTurn > 0 ){
		console.log("whoseTurn",movesInfo.whoseTurn, socket.username);
		if (movesInfo.removePiece != null)
			{
				console.log("removePiece x",movesInfo.removePiece.x, "removePiece ", movesInfo.removePiece.y);
				GameRoom.sockets.emit('move', {message: from.x+""+from.y+""+to.x+""+to.y+""+ movesInfo.whoseTurn+""+movesInfo.removePiece.x+""+ movesInfo.removePiece.y});
			}	
		else
			GameRoom.sockets.emit('move', {message: from.x+""+from.y+""+to.x+""+to.y+""+ movesInfo.whoseTurn});

	}
	
	else{
		console.log("whoseTurn",movesInfo.whoseTurn, socket.username);
		socket.emit('noMove', {message: from.x+""+from.y+""+from.x+""+from.y});
	}
}

function playersHandler(username){		
			console.log("username plyrhandle");
			players[username] = username;

			var size = Object.size(players);
			plyrObjArry[size]=players[username];
			console.log(size, "number of players");	
			return size;


}

function removePlyr(username){
console.log(players.length, "number of players");
	 console.log("deleting...", players[username]);
	 delete players[username];


}
function resetServerBoard(){
	gameEngine.resetBoard();
}
function toggleTurn(whoseTurn){
	if(whoseTurn == 1){
		whoseTurn == 2;
	}
	else
		whoseTurn == 1;
}

Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

// Get the size of an object


module.exports = {
	movesHandler: movesHandler,
	playersHandler: playersHandler,
	removePlyr: removePlyr,
	resetServerBoard: resetServerBoard

};
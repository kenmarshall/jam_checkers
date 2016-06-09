(function(window){
	function Board(socket){
		//socket.emit('move', {message: "hello"});
		//console.log("inside board");	
		this.initialize(socket);
	}
	Board.prototype = new createjs.Container();

	//public:
	var tileArray = new Array();
	var pieceArray = new Array();
	var player1 = 1;
	var player2 = -1;
	var board;
	var piece;
	var _socket
	Board.prototype.IamPlyr = 0;
	 
	 function Boardlyout() {
        board = new Array();
        for (var x=0; x<8; x++) {
            board[x] = new Array();
            for (var y=0; y<8; y++){
                board[x][y] = Boardlyout.arguments[8*y+x];
            }
        }
        board[-2] = new Array(); // prevents errors
        board[-1] = new Array(); // prevents errors
        board[8] = new Array(); // prevents errors
        board[9] = new Array(); // prevents errors
    }
    
    Boardlyout(player1,0,player1,0,player1,0,player1,0,
    0,player1,0,player1,0,player1,0,player1,
    player1,0,player1,0,player1,0,player1,0,
    0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,
    0,player2,0,player2,0,player2,0,player2,
        player2,0,player2,0,player2,0,player2,0,
    0,player2,0,player2,0,player2,0,player2);

	Board.prototype.Container_initialize = Board.prototype.initialize;

	Board.prototype.initialize = function(player){
		this.Container_initialize();

		console.log(player, "constructor");
		this.x = 250;
		this.y = 250;
		this.regX = 240-30;
		this.regY = 240-30;		
	
		for (var y = 0; y< 8; y++) {
			tileArray[y] = new Array();
			for(var x = 0; x < 8; x++){
				tileArray[y][x] = new Tile(x,y,(((y%2)+x)%2 == 0)?1:2, player);					
				this.addChild(tileArray[y][x]);
			};

		};	
	}

	Board.prototype.addPiece = function(tileX, tileY, piecetyp, socket, player){
		
		//console.log(player, typeof player);
		var hold = (tileX + tileY *8);//convert to base 8 to map the two dimensional array to a single D.A.
		
		console.log("TileArray["+tileX+"]"+"["+tileY+"]", "canvasPos", tileArray[tileX][tileY].x/60, tileArray[tileX][tileY].y/60,"pieceArray", hold,"tileCoords",tileArray[tileY][tileX].xC, tileArray[tileY][tileX].yC);
		 	

		piece = new Piece(tileArray[tileY][tileX].x, tileArray[tileY][tileX].y, tileX, tileY , piecetyp, socket, player);
		console.log(piece.pieceName, "addpiece");
		pieceArray[hold] = piece;			
		this.addChild(piece);
	}

	Board.prototype.removePiece = function(tileX, tileY){
		console.log("remove Piece",tileX, tileY);
		var hold = getPiece(parseInt(tileX) ,parseInt(tileY));

		//console.log(tileArray[tileY][tileX].Xp /60, tileArray[tileY][tileX].Yp/60);
		//var hold = tileX + tileY; //concatanate the strings
		if(hold){
			console.log("Piece removed",hold.pieceName);
			this.removeChild(hold);						
			pieceArray[tileX + tileY*8] = null;				
		}
		//else
		//console.log(hold.pieceName, "piece not removed");
		
		//this.removeChild(tileArray[tileY][tileX]);
	}

	Board.prototype.setupBoard = function(socket, Iam){
		
		_socket = socket;
		this.IamPlyr = Iam;


		if(this.IamPlyr == "1"){
			for (var y = 0; y < 8; y++) {			
				for(var x = 0; x < 8; x++){									
					if(board[x][y] == 1)
						this.addPiece(x,y, 1, _socket, this.IamPlyr);								
					else if	(board[x][y] == -1)
						this.addPiece(x,y, 2, _socket, this.IamPlyr);				
				};
			};
		}
		else if(this.IamPlyr == "2"){
			for (var y = 7; y > -1; y--) {			
				for(var x = 7; x > -1; x--){	
					if(board[x][y] == 1)
						this.addPiece(x,y, 1, _socket, this.IamPlyr);								
					else if	(board[x][y] == -1)
						this.addPiece(x,y, 2, _socket, this.IamPlyr);				
				};
			};
		}
	 	
		
	}
	
	function getPiece(Xp,Yp){
							
		return pieceArray[Xp + Yp*8];
				
	}
	
	function movePiece(piece, fromX, fromY, toX, toY, Iam){
		//console.log(toX*60, " toX in movePiece");			
		var ItoX = 7-toX;
		var ItoY = 7-toY;

		if(Iam == 1){			
			piece.x = toX*60;
			piece.y = toY*60;		
		}
		else if(Iam == 2){			
			piece.x = ItoX*60;
			piece.y = ItoY*60;					
		}

		piece.xC = toX;
		piece.yC = toY;
		//piece.pieceName = 
		pieceArray[fromY*8 + fromX] = null;
		pieceArray[toY*8+ toX] = piece;	
	}

	Board.prototype.update = function(){
			var fromX = arguments[0];
			var fromY = arguments[1];
			var toX = arguments[2];
			var toY = arguments[3];
			
			//IfromX = 7-fromX;
			//IfromY = 7 - fromY;
			console.log("X", fromX, typeof fromX, "y", fromY, typeof fromY);
			
			var piece = getPiece(parseInt(fromX), parseInt(fromY));
			console.log(piece.pieceName, "update piece name");

			movePiece(piece, parseInt(fromX), parseInt(fromY), parseInt(toX), parseInt(toY), this.IamPlyr);
			if(arguments[5] && arguments[6])
			{
				var remVx = arguments[5];
				var remVy = arguments[6];
				
				console.log("remVx", typeof remVx, "remVy", remVy);
				this.removePiece(remVx, remVy);
			}			
	}
	Board.prototype.clearBoard = function(){
		for(var y= 0; y < 8; y++){
			for(var x= 0; x < 8; x++){
				this.removePiece(x,y);
			}
		}
	}

	Board.prototype.resetBoard = function(){
		this.clearBoard();
		this.setupBoard(_socket,this.IamPlyr);

	}

	window.Board = Board;
} (window));
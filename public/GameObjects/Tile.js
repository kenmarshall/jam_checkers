(function(window){
	function Tile(xCoord, yCoord, tileType, player){		
		this.initialize(xCoord, yCoord, tileType, player);
	}
	Tile.prototype = new createjs.Bitmap();// inherit easeljs bitmap object
	

	
	Tile.prototype.xC; // X coordinate of the game board as a public property
	Tile.prototype.yC; // Y coordinate of the game board as a public property
	//var xCoord;
	//var yCoord;
	var widthMP = 60 /2 // width midpoint
	var lengthMP = 60 /2 // length midpoint


	Tile.prototype.Bitmap_initialize = Tile.prototype.initialize;

	Tile.prototype.initialize = function(xCoord, yCoord, tileType, player){
		
		var _player = parseInt(player);// convert to integer
		
		if( _player == 1){
			this.xC = xCoord;
			this.yC = yCoord;
			var xPosition = 60*xCoord;
			var yPosition = 60*yCoord;
			
		}
		else if(_player == 2){
			// invert the coordinates for player 2 perspective
			this.xC = 7-xCoord;
			this.yC = 7-yCoord;
			var xPosition = 60*(7-xCoord);
			var yPosition = 60*(7-yCoord);
		}
		else
			console.log("Incorrect type or number of player!");

		//pixel position on canvas
		
		
		if(tileType == 1)				
			this.Bitmap_initialize("gameImgs/MovableTile.png");		
		else if(tileType == 2)
			this.Bitmap_initialize("gameImgs/ImovableTile.png");
		else
			console.log("incorrect tiletype", "value:", tileType, "variable type:", typeof tileType);
		
		this.regX = widthMP;// assign the registration point of the x axis to the center of this Tile object width
		this.regY = lengthMP;		
		
		this.x = xPosition;// assignment of pixel position on the axis of this Tile object
		this.y = yPosition;
		
		
	}
	window.Tile = Tile;
} (window));
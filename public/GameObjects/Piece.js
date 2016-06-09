(function(window){
	function Piece(xPos, yPos, xCoord, yCoord, piece, socket, player){

		this.initialize(xPos, yPos, xCoord, yCoord, piece, socket, player);
	}
	Piece.prototype = new createjs.Bitmap();

	//public:
		var OrigX;
		var OrigY;
		var ObjectArray;
    var _socket;
    var widthMP = 44/2;
    var lengthMP = 44/2;
    var _player;
    
    Piece.prototype.pieceName;
    Piece.prototype.xC;
    Piece.prototype.yC;

   
         
    
    //var socket = this.socket;
	Piece.prototype.Bitmap_initialize = Piece.prototype.initialize;

	Piece.prototype.initialize = function(xPos, yPos, xCoord, yCoord, piece, socket, player){
    //console.log(player, typeof player);
  //if(player == 1){
    this.xC = xCoord;
    this.yC = yCoord;
  //}
  //else if(player == 2){
    //this.xC = 7-xCoord;
    //this.yC = 7-yCoord;
  //}  
    
    _socket = socket;
    
		 //console.log("Xp: " + xPosition + " yP: " + yPosition);
		 	if(piece == 1){
				this.Bitmap_initialize("gameImgs/redPiece.png");
        this.pieceName = "red" + this.xC + this.yC;
      }
			else if(piece == 2){
				this.Bitmap_initialize("gameImgs/bluePiece.png");
        this.pieceName = "blue"+ this.xC + this.yC;
      }
			
			this.regX = widthMP;
			this.regY = lengthMP;	
			this.x = xPos;
			this.y = yPos;
      //console.log(this.x/60,this.y/60);		
	}

	Piece.prototype.onPress = function(evt) {
				  //stores the original/starting coordinates of the object before the onMouseMove/drag event
          OrigXP = this.x;
    			OrigYP = this.y;
         // console.log(this.x /60, this.y/60);
        // var offset = {x:target.x-evt.stageX, y:target.y-evt.stageY};
   			
    		evt.onMouseMove = function(evt) {       
          
           
        		evt.target.x = evt.stageX - 36.5;
        		evt.target.y = evt.stageY - 36;       	 
            evt.target.parent.addChild(evt.target);// all the object to be dragged above other objects- When the dragging starts it adds the piece at the top of the display list

        		
    		}
   			evt.onMouseUp = function(evt) { 
   			 	var toX;
   			 	var toY;
   			 	var fromX;
   			 	var fromY; 
          var ItoX;
          var ItoY;           
   			 
   			 	objectArray = evt.target.parent.getObjectsUnderPoint(evt.target.x, evt.target.y); // get the objects the piece is dragged on   

            fromX = evt.target.xC;         
            fromY = evt.target.yC;         
            toX = objectArray[1].xC;         
            toY = objectArray[1].yC;       
   			 // send "from" and "to" coordinates to the server depending on which player        
   			  if(evt.target.parent.IamPlyr == "1"){
            
         	   console.log(fromX, fromY, toX,toY);
            _socket.emit('move', {message: fromX +""+ fromY +""+ toX+""+toY});
          }
          else if (evt.target.parent.IamPlyr == "2"){
             ItoX = 7-toX;
             ItoY = 7-toY
             console.log(fromX +""+ fromY +""+ ItoX+""+ItoY, "emit to server");
            _socket.emit('move', {message: fromX +""+ fromY +""+ ItoX+""+ ItoY});
          }         
   			}
	}

	
	window.Piece = Piece;
} (window));
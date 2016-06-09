var coord = require('./coord');
var distance;
 var piece;
 var saveTile;
 var double_jump = false;
 var opponent = -1;
 var thisPlayer = 1;
 var game_is_over = false;

 function Board() {
        board = new Array();
        for (var i=0;i<8; i++) {
            board[i] = new Array();
            for (var j=0;j<8;j++)
                board[i][j] = Board.arguments[8*j+i];
        }
        board[-2] = new Array(); // prevents errors
        board[-1] = new Array(); // prevents errors
        board[8] = new Array(); // prevents errors
        board[9] = new Array(); // prevents errors
    }
    var board;
    
    Board(opponent,0,opponent,0,opponent,0,opponent,0,
    0,opponent,0,opponent,0,opponent,0,opponent,
    opponent,0,opponent,0,opponent,0,opponent,0,
    0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,
    0,thisPlayer,0,thisPlayer,0,thisPlayer,0,thisPlayer,
        thisPlayer,0,thisPlayer,0,thisPlayer,0,thisPlayer,0,
    0,thisPlayer,0,thisPlayer,0,thisPlayer,0,thisPlayer);
 
 function move(from,to) {
  
  var moveTypeInfo = {
    whoseTurn : 1,
    removePiece : null,
    kingMe: 0,
    whoWon: 0

  };

   // console.log("inside move",legal_move(from,to));
       // my_turn = true;
      // console.log("inside move",legal_move(from,to));
        if (legal_move(from,to)) {
            
            piece = board[from.x][from.y];
            distance = coord(to.x-from.x,to.y-from.y);
            
            if ((abs(distance.x) == 1) && (board[to.x][to.y] == 0)) {
                swap(from,to); 


            } 
            else if ((abs(distance.x) == 2)&& (integ(piece) == piece))
              {
                  double_jump = false;
                  swap(from,to);
                  moveTypeInfo.removePiece = coord(from.x+sign(distance.x),from.y+sign(distance.y))
                  remove(from.x+sign(distance.x),from.y+sign(distance.y));
                 // GameRoom.sockets.emit('move', {message: from.x+""+from.y+""+to.x+""+to.y});
                  if ((legal_move(to,coord(to.x+2,to.y+2)))
                      || (legal_move(to,coord(to.x+2,to.y-2)))
                      || (legal_move(to,coord(to.x-2,to.y-2)))
                      || (legal_move(to,coord(to.x-2,to.y+2)))) {
                      double_jump = true;
                     // message("You may complete the double jump or click on your piece to stay still.");
                  }

                } 
            if ((abs(distance.x)> 1) && (board[to.x][to.y]==0)){                
                double_jump = false;
                 
                swap(from, to);
                //GameRoom.sockets.emit('move', {message: from.x+""+from.y+""+to.x+""+to.y});
                if (saveTile != null){
                    moveTypeInfo.removePiece = coord(saveTile.x,saveTile.y)
                    remove(saveTile.x,saveTile.y);

                    if(KngDoubleJump(to)){
                        
                        double_jump = true;                       
                    }    
                }
              } 
            if ((board[to.x][to.y] == 1) && (to.y == 0)){ 
              king_me(to.x,to.y);
              moveTypeInfo.kingMe = 1;

            }
            if (game_over() && !double_jump) {
              moveTypeInfo.whoseTurn == 1;               
            }
            else
              moveTypeInfo.whoseTurn = 1;

        }
        else moveTypeInfo.whoseTurn = 0;

      return moveTypeInfo;
    }


function KngDoubleJump(StartPoint){
       
         MaxNe = MaxNw = MaxSe = MaxSw = null;
         MaxNeDistance= MaxNwDistance =MaxSeDistance = MaxSwDistance = null;
       
       if((StartPoint.y-StartPoint.x)>-1){
            MaxNw = coord(0,(StartPoint.y-StartPoint.x));
        }
        else 
            MaxNw = coord((StartPoint.x-StartPoint.y),0);
        // end title in north east and southwest
         if((StartPoint.x+StartPoint.y)<8){
             MaxNe = coord((StartPoint.x+StartPoint.x),0);
             MaxSw = coord(0,(StartPoint.x+StartPoint.x));
          }
          else{
              MaxNe = coord(7,(StartPoint.x+StartPoint.y)-7);
              MaxSw = coord((StartPoint.x+StartPoint.y)-7,7);
          }
          // end title south east
          if((StartPoint.x-StartPoint.y)>-1){
              MaxSe = coord(7, 7-(StartPoint.x-StartPoint.y));
          }
          else{
              MaxSe = coord(7-(StartPoint.y-StartPoint.x),7);
          }              
          MaxNeDistance = coord(MaxNe.x - StartPoint.x, MaxNe.y - StartPoint.y);
          MaxNwDistance = coord(MaxNw.x - StartPoint.x, MaxNw.y - StartPoint.y);          
          MaxSeDistance = coord(MaxSe.x - StartPoint.x, MaxSe.y - StartPoint.y);          
          MaxSwDistance = coord(MaxSw.x - StartPoint.x, MaxSw.y - StartPoint.y);
//        boolne=  legal_jump(StartPoint,MaxNeDistance);
//        boolnw=  legal_jump(StartPoint,MaxNwDistance);
//         boolse= legal_jump(StartPoint,MaxSeDistance);
//          boolsw= legal_jump(StartPoint,MaxSwDistance);
         if((legal_jump(StartPoint,MaxNeDistance))|| (legal_jump(StartPoint,MaxNwDistance))|| (legal_jump(StartPoint,MaxSeDistance))|| (legal_jump(StartPoint,MaxSwDistance)))
            {
                //window.alert("ne=" + boolne + " nw=" + boolnw + " se=" + boolse + " sw=" + boolsw);
            return true;}
        else
            return false;    
}

function integ(num) {
        if (num != null)
            return Math.round(num);
        else
            return null;
}

function abs(num) {
        return Math.abs(num);
}

function sign(num) {
        if (num < 0) return -1;
        else return 1;
}

function legal_jump(from, jump_distance){      
        
             
                m = sign(jump_distance.x);
                n = sign(jump_distance.y);
                // if((m == 0)||(n == 0))
                 //   {return false;}
                a = from.x;
                b = from.y;
                jumping_piece = board[from.x][from.y];
               
                
                flag= 0;
                saveTile= null;
                         
                
                for(var i = 0; i < (abs(jump_distance.x));i++){
                   a= a+m;
                   b= b+n;                     
                  
                  if((board [a][b] == jumping_piece) && (flag == 0))
                   return false;                   
                   if((board[a][b] == (-sign(jumping_piece)))&& (flag == 1))
                    return false;                    
                   if((board[a][b] == (-sign(jumping_piece))) && (flag == 0) ){
                      flag = 1;
                     saveTile= coord(a,b); 
                   
                  }
                  if((board[a + m][b + n] == 0)&&(flag == 1))
                      return true;                     
                   
                }//end for
                if(flag == 0 || saveTile == null)
                  return false;                
            
}

function legal_move(from,to) {
        if ((to.x < 0) || (to.y < 0) || (to.x > 7) || (to.y > 7))return false;
        piece = board[from.x][from.y];        
        distance = coord(to.x-from.x,to.y-from.y);
        if ((distance.x == 0) || (distance.y == 0)) {
           // message("You may only move diagonally.");
           //console.log("1");
            return false;
        }
        if (abs(distance.x) != abs(distance.y)) {
            //message("Invalid move right here.");
             //console.log("2");
            return false;
        }
        
        if ((abs(distance.x) > 2) && (integ(piece)== piece) ) {
            //message("Invalid move.. distance too great.");
             //console.log("3");
            return false;
         
        }
       
        if(abs(distance.y) > 1 && integ(piece)!= piece){
            if (legal_jump(from, distance))
                  return true;
        }
        if ((abs(distance.x) == 1) && double_jump) {
            return false;
        }
        if ((board[to.x][to.y] != 0) || (piece == 0)) {
            return false;
        }
        if (((abs(distance.x) == 2) && (integ(piece)== piece))
             && (((integ(piece) == integ(board[from.x+sign(distance.x)][from.y+sign(distance.y)]))) || (board[from.x+sign(distance.x)][from.y+sign(distance.y)] == 0))){//&& (integ(piece)== piece)) {//prevents jumping over ur own piece
          //console.log("4 legal_move");
          return false;
        }
     
      if ((integ(piece) == piece)  && (piece == sign(distance.y)) && ((abs(distance.y) < 2))) {//prevents any player from moving a non king piece back a single step
          
            return false;
          }     //else if((piece == -1) && (sign(distance.y == -1)))
        //    return false
       return true;
} 
function king_me(x,y) {
        if (board[x][y] == -1) {
            board[x][y] = -1.1; // king ply1
           
        } else if (board[x][y] == 1) {
            board[x][y] = 1.1; // king ply2
           
        }
    }

    function swap(from,to) {
       
        dummy_num = board[from.x][from.y];
        board[from.x][from.y] = board[to.x][to.y];
        board[to.x][to.y] = dummy_num;
    }
function game_over() { // make sure game is not over (return false if game is over)
  oppnt = thsPlyr = false;
  for(var i=0;i<8;i++) {
      for(var j=0;j<8;j++) {
          if(integ(board[i][j]) == -1) oppnt = true;
          if(integ(board[i][j]) == 1) thsPlyr = true;
      }
  }
  if (!oppnt) moveTypeInfo.whoWon = 1;
  if (!thsPlyr) moveTypeInfo.whoWon = 2;
  game_is_over = (!oppnt || !thsPlyr)
  return (!game_is_over);
}
    function remove(x,y) {
        
           
        board[x][y] = 0;
        return true;
        
        
    }
    function resetBoard(){
       Board(opponent,0,opponent,0,opponent,0,opponent,0,
    0,opponent,0,opponent,0,opponent,0,opponent,
    opponent,0,opponent,0,opponent,0,opponent,0,
    0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,
    0,thisPlayer,0,thisPlayer,0,thisPlayer,0,thisPlayer,
        thisPlayer,0,thisPlayer,0,thisPlayer,0,thisPlayer,0,
    0,thisPlayer,0,thisPlayer,0,thisPlayer,0,thisPlayer);
       console.log("server board reset");

    }  

module.exports ={ 
  move: move,
  resetBoard: resetBoard
};
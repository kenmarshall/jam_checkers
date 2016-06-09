THIS SCRIPT BROUGHT TO YOU BY JAVAFILE.COM - http://www.javafile.com





PASTE THIS SCRIPT INTO YOUR BODY TAG


<script language="JavaScript1.1">
    <!--
    version = 1.1;
    // -->
</script>
<script language="JavaScript">
    <!--
    if (version == null)
        document.write("Your browser doesn't have JavaScript 1.1 capabilities. "
        + "This checkers game script only works on Netscape 3+ and MSIE 4+.");
    // -->
</script>
<script language="JavaScript1.1">
    <!--
    // Checkers Game

    // black.gif
    // gray.gif
    // you1.gif -- normal piece (player/red)
    // you2.gif -- highlighted piece
    // you1k.gif -- kinged normal piece
    // you2k.gif -- kinged highlighted piece
    // me1.gif -- normal piece (computer/black)
    // me2.gif -- highlighted piece
    // me1k.gif -- kinged normal piece
    // me2k.gif -- kinged highlighted piece

    function preload() {
        this.length = preload.arguments.length;
        for (var i = 0; i < this.length; i++) {
            this[i] = new Image();
            this[i].src = preload.arguments[i];
        }
    }
    var pics = new preload("black.gif","gray.gif",
    "you1.gif","you2.gif","you1k.gif","you2k.gif",
    "me1.gif","me2.gif","me1k.gif","me2k.gif");

    var black = -1; // computer is black
    var red = 1; // visitor is red
    var square_dim = 35;
    var piece_toggled = false;
    var my_turn = false;
    var double_jump = false;
    var comp_move = false;
    var game_is_over = false;
    var safe_from = safe_to = null;
    var toggler = null;
    var togglers = 0;
    var saveTile= null;

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
    Board(black,0,black,0,black,0,black,0,
    0,black,0,black,0,black,0,black,
    black,0,black,0,black,0,black,0,
    0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,
    0,red,0,red,0,red,0,red,
        red,0,red,0,red,0,red,0,
    0,red,0,red,0,red,0,red);

    function message(str) {
        if (!game_is_over)
            document.disp.message.value = str;
    }
    function moveable_space(i,j) {
        // calculates whether it is a gray (moveable)
        // or black (non-moveable) space
        return (((i%2)+j)%2 == 0);
    }
    function Coord(x,y) {
        this.x = x;
        this.y = y;
    }
    function coord(x,y) {
        c = new Coord(x,y);
        return c;
    }

    document.write("<table border=0 cellspacing=0 cellpadding=0 width="+(square_dim*8+8)
        +"<tr><td><img src='black.gif' width="+(square_dim*8+8)
        +" height=4><br></td></tr>");
    for(var j=0;j<8;j++) {
        document.write("<tr><td><img src='black.gif' width=4 height="+square_dim+">");
        for(var i=0;i<8;i++) {
            if (moveable_space(i,j))
                document.write("<a href='javascript:clicked("+i+","+j+")'>");
            document.write("<img src='");
            if (board[i][j]==1) document.write("you1.gif");
            else if (board[i][j]==-1) document.write("me1.gif");
            else if (moveable_space(i,j)) document.write("gray.gif");
            else document.write("black.gif");
            document.write("' width="+square_dim+" height="+square_dim
                +" name='space"+i+""+j+"' border=0>");
            if (moveable_space(i,j)) document.write("</a>");
        }
        document.write("<img src='black.gif' width=4 height="+square_dim+"></td></tr>");
    }
    document.write("<tr><td><img src='black.gif' width="+(square_dim*8+8)
        +" height=4><br></td></tr></table><br>"
        +"<form name='disp'><textarea name='message' wrap=virtual rows=2 cols=40></textarea><br><input "
        +"type=button value=\"Start the Game Over\" onClick=\"location.href+=''\"></form>");

    function clicked(i,j) {
        if (my_turn) {
            
            if (integ(board[i][j])==1) toggle(i,j);
            else if (piece_toggled) move(selected,coord(i,j));
            else message("First click one of your red pieces, then click where you want to move it");
        } else {
            
             if (integ(board[i][j])== -1) toggle(i,j);
             else if (piece_toggled) move_comp(selected_c,coord(i,j));
             else message("First click one of your black pieces, then click where you want to move it");
           // message("It's not your turn yet. Hang on a sec!");
        }
    }
    function toggle(x,y) {
        if (my_turn) {
            
            if (piece_toggled)
                draw(selected.x,selected.y,"you1"+((board[selected.x][selected.y]==1.1)?"k":"")+".gif");
            if (piece_toggled && (selected.x == x) && (selected.y == y)) {
                piece_toggled = false;
                if (double_jump) { my_turn = double_jump = false; message("Black Turn!");comp_turn = true; }
            } else {
                piece_toggled = true;
               
                draw(x,y,"you2"+((board[x][y]==1.1)?"k":"")+".gif");
            }
            selected = coord(x,y);
        } else {
            if ((piece_toggled) && (integ(board[selected_c.x][selected_c.y])==-1))
                draw(selected_c.x,selected_c.y,"me1"+((board[selected_c.x][selected_c.y]==-1.1)?"k":"")+".gif");
            if (piece_toggled && (selected_c.x == x) && (selected_c.y == y)) {
                piece_toggled = false;
                if (double_jump) { comp_turn = double_jump = false; message("Red Turn!"); my_turn = true;}
            }
           else {
                piece_toggled = true;
                draw(x,y,"me2"+((board[x][y]==-1.1)?"k":"")+".gif");
            }
            selected_c = coord(x,y);
        }
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
    
   
    function draw(x,y,name) {
        document.images["space"+x+""+y].src = name;
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
    function concatenate(arr1,arr2) {
        // function tacks the second array onto the end of the first and returns result
        for(var i=0;i<arr2.length;i++)
            arr1[arr1.length+i] = arr2[i];
        return arr1;
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
            message("You may only move diagonally.");
            return false;
        }
        if (abs(distance.x) != abs(distance.y)) {
            message("Invalid move right here.");
            return false;
        }
        
        if ((abs(distance.x) > 2) && (integ(piece)== piece) ) {
            message("Invalid move.. distance too great.");
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
          return false;
        }
     
      if ((integ(piece) == piece)  && (piece == sign(distance.y)) && ((abs(distance.y) < 2))) {//prevents any player from moving a non king piece back a single step
          
            return false;}
        //else if((piece == -1) && (sign(distance.y == -1)))
        //    return false
       
       
           
 
        return true;
    }

    function move(from,to) {
        my_turn = true;
        if (legal_move(from,to)) {
            piece = board[from.x][from.y];
            distance = coord(to.x-from.x,to.y-from.y);
            if ((abs(distance.x) == 1) && (board[to.x][to.y] == 0)) {
                swap(from,to);
            } else if ((abs(distance.x) == 2)&& (integ(piece) == piece))
               {
                double_jump = false;
                swap(from,to);
                remove(from.x+sign(distance.x),from.y+sign(distance.y));
                if ((legal_move(to,coord(to.x+2,to.y+2)))
                    || (legal_move(to,coord(to.x+2,to.y-2)))
                    || (legal_move(to,coord(to.x-2,to.y-2)))
                    || (legal_move(to,coord(to.x-2,to.y+2)))) {
                    double_jump = true;
                    message("You may complete the double jump or click on your piece to stay still.");
                }
            } if ((abs(distance.x)> 1) && (board[to.x][to.y]==0)){                
                double_jump = false;
                 
                swap(from, to);
                if (saveTile != null){
                    remove(saveTile.x,saveTile.y);
                    if(KngDoubleJump(to)){
                        
                        double_jump = true;
                        message("You may complete the double jump or click on your piece to stay still.");
                   }    
                }
            }
               
            if ((board[to.x][to.y] == 1) && (to.y == 0)) king_me(to.x,to.y);
            selected = to;
            if (game_over() && !double_jump) {
                setTimeout(" toggle("+to.x+","+to.y+");my_turn = double_jump = false; comp_turn = true;",1000);
                message("Black Turn!");
                
            }
        }
        return true;
    }
    function king_me(x,y) {
        if (board[x][y] == -1) {
            board[x][y] = -1.1; // king computer
            draw(x,y,"me2k.gif");
        } else if (board[x][y] == 1) {
            board[x][y] = 1.1; // king human
            draw(x,y,"you2k.gif");
        }
    }

    function swap(from,to) {
        if (my_turn || comp_move) {
            dummy_src = document.images["space"+to.x+""+to.y].src;
            document.images["space"+to.x+""+to.y].src = document.images["space"+from.x+""+from.y].src;
            document.images["space"+from.x+""+from.y].src = dummy_src;
        }
        dummy_num = board[from.x][from.y];
        board[from.x][from.y] = board[to.x][to.y];
        board[to.x][to.y] = dummy_num;
    }
    function remove(x,y) {
        if (my_turn || comp_move){
            draw(x,y,"gray.gif");
        board[x][y] = 0;
        return true;
        }
        
    }
    
    function move_comp(from,to) {
        
        comp_move = true;
        if (legal_move(from,to)) {
            piece = board[from.x][from.y];       
            distance = coord(to.x-from.x,to.y-from.y);
            if ((abs(distance.x) == 1) && (board[to.x][to.y] == 0)) {
                swap(from,to);
            } else if ((abs(distance.x) == 2)&& (integ(piece) == piece))
               {
                double_jump = false;
                swap(from,to);
                remove(from.x+sign(distance.x),from.y+sign(distance.y));
                if ((legal_move(to,coord(to.x+2,to.y+2)))
                    || (legal_move(to,coord(to.x+2,to.y-2)))
                    || (legal_move(to,coord(to.x-2,to.y-2)))
                    || (legal_move(to,coord(to.x-2,to.y+2)))) {
                    double_jump = true;
                    message("You may complete the double jump or click on your piece to stay still.");
                }
            } if (((abs(distance.x)) > 1) && (board[to.x][to.y] == 0)){                
                double_jump = false;
                swap(from, to);
                
                if (saveTile != null){
                    remove(saveTile.x,saveTile.y);                
                    if(KngDoubleJump(to)){                        
                        double_jump = true;
                        message("You may complete the king double jump or click on your piece to stay still.");
                   } 
                }
            }
               
        if ((board[to.x][to.y] == -1) && (to.y == 7)) king_me(to.x,to.y);       
        selected_c = to;
            if (game_over() && !double_jump) {
                setTimeout("toggle("+to.x+","+to.y+"); comp_turn = double_jump = false; my_turn = true;",1000);
                message("Red Turn!");
            }
        }
        return true;
    }
    function game_over() { // make sure game is not over (return false if game is over)
        comp = you = false;
        for(var i=0;i<8;i++) {
            for(var j=0;j<8;j++) {
                if(integ(board[i][j]) == -1) comp = true;
                if(integ(board[i][j]) == 1) you = true;
            }
        }
        if (!comp) message("You beat me!");
        if (!you) message("Gotcha! Game over.");
        game_is_over = (!comp || !you)
        return (!game_is_over);
    }

   
  
   message("Red Turn!");
    my_turn = true;

    // -->
</script>




THIS SCRIPT BROUGHT TO YOU BY JAVAFILE.COM - http://www.javafile.com
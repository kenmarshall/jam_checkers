 function Coord(x,y){
	//console.log("Coord");
	this.x = x;
	this.y = y;
}

function coord(x,y){
	
	c = new Coord(parseInt(x),parseInt(y));
	return c;
}

module.exports = coord;
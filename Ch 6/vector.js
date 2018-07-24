function Vector(x, y) {
    this.x = x;
    this.y = y;
}

Vector.prototype.plus = function(second){
    this.x += second.x;
    this.y += second.y; 
}

Vector.prototype.minus = function(second){
    this.x -= second.x;
    this.y -= second.y; 
}

Vector.prototype.length = function(){
    return Math.sqrt(this.x*this.x + this.y*this.y);
}

var vec1 = new Vector(3, 4);
var vec2 = new Vector(3, 4);

vec1.plus(vec2);

console.log(vec1.length());
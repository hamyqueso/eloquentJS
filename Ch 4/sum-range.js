var range = function(start, end, step){
    var arr = [];
    if(step == null){
    for(var i = start; i < end +1; i++){
        arr.push(i);
    }
} else {
    for(var i = start; i < end +1; i+=step){
        arr.push(i);
}
}
    return arr;


}

var sum = function(arr){
    var result = 0;
    for (var i = 0; i < arr.length; i++){
        result += arr[i];
    }
    return result;
}

console.log(sum(range(1,10,2)));
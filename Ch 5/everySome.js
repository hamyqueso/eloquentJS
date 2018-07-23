function every(array, value){
    for (var i = 0; i < array.length; i++){
        if (array[i] != value) return false;
    }
    
    return true;

}

function some(array, value){
    for(var i = 0; i < array.length; i++){
        if (array[i] == value) return true;
    }

    return false;
}


console.log(every([1,2,3,4,5], 2));
console.log(some([1,2,3,4,5], 2));
console.log(every([1,1,1,1,1], 1))
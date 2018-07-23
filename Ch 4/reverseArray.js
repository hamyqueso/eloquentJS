var reverseArray = function(arr){
    var arr2 = [];
    for (var i = 0; i < arr.length; i++){
        arr2.unshift(arr[i]);
    }

    console.log(arr2);
}

var reverseArrayInPlace = function(arr){
    var len = arr.length;
    for(var i = len - 1; i > -1; i--){
        arr.push(arr[i]);
    }

    console.log(arr.slice(len));
}

reverseArray([1,2,3,4,5]);
reverseArrayInPlace([1,2,3,4,5]);
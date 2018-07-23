var ancestry = JSON.parse(require('./ancestry'));

var byCentury = {};
var centuries = [];

function centuryMath(year){
    return Math.ceil(year/100);
}

ancestry.forEach(person => {
    if(byCentury[centuryMath(person.died)] == undefined){
        centuries.push(centuryMath(person.died));
        byCentury[centuryMath(person.died)] = [];
        byCentury[centuryMath(person.died)].push(person);

    } else byCentury[centuryMath(person.died)].push(person);

});

function ages(person){
    return person.died - person.born;
}

function mapCentury(obj, array){
    var averageAges = {};
    
    for(var i = 0; i < array.length; i++){
        averageAges[array[i]] = obj[array[i]].map(ages);
    };

    return averageAges;

}

function average(obj, array){
    var averageAges = {};

    for(var i = 0; i < array.length; i++){
        var len = obj[array[i]].length;
        averageAges[array[i]] = obj[array[i]].reduce(function(a,b){
            return a+b;
        })/len;
    }

    return averageAges;
}


// byCentury['19'] = [1, 2, 3, 4];

// console.log(byCentury['20'].forEach(function(person){
//     return person.died;
// }));

// console.log(byCentury[19].map(ages));

// console.log(centuries[0]);

// console.log(mapCentury(byCentury, centuries))

console.log(average(mapCentury(byCentury, centuries), centuries));
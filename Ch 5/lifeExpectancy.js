var ancestry = JSON.parse(require('./ancestry'));

var byCentury = {};

function centuryMath(person){
    return Math.ceil(person.died/100);
}

ancestry.forEach(person => {
    if(! byCentury.hasOwnProperty(centuryMath(person))){
        byCentury[centuryMath(person)] = [];
        byCentury[centuryMath(person)].push(person);
    }

    else byCentury[centuryMath(person)].push(person);
});

function average(arr){
    return arr.reduce(function(a,b){
        return a+b;
    })/arr.length;
};



console.log(byCentury);
var ancestry = JSON.parse(require('./ancestry'));

var byName = {};

ancestry.forEach(person => {
    byName[person.name] = person;
});

function average(arr){
    return arr.reduce(function(a,b){
        return a+b;
    })/arr.length;
};

function hasMother(person){
    if (person.mother != null && byName[person.mother] != undefined) return true;
    else return false;
};

function ages(person){
    var mother = {};
    mother = byName[person.mother];
    return person.born - mother.born; 
};

// console.log(byName['Pieter Haverbeke'].born);
console.log(average(ancestry.filter(hasMother).map(ages)));
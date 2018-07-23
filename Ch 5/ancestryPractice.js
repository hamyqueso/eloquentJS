var ancestry = JSON.parse(require("./ancestry.js"));

// function filter(array, test){
//     var passed = [];
//     array.forEach(function(person){
//         if (test(person)){
//             passed.push(person);
//         }
//     })
//     return passed;
// }


//console.log(ancestry.length);
// console.log(filter(ancestry, function(person){
//     person.born > 1900 && person.born < 1925;
// }))

// var oldest = ancestry.reduce(function(min, cur){
//     if (min.born < cur.born) return min;
//     else return cur;
// });

// function average(arr){
//     return arr.reduce(function(a,b){
//         return a+b;
//     })/arr.length;
// };

// function age(person){
//     return person.died - person.born;
// }

// function male(person){
//     return person.sex === 'm';
// }

// function female(person){
//     return person.sex === 'f';
// }


// console.log(average(ancestry.filter(male).map(age)));
// console.log(average(ancestry.filter(female).map(age)));


// Great-great-great-great...

var byName = {};

ancestry.forEach(function(person){
    byName[person.name] = person;
});

function reduceAncestors(person, f, defaultValue){
    function valueFor(person){
        if (person == null)
            return defaultValue;
        else 
            return f(person, valueFor(byName[person.mother]), valueFor(byName[person.father]));
    }
    return valueFor(person);
};

function sharedDNA(person, fromMother, fromFather){
    if (person.name === 'Pauwels van Haverbeke')
    return 1;
    else return (fromMother + fromFather)/2;
};

var ph = byName['Philibert Haverbeke'];

console.log(reduceAncestors(ph, sharedDNA, 0) / 4)

//console.log(byName['Pauwels van Haverbeke']);

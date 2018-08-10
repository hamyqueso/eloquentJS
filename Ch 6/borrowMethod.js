let map = {one: true, two: true, hasOwnProperty: true};

// function ownProperty(obj, prop){
//   return obj.hasOwnProperty(prop);
// }

console.log(Object.prototype.hasOwnProperty.call(map, "one"));
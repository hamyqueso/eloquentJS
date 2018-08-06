// let mySet = new Set;

// mySet.add(4);
// mySet.add(2);

// console.log(mySet);


class Group{
  constructor(){
    this.values = [];
  }

  add(input){
    if(!this.has(input)){
      this.values.push(input);
      }
  }

  has(input){
    return this.values.includes(input);
  }

  delete(input){
    this.values = this.values.filter(v => v != input);
  }

  static from(arr){
    let group = new Group;
    for(let v of arr){
      group.add(v);
    }
    return group;
  }
  
}

let myGroup = Group.from([10,20]);

// myGroup.add(2);
// myGroup.add(3);
// myGroup.add(2);
// myGroup.delete(2);

// myGroup.from([10,20]);


console.log(myGroup);
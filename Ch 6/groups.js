// let mySet = new Set;

// mySet.add(4);
// mySet.add(2);

// console.log(mySet);


class Group{
  constructor(){
    this.members = [];
  }

  add(input){
    if(!this.has(input)){
      this.members.push(input);
      }
  }

  has(input){
    return this.members.includes(input);
  }

  delete(input){
    this.members = this.members.filter(v => v != input);
  }

  static from(arr){
    let group = new Group;
    for(let v of arr){
      group.add(v);
    }
    return group;
  }

  [Symbol.iterator](){
    return new GroupIterator(this);
  }
  
}

class GroupIterator{
  constructor(group){
    this.group = group;
    this.position = 0;
  }

  next(){
    if (this.position >= this.group.members.length){
      return {done: true};
    } else {
      let result = {value: this.group.members[this.position], done: false};
      this.position++;
      return result;
    }
  }
}
// let myGroup = Group.from([10,20]);

// myGroup.add(2);
// myGroup.add(3);
// myGroup.add(2);
// myGroup.delete(2);

// myGroup.from([10,20]);


// console.log(Group.from(["a", "b", "c"]));

for(let value of Group.from(["a", "b", "c"])){
  console.log(value);
}
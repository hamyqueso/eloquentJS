const box = {
  locked: true,
  unlock() { this.locked = false; },
  lock() { this.locked = true;  },
  _content: [],
  get content() {
    if (this.locked) throw new Error("Locked!");
    return this._content;
  }
};

let change = false;

function withBoxUnlocked(body) {
  // Your code here.
  //change = false;

  if(box.locked){
    box.unlock;
    change = true;
  }

  body;
  
}

withBoxUnlocked(function() {
  box.content.push("gold piece");
});

try {
  withBoxUnlocked(function() {
    throw new Error("Pirates on the horizon! Abort!");
  });
} catch (e) {
  console.log("Error raised:", e);
} finally{
  if (change == true);
  box.lock;
}
console.log(box.locked);
// → true
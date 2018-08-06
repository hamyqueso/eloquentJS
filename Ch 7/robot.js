var roads = [
  "Alice's House-Bob's House",   "Alice's House-Cabin",
  "Alice's House-Post Office",   "Bob's House-Town Hall",
  "Daria's House-Ernie's House", "Daria's House-Town Hall",
  "Ernie's House-Grete's House", "Grete's House-Farm",
  "Grete's House-Shop",          "Marketplace-Farm",
  "Marketplace-Post Office",     "Marketplace-Shop",
  "Marketplace-Town Hall",       "Shop-Town Hall"
];

function buildGraph(edges){
  let graph = Object.create(null);
  function addEdge(from, to){
    if (graph[from] == null){
      graph[from] = [to];
    } else {
      graph[from].push(to);
    }
  }

  for(let [from, to] of edges.map(r => r.split("-"))){
    addEdge(from,to);
    addEdge(to,from);
  }

  return graph;
}

const roadGraph = buildGraph(roads);


class VillageState {
  constructor(place, parcels){
    this.place = place;
    this.parcels = parcels;
  }
  move(destination){
    if(!roadGraph[this.place].includes(destination)) return this;
    else {
      let parcels = this.parcels.map(p => {
        if (p.place != this.place) return p;
        return {place: destination, address: p.address};
      }).filter(p => p.place != p.address);
      return new VillageState(destination, parcels);

    }
  }
}

let first = new VillageState(
  "Post Office", [{place: "Post Office", address:"Alice's House"}]
);

let next = first.move("Alice's House");

// console.log(next.place);
// console.log(next.parcels);
// console.log(first.place);
// console.log(first.parcels);

function runRobot(state, robot, memory){
  
  for (let turn = 0;; turn++){
    // console.log(state);
    if(state.parcels.length == 0){
      // console.log(`Done in ${turn} turns.`);
      return turn;
      // break;
    }
    let action = robot(state, memory);
    state = state.move(action.direction);
    memory = action.memory;
    // console.log(`------> Moved to ${action.direction}`);
  }
}

function randomPick(array){
  let choice =  Math.floor(Math.random()*array.length);
  return array[choice];
}

function randomRobot(state){
  return {direction: randomPick(roadGraph[state.place])}
}

VillageState.random = function(parcelCount = 5){
  let parcels = [];
  for(let i = 0; i < parcelCount; i++){
    let address = randomPick(Object.keys(roadGraph));
    let place;
    do {
      place = randomPick(Object.keys(roadGraph));
    } while(address == place)
    parcels.push({place, address});
  }
  return new VillageState("Post Office", parcels);
}


const mailRoute = [
  "Alice's House", "Cabin", "Alice's House", "Bob's House",
  "Town Hall", "Daria's House", "Ernie's House",
  "Grete's House", "Shop", "Grete's House", "Farm",
  "Marketplace", "Post Office"
];

// runRobot(VillageState.random(), randomRobot);
//console.log(roadGraph);

function routeRobot(state, memory){
  if (memory.length == 0){
    memory = mailRoute;
  }
  return {direction: memory[0], memory: memory.slice(1)};
}

// runRobot(VillageState.random(), routeRobot, []);

function findRoute(graph, from, to){
  let work = [{at: from, route: []}];
  for (let i = 0; i < work.length; i++){
    let {at, route} = work[i];
    for (let place of graph[at]){
      if(place == to) return route.concat(place);
      if(!work.some(w => w.at == place)){
        work.push({at: place, route: route.concat(place)});
      }
    }
    // console.log(work); 
  }
}

// console.log(findRoute(roadGraph, "Cabin", "Farm"));

function goalOrientedRobot({place, parcels}, route){
  if (route.length == 0){
    let parcel = parcels[0];
    if (parcel.place != place) {
      route = findRoute(roadGraph, place, parcel.place);
    } else {
      route = findRoute(roadGraph, place, parcel.address);
    }
  }
  return {direction: route[0], memory: route.slice(1)};
}

runRobot(VillageState.random(), goalOrientedRobot, []);

function compareRobots(robot1, memory1, robot2, memory2){
  var turn1 = 0;
  var turn2 = 0;

  for(let i = 0; i < 100; i++){
    var state = VillageState.random();
    turn1 += runRobot(state, robot1, memory1);
    turn2 += runRobot(state, robot2, memory2);
  }

  turn1 /= 100;
  turn2 /= 100;

  console.log(`Robot 1 took ${turn1} turns.`);
  console.log(`Robot 2 took ${turn2} turns.`);
}

// compareRobots(routeRobot, [], goalOrientedRobot, []);

// console.log(runRobot(VillageState.random(), goalOrientedRobot, []));

// var state = VillageState.random();

// console.log(state);

function shortestRoute(route1, route2){
  if (route1.length < route2.length) return route1;
  else return route2;
}

function myRobot({place, parcels}, route){
  if (route.length == 0){
    let shortest = [];
    for (let parcel of parcels){
      if (parcel.place != place) {
        route = findRoute(roadGraph, place, parcel.place);
      } else {
        route = findRoute(roadGraph, place, parcel.address);
      }
      if (shortest.length == 0) shortest = route;
      if (route.length < shortest.length) shortest = route;
    }
    route = shortest;
  }
  return {direction: route[0], memory: route.slice(1)};
}

// runRobot(VillageState.random() ,myRobot, []);

compareRobots(myRobot, [], goalOrientedRobot, []);
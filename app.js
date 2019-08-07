// Rover Object Goes Here
// ======================

let marsRover = { 
  direction: "N",
  position: [0, 0],
};

let travelLog = [
  ("Rover is facing " + marsRover.direction),
  ("Rover position is " + marsRover.position),
];

// ===========================
// =========== GRID ==========
// ===========================

let myGrid = new Array(10);

for (let i = 0; i < 10; i++) {
  myGrid[i] = new Array(10).fill('e');
};

// ===========================
// ======== OBSTACLES ========
// ===========================

let obstacle = {
  position: [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)],
  position2: [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)],
  position3: [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)]
};

myGrid[marsRover.position[0]][marsRover.position[1]] = 'R';
myGrid[obstacle.position[0]][obstacle.position[1]] = 'O';
myGrid[obstacle.position2[0]][obstacle.position2[1]] = 'O';
myGrid[obstacle.position3[0]][obstacle.position3[1]] = 'O';

// ===========================
// ========= MOVEMENT ========
// ===========================
  
function turnLeft() {
  console.log('turnLeft was called!');

  switch(marsRover.direction) {
    case 'N':
      marsRover.direction = "W";
      break;
    case 'W':
      marsRover.direction = "S";
      break;
    case 'S':
      marsRover.direction = "E";
      break;
    case 'E':
      marsRover.direction = "N";
      break;
  }
  console.log(marsRover);
}
  
function turnRight() {
  console.log('turnRight was called!');

  switch(marsRover.direction) {
    case 'N':
      marsRover.direction = "E";
      break;
    case 'E':
      marsRover.direction = "S";
      break;
    case 'S':
      marsRover.direction = "W";
      break;
    case 'W':
      marsRover.direction = "N";
      break;
  }
  console.log(marsRover);
}
    
function moveForward(){
  console.log("moveForward was called");
    
  switch (marsRover.direction) {
    case 'N':
      marsRover.position[0]--;
      break;
    case 'E':
      marsRover.position[1]++;
      break;
    case 'S':
      marsRover.position[0]++;
      break;
    case 'W':
      marsRover.position[1]--;
      break;
  }
  console.log(marsRover);
}

function moveBackward() {
  console.log("moveBackward was called");
  
  switch (marsRover.direction) {
    case 'N':
      marsRover.position[0]++;
      break;
    case 'E':
      marsRover.position[1]--;
      break;
    case 'S':
      marsRover.position[0]--;
      break;
    case 'W':
      marsRover.position[1]++;
      break;  
  }
  console.log(marsRover);
}

// ===========================
// ======= BOUNDARIES ========
// ===========================

function boundaries() {
  if (marsRover.position[0] < 0 || marsRover.position[0] > 9 || marsRover.position[1] < 0 || marsRover.position[1] > 9) {
      console.log("Boundarie found!");
  }  
};

function edges() {
  switch(marsRover.direction) {
    case "N":
      if (marsRover.position[0] < 0) {
        moveBackward();
        travelLog.pop();
        travelLog.push("Rover tried to move forward but found a boundarie");
      } else if (marsRover.position[0] >  9) {
        moveForward();
        travelLog.pop();
        travelLog.push("Rover tried to move backward but found a boundarie");
      };
      break;
    case "E":
        if (marsRover.position[1] > 9) {
          moveBackward();
          travelLog.pop();
          travelLog.push("Rover tried to move forward but found a boundarie");
        } else if (marsRover.position[1] < 0) {
          moveForward();
          travelLog.pop();
          travelLog.push("Rover tried to move backward but found a boundarie");
        };
      break;
    case "S":
        if (marsRover.position[0] > 9) {
          moveBackward();
          travelLog.pop();
          travelLog.push("Rover tried to move forward but found a boundarie");
        } else if (marsRover.position[0] <  0) {
          moveForward();
          travelLog.pop();
          travelLog.push("Rover tried to move backward but found a boundarie");
        };
    case "W":
        if (marsRover.position[1] < 0) {
          moveBackward();
          travelLog.pop();
          travelLog.push("Rover tried to move forward but found a boundarie");
        } else if (marsRover.position[1] >  9) {
          moveForward();
          travelLog.pop();
          travelLog.push("Rover tried to move backward but found a boundarie");
        };
      break;
  };
};

function forwardObstacles() {
  if (obstacle.position[0] === marsRover.position[0] && obstacle.position[1] === marsRover.position[1]|| obstacle.position2[0] === marsRover.position[0] && obstacle.position2[1] === marsRover.position[1] || obstacle.position3[0] === marsRover.position[0] && obstacle.position3[1] === marsRover.position[1]) {
    console.log("Obstacle found!");
    myGrid[marsRover.position[0]][marsRover.position[1]] = 'O';
    moveBackward();
    travelLog.pop();
    travelLog.push("Rover tried to move forward but found an obstacle");
  };
}

function backwardObstacles() {
  if (obstacle.position[0] === marsRover.position[0] && obstacle.position[1] === marsRover.position[1]|| obstacle.position2[0] === marsRover.position[0] && obstacle.position2[1] === marsRover.position[1] || obstacle.position3[0] === marsRover.position[0] && obstacle.position3[1] === marsRover.position[1]) {
    console.log("Obstacle found!");
    myGrid[marsRover.position[0]][marsRover.position[1]] = 'O';
    moveForward();
    travelLog.pop();
    travelLog.push("Rover tried to move backward but found an obstacle");
  };
}

// ===========================
// ======== COMMANDS =========
// ===========================

function commands(command) {
  for (let i = 0; i < command.length; i++) {
    switch (command[i]) {
      case 'b':
        myGrid[marsRover.position[0]][marsRover.position[1]] = 'e';
        moveBackward();
        travelLog.push("Rover moved backward to position " + marsRover.position);
        boundaries();
        edges();
        backwardObstacles();
        myGrid[marsRover.position[0]][marsRover.position[1]] = 'R';
        break;
      case 'f':
        myGrid[marsRover.position[0]][marsRover.position[1]] = 'e';
        moveForward();
        travelLog.push("Rover moved forward to position " + marsRover.position);
        boundaries();
        edges();
        forwardObstacles();
        myGrid[marsRover.position[0]][marsRover.position[1]] = 'R';
        break;
      case 'r':
        turnRight();
        travelLog.push("Rover turned right to face " + marsRover.direction);
        break;
      case 'l':
        turnLeft();
        travelLog.push("Rover turned left to face " + marsRover.direction);
        break;
      default:
          console.log("Only valid commands are letters ('l','r','b','f'), others will be ignored");
      }
    }
  }
  
  // ===========================
  // ========== TESTS ==========
  // ===========================

console.log("ORIGINAL GRID");
console.log("==========================================");
console.log(myGrid);
console.log("");
console.log("==========================================");
console.log("==========================================");
console.log("COMMANDS");
console.log("==========================================");
commands('rfffrfrfrblflfflbfrfffrfffllfffffffffflbbbb');
console.log("==========================================");
console.log("==========================================");
console.log("TRAVEL LOG");
console.log("==========================================");
console.log(travelLog);
console.log("==========================================");
console.log("==========================================");
console.log("RESULT GRID");
console.log("==========================================");
console.log(myGrid);

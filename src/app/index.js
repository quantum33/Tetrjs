// class definition
class Drop {
    constructor() {
        this.interval = 1000;
        this.counter = 0;
        this.time = 0;
        this.lastTime = 0;
    }

    setTime(value) {
        //console.log(`setTime to ${value}ms`);
        //this.lastTime = this.time;
        //this.time = value;
        [this.lastTime, this.time] = [this.time, value];

        //set counter
        const deltaTime = (this.time - this.lastTime);
        this.counter += deltaTime;
    }    
    isReadyToMovePiece() { return this.counter > this.interval; }
    resetCounter() { this.counter = 0; }
}

class Player {
    constructor(matrix) {
        this.position = {x:5, y:5};
        this.matrix = matrix;
    }
    reset() {
        this.position = {x:5, y:0};
    }
    moveDown()  { this.position.y++; }
    moveLeft()  { this.position.x--; }
    moveRight() { this.position.x++; }
}

class Arena {
    constructor() {
        this.matrix = matrixFactory(12, 20);
    }
    addPiece(piece, position) {
        piece.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value !== 0) {
                    //copy to arena
                    this.matrix[y + position.y][x + position.x] = value;
                }
            });
        });
    }

    collides(piece, position) {
        const [m, o] = [piece, position];
        for (let y=0; y<piece.length; ++y) {
            for (let x=0; x<piece[y].length; ++x) {
                if (piece[y][x] !== 0 && 
                    (this.matrix[y + position.y] && this.matrix[y + position.y][x + position.x]) !== 0) {
                    return true;
                }
            }
        }
        return false;
    }
}

class Helper {
    constructor() { }
    copyByValue(obj) {
        return JSON.parse(JSON.stringify(obj));    
    }
}

//--------------------------------------------------------------
function draw() {
    context.fillStyle = "#000";
    context.fillRect(0, 0, canvas.width, canvas.height);

    drawMatrix(arena.matrix, {x:0, y:0});
    drawMatrix(player.matrix, player.position);
}

function drawMatrix(matrix, offset) {
    matrix.forEach((row, y) => {
        //console.log(row, y);
        row.forEach((rowValue, x) => {
            // draw row
            //console.log(rowValue, x);
            if (rowValue !== 0) {
                context.fillStyle = "purple";
                context.fillRect(
                    x + offset.x,
                    y + offset.y,
                    1,
                    1);
            }
        });
    });
}
function matrixFactory(width, height) {
    const matrix = [];
    while (height--) {
        matrix.push(new Array(width).fill(0));
    }
    return matrix;
}

//playerDrop
function setMoveDownOperations() {
    player.moveDown();
    if (arena.collides(player.matrix, player.position)) {
        console.log("collides");
        const pos = player.position;
        pos.y--;
        arena.addPiece(matrix, pos);
        player.reset();
    }
    drop.resetCounter();
}
document.addEventListener("keydown", event => {
    const pos = helper.copyByValue(player.position);
    if (event.keyCode === 37) {
        pos.x--;
        if (!arena.collides(player.matrix, pos)) {
            player.moveLeft();
        }        
    }
    else if (event.keyCode === 39) {
        pos.x++;
        if (!arena.collides(player.matrix, pos)) {
            player.moveRight();
        }
    }
    else if (event.keyCode === 40) {
        setMoveDownOperations();
    }
});

function update(time = 0) {
    drop.setTime(time);
    if (drop.isReadyToMovePiece()) {
        setMoveDownOperations();
    }
    draw();
    requestAnimationFrame(update);    
}

//--------------------------------------------------------------
// Execution
console.log("Tetris");
const canvas = document.getElementById("tetris");
const context = canvas.getContext("2d");
context.scale(20, 20);

const matrix = [
    [0, 0, 0],
    [1, 1, 1],
    [0, 1, 0],
];

const drop = new Drop();
const player = new Player(matrix);
const arena = new Arena();
const helper = new Helper();
console.table(arena);
update();

//https://youtu.be/H2aW5V46khA?t=24m30s

//import {Drop} from './models/drop'
// Modules - import/exports
/* Needs:
    - npm init -y => note "package.json" file is created
    - install webpack (npm install webpack -g)
    - create "build" directory with a "bundle.js" file
    - update "path" in the "bundle.js"
    - create webpack.config.js (with "entry" and "output")
    - then "npm run build"
*/
// import {settings1, settings2} from './constants';
// console.log(settings1);
// console.log(settings2);

// import {Animal} from './animals/animal'
// import {Lion} from './animals/lion'
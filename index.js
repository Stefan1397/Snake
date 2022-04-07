const snakeParts = [];
let canvas = document.getElementById('canvas');
let context = canvas.getContext("2d");
let speed = 5;
let score = 0;
let level = 0;
let headLine = 14;
let headColumn = 7;
let moveLine = 0;
let moveColumn = 0;
let foodLine = Math.floor(Math.random() * 28);
let foodColumn = Math.floor(Math.random() * 16.5);
let snakeTail = 1;

class snakeBody {
    constructor(line, column) {
        this.line = line;
        this.column = column;
    }
}

function createGame() {
    changePosition();
    if (winner() || gameOver()) {
        return;
    }
    clearScreen();
    checkColision();
    createFood();
    createSnake();
    createScoreLevel();
    setTimeout(createGame, 1000 / speed);
}

function clearScreen() {
    context.fillStyle = "beige";
    context.fillRect(0, 0, canvas.width, canvas.height);
}

function createSnake() {
    context.fillStyle = "grey";
    for (let i = 0; i < snakeParts.length; ++i) {
        let part = snakeParts[i];
        context.fillRect(part.line * 18, part.column * 30, 20, 17);
    }
    snakeParts.push(new snakeBody(headLine, headColumn));
    while (snakeParts.length > snakeTail) {
        snakeParts.shift();
    }
    context.fillStyle = "rgb(117, 63, 27)";
    context.fillRect(headLine * 18, headColumn * 30, 20, 17);
}

function changePosition() {
    headLine = headLine + moveLine;
    headColumn = headColumn + moveColumn; 
}

function createFood() {
    context.fillStyle = "red";
    context.fillRect(foodLine * 18, foodColumn * 30, 20, 17);
}

function checkColision() {
    if (foodLine == headLine && foodColumn == headColumn) {
        foodLine = Math.floor(Math.random() * 15);
        foodColumn = Math.floor(Math.random() * 15);
        ++snakeTail;
        ++score;
        if (score % 2 == 0) {
            ++level;
        }
        if (level % 2 == 0) {
            speed += 2;
        }
        return level;
    }
}

function createScoreLevel() {
    context.fillStyle = 'black';
    context.font = '12px Arial';
    context.fillText('Score ' + score, canvas.width - 500, 10);
    context.fillText('Lvl ' + level, canvas.width - 35, 10)
}

function gameOver() {
    let gameOver = false;
    if (moveLine == 0 && moveColumn == 0) {
        return false;
    }
    if (headLine < 0 || headLine == 28 || headColumn < 0 || headColumn == 16.5) {
        gameOver = true;
    }
    for (let i = 0; i < snakeParts.length; ++i) {
        let part  = snakeParts[i];
        if (part.line == headLine && part.column == headColumn) {
            gameOver = true;
        }
    }
    if (gameOver) {
        context.fillStyle = 'red';
        context.font = '50px Arial';
        context.fillText("Game Over!", 120, 250, 400, 150);
    }
    return gameOver;
}

function winner() {
    let winner = false;
    if (level == 10) {
        winner = true;
    }
    if (winner) {
        context.fillStyle = 'green';
        context.font = '50px Arial';
        context.fillText("Winner", 160, 250, 400, 150);
    }
    return winner;
}

function resetGame() {
    location.reload();
}

document.body.addEventListener("keydown", keypress);

function keypress(event) {
    if (event.keyCode == 38) {
        moveLine = 0;
        moveColumn = -0.5;
    } else if (event.keyCode == 40) {
        moveLine = 0;
        moveColumn = 0.5;
    } else if (event.keyCode == 37) {
        moveLine = -1;
        moveColumn = 0;
    } else if (event.keyCode == 39) {
        moveLine = 1;
        moveColumn = 0;
    }
}

createGame();



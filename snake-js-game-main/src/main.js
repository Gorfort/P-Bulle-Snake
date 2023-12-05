// Projet : P_Bulles Snake
// Auteur : Thibaud Racine
// Classe : CID2A
// Lieu : ETML, Sébeillon
// Date : 05.12.23
 
// Constants
const gameBoard = document.querySelector("#gameBoard");
const ctx = gameBoard.getContext("2d");
const scoreText = document.querySelector("#scoreText");
const scoreValue = document.querySelector("#scoreValue");
const resetBtn = document.querySelector("#resetBtn");
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const boardBackground = "#555555";
const snakeColor = "#00b30f";
const snakeBorder = "transparent";
const foodColor = "red";
const unitSize = 25;
 
// Variables
let running = false;
let xVelocity = unitSize;
let yVelocity = 0;
let score = 0;
let apple;
let snake;
 
// Event listeners for keyboard and reset button
window.addEventListener("keydown", changeDirection);
resetBtn.addEventListener("click", resetGame);
 
// Function to start the game
// Function to start the game
gameStart();
async function gameStart() {
    running = true;
    scoreValue.style.color = "gray";
    scoreValue.textContent = score;
    await initializeGame(); // Wait for initialization to complete
    drawFruit();
    nextTick();
}
 
// Updated function to initialize game components
async function initializeGame() {
    const AppleModule = await import('./apple.js');
    const SnakeModule = await import('./snake.js');
 
    apple = new AppleModule.default(unitSize, gameWidth, gameHeight);
    snake = new SnakeModule.default(unitSize, 5);
}
// Game cycle function
function nextTick() {
    if (running) {
        setTimeout(() => {
            clearGame();
            drawFruit();
            moveSnake();
            drawSnake();
            checkGameOver();
            nextTick();
        }, 75);
    } else {
        displayGameOver();
    }
}
 
// Function to clear the game board
function clearGame() {
    ctx.fillStyle = boardBackground;
    ctx.fillRect(0, 0, gameWidth, gameHeight);
}
 
// Function to create a new position for fruit
function createFruit() {
    apple.position = apple.createRandomPosition();
}
 
// Function to draw the fruit
function drawFruit() {
    apple.draw(ctx, foodColor);
}
 
// Function to move the snake
function moveSnake() {
    snake.move(xVelocity, yVelocity);
 
    // If the snake eats a fruit
    if (snake.snakeBody[0].x === apple.position.x && snake.snakeBody[0].y === apple.position.y) {
        snake.eat();
        score += 1;
        scoreValue.style.color = "gray";
        scoreValue.textContent = score;
        createFruit();
    } else {
        snake.snakeBody.pop();
    }
}
 
// Function to draw the snake
function drawSnake() {
    snake.draw(ctx, snakeColor, snakeBorder);
}
 
// Variable to avoid rapid direction changes
let changingDirection = false;
 
// Function to handle direction changes
function changeDirection(event) {
    if (changingDirection) return;
    changingDirection = true;
    const keyPressed = event.keyCode;
    const isGoingUp = yVelocity === -unitSize;
    const isGoingDown = yVelocity === unitSize;
    const isGoingRight = xVelocity === unitSize;
    const isGoingLeft = xVelocity === -unitSize;
 
    switch (keyPressed) {
        case 37: // LEFT
            if (!isGoingRight && !isGoingLeft) {
                setDirection(-unitSize, 0);
            }
            break;
        case 38: // UP
            if (!isGoingDown && !isGoingUp) {
                setDirection(0, -unitSize);
            }
            break;
        case 39: // RIGHT
            if (!isGoingLeft && !isGoingRight) {
                setDirection(unitSize, 0);
            }
            break;
        case 40: // DOWN
            if (!isGoingUp && !isGoingDown) {
                setDirection(0, unitSize);
            }
            break;
    }
 
    setTimeout(() => {
        changingDirection = false;
    }, 5);
}
 
// Function to set the direction of the snake
function setDirection(newXVelocity, newYVelocity) {
    xVelocity = newXVelocity;
    yVelocity = newYVelocity;
}
 
// Function to check if the game is over
function checkGameOver() {
    switch (true) {
        // If the snake hits a wall
        case snake.snakeBody[0].x < 0:
        case snake.snakeBody[0].x >= gameWidth:
        case snake.snakeBody[0].y < 0:
        case snake.snakeBody[0].y >= gameHeight:
            running = false;
            break;
        // If the snake hits its own body with its head
        default:
            for (let i = 1; i < snake.snakeBody.length; i += 1) {
                if (
                    snake.snakeBody[i].x === snake.snakeBody[0].x &&
                    snake.snakeBody[i].y === snake.snakeBody[0].y
                ) {
                    running = false;
                    break;
                }
            }
            break;
    }
}
 
// Function to display the game over screen
function displayGameOver() {
    clearGame();
    ctx.font = "50px 'Designer', sans-serif";
    ctx.fillStyle = "Black";
    ctx.textAlign = "center";
    ctx.fillText("GAME OVER", gameWidth / 2, gameHeight / 2);
    running = false;
 
    // Styling of the "Try Again" button
    resetBtn.classList.add("gameOver");
    resetBtn.textContent = "Try Again";
    resetBtn.classList.remove("invisible");
    resetBtn.style.backgroundColor = "red";
    resetBtn.style.position = "absolute";
    resetBtn.style.width = "110px";
    resetBtn.style.top = "50%";
    resetBtn.style.left = "50%";
    resetBtn.style.transform = "translate(-50%, -50%)";
}
 
// Function to reset the game
function resetGame() {
    score = 0;
    xVelocity = unitSize;
    yVelocity = 0;
    scoreValue.style.color = "gray";
    resetBtn.classList.remove("gameOver");
    resetBtn.textContent = "Réinitialiser";
    if (!running) {
        resetBtn.classList.add("invisible");
    }
    resetBtn.style.position = "";
    resetBtn.style.top = "";
    resetBtn.style.right = "";
    resetBtn.style.transform = "";
    gameStart();
}
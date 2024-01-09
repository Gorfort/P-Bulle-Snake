// Projet : P_Bulles Snake
// Auteur : Thibaud Racine
// Classe : CID2A
// Lieu : ETML, Sébeillon
// Date : 05.12.23
// Fichier : Main.js
// Description : Game Engine du Snake.

// Constantes
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

// Event listeners pour le clavier et le bouton reset
window.addEventListener("keydown", changeDirection);
resetBtn.addEventListener("click", resetGame);

// Lancer le jeu
gameStart();
async function gameStart() {
  running = true;
  scoreValue.style.color = "lightGray";
  scoreValue.textContent = score;
  await initializeGame(); // Attentde de l'initialization
  drawFruit();
  nextTick();
}

// Mise à jour pour initialiser les compostants du jeu
async function initializeGame() {
  const AppleModule = await import("./apple.js");
  const SnakeModule = await import("./snake.js");

  apple = new AppleModule.default(unitSize, gameWidth, gameHeight);
  snake = new SnakeModule.default(unitSize, 5);
}

// Cycles du jeu
function nextTick() {
  if (running) {
    // Si le jeu tourne
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

// Clear le jeu
function clearGame() {
  ctx.fillStyle = boardBackground;
  ctx.fillRect(0, 0, gameWidth, gameHeight);
}

// Crée une nouvelle position pour le fruit
function createFruit() {
  apple.position = apple.createRandomPosition();
}

// Dessine le fruit
function drawFruit() {
  apple.draw(ctx, foodColor);
}

// Faire bouger le snake
function moveSnake() {
  snake.move(xVelocity, yVelocity);

  // Si le snake mange un fruit
  if (
    snake.snakeBody[0].x === apple.position.x &&
    snake.snakeBody[0].y === apple.position.y
  ) {
    score += 1;
    scoreValue.style.color = "lightGray";
    scoreValue.textContent = score;
    createFruit();
  } else {
    snake.snakeBody.pop();
  }
}

// Dessine le Snake
function drawSnake() {
  snake.draw(ctx, snakeColor, snakeBorder);
}

// Variable pour éviter les changements de directions trop rapide
let changingDirection = false;

// S'occupe des changements de direction
function changeDirection(event) {
  if (changingDirection) return;
  changingDirection = true;
  const keyPressed = event.keyCode;
  const isGoingUp = yVelocity === -unitSize;
  const isGoingDown = yVelocity === unitSize;
  const isGoingRight = xVelocity === unitSize;
  const isGoingLeft = xVelocity === -unitSize;

  switch (keyPressed) {
    case 37: // GAUCHE
      if (!isGoingRight && !isGoingLeft) {
        setDirection(-unitSize, 0);
      }
      break;
    case 38: // HAUT
      if (!isGoingDown && !isGoingUp) {
        setDirection(0, -unitSize);
      }
      break;
    case 39: // DROITE
      if (!isGoingLeft && !isGoingRight) {
        setDirection(unitSize, 0);
      }
      break;
    case 40: // BAS
      if (!isGoingUp && !isGoingDown) {
        setDirection(0, unitSize);
      }
      break;
  }

  setTimeout(() => {
    changingDirection = false;
  }, 5);
}

// Set la direction du Snake
function setDirection(newXVelocity, newYVelocity) {
  xVelocity = newXVelocity;
  yVelocity = newYVelocity;
}

// Check si la partie est perdue
function checkGameOver() {
  switch (true) {
    // Si le Snake touche un mur
    case snake.snakeBody[0].x < 0:
    case snake.snakeBody[0].x >= gameWidth:
    case snake.snakeBody[0].y < 0:
    case snake.snakeBody[0].y >= gameHeight:
      running = false;
      break;
    // Si le snake touche son propre corps
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

// Display le Game Over
function displayGameOver() {
  -clearGame();
  ctx.font = "50px 'Designer', sans-serif";
  ctx.fillStyle = "Black";
  ctx.textAlign = "center";
  ctx.fillText("GAME OVER", gameWidth / 2, gameHeight / 2);
  running = false;

  // Style du bouton "Try Again"
  resetBtn.classList.add("gameOver");
  resetBtn.textContent = "Try Again";
  resetBtn.classList.remove("invisible");
  resetBtn.style.backgroundColor = "red";
  resetBtn.style.color = "white";
  resetBtn.style.position = "absolute";
  resetBtn.style.width = "110px";
  resetBtn.style.top = "340px";
  resetBtn.style.left = "50%";
  resetBtn.style.transform = "translate(-50%, -50%)";
}

// Reset le jeu
function resetGame() {
  score = 0;
  xVelocity = unitSize;
  yVelocity = 0;
  scoreValue.style.color = "white";
  resetBtn.classList.remove("gameOver");
  resetBtn.textContent = "";
  if (!running) {
    resetBtn.classList.add("invisible");
  }
  resetBtn.style.position = "";
  resetBtn.style.top = "";
  resetBtn.style.right = "";
  resetBtn.style.transform = "";
  gameStart();
}

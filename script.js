const player1 = document.getElementById("player1");
const player2 = document.getElementById("player2");
const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");
const gameArea = document.getElementById("gameArea");
const scoreboard = document.getElementById("scoreboard");
const winnerScreen = document.getElementById("winnerScreen");
const winnerText = document.getElementById("winnerText");

let score1 = 0;
let score2 = 0;
let gameRunning = false;

let pos1 = { x: 50, y: 50 };
let pos2 = { x: 500, y: 300 };

const speed = 10;

// Start Game
startBtn.addEventListener("click", startGame);
restartBtn.addEventListener("click", startGame);

function startGame() {
  score1 = 0;
  score2 = 0;
  updateScore();
  gameRunning = true;

  pos1 = { x: 50, y: 50 };
  pos2 = { x: 500, y: 300 };

  movePlayers();

  gameArea.style.display = "block";
  scoreboard.style.display = "block";
  winnerScreen.style.display = "none";
  document.getElementById("startScreen").style.display = "none";
}

// Keyboard Controls
document.addEventListener("keydown", (e) => {
  if (!gameRunning) return;

  // Player 1 controls - WASD
  if (e.key === "w") pos1.y -= speed;
  if (e.key === "s") pos1.y += speed;
  if (e.key === "a") pos1.x -= speed;
  if (e.key === "d") pos1.x += speed;

  // Player 2 controls - Arrow Keys
  if (e.key === "ArrowUp") pos2.y -= speed;
  if (e.key === "ArrowDown") pos2.y += speed;
  if (e.key === "ArrowLeft") pos2.x -= speed;
  if (e.key === "ArrowRight") pos2.x += speed;

  movePlayers();
  checkCollision();
});

// Move player divs
function movePlayers() {
  player1.style.left = pos1.x + "px";
  player1.style.top = pos1.y + "px";
  player2.style.left = pos2.x + "px";
  player2.style.top = pos2.y + "px";
}

// Collision check
function checkCollision() {
  const dx = pos1.x - pos2.x;
  const dy = pos1.y - pos2.y;
  const distance = Math.sqrt(dx * dx + dy * dy);

  if (distance < 30) {
    if (Math.random() < 0.5) {
      score1++;
    } else {
      score2++;
    }
    updateScore();
    resetPositions();

    if (score1 === 5 || score2 === 5) {
      showWinner();
    }
  }
}

function resetPositions() {
  pos1 = { x: 50, y: 50 };
  pos2 = { x: 500, y: 300 };
  movePlayers();
}

function updateScore() {
  document.getElementById("score1").textContent = score1;
  document.getElementById("score2").textContent = score2;
}

function showWinner() {
  gameRunning = false;
  winnerText.textContent = score1 === 5 ? "🎉 Player 1 Wins!" : "🎉 Player 2 Wins!";
  winnerScreen.style.display = "block";
}

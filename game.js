// ====== MONSTER BATTLE 2.0 ======

let playerName = "";
let score = 0;
let playerHP = 100;
let monsterHP = 100;
let currentQuestionIndex = 0;
let timer;
let timeLeft = 10;

let usedQuestions = [];

const loginScreen = document.getElementById("loginScreen");
const gameScreen = document.getElementById("gameScreen");
const leaderboardScreen = document.getElementById("leaderboardScreen");

const playerNameInput = document.getElementById("playerName");
const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const scoreElement = document.getElementById("score");
const timerElement = document.getElementById("timer");
const playerHPBar = document.getElementById("playerHP");
const monsterHPBar = document.getElementById("monsterHP");
const leaderboardList = document.getElementById("leaderboardList");

// ===== LOGIN =====

function startGame() {
  playerName = playerNameInput.value.trim();
  if (playerName === "") {
    alert("Please enter your name!");
    return;
  }

  loginScreen.style.display = "none";
  gameScreen.style.display = "block";

  resetGame();
  loadQuestion();
}

function resetGame() {
  score = 0;
  playerHP = 100;
  monsterHP = 100;
  usedQuestions = [];
  updateUI();
}

// ===== QUESTIONS =====

function loadQuestion() {
  if (usedQuestions.length === questions.length) {
    endGame(true);
    return;
  }

  do {
    currentQuestionIndex = Math.floor(Math.random() * questions.length);
  } while (usedQuestions.includes(currentQuestionIndex));

  usedQuestions.push(currentQuestionIndex);

  const currentQuestion = questions[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;

  answersElement.innerHTML = "";

  currentQuestion.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.onclick = () => selectAnswer(answer.correct);
    answersElement.appendChild(button);
  });

  startTimer();
}

// ===== TIMER =====

function startTimer() {
  timeLeft = 10;
  timerElement.textContent = timeLeft;

  clearInterval(timer);
  timer = setInterval(() => {
    timeLeft--;
    timerElement.textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timer);
      damagePlayer();
      loadQuestion();
    }
  }, 1000);
}

// ===== ANSWER =====

function selectAnswer(correct) {
  clearInterval(timer);

  if (correct) {
    score += 10;
    damageMonster();
  } else {
    damagePlayer();
  }

  updateUI();

  if (playerHP <= 0) {
    endGame(false);
    return;
  }

  if (monsterHP <= 0) {
    monsterHP = 100; // Boss reset
  }

  setTimeout(loadQuestion, 800);
}

// ===== DAMAGE SYSTEM =====

function damagePlayer() {
  playerHP -= 20;
  updateUI();
}

function damageMonster() {
  monsterHP -= 20;
  updateUI();
}

function updateUI() {
  scoreElement.textContent = score;
  playerHPBar.style.width = playerHP + "%";
  monsterHPBar.style.width = monsterHP + "%";
}

// ===== END GAME =====

function endGame(win) {
  clearInterval(timer);

  saveScore();

  alert(win ? "YOU WIN!" : "GAME OVER!");

  gameScreen.style.display = "none";
  showLeaderboard();
}

// ===== LEADERBOARD =====

function saveScore() {
  let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];

  leaderboard.push({
    name: playerName,
    score: score,
    date: new Date().toLocaleDateString()
  });

  leaderboard.sort((a, b) => b.score - a.score);
  leaderboard = leaderboard.slice(0, 10);

  localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
}

function showLeaderboard() {
  leaderboardScreen.style.display = "block";
  leaderboardList.innerHTML = "";

  let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];

  leaderboard.forEach(player => {
    const li = document.createElement("li");
    li.textContent = `${player.name} - ${player.score} (${player.date})`;
    leaderboardList.appendChild(li);
  });
}

function resetLeaderboard() {
  localStorage.removeItem("leaderboard");
  showLeaderboard();
}

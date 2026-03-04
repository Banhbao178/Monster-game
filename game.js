let score = 0;
let timeLeft = 30;
let playerHP = 100;
let monsterHP = 100;
let currentQuestion = 0;
let timer;

const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const playerHPEl = document.getElementById("playerHP");
const monsterHPEl = document.getElementById("monsterHP");
const leaderboardScreen = document.getElementById("leaderboardScreen");
const leaderboardList = document.getElementById("leaderboardList");

function startGame() {
  showQuestion();
  startTimer();
}

function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    timeEl.textContent = timeLeft;

    if (timeLeft <= 0) {
      endGame();
    }
  }, 1000);
}

function showQuestion() {
  const q = questions[currentQuestion];
  questionEl.textContent = q.question;
  answersEl.innerHTML = "";

  q.answers.forEach(answer => {
    const btn = document.createElement("button");
    btn.textContent = answer.text;
    btn.onclick = () => selectAnswer(answer.correct);
    answersEl.appendChild(btn);
  });
}

function selectAnswer(correct) {
  if (correct) {
    score += 10;
    monsterHP -= 20;
  } else {
    playerHP -= 20;
  }

  updateUI();

  currentQuestion++;
  if (currentQuestion >= questions.length) {
    currentQuestion = 0;
  }

  if (playerHP <= 0 || monsterHP <= 0) {
    endGame();
  } else {
    showQuestion();
  }
}

function updateUI() {
  scoreEl.textContent = score;
  playerHPEl.style.width = playerHP + "%";
  monsterHPEl.style.width = monsterHP + "%";
}

function endGame() {
  clearInterval(timer);
  questionEl.style.display = "none";
  answersEl.style.display = "none";
  leaderboardScreen.style.display = "block";

  saveScore();
  loadLeaderboard();
}

function restartGame() {
  location.reload();
}

function saveScore() {
  let scores = JSON.parse(localStorage.getItem("monsterScores")) || [];
  scores.push(score);
  scores.sort((a, b) => b - a);
  scores = scores.slice(0, 5);
  localStorage.setItem("monsterScores", JSON.stringify(scores));
}

function loadLeaderboard() {
  let scores = JSON.parse(localStorage.getItem("monsterScores")) || [];
  leaderboardList.innerHTML = "";

  scores.forEach((s, index) => {
    const li = document.createElement("li");
    li.textContent = `${index + 1}. ${s} points`;
    leaderboardList.appendChild(li);
  });
}

function resetLeaderboard() {
  localStorage.removeItem("monsterScores");
  loadLeaderboard();
}

startGame();

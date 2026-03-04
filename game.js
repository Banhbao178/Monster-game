let score = 0;
let timeLeft = 30;
let playerHP = 100;
let monsterHP = 100;
let level = 1;
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
  const q = questions[Math.floor(Math.random() * questions.length)];
  questionEl.textContent = `Level ${level} - ${q.question}`;
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

    monsterHPEl.classList.add("shake");
    setTimeout(() => monsterHPEl.classList.remove("shake"), 300);

  } else {
    playerHP -= 20;

    playerHPEl.classList.add("flash");
    setTimeout(() => playerHPEl.classList.remove("flash"), 300);
  }

  updateUI();

  if (playerHP <= 0) {
    endGame();
  } else if (monsterHP <= 0) {
    nextLevel();
  } else {
    showQuestion();
  }
}

function nextLevel() {
  level++;
  monsterHP = 100 + (level - 1) * 20;
  playerHP = Math.min(playerHP + 20, 100);
  showQuestion();
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

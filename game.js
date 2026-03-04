let xp = parseInt(localStorage.getItem("xp")) || 0;
let shield = false;
let skillReady = false;
let score = 0;
let timeLeft = 30;
let playerHP = 100;
let monsterHP = 100;
let level = 1;
let timer;

const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const playerHPEl = document.getElementById("playerHP");
const monsterHPEl = document.getElementById("monsterHP");
const leaderboardScreen = document.getElementById("leaderboardScreen");
const leaderboardList = document.getElementById("leaderboardList");
function useSkill() {

  if (level < 5) {
    alert("Reach Level 5 to unlock this skill!");
    return;
  }

  monsterHP -= 40;
  updateUI();

  if (monsterHP <= 0) {
    nextLevel();
  }
}

function useShield() {

  if (level < 3) {
    alert("Reach Level 3 to unlock Shield!");
    return;
  }

  shield = true;
  alert("Shield Activated! Next wrong answer won't hurt you.");
}
function startGame() {
  showQuestion();
  startTimer();
}

function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    timeEl.textContent = timeLeft;

    if (timeLeft <= 0) endGame();
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

  const damage = 15 + level * 2;

  if (correct) {document.getElementById("attackSound").play();
    score += 10;
    monsterHP -= damage;

    monsterHPEl.classList.add("shake-strong");
    monsterHPEl.classList.add("hit");

    setTimeout(() => {
      monsterHPEl.classList.remove("shake-strong");
      monsterHPEl.classList.remove("hit");
    }, 400);

  } else {document.getElementById("hitSound").play(); 
if (shield) {
  shield = false;
} else {
  playerHP -= 15;
}
    playerHPEl.classList.add("shake-strong");
    playerHPEl.classList.add("hit");

    setTimeout(() => {
      playerHPEl.classList.remove("shake-strong");
      playerHPEl.classList.remove("hit");
    }, 400);
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

  // Boss mỗi 3 level
  if (level % 3 === 0) {
    monsterHP = 200 + level * 20;
    showLevelUp("🔥 BOSS LEVEL 🔥");
  } else {
    monsterHP = 100 + level * 20;
    showLevelUp("⚡ LEVEL UP!");
  }

  // hồi máu nhẹ
  playerHP = Math.min(playerHP + 20, 100);

  updateUI();
  setTimeout(showQuestion, 800);
}

function showLevelUp(text) {
  questionEl.innerHTML = `<div class="level-up">${text}</div>`;
  answersEl.innerHTML = "";
}

function updateUI() {
  scoreEl.textContent = score;
  playerHPEl.style.width = Math.max(playerHP, 0) + "%";
  monsterHPEl.style.width = Math.max(monsterHP, 0) + "%";
}

function endGame() {
  clearInterval(timer);
  questionEl.style.display = "none";
  answersEl.style.display = "none";
  leaderboardScreen.style.display = "block";

  saveScore();
  loadLeaderboard();
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

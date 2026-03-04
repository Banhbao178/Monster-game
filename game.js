let currentUser = localStorage.getItem("currentUser");
let student = JSON.parse(localStorage.getItem(currentUser));

document.getElementById("welcome").innerText =
  "Welcome, " + currentUser;

function updateUI() {
  document.getElementById("xp").innerText = student.xp;
  document.getElementById("gold").innerText = student.gold;

  let percent = (student.monsterHP / 100) * 100;
  document.getElementById("hp").style.width = percent + "%";
}

let questionData = {
  question: "Yesterday I ___ to school.",
  options: ["go", "went", "gone", "going"],
  correct: 1
};

function loadQuestion() {
  document.getElementById("question").innerText = questionData.question;
  let div = document.getElementById("answers");
  div.innerHTML = "";

  questionData.options.forEach((opt, i) => {
    let btn = document.createElement("button");
    btn.innerText = opt;
    btn.onclick = () => checkAnswer(i);
    div.appendChild(btn);
  });
}

function checkAnswer(index) {
  if (index === questionData.correct) {
    student.monsterHP -= 20;
    student.xp += 10;
    student.gold += 5;
    document.getElementById("result").innerText = "💥 Good hit!";
  } else {
    document.getElementById("result").innerText = "❌ Wrong!";
  }

  if (student.monsterHP <= 0) {
    student.monsterHP = 100;
    let reward = getRandomReward();
    document.getElementById("result").innerText =
      "🎉 Monster defeated! Reward: " + reward;
  }

  localStorage.setItem(currentUser, JSON.stringify(student));
  updateUI();
}

function getRandomReward() {
  const rewards = ["20 Gold", "Shield", "Double XP"];
  return rewards[Math.floor(Math.random() * rewards.length)];
}

updateUI();
loadQuestion();
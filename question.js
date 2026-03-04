const questions = [
  {
    question: "Yesterday I ___ to school.",
    options: ["go", "went", "gone", "going"],
    correct: 1
  },
  {
    question: "She ___ playing now.",
    options: ["is", "are", "was", "be"],
    correct: 0
  },
  {
    question: "We ___ dinner at 7 yesterday.",
    options: ["eat", "ate", "eaten", "eating"],
    correct: 1
  }
];

function getRandomQuestion() {
  return questions[Math.floor(Math.random() * questions.length)];
}

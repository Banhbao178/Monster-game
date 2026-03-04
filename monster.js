const monsters = [
  { name: "Grammar Goblin", hp: 100, emoji: "👾" },
  { name: "Tense Zombie", hp: 150, emoji: "🧟" },
  { name: "Article Dragon", hp: 200, emoji: "🐉" }
];

function getMonster(level) {
  return monsters[(level - 1) % monsters.length];
}

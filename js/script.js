const inputArea = document.getElementById('inputArea');
const startButton = document.getElementById('startButton');
const randomOrder = document.getElementById('randomOrder');
const originalOrder = document.getElementById('originalOrder');
const quizArea = document.getElementById('quizArea');
const questionText = document.getElementById('questionText');
const answerText = document.getElementById('answerText');
const showAnswer = document.getElementById('showAnswer');
const gotItRight = document.getElementById('gotItRight');
const gotItWrong = document.getElementById('gotItWrong');
const finalScreen = document.getElementById('finalScreen');
const correctList = document.getElementById('correctList');
const wrongList = document.getElementById('wrongList');

let flashcards = [];
let currentIndex = 0;
let currentSet = [];
let correct = [];
let wrong = [];

function parseInput(input) {
  return input.split('\n').map(line => {
    const match = line.match(/P:\s*(.*?)\s*\/\s*R:\s*(.*)/);
    return match ? { question: match[1], answer: match[2] } : null;
  }).filter(x => x);
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function startQuiz() {
  flashcards = parseInput(inputArea.value);
  currentIndex = 0;
  correct = [];
  wrong = [];
  finalScreen.style.display = 'none';
  quizArea.style.display = 'block';
  answerText.classList.add('hidden');
  gotItRight.classList.add('hidden');
  gotItWrong.classList.add('hidden');

  currentSet = originalOrder.checked ? flashcards.slice() : shuffle(flashcards.slice());
  showNextQuestion();
}

function showNextQuestion() {
  if (currentIndex >= currentSet.length) {
    finishQuiz();
    return;
  }
  const card = currentSet[currentIndex];
  questionText.textContent = `P: ${card.question}`;
  answerText.textContent = `R: ${card.answer}`;
  answerText.classList.add('hidden');
  gotItRight.classList.add('hidden');
  gotItWrong.classList.add('hidden');
}

function showAnswerText() {
  answerText.classList.remove('hidden');
  gotItRight.classList.remove('hidden');
  gotItWrong.classList.remove('hidden');
}

function recordAnswer(correctAnswer) {
  const card = currentSet[currentIndex];
  (correctAnswer ? correct : wrong).push(card);
  currentIndex++;
  showNextQuestion();
}

function finishQuiz() {
  quizArea.style.display = 'none';
  finalScreen.style.display = 'block';
  correctList.innerHTML = correct.map(c => `<li>P: ${c.question} / R: ${c.answer}</li>`).join('');
  wrongList.innerHTML = wrong.map(c => `<li>P: ${c.question} / R: ${c.answer}</li>`).join('');
}

function restart(onlyWrong) {
  currentSet = onlyWrong ? wrong.slice() : flashcards.slice();
  if (!originalOrder.checked) currentSet = shuffle(currentSet);
  correct = [];
  wrong = [];
  currentIndex = 0;
  finalScreen.style.display = 'none';
  quizArea.style.display = 'block';
  showNextQuestion();
}

startButton.addEventListener('click', startQuiz);
showAnswer.addEventListener('click', showAnswerText);
gotItRight.addEventListener('click', () => recordAnswer(true));
gotItWrong.addEventListener('click', () => recordAnswer(false));

document.addEventListener('keydown', e => {
  if (e.key === 'Enter' && inputArea.value.trim() !== '') {
    startQuiz();
  }
});

const startBtn = document.getElementById('start-btn');
const quizScreen = document.getElementById('quiz-screen');
const endScreen = document.getElementById('end-screen');
const questionContainer = document.getElementById('question-container');
const answerButtons = document.getElementById('answer-buttons');
const timerEl = document.getElementById('time');
const finalScoreEl = document.getElementById('final-score');
const initialsInput = document.getElementById('initials');
const saveScoreBtn = document.getElementById('save-score-btn');

let questions = [
    {
        question: 'What is 2 + 2?',
        answers: [
            { text: '3', correct: false },
            { text: '4', correct: true },
            { text: '5', correct: false },
            { text: '6', correct: false }
        ]
    },
    // Add more questions as needed
];

let currentQuestionIndex = 0;
let timeLeft = 60;
let timer;

startBtn.addEventListener('click', startQuiz);
answerButtons.addEventListener('click', selectAnswer);
saveScoreBtn.addEventListener('click', saveScore);

function startQuiz() {
    startBtn.parentElement.classList.add('hidden');
    quizScreen.classList.remove('hidden');
    timer = setInterval(updateTime, 1000);
    showQuestion();
}

function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    document.getElementById('question').textContent = currentQuestion.question;
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.textContent = answer.text;
        button.classList.add('btn');
        button.dataset.correct = answer.correct;
        answerButtons.appendChild(button);
    });
}

function resetState() {
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    if (!e.target.matches('button')) return;
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === 'true';
    if (!correct) {
        timeLeft -= 10;
        if (timeLeft < 0) timeLeft = 0;
    }
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        showQuestion();
    } else {
        endQuiz();
    }
}

function updateTime() {
    timeLeft--;
    timerEl.textContent = timeLeft;
    if (timeLeft <= 0) {
        endQuiz();
    }
}

function endQuiz() {
    clearInterval(timer);
    quizScreen.classList.add('hidden');
    endScreen.classList.remove('hidden');
    finalScoreEl.textContent = timeLeft;
}

function saveScore() {
    const initials = initialsInput.value.trim();
    if (initials) {
        const scores = JSON.parse(localStorage.getItem('scores')) || [];
        const newScore = { initials, score: timeLeft };
        scores.push(newScore);
        localStorage.setItem('scores', JSON.stringify(scores));
        alert('Score saved!');
    }
}
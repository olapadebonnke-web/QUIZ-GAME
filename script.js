// DOM ELEMENTS
const startScreen = document.getElementById("start-screen")
const quizScreen = document.getElementById("quiz-screen")
const resultScreen = document.getElementById("result-screen")
const startButton = document.getElementById("start-btn")
const questionText = document.getElementById("question-text")
const answersContainer = document.getElementById("answers-container")
const currentQuestionSpan = document.getElementById("current-question")
const totalQuestionsSpan = document.getElementById("total-questions")
const scoreSpan = document.getElementById("score")
const finalScoreSpan = document.getElementById("final-score")
const maxScoreSpan = document.getElementById("max-score")
const resultMessage = document.getElementById("result-message")
const restartButton = document.getElementById("restart-btn")
const progressBar = document.getElementById("progress")



const quizQuestions = [
    {
        question: "What is the capital of France?",
        answers: [
            { text: "London", correct: false },
            { text: "Berlin", correct: false },
            { text: "Paris", correct: true },
            { text: "Madrid", correct: false },
        ],
    },
        {
        question: "Which planet is known as the Red planet?",
        answers: [
            { text: "Venus", correct: false },
            { text: "Mars", correct: true },
            { text: "Jupiter", correct: false },
            { text: "Madrid", correct: false },
        ],
    },
        {
        question: "What is the largest ocean on Earth?",
        answers: [
            { text: "Atlantic Ocean", correct: false },
            { text: "Indian Ocean", correct: false },
            { text: "Arctic Ocean", correct: false },
            { text: "Pacific Ocean", correct: true },
        ],
    },
        {
        question: "Which of this is NOT a programming language?",
        answers: [
            { text: "Java", correct: false },
            { text: "Python", correct: false },
            { text: "Banana", correct: true },
            { text: "Javascipt", correct: false },
        ],
    },
        {
        question: "What is the chemical symbol for gold?",
        answers: [
            { text: "Go", correct: false },
            { text: "Gd", correct: false },
            { text: "Au", correct: true },
            { text: "Ag", correct: false },
        ],
    },
]


// QUIZ STATE VARS
let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;

totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

// event listeners

startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);


function startQuiz() {
   // reset vars
   currentQuestionIndex = 0;
   answersDisabled = false;
   scoreSpan.textContent = 0;

   progressBar.style.width = "0%"

   startScreen.classList.remove("active"); 
   resultScreen.classList.remove("active")

   quizScreen.classList.add("active");

   showQuestion();
}

function showQuestion() {
    // reset state
    answersDisabled = false;

    const currentQuestion = quizQuestions[currentQuestionIndex];

    currentQuestionSpan.textContent = currentQuestionIndex + 1;

    const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
    progressBar.style.width = progressPercent + "%"

    questionText.textContent = currentQuestion.question;

    // todo: explain this in a second
    answersContainer.innerHTML = "";

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.textContent = answer.text;
        button.classList.add("answer-btn");

        // what is dataset?
        button.dataset.correct = answer.correct;

        button.addEventListener("click",selectAnswer);

        answersContainer.appendChild(button);
    });
}

// SELECT ANSWER
function selectAnswer(event) {
    if (answersDisabled) return;

    answersDisabled = true;

    const selectedButton = event.target;
    const isCorrect = selectedButton.dataset.correct === "true";

    // FIXED: removed ".array"
    Array.from(answersContainer.children).forEach((button) => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        } else {
            button.classList.add("incorrect");
        }
    });

    if (isCorrect) {
        score++;
        scoreSpan.textContent = score;
    }

    // Move to the next question after a short delay
    setTimeout(() => {
        currentQuestionIndex++;

        if (currentQuestionIndex < quizQuestions.length) {
            showQuestion();
        } else {
            showResult();
        }
    }, 1000);
}

    // SHOW RESULT
function showResult() {
    quizScreen.classList.remove("active");
    resultScreen.classList.add("active");

    finalScoreSpan.textContent = score;
    maxScoreSpan.textContent = quizQuestions.length;

    const percentage = (score / quizQuestions.length) * 100;

    if (percentage === 100) {
        resultMessage.textContent = "Perfect score! Great job!";
    } else if (percentage >= 70) {
        resultMessage.textContent = "Great job!";
    } else if (percentage >= 50) {
        resultMessage.textContent = "Good effort! Keep practicing.";
    } else {
        resultMessage.textContent = "Keep practicing. You can do better!";
    }

    progressBar.style.width = "100%";
}


function restartQuiz() {
    startQuiz();
}
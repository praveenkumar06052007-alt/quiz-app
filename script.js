const questions = [
    {
        question: "What is the capital of India?",
        answers: [
            { text: "New Delhi", correct: true },
            { text: "Mumbai", correct: false },
            { text: "Kolkata", correct: false },
            { text: "Chennai", correct: false }
        ]
    },
    {
        question: "Which language is used for web styling?",
        answers: [
            { text: "HTML", correct: false },
            { text: "CSS", correct: true },
            { text: "Python", correct: false },
            { text: "C++", correct: false }
        ]
    },
    {
        question: "JavaScript runs in?",
        answers: [
            { text: "Browser", correct: true },
            { text: "Photoshop", correct: false },
            { text: "MS Word", correct: false },
            { text: "Terminal only", correct: false }
        ]
    }
];

let currentQuestionIndex = 0;
let score = 0;

const questionEl = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextBtn = document.getElementById("next-btn");
const resultBox = document.getElementById("result-box");
const scoreEl = document.getElementById("score");

function loadQuestion() {
    resetState();
    let current = questions[currentQuestionIndex];
    questionEl.textContent = current.question;

    current.answers.forEach(answer => {
        const button = document.createElement("button");
        button.textContent = answer.text;
        button.classList.add("answer-btn");
        if (answer.correct) {
            button.dataset.correct = true;
        }
        button.addEventListener("click", selectAnswer);
        answerButtons.appendChild(button);
    });
}

function resetState() {
    answerButtons.innerHTML = "";
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const correct = selectedBtn.dataset.correct === "true";

    if (correct) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("wrong");
    }

    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });

    nextBtn.style.display = "block";
}

nextBtn.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
        nextBtn.style.display = "none";
    } else {
        showScore();
    }
});

function showScore() {
    document.getElementById("quiz-box").classList.add("hidden");
    resultBox.classList.remove("hidden");

    scoreEl.textContent = `${score} / ${questions.length}`;
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    resultBox.classList.add("hidden");
    document.getElementById("quiz-box").classList.remove("hidden");
    nextBtn.style.display = "none";
    loadQuestion();
}

loadQuestion();

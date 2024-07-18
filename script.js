const questions = [
    {
        question: "Software is defined as___",
        answers: [
            {text: "set of programs, documentation & configuration of data", correct: true},   
            {text: "set of programs", correct: false},
            {text: "documentation and configuration of data", correct: false},
            {text: "None of the above", correct: false},
        ]
    },
    {
        question: "Who is the father of Software Engineering?",
        answers: [
            {text: "Margaret Hamilton", correct: false},   
            {text: "Watts S. Humphrey", correct: true},
            {text: "Alan Turing", correct: false},
            {text: "Boris Beizer", correct: false},
        ]
    },
    {
        question: " ____________ is a software development activity that is not a part of software processes.",
        answers: [
            {text: "Validation", correct: false},   
            {text: "Specification", correct: false},
            {text: "Development", correct: false},
            {text: "Dependence", correct: true},
        ]
    },
];

const questionElement = document.getElementById("question");
const answerButtons  = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function StartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button); 
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++; 
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        StartQuiz();
    }
});

document.addEventListener('DOMContentLoaded', (event) => {
    StartQuiz();
});

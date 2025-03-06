const questions = [
    {
        question: "Which is the largest animal in the world?",
        answer: [
            { text: "Blue Whale", correct: true },
            { text: "shark", correct: false },
            { text: "Giraffe", correct: false },
            { text: "Elephant", correct: false },
        ],
    },
    {
        question: "What is the capital of France?",
        answer: [
            { text: "London", correct: false },
            { text: "New York", correct: false },
            { text: "Paris", correct: true },
            { text: "Dubai", correct: false },
        ],
    },
    {
        question: "What is the currency of Japan?",
        answer: [
            { text: "Yen", correct: true },
            { text: "Dollar", correct: false },
            { text: "Euro", correct: false },
            { text: "Pound", correct: false },
        ],
    },
    {
        question: "What is the largest planet in our solar system?",
        answer: [
            { text: "Venus", correct: false },
            { text: "Mars", correct: false },
            { text: "Jupiter", correct: true },
            { text: "Saturn", correct: false },
        ],
    },
    {
        question: "What is the smallest country in the world?",
        answer: [
            { text: "Monaco", correct: false },
            { text: "Vatican City", correct: true },
            { text: "Maldives", correct: false },
            { text: "Singapore", correct: false },
        ],
    },
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;  

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resentState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answer.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resentState(){
    nextButton.style.display = "none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const correct = selectedBtn.dataset.correct === "true";
    if(correct){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

showScore = () => {
    resentState();
    questionElement.innerHTML = `Your Score is ${score} out of ${questions.length}`;
    nextButton.innerHTML = "Restart";
    nextButton.style.display = "block";
}

handleNextButton = () => {
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }

});

startQuiz();
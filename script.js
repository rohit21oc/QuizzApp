const questions = [
    {
        question: "1.What does HTML stand for?",
        answers: [
            { text: "Hyper Text Markup Language", correct: true },
            { text: "Home Tool Markup Language", correct: false },
            { text: "Hyperlinks and Text Markup Language", correct: false },
            { text: "Hyper Tool Markup Language", correct: false }
        ]
    },
    {
        question: "2.Who is making the Web standards?",
        answers: [
            { text: "Mozilla", correct: false },
            { text: "Microsoft", correct: false },
            { text: "Google", correct: false },
            { text: "The World Wide Web Consortium (W3C)", correct: true }
        ]
    },
    {
        question: "3.Choose the correct HTML element for the largest heading:",
        answers: [
            { text: "<heading>", correct: false },
            { text: "<h1>", correct: true },
            { text: "<h6>", correct: false },
            { text: "<head>", correct: false }
        ]
    },
    {
        question: "4.What is the correct HTML element for inserting a line break?",
        answers: [
            { text: "<break>", correct: false },
            { text: "<lb>", correct: false },
            { text: "<br>", correct: true },
            { text: "<newline>", correct: false }
        ]
    },
    {
        question: "5.Which of these elements are all <table> elements?",
        answers: [
            { text: "<table><tr><tt>", correct: false },
            { text: "<thead><body><tr>", correct: false },
            { text: "<table><tr><td>", correct: true },
            { text: "<table><head><tfoot>", correct: false }
        ]
    },
    {
        question: "6.How can you make a numbered list?",
        answers: [
            { text: "<ol>", correct: true },
            { text: "<ul>", correct: false },
            { text: "<dl>", correct: false },
            { text: "<list>", correct: false }
        ]
    },
    {
        question: "7.What is the correct HTML for making a checkbox?",
        answers: [
            { text: "<checkbox>", correct: false },
            { text: "<input type='checkbox'>", correct: true },
            { text: "<input type='check'>", correct: false },
            { text: "<check>", correct: false }
        ]
    },
    {
        question: "8.What is the correct HTML for making a drop-down list?",
        answers: [
            { text: "<select>", correct: true },
            { text: "<list>", correct: false },
            { text: "<input type='dropdown'>", correct: false },
            { text: "<dropdown>", correct: false }
        ]
    },
    {
        question: "9.Which HTML element is used to specify a footer for a document or section?",
        answers: [
            { text: "<footer>", correct: true },
            { text: "<bottom>", correct: false },
            { text: "<section>", correct: false },
            { text: "<foot>", correct: false }
        ]
    },
    {
        question: "10.What is the correct HTML for creating a hyperlink?",
        answers: [
            { text: "<a>http://www.example.com</a>", correct: false },
            { text: "<a name='http://www.example.com'>Example</a>", correct: false },
            { text: "<a href='http://www.example.com'>Example</a>", correct: true },
            { text: "<a url='http://www.example.com'>Example</a>", correct: false }
        ]
    }
];

const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
const resultContainer = document.getElementById('result-container');
const scoreElement = document.getElementById('score');
const restartButton = document.getElementById('restart-btn');
const timerElement = document.getElementById('timer');
const questionNumberElement = document.getElementById('question-number');
const questionsRemainingElement = document.getElementById('questions-remaining');

let currentQuestionIndex;
let score;
let timeLeft;
let timer;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    timeLeft = 10;
    nextButton.classList.add('hide');
    resultContainer.classList.add('hide');
    questionContainer.classList.remove('hide');
    setNextQuestion();
    updateQuestionNumber();
    updateQuestionsRemaining();
}

function setNextQuestion() {
    resetState();
    showQuestion(questions[currentQuestionIndex]);
    startTimer();
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    clearStatusClass(document.body);
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
    nextButton.classList.add('hide');
    timeLeft = 10;
    timerElement.innerText = timeLeft;
    clearInterval(timer);
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        timerElement.innerText = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            const selectedButton = document.querySelector('.btn.selected');
            if (!selectedButton) {
                showCorrectAnswer();
            }
            nextButton.classList.remove('hide');
            const selectedAnswer = document.querySelector('.btn.selected');
            if (selectedAnswer) {
                selectedAnswer.classList.remove('selected');
            }
        }
    }, 1000);
}


function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === 'true';
    if (correct) {
        score++;
    }
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    });
    selectedButton.classList.add('selected');
    clearInterval(timer);
    nextButton.classList.remove('hide');
}

function showCorrectAnswer() {
    const correctAnswer = document.querySelector('.btn[data-correct="true"]');
    if (correctAnswer) {
        correctAnswer.classList.add('correct');
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

function endQuiz() {
    questionContainer.classList.add('hide');
    resultContainer.classList.remove('hide');
    scoreElement.innerText = `Your Score: ${score} out of ${questions.length}`;
    nextButton.classList.add('hide');
    timerElement.innerText = `Time Taken: ${10 - timeLeft} seconds`;
}

function updateQuestionNumber() {
    questionNumberElement.innerText = `Question ${currentQuestionIndex + 1}`;
}

function updateQuestionsRemaining() {
    const remaining = questions.length - currentQuestionIndex - 1;
    questionsRemainingElement.innerText = `${remaining} ${remaining === 1 ? 'question' : 'questions'} remaining`;
}

nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        setNextQuestion();
        updateQuestionNumber();
        updateQuestionsRemaining();
    } else {
        endQuiz();
    }
});

restartButton.addEventListener('click', startQuiz);

startQuiz();
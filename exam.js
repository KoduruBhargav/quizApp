"use strict";

// Quiz Data
const quizData = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Lisbon"],
    correct: "Paris",
  },
  {
    question: "Who wrote 'To Kill a Mockingbird'?",
    options: [
      "Harper Lee",
      "J.K. Rowling",
      "Ernest Hemingway",
      "F. Scott Fitzgerald",
    ],
    correct: "Harper Lee",
  },
  {
    question: "What is the smallest planet in our solar system?",
    options: ["Earth", "Mars", "Mercury", "Venus"],
    correct: "Mercury",
  },
  {
    question: "What is the chemical symbol for water?",
    options: ["H2O", "CO2", "O2", "NaCl"],
    correct: "H2O",
  },
  {
    question: "Who painted the Mona Lisa?",
    options: [
      "Leonardo da Vinci",
      "Vincent van Gogh",
      "Pablo Picasso",
      "Claude Monet",
    ],
    correct: "Leonardo da Vinci",
  },
];

// countdown
const countDownEl = document.querySelector(".countdown");
const minutesEl = document.getElementsByClassName("minutes");
const secondsEl = document.getElementsByClassName("seconds");
let minutes = Number(minutesEl[0].innerHTML);
let seconds = Number(secondsEl[0].innerHTML);

function updateDisplay() {
  minutesEl[0].innerHTML = minutes < 10 ? "0" + minutes : minutes;
  secondsEl[0].innerHTML = seconds < 10 ? "0" + seconds : seconds;
}

function updateCountdown() {
  if (seconds > 0) {
    seconds--;
  } else {
    if (minutes > 0) {
      minutes--;
      seconds = 59;
    } else {
      clearInterval(timer);
      if (minutes === 0) {
        if (seconds === 0) {
          quizEl.style.display = "none";
          displaySubmission.style.display = "block";
          setTimeout(() => {
            window.location.href = "./index.html";
          }, 1000);
        }
      }
    }
  }
  updateDisplay();
}

let interval = 1000;
const timer = setInterval(updateCountdown, interval);

//select elements
const quizEl = document.querySelector(".quiz");
const questionEl = document.querySelector(".question");
const answerButtons = document.querySelector(".answer-buttons");
const nextBtn = document.querySelector(".next");
let currentQuestionIndex = 0;
let score = 0;
const buttons = [];
const displaySubmission = document.querySelector(".displaySubmission");
// check if element is visible or not
// if (nextBtn.offsetParent !== null) {
//   console.log(true);
// } else {
//   console.log(false);
// }
// or
// nextBtn.offsetParent !== null ? console.log(true) : console.log(false);

// start Quiz
function startQuiz() {
  showQuestions();
}
// show questions
function showQuestions() {
  removePreviousAnswers();
  // add question to dom
  let currentQuestion = quizData[currentQuestionIndex];
  let questionNumber = currentQuestionIndex + 1;
  questionEl.innerHTML = questionNumber + " . " + currentQuestion.question;
  // add answers to dom
  const answers = currentQuestion.options;
  for (let answer of answers) {
    const button = document.createElement("button");
    button.innerHTML = answer;
    answerButtons.classList.add("answer-buttons");
    button.classList.add("btn");
    button.addEventListener("click", selectAnswer);
    answerButtons.appendChild(button);
    buttons.push(button);
  }
}

//remove previous answers
function removePreviousAnswers() {
  nextBtn.style.display = "none";
  while (answerButtons.firstElementChild) {
    answerButtons.removeChild(answerButtons.firstElementChild);
  }
}

//select answer
function selectAnswer(event) {
  const targetBtn = event.target;
  const value = targetBtn.innerHTML;
  const correctAnswer = quizData[currentQuestionIndex].correct;

  if (value === correctAnswer) {
    targetBtn.classList.add("correct");
    score++;
  } else {
    targetBtn.classList.add("incorrect");
    // Highlight the correct answer
    for (let button of buttons) {
      if (button.innerHTML === correctAnswer) {
        button.classList.add("correct");
      }
    }
  }

  // Disable all buttons
  for (let button of buttons) {
    button.disabled = true;
  }

  nextBtn.style.display = "block";
}

function showScore() {
  removePreviousAnswers();
  quizEl.style.margin = "4rem auto";
  questionEl.style.marginTop = "3rem";
  questionEl.style.textAlign = "center";
  questionEl.innerHTML = `You scored ${score} out of ${quizData.length}`;
  nextBtn.innerHTML = "submit";
  // if (nextBtn.innerHTML === "submit") {
  //   alert("Submitted sucessfully");
  //   window.location.href = "./index.html";
  // }
  nextBtn.style.display = "block";
  nextBtn.addEventListener("click", () => {
    quizEl.style.display = "none";
    displaySubmission.style.display = "block";
    clearInterval(timer);
    countDownEl.style.display = "none";
    setTimeout(() => {
      window.location.href = "./index.html";
    }, 1000);
  });
}
nextBtn.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < quizData.length) {
    showQuestions();
  } else {
    showScore();
  }
});

startQuiz();

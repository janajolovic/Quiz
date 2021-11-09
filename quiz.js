const question = document.querySelector(".question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progress-text");
const progressBarFull = document.querySelector(".progressBar-full");
const scoreText = document.querySelector("#score");

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = {};


let questions = [];


fetch("https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple")
  .then(res => {
    return res.json();
  })
  .then(loadedQuestions => {
    questions = loadedQuestions.results.map(loadedQuestions => {
      const formattedQuestions = {
        question: loadedQuestions.question
      }
      const answerChoices = [...loadedQuestions.incorrect_answers];
      formattedQuestions.answer = Math.floor(Math.random() * 3) + 1;
      answerChoices.splice(formattedQuestions.answer -1, 0, loadedQuestions.correct_answer);

      answerChoices.forEach((choice, index) => {
        formattedQuestions["choice" + (index+1)] = choice;
      })

      return formattedQuestions;
    })
    startGame();

  })

const correct_bonus = 10;
const max_questions = 3;


startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
}

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter >= max_questions) {
      localStorage.setItem("mostRecentScore", score);
      return window.location.assign("./end.html");
    }

    questionCounter++;
    progressText.innerText = `Question ${questionCounter}/${max_questions}`;
    progressBarFull.style.width = `${((questionCounter/max_questions) * 100)}%`;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice'+number]
    })

    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if (!acceptingAnswers) return;
        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        const classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        if (classToApply === 'correct') {
          incrementScore(correct_bonus);
        } 

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    })
})


incrementScore = num => {
  score += num;
  scoreText.innerText = score;
}

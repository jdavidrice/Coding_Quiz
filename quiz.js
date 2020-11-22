// JS FOR TIMER IS AT THE END OF THIS PAGE
//
// GIVEN I am taking a code quiz
// WHEN I click the start button
// THEN a timer starts and I am presented with a question
// WHEN I answer a question
// THEN I am presented with another question
// WHEN I answer a question incorrectly
// THEN time is subtracted from the clock
// WHEN all questions are answered or the timer reaches 0
// THEN the game is over
// WHEN the game is over
// THEN I can save my initials and score
//
// THINGS TO MAKE
// 1. Text display area where questions appear.
// 2. Answer choices for the questions.
// 3. Button to start the quiz.
// 4. Button to submit answer and move to next question.
// 5. Timer that count downs a set amount of time to complete the quiz.
// 6. Title of game with simple instructions. 
// 7. List of questions and answers that are in an array and are cycled through.
// 8. Score display zone - after the game is done, player can enter in inititals next to their score (in a table, along with date and time of score).
//
// THINGS TO DO
// 1. Event listener that indicates when the "start" button is clicked.
// 2. Event listener that knows when correct or incorrect answer has been chosen and submitted, and diplays the result.
// 3. Event listener that removes time from the clock (5 seconds?) for each incorrect answer.
// 4. Function that advances to next question after the prior one is submitted.
// 5. Function that tracks and displays score throughout the game.
// 6. Event listener that knows when the last question is reached, or the timer reaches zero, and displays the final score with an option for the player to enter in their initials. 
//
// First attempt at quiz, using prompts
//
// // DOM Elements
// let startQuiz = document.querySelector("#startQuiz");
// let score = 0;
// let questionEl = document.querySelector("#questions");

// // Event Listener for "Start Quiz"
// startQuiz.addEventListener("click", function (event) {
//   event.preventDefault();

// //The array of questions.
// 

// // Loop over every question object
// for (var i = 0; i < questions.length; i++) {
//   // Display current question to user and ask OK/Cancel
//   var answer = prompt(questions[i].q);

//   // Compare answers
//   if ((answer === "a" && questions[i].a === "a") ||
//   (answer === "b" && questions[i].a === "b") ||
//   (answer === "c" && questions[i].a === "c") ||
//   (answer === "d" && questions[i].a === "d")) {
//     // Increase score
//     score++;
//     alert("Correct!");
//   } else {
//     alert("Incorrect!");
//   }
// };
// // Show total at end
// alert(`You got ${score} out of ${questions.length} questions correct.`);
// });

// DOM Elements
const question = document.querySelector('#question')
const choices = Array.from(document.querySelectorAll('.choice-text'))
const progressText = document.querySelector('#progressText')
const scoreText = document.querySelector('#score')

// Variables
let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

// The array of questions
let questions = [
    { 
      question: 'What is the basic programming language of the web?',
      choice1: 'HTML',
      choice2: 'Java',
      choice3: 'Angular',
      choice4: 'fordFocus',
      answer: 1,
    },
    { 
      question: 'What does CSS stand for?',
      choice1: 'Cascading Standard System',
      choice2: 'Colloquial Semantic Structure',
      choice3: 'Cascading Style Sheets',
      choice4: 'Clesper Sacramento Syllogism',
      answer: 3,
    },
    { 
      question: 'How many basic data types are there in JavaScript?',
      choice1: '6',
      choice2: '7',
      choice3: '8',
      choice4: '9',
      answer: 4,
    },
    { 
      question: 'What operator allows us to see which type is stored in a variable?',
      choice1: 'const',
      choice2: 'typeof',
      choice3: 'tele',
      choice4: 'fordFocus',
      answer: 2,
    },
    { 
      question: 'In JavaScript, the fact that typeof(null) returns "object" is an example of what?',
      choice1: 'a feature',
      choice2: 'a dependency',
      choice3: 'a bug',
      choice4: 'an autombile made by the Ford Motor Company between the years of 1999 and 2018 (in North America)',
      answer: 3,
    },
  ]

  // Ten points earned per each correct question, and there are five questions
  const SCORE_POINTS = 10
  const MAX_QUESTIONS = 5

  // Starting conditions of the quiz
  startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
  }

  // Set Score *************************************************************************************************************
  getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
      // Save score to local storage
      localStorage.setItem('mostRecentScore', score)
      // Send to end.html when game is over
      return window.location.assign('/end.html')
    }

    // Show progress throughout quiz
    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`

    // Randomize question order
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)

    // Keep track of what question is being asked, and display it
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    // Keep track of what answer is chosen 
    choices.forEach(choice => {
      const number = choice.dataset['number']
      choice.innerText = currentQuestion['choice' + number]
    })

    // Adjusts the array as each question is used up
    availableQuestions.splice(questionsIndex, 1)

    // Allow answers to be chosen once the quiz starts
    acceptingAnswers = true
  }

  // Event listener for answer buttons
  choices.forEach(choice => {
    choice.addEventListener('click', e => {
      if(!acceptingAnswers) return
      
      acceptingAnswers = false
      const selectedChoice = e.target
      const selectedAnswer = selectedChoice.dataset['number']

      // Apply style to button to indicate correct or incorrect (ternary operator)
      let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

      // Each correct answer gives you 10 points
      if(classToApply === 'correct') {
        incrementScore(SCORE_POINTS)
      }
      //**************************************************************************************************************************************************************
      // Each incorrect answer takes 5 seconds off the timer, unless the time remaining is less than 5 seconds, at which time the game ends
      // if(classToApply === 'incorrect' && timeLeft > 5) {
      //   timePassed = timePassed += 5;
      // } else if (classToApply === 'incorrect' && timeLeft <= 5) {
      //   onTimesUp();
      // }

      if(classToApply === 'incorrect') {
        timeLeft = timeLeft -= 5;
      }
      
      selectedChoice.parentElement.classList.add(classToApply)

      // Pause to show us if we got the answer correct or incorrect before advancing to the next question
      setTimeout(() => {
        selectedChoice.parentElement.classList.remove(classToApply)
        getNewQuestion()
      }, 1000)
  })

  // Advance the numbers displayed on the scoreboard as points are earned
  incrementScore = num => {
    score +=num
    scoreText.innerText = score
  }

  // Call the function that starts the quiz
  startGame()


// Timer
// Credit: Mateusz Rybczonec - CSS-Tricks.com
// https://css-tricks.com/how-to-create-an-animated-countdown-timer-with-html-css-and-javascript/
//
// Set the points where the timer's progress ring changes color
const FULL_DASH_ARRAY = 283;
const WARNING_THRESHOLD = 10;
const ALERT_THRESHOLD = 5;

const COLOR_CODES = {
  info: {
    color: "green"
  },
  warning: {
    color: "orange",
    threshold: WARNING_THRESHOLD
  },
  alert: {
    color: "red",
    threshold: ALERT_THRESHOLD
  }
};

// Set the starting conditions of the timer
const TIME_LIMIT = 30;
let timePassed = 0;
let timeLeft = TIME_LIMIT;
let timerInterval = null; //******************************************************************************************************************/
let remainingPathColor = COLOR_CODES.info.color;

// HTML for the timer
document.getElementById("app").innerHTML = `
<div class="base-timer">
  <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <g class="base-timer__circle">
      <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
      <path
        id="base-timer-path-remaining"
        stroke-dasharray="283"
        class="base-timer__path-remaining ${remainingPathColor}"
        d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "
      ></path>
    </g>
  </svg>
  <span id="base-timer-label" class="base-timer__label">${formatTime(
    timeLeft
  )}</span>
</div>
`;

// Call the function that starts the timer
startTimer();

// Reset the timer AND END THE GAME when the set time is elapsed
function onTimesUp() {
  clearInterval(timerInterval);
  localStorage.setItem('mostRecentScore', score);
  acceptingAnswers = false;
  return window.location.assign('/end.html')
}

// When the timer starts, it counts down in one second increments, and displays the difference between the starting time and the time passed (timeLeft)
function startTimer() {
  timerInterval = setInterval(() => {
    timePassed = timePassed += 1;
    timeLeft = TIME_LIMIT - timePassed;
    document.getElementById("base-timer-label").innerHTML = formatTime(
      timeLeft
    );
    setCircleDasharray();
    setRemainingPathColor(timeLeft);

    if (timeLeft === 0) {
      onTimesUp();
    }
  }, 1000);
}

// Allow time to be displayed as minutes:seconds
function formatTime(time) {
  const minutes = Math.floor(time / 60);
  let seconds = time % 60;

  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  return `${minutes}:${seconds}`;
}

// Change timer color
function setRemainingPathColor(timeLeft) {
  const { alert, warning, info } = COLOR_CODES;
  if (timeLeft <= alert.threshold) {
    document
      .getElementById("base-timer-path-remaining")
      .classList.remove(warning.color);
    document
      .getElementById("base-timer-path-remaining")
      .classList.add(alert.color);
  } else if (timeLeft <= warning.threshold) {
    document
      .getElementById("base-timer-path-remaining")
      .classList.remove(info.color);
    document
      .getElementById("base-timer-path-remaining")
      .classList.add(warning.color);
  }
}

function calculateTimeFraction() {
  const rawTimeFraction = timeLeft / TIME_LIMIT;
  return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
}

function setCircleDasharray() {
  const circleDasharray = `${(
    calculateTimeFraction() * FULL_DASH_ARRAY
  ).toFixed(0)} 283`;
  document
    .getElementById("base-timer-path-remaining")
    .setAttribute("stroke-dasharray", circleDasharray);
  }
});

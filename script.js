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

// THINGS TO MAKE
// 1. Text display area where questions appear.
// 2. Answer choices for the questions.
// 3. Button to start the quiz.
// 4. Button to submit answer and move to next question.
// 5. Timer that count downs a set amount of time to complete the quiz.
// 6. Title of game with simple instructions. 
// 7. List of questions and answers that are in an array and are cycled through.
// 8. Score display zone - after the game is done, player can enter in inititals next to their score (in a table, along with date and time of score).

// THINGS TO DO
// 1. Event listener that indicates when the "start" button is clicked.
// 2. Event listener that knows when correct or incorrect answer has been chosen and submitted, and diplays the result.
// 3. Event listener that removes time from the clock (5 seconds?) for each incorrect answer.
// 4. Function that advances to next question after the prior one is submitted.
// 5. Function that tracks and displays score throughout the game.
// 6. Event listener that knows when the last question is reached, or the timer reaches zero, and displays the final score with an option for the player to enter in their initials. 
// DOM Elements

let startQuiz = document.getElementById("startQuiz");
let score = 0;

// Event Listener for "Start Quiz"
startQuiz.addEventListener("click", function () {
  // The array of questions.
var questions = [
  { q: "HTML is the basic programming language of the web.", a: "t" },
  { q: "CSS stands for 'Cascading Standard System.'", a: "f" },
  { q: "There are 9 basic data types in JavaScript.", a: "f" },
  { q: "The 'typeof' operator allows us to see which type is stored in a variable.", a: "t" },
  { q: "The fact that typeof(null) returns 'object' is an error in the JavaScript language.", a: "t" }
];

// Loop over every question object
for (var i = 0; i < questions.length; i++) {
  // Display current question to user and ask OK/Cancel
  var answer = confirm(questions[i].q);

  // Compare answers
  if ((answer === true && questions[i].a === "t") ||
  (answer === false && questions[i].a === "f")) {
    // Increase score
    score++;
    alert("Correct!");
  } else {
    alert("Incorrect!");
  }
};
// Show total at end
alert(`You got ${score} out of ${questions.length} questions correct!`);
});





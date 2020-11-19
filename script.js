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
let newElement = document.createElement('div');
document.body.appendChild(newElement);
console.log(newElement);

// Event Listener for "Start Quiz"
startQuiz.addEventListener("click", function () {
// The array of questions.
var questions = [
  { q: "What is the basic programming language of the web?\n(a) HTML\n(b) Java\n(c) Angular\n(d) fordFocus", a: "a" },
  { q: "What does CSS stand for?\n(a) Cascading Standard System\n(b) Colloquial Semantic Structure\n(c) Cascading Style Sheets\n(d) Clesper Sacramento Syllogism", 
  a: "c" },
  { q: "How many basic data types are there in JavaScript?\n(a) 6\n(b) 7\n(c) 8\n(d) 9", 
  a: "d" },
  { q: "What operator allows us to see which type is stored in a variable?\n(a) const\n(b) typeof\n(c) tele\n(d) fordFocus", 
  a: "b" },
  { q: "In JavaScript, the fact that typeof(null) returns 'object' is an example of what?\n(a) a feature\n(b) a dependency\n(c) a bug\n(d) an autombile made by the Ford Motor Company between the years of 1999 and 2018 (in North America)", 
  a: "c" },
];

// Loop over every question object
for (var i = 0; i < questions.length; i++) {
  // Display current question to user and ask OK/Cancel
  var answer = prompt(questions[i].q);

  // Compare answers
  if ((answer === "a" && questions[i].a === "a") ||
  (answer === "b" && questions[i].a === "b") ||
  (answer === "c" && questions[i].a === "c") ||
  (answer === "d" && questions[i].a === "d")) {
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





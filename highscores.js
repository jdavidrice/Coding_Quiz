// DOM elements and the variables they are linked to
const highScoresList = document.querySelector('#highScoresList')
const highScores = JSON.parse(localStorage.getItem('highScores')) || []

// Function that links each high score with the name entered 
highScoresList.innerHTML = 
highScores.map(score => {
  return `<li class"high-score">${score.name} - ${score.score}</li>`
}).join("")

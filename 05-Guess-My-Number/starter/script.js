'use strict';
/*
// get the text content from a <p> tag using class name
console.log(document.querySelector('.message').textContent);
// get a dataset element from a <p> tag using class name
const dataAttr = document.querySelector('.message');
console.log(dataAttr.dataset.thing);
console.log(document.querySelector('.message').dataset.thing);
// set the text content in a <p> tag using class name
document.querySelector('.message').textContent = `🥳 Correct Number!`;
document.querySelector('.number').textContent = 13;
document.querySelector('.score').textContent = 101;
// set the value in an input using class name
document.querySelector('.guess').value = 23;
// get the value in an input using class name
console.log(document.querySelector('.guess').value);
*/

// Event Listeners & Event Handlers
// below, the function is an expression passed into the event listener
// random number between x inclusive and y inclusive
let randNumFunc = () => Math.trunc(Math.random() * 20) + 1;
let randNum = randNumFunc();
console.log(randNum);
// variables
let score = 20;
let highScore = 0;

// called to display new message
function displayMessage(message) {
  document.querySelector('.message').textContent = message;
}

// Reset is Code Challenge 1
// called to reset the game
function reset() {
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
  document.querySelector('.number').textContent = '?';
  document.querySelector('.guess').value = '';
  displayMessage('Start guessing...');
  randNum = randNumFunc();
  score = 20;
  document.querySelector('.score').textContent = score;
  console.log('Reset ', randNum);
}

// called if player guess too high, too low, or lost
function scoreFunc(guess) {
  score--;
  document.querySelector('.score').textContent = score;
  // ALREADY LOST, SO RESET
  if (score < 0) {
    reset();
    // LOST
  } else if (score == 0) {
    displayMessage(`💣 You lost.`);
    document.querySelector('.number').textContent = randNum;
  }
  // LOW OR HIGH
  guess < randNum
    ? displayMessage(`⬇️ Too low!`)
    : displayMessage(`⬆️ Too high!`);
}

// EventListener click > Check Button
document.querySelector('.check').addEventListener('click', function () {
  console.log(`Check! button clicked.`);
  const guess = Number(document.querySelector('.guess').value);
  // ALREADY WON, SO RESET
  if (document.querySelector('.message').textContent == `😃 You win!`) {
    reset();
    // NO ENTRY or ZERO
  } else if (!guess) {
    displayMessage(`⛔ No number or zero!`);
    // OUT OF RANGE
  } else if (guess < 0 || guess > 20) {
    displayMessage(`⛔ Numbers between 1 & 20, only!`);
    // WINNER!
  } else if (guess == randNum) {
    displayMessage(`😃 You win!`);
    document.querySelector('.number').textContent = randNum;
    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').style.width = '30rem';
    if (score > highScore) {
      highScore = score;
      document.querySelector('.highscore').textContent = highScore;
    }
    // TOO HIGH, TOO LOW, OR LOST
  } else {
    scoreFunc(guess);
  }
});

// EventListener > click Again button (Reset game)
document.querySelector('.again').addEventListener('click', reset);

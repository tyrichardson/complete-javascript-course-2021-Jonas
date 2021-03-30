'use strict';
// select elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');

const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let currentScore, activePlayer, scores, gameOver;

init();

// used to initialize game and to reset it to default state
function init() {
  currentScore = 0;
  activePlayer = 0;
  gameOver = false;
  scores = [0, 0];

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
}

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
  activePlayer = activePlayer == 0 ? 1 : 0;
  currentScore = 0;
};

// roll the dice
btnRoll.addEventListener('click', function () {
  if (gameOver) return;
  // generate random dice number
  const dice = Math.trunc(Math.random() * 6) + 1;
  // display the dye image
  diceEl.src = `dice-${dice}.png`;
  diceEl.classList.remove('hidden');
  // if dice != 1, add value to current score
  if (dice != 1) {
    currentScore += dice;
    document.getElementById(
      `current--${activePlayer}`
    ).textContent = currentScore;
  } else {
    // switch players
    switchPlayer();
  }
});

// hold the score
btnHold.addEventListener('click', function () {
  if (gameOver) return;
  // add current score to player Score
  scores[activePlayer] += currentScore;
  currentScore = 0;
  document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];
  // WINNER?
  if (scores[activePlayer] >= 100) {
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');
    diceEl.classList.add('hidden');
    gameOver = true;
  }
  // switch players
  switchPlayer();
});

// reset game
btnNew.addEventListener('click', init);

'use strict';

// Elements selection
const score0Element = document.querySelector('#score--0');
const score1Element = document.querySelector('#score--1');
const current0Element = document.getElementById('current--0');
const current1Element = document.getElementById('current--1');
const diceElement = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const player0Element = document.querySelector('.player--0');
const player1Element = document.querySelector('.player--1');

// Game initial conditions

score0Element.textContent = 0;
score1Element.textContent = 0;
diceElement.classList.add('hidden');
const totalScores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let isPlaing = true;

const switchActivePlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0Element.classList.toggle('player--active');
  player1Element.classList.toggle('player--active');
};

// Roll the dice

btnRoll.addEventListener('click', function () {
  if (isPlaing) {
    // 1. Generate random number
    const diceNumber = Math.trunc(Math.random() * 6) + 1;
    // 2. Display number on the dice
    diceElement.classList.remove('hidden');
    diceElement.src = `dice${diceNumber}.png`;
    // 3. If the number is 1, switch tp the next player

    if (diceNumber !== 1) {
      currentScore += diceNumber;

      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchActivePlayer();
    }
  }
});

// Hold scores

btnHold.addEventListener('click', function () {
  if (isPlaing) {
    totalScores[activePlayer] += currentScore;
    if (activePlayer === 0) {
      score0Element.textContent = totalScores[0];
    } else {
      score1Element.textContent = totalScores[1];
    }
    if (totalScores[activePlayer] >= 20) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      isPlaing = false;
      diceElement.classList.add('hidden');
    }
    switchActivePlayer();
  }
});

// New game

btnNew.addEventListener('click', function () {
  totalScores[0] = 0;
  totalScores[1] = 0;
  player0Element.classList.remove('player--winner');
  player1Element.classList.remove('player--winner');
  activePlayer = 0;
  score0Element.textContent = 0;
  score1Element.textContent = 0;
  current0Element.textContent = 0;
  current1Element.textContent = 0;
  currentScore = 0;
  isPlaing = true;

  if (!player0Element.classList.contains('player--active')) {
    player0Element.classList.add('player--active');
    player1Element.classList.remove('player--active');
  }
});

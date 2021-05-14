'use strict';

//selectiong elements
const score0EL = document.querySelector('#score--0');
const score1EL = document.getElementById('score--1');
const current0EL = document.getElementById('current--0');
const current1EL = document.getElementById('current--1');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

const diceEL = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//starting condition
// score0EL.textContent = '0';
// score1EL.textContent = '0';
// diceEL.classList.add('hidden');

// let scores = [0, 0];
// let currentScore = 0;
let activePlayer = 0;
let scores, currentScore, playing;
// let playing = true;

const init = function () {
  current0EL.textContent = 0;
  current1EL.textContent = 0;
  score0EL.textContent = '0';
  score1EL.textContent = '0';
  diceEL.classList.add('hidden');

  scores = [0, 0];
  currentScore = 0;
  playing = true;

  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--active');
};
init();
//rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. generating a random dice roll
    let dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);

    // 2. display dice
    diceEL.classList.remove('hidden');
    diceEL.src = `dice-${dice}.png`;

    // 3. check for rolled 1: if true,
    if (dice !== 1) {
      // add dice to the current score
      currentScore += dice;
      // current0EL.textContent = currentScore;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // switch to next player
      // document.getElementById(`current--${activePlayer}`).textContent = 0;
      // currentScore = 0;
      // activePlayer = activePlayer === 0 ? 1 : 0;
      // player0.classList.toggle('player--active');
      // player1.classList.toggle('player--active');
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. add current score to active player's score
    //   if (activePlayer === 0) {
    //     scores[0] += currentScore;
    //     score0EL.textContent = scores[0];
    //   } else {
    //     scores[1] += currentScore;
    //     score1EL.textContent = scores[1];
    //   }
    scores[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];
    //2. check if score is >= 100
    if (scores[activePlayer] >= 20) {
      playing = false;
      diceEL.classList.add('hidden');
      //finish the game
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      //switch to the next player
      switchPlayer();
    }
  }
});

function switchPlayer() {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
}

btnNew.addEventListener('click', function () {
  init();
});

'use strict';

let number = Math.trunc(Math.random() * 20) + 1;
let score = Number(document.querySelector('.score').textContent);
let highScore = 0;

const displayMsg = function (message) {
  document.querySelector('.message').textContent = message;
};
// console.log(document.querySelector('.message').textContent);
document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);
  console.log(typeof guess);

  if (!guess) {
    displayMsg('No number!');
    score--;
    document.querySelector('.score').textContent = score;
  } else if (number === guess) {
    displayMsg('correct!');
    // document.querySelector('.message').textContent = 'correct';
    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').style.width = '30rem';
    document.querySelector('.number').textContent = number;

    if (score > highScore) {
      highScore = score;
      document.querySelector('.highscore').textContent = highScore;
    }
  } else if (number !== guess) {
    displayMsg(number > guess ? 'too small' : 'too big');
    if (score > 1) {
      // document.querySelector('.message').textContent =
      //   number > guess ? 'too small' : 'too big';
      score--;
      document.querySelector('.score').textContent = score;
    } else {
      displayMsg('lost!');
      // document.querySelector('.message').textContent = 'lost';
    }
  }
});

document.querySelector('.again').addEventListener('click', function () {
  number = Math.trunc(Math.random() * 20) + 1;
  score = 20;
  document.querySelector('.score').textContent = score;
  displayMsg('start guessing...');
  // document.querySelector('.message').textContent = 'start guessing...';

  document.querySelector('.guess').value = '';
  document.querySelector('.number').style.width = '15rem';
  document.querySelector('.number').textContent = '?';
  document.querySelector('body').style.backgroundColor = '#222';
});

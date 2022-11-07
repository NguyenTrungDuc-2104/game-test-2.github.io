'use strict';

const player0El = document.querySelector(`.player--0`);
const player1El = document.querySelector(`.player--1`);

const score0El = document.querySelector(`#score--0`);
const score1El = document.getElementById(`score--1`); // cách gọi phần tử Id khác (nhanh hơn gọi bằng querySelector)

const current0El = document.getElementById(`current--0`);
const current1El = document.getElementById(`current--1`);

const diceEl = document.querySelector(`.dice`);
const btnNew = document.querySelector(`.btn--new`);
const btnRoll = document.querySelector(`.btn--roll`);
const btnHold = document.querySelector(`.btn--hold`);

let scores, currentScore, activePlayer, playing;
// function de reset khi nhan nut new và tai lai trang
const init = function () {
  scores = [0, 0];
  currentScore = 0; // tong diem 1 luot choi
  activePlayer = 0; // nguoi choi 1
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add(`hidden`);
  player0El.classList.add(`player--active`);
  player1El.classList.remove(`player--active`);
  player0El.classList.remove(`player--winner`);
  player1El.classList.remove(`player--winner`);
};
// bat dau tro choi
init();
// chuyen doi nguoi choi
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;

  player0El.classList.toggle(`player--active`);
  player1El.classList.toggle(`player--active`);
};
// tung xuc xac

btnRoll.addEventListener(`click`, function () {
  if (playing) {
    // 1. tao xuc xac ngau nhien
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. hien thi xuc xac
    diceEl.classList.remove(`hidden`);
    diceEl.src = `dice-${dice}.png`;

    // 3. xuc xac bang 1? chuyen sang nguoi khac
    if (dice !== 1) {
      currentScore += dice; // currentScore= currentScore + dice
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;

      // current0El.textContent = currentScore; // change later
    } else {
      // doi nguoi choi
      switchPlayer();
    }
  }
});

btnHold.addEventListener(`click`, function () {
  if (playing) {
    // 1. cong diem vao tong diem
    scores[activePlayer] += currentScore; // gan diem vao array scores
    // scores [1] = scores [1] + currentscore
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // 2. kiem tra so diem >= 100

    if (scores[activePlayer] >= 100) {
      // ket thuc tro choi
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add(`player--winner`);

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove(`player--active`);

      diceEl.classList.add(`hidden`);
    } else {
      // chuyen sang nguoi choi tiep theo
      switchPlayer();
    }
  }
});

// reset game

// btnNew.addEventListener(`click`, function () {
//   playing = true;
//   currentScore = 0;
//   activePlayer = 0;
//   scores[0] = 0;
//   scores[1] = 0;
//   score0El.textContent = 0;
//   score1El.textContent = 0;
//   current0El.textContent = 0;
//   current1El.textContent = 0;
//   // diceEl.classList.add(`hidden`);
//   player0El.classList.add(`player--active`);
//   player1El.classList.remove(`player--active`);
//   player0El.classList.remove(`player--winner`);
//   player1El.classList.remove(`player--winner`);
// });
btnNew.addEventListener(`click`, init);

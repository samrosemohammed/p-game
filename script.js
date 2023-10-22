"use strict";
// selecting html element
const score0El = document.querySelector("#score--0");
const score1El = document.querySelector("#score--1");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const btnNew = document.querySelector(".btn--new");
const img = document.querySelector(".dice");
const currentScore0 = document.querySelector("#current--0");
const currentScore1 = document.querySelector("#current--1");
const player0 = document.querySelector(".player--0");
const player1 = document.querySelector(".player--1");

// function for switch bg toggle
function switchBg() {
  document.querySelector(`#current--${activePlayer}`).innerHTML = 0; // before the switch
  storeSocred = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle("player--active");
  player1.classList.toggle("player--active");
}

let scores;
let playing;
let storeSocred;
let activePlayer;

// initialization
function init() {
  playing = true;
  scores = [0, 0];
  storeSocred = 0;
  activePlayer = 0;

  score0El.innerHTML = 0;
  score1El.innerHTML = 0;
  currentScore0.innerHTML = 0;
  currentScore1.innerHTML = 0;

  img.classList.add("hidden");
  player0.classList.remove("player--winner");
  player1.classList.remove("player--winner");
  player0.classList.add("player--active");
  player1.classList.remove("player--active");
}

init();

// initial state
// score0El.innerHTML = 0;
// score1El.innerHTML = 0;

// roll dice
btnRoll.addEventListener("click", () => {
  if (playing) {
    // generating random dice
    const diceNum = Math.trunc(Math.random() * 6) + 1;

    // display the dice
    img.classList.remove("hidden");
    img.src = `dice-${diceNum}.png`;

    if (diceNum !== 1) {
      storeSocred += diceNum;
      document.querySelector(`#current--${activePlayer}`).innerHTML =
        storeSocred;
      // console.log(storeSocred);
    } else {
      // switch player
      switchBg();
    }
  }
});

btnHold.addEventListener("click", () => {
  if (playing) {
    // add current score to the active player
    scores[activePlayer] += storeSocred;
    document.querySelector(`#score--${activePlayer}`).innerHTML =
      scores[activePlayer];

    // finish game
    if (scores[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
      img.classList.add("hidden");
    } else {
      switchBg();
    }
  }
});

// reset
btnNew.addEventListener("click", init);

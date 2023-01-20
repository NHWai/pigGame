"use strict";
const p1 = document.querySelector("#player1");
const p2 = document.querySelector("#player2");
const p1Score = document.querySelector("#player1 .playerScore");
const p1Curr = document.querySelector("#player1 .currentScore");
const p2Score = document.querySelector("#player2 .playerScore");
const p2Curr = document.querySelector("#player2 .currentScore");
const currentScore = document.querySelector(".currentScore");
const rolldice = document.querySelector(".rolldice");
const dices = document.querySelectorAll(".dice");
const newgameBtn = document.querySelector(".newgame");
const holdBtn = document.querySelector(".hold");
const modalBox = document.querySelector(".modalBox");
const overlay = document.querySelector(".overlay");

let curr = 0;
let currPlayer = 1;
let diceNo;
let playing = true;

const showWinner = function (currPlayer) {
  modalBox.classList.remove("hidden");
  overlay.classList.remove("hidden");
  modalBox.textContent = `Player${currPlayer} wins 🎉🎉🎉`;
};

const newGame = function () {
  playing = true;
  rolldice.classList.remove("disabled");
  holdBtn.classList.remove("disabled");
  p1Score.textContent = 0;
  p1Curr.textContent = 0;
  p2Score.textContent = 0;
  p2Curr.textContent = 0;
  curr = 0;
};

const switchPlayer = function () {
  p1.classList.toggle("active");
  p2.classList.toggle("active");

  const prevTotalScore = +eval(`p${currPlayer}Score.textContent`);
  if (prevTotalScore == 0 && diceNo !== 1) {
    eval(` p${currPlayer}Score.textContent = ${curr}`);
  } else if (prevTotalScore > 0 && diceNo !== 1) {
    eval(` p${currPlayer}Score.textContent = ${curr + prevTotalScore}`);
  }
  if (+eval(`p${currPlayer}Score.textContent`) > 30) {
    showWinner(currPlayer);
    playing = false;
    rolldice.classList.add("disabled");
    holdBtn.classList.add("disabled");
  }
  p1Curr.textContent = 0;
  p2Curr.textContent = 0;
  curr = 0;
  currPlayer = currPlayer === 1 ? 2 : 1;
};

const addScore = function (player, score) {
  eval(` p${player}Curr.textContent = ${score}`);
};

newgameBtn.addEventListener("click", newGame);
holdBtn.addEventListener("click", function () {
  playing && switchPlayer();
});
overlay.addEventListener("click", function () {
  modalBox.classList.add("hidden");
  overlay.classList.add("hidden");
});

rolldice.addEventListener("click", function () {
  if (playing === true) {
    for (const dice of dices) {
      !dice.classList.contains("hidden") && dice.classList.add("hidden");
    }
    const rand = Math.floor(Math.random() * 6);
    dices[rand].classList.remove("hidden");
    diceNo = rand + 1;
    if (diceNo === 1) {
      switchPlayer();
    } else {
      curr += diceNo;
    }
    addScore(currPlayer, curr);
  }
});

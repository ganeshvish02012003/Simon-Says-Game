const startGame = document.querySelector(".startGame");
const heading = document.querySelector(".heading");
const startBtn = document.querySelector(".startBtn");
const btnContainer = document.querySelector(".btn-container");
const hiscoreBox = document.querySelector("#hiscoreBox");
const scoreBox = document.querySelector("#scoreBox");
const endGame = document.querySelector(".endGame");
const score = document.querySelector(".score");
const high_score_ican = document.querySelector(".high_score_ican");
const end_Hi_Score = document.querySelector(".end_Hi_Score");
const restart = document.querySelector(".restart");

const gameOverSound = new Audio("asset/sound/game-over-1947.wav");
const gameFlashSound = new Audio("asset/sound/FlashGame.mp3");
const userFlashSound = new Audio("asset/sound/FlashUser.mp3");
const levelUpSound = new Audio("asset/sound/levelUp.mp3");
const bgMusic = new Audio("asset/sound/bgMusic.mp3");

gameFlashSound.volume = 0.5;
userFlashSound.volume = 0.5;

let gameSeq = [];
let userSeq = [];
let btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;

startBtn.addEventListener("click", start);
restart.addEventListener("click", start);

function start() {
  bgMusic.play();
  bgMusic.volume = 0.3;
  if (started == false) {
    startBtn.style.display = "none";
    btnContainer.style.display = "flex";
    endGame.style.display = "none";
    started = true;
    setTimeout(levelUp, 1000);

    heading.style.margin = "0";
    heading.style.fontSize = "3rem";
  }
}

function gameFlash(btn) {
  gameFlashSound.play();
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 250);
}
function userFlash(btn) {
  userFlashSound.play();
  btn.classList.add("userFlash");
  setTimeout(function () {
    btn.classList.remove("userFlash");
  }, 250);
}

let hiscore = 0;
function levelUp() {
  userSeq = [];
  level++;
  scoreBox.innerText = `score: ${level}`;

  if (hiscore <= level) {
    hiscore = level;
    hiscoreBox.innerText = `Hi.Score:${hiscore}`;
    end_Hi_Score.innerText = `Hi.Score:${hiscore}`;
  }

  let randIdx = Math.floor(Math.random() * 4);
  let randColor = btns[randIdx];
  let randbtn = document.querySelector(`.${randColor}`);
  gameSeq.push(randColor);
  gameFlash(randbtn);
}

function checkAns(idx) {
  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length === gameSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    gameOverSound.play();
    score.innerText = `${level}`;
    btnContainer.style.display = "none";
    endGame.style.display = "block";
    high_score_ican.style.display = "none";

    if (level === hiscore) {
      gameOverSound.pause();
      setTimeout(function () {
        levelUpSound.play();
        score.style.color = "#ffee00";
        high_score_ican.style.display = "block";
      }, 500);
      setTimeout(function () {
        score.style.color = "white";
      }, 5000);
    }

    setTimeout(function () {
      bgMusic.volume = 1;
    }, 500);

    reset();
  }
}

function btnPress() {
  let btn = this;
  userFlash(btn);

  userColor = btn.getAttribute("id");
  userSeq.push(userColor);

  checkAns(userSeq.length - 1);
}
let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
  btn.addEventListener("click", btnPress);
}

//reset
function reset() {
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
  bgMusic.play();
}
















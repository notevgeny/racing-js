'use strict';

const score = document.querySelector('.score');
const start = document.querySelector('.start');
const gameArea = document.querySelector('.game-area');
const car = document.createElement('div');


car.classList.add('car');

const keys = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowLeft: false,
  ArrowRight: false
};

const settings = {
  start: false,
  score: 0,
  speed: 3
};


const startGame = () => {
  start.classList.add('hide');
  settings.start = true;
  gameArea.appendChild(car);
  requestAnimationFrame(playGame);
}

const startRun = (event) => {
  event.preventDefault();
  keys[event.key] = true;
}

const stopRun = (event) => {
  event.preventDefault();
  keys[event.key] = false;
}

const playGame = () => {
  console.log('PlayGame');
  if (settings.start){
    requestAnimationFrame(playGame);
  }
}

document.addEventListener('keydown', startRun);
document.addEventListener('keyup', stopRun);
start.addEventListener('click', startGame);
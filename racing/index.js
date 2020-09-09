'use strict';

const score = document.querySelector('.score');
const start = document.querySelector('.start');
const gameArea = document.querySelector('.game-area');
const car = document.createElement('div');


car.classList.add('car');
const carWidth = 50;
const carHeight = 100;

const keys = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowLeft: false,
  ArrowRight: false
};

const settings = {
  start: false,
  score: 0,
  speed: 3,
  traffic: 3
};

const getQuantityElements = (heightElement) => 
document.documentElement.clientHeight / heightElement + 1;

const startGame = () => {
  start.classList.add('hide');

  for (let i = 0; i < getQuantityElements(100); i++){
    const line = document.createElement('div');
    line.classList.add('line');
    line.style.top = (i * 100) + 'px';
    line.y = i * 100;
    gameArea.appendChild(line);
  }
  for (let i = 0; i < getQuantityElements(100 * settings.traffic ); i++){
    const enemy = document.createElement('div');
    enemy.classList.add('enemy');
    enemy.y = -100 * settings.traffic * (i + 1);
    enemy.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - carWidth)) + 'px';
    enemy.style.top = enemy.y + 'px';
    enemy.style.background ='transparent url("./image/enemy2.png") center / cover no-repeat';
    gameArea.appendChild(enemy);
  }


  settings.start = true;
  gameArea.appendChild(car);
  settings.x = car.offsetLeft;
  settings.y = car.offsetTop;
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

const moveRoad = () => {
  let lines = document.querySelectorAll('.line');
  lines.forEach((item) => {
    item.y += settings.speed;
    item.style.top = item.y + 'px';

    if (item.y >= document.documentElement.clientHeight){
      item.y = -100;
    }
  })
}

const moveEnemy = () => {
  let enemies = document.querySelectorAll('.enemy');
  enemies.forEach((item) => {
    item.y += settings.speed / 2;
    item.style.top = item.y + 'px';

    if (item.y >= document.documentElement.clientHeight){
      item.y = -200 * settings.traffic;
      item.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - carWidth)) + 'px';
    }
  });

  
}

const playGame = () => {
  if (settings.start){
    moveRoad();
    moveEnemy();
    if (keys.ArrowLeft && settings.x > 0){
      settings.x -= settings.speed;
    }
    if (keys.ArrowRight && settings.x < (gameArea.offsetWidth - car.offsetWidth)){
      settings.x += settings.speed;
    }
    if (keys.ArrowUp && settings.y > 0){
      settings.y -= settings.speed; 
    }
    if (keys.ArrowDown && settings.y < (gameArea.offsetHeight - car.offsetHeight)){
      settings.y += settings.speed;
    }
    car.style.left = settings.x + 'px';
    car.style.top = settings.y + 'px';
    requestAnimationFrame(playGame);
  }


}

document.addEventListener('keydown', startRun);
document.addEventListener('keyup', stopRun);
start.addEventListener('click', startGame);
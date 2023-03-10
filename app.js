const canvas = document.getElementById("canvas");
// get the drawing context via getContext() method to draw within canvas
const ctx = canvas.getContext("2d");

const unit = 20;
const row = canvas.height / unit;
const column = canvas.width / unit;
let snake = [];
let direction = "Right";

const createSnake = () => {
  snake = [
    { x: 80, y: 0 },
    { x: 60, y: 0 },
    { x: 40, y: 0 },
    { x: 20, y: 0 },
  ];
};

class Fruit {
  constructor() {
    this.x = Math.floor(Math.random() * column) * unit;
    this.y = Math.floor(Math.random() * row) * unit;
  }

  drawFruit() {
    ctx.fillStyle = "yellow";
    ctx.fillRect(this.x, this.y, unit, unit);
  }

  pickLocation() {
    let overlapping = false;
    let newFruitX;
    let newFruitY;

    function checkOverlap(x, y) {
      for (let i = 0; i < snake.length; i++) {
        if (snake[i].x === x && snake[i].y === y) {
          overlapping = true;
          return;
        } else {
          overlapping = false;
        }
      }
    }

    do {
      newFruitX = Math.floor(Math.random() * column) * unit;
      newFruitY = Math.floor(Math.random() * row) * unit;
      checkOverlap(newFruitX, newFruitY);
    } while (overlapping);

    // if !overlapping, then align the x & y with newFruitX and newFruitY
    this.x = newFruitX;
    this.y = newFruitY;
  }
}

createSnake();
const myFruit = new Fruit();

let score = 0;
document.getElementById("scoreNum").innerHTML = score;
const loadRecord = () => {
  const recordScore = localStorage.getItem("highest-score");
  if (recordScore) {
    record = Number(recordScore);
  } else {
    record = 0;
  }
};
let record;
loadRecord();
document.getElementById("recordNum").innerHTML = record;

const changeDirection = (e) => {
  if (e.key === "ArrowUp" && direction !== "Down") {
    direction = "Up";
  } else if (e.key === "ArrowDown" && direction !== "Up") {
    direction = "Down";
  } else if (e.key === "ArrowLeft" && direction !== "Right") {
    direction = "Left";
  } else if (e.key === "ArrowRight" && direction !== "Left") {
    direction = "Right";
  }
  // will not trigger change direction until snake's head repaint (prevent twice above clicks happen within 100 milisecs)
  window.removeEventListener("keydown", changeDirection);
};
// check if player pressed one of the directions
window.addEventListener("keydown", changeDirection);

const setRecord = (score) => {
  if (score > record) {
    localStorage.setItem("highest-score", score);
    record = score;
  }
};

const keepDrawing = () => {
  // check if snake bite himself/herself
  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      clearInterval(game);
      alert("Game Over!");
      return;
    }
  }

  // reset canvas
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // draw fruit first and then snake's body
  myFruit.drawFruit();

  for (let i = 0; i < snake.length; i++) {
    if (i === 0) {
      ctx.fillStyle = "yellowGreen";
    } else {
      ctx.fillStyle = "#004B97";
    }

    // check if the snake is over the canvas boarder
    if (snake[0].x >= canvas.width) {
      snake[0].x = 0;
    } else if (snake[0].x < 0) {
      snake[0].x = canvas.width - unit;
    } else if (snake[0].y >= canvas.height) {
      snake[0].y = 0;
    } else if (snake[0].y < 0) {
      snake[0].y = canvas.height - unit;
    }

    ctx.fillRect(snake[i].x, snake[i].y, unit, unit);
    ctx.strokeStyle = "#fff";
    ctx.strokeRect(snake[i].x, snake[i].y, unit, unit);
  }

  // change the heading direction for the snake
  const newSnakeX = snake[0].x;
  const newSnakeY = snake[0].y;
  let newHead;
  if (direction === "Right") {
    newHead = {
      x: newSnakeX + unit,
      y: newSnakeY,
    };
  } else if (direction === "Left") {
    newHead = {
      x: newSnakeX - unit,
      y: newSnakeY,
    };
  } else if (direction === "Up") {
    newHead = {
      x: newSnakeX,
      y: newSnakeY - unit,
    };
  } else if (direction === "Down") {
    newHead = {
      x: newSnakeX,
      y: newSnakeY + unit,
    };
  }

  // check if snake ate the fruit
  if (snake[0].x === myFruit.x && snake[0].y === myFruit.y) {
    myFruit.pickLocation();
    score++;
    setRecord(score);
    document.getElementById("scoreNum").innerHTML = score;
    document.getElementById("recordNum").innerHTML = record;
  } else {
    snake.pop();
  }
  snake.unshift(newHead);
  window.addEventListener("keydown", changeDirection);
};

const game = setInterval(keepDrawing, 100);

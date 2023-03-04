const canvas = document.getElementById("canvas");
// get the drawing context via getContext() method to draw within canvas
const ctx = canvas.getContext("2d");

const unit = 20;
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
};

// check if player pressed one of the directions
window.addEventListener("keydown", changeDirection);

createSnake();

const keepDrawing = () => {
  console.log("game started");
  for (let i = 0; i < snake.length; i++) {
    if (i === 0) {
      ctx.fillStyle = "yellowGreen";
    } else {
      ctx.fillStyle = "#004B97";
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
  snake.pop();
  snake.unshift(newHead);
};

const game = setInterval(keepDrawing, 100);

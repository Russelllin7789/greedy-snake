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
  }
  snake.pop();
  snake.unshift(newHead);
};

// const game = setInterval(keepDrawing, 100);

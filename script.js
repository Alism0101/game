const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const box = 20;
let snake = [{ x: box * 5, y: box * 5 }];
let direction = 'RIGHT';
let food = spawnFood();
let score = 0;

document.addEventListener('keydown', changeDirection);
document.getElementById('startBtn').addEventListener('click', startGame);

function startGame() {
    score = 0;
    snake = [{ x: box * 5, y: box * 5 }];
    direction = 'RIGHT';
    document.getElementById('score').innerText = `Score: ${score}`;
    clearInterval(game);
    game = setInterval(draw, 100);
}

function spawnFood() {
    return {
        x: Math.floor(Math.random() * (canvas.width / box)) * box,
        y: Math.floor(Math.random() * (canvas.height / box)) * box
    };
}

function changeDirection(event) {
    const key = event.keyCode;
    if (key === 37 && direction !== 'RIGHT') direction = 'LEFT';
    else if (key === 38 && direction !== 'DOWN') direction = 'UP';
    else if (key === 39 && direction !== 'LEFT') direction = 'RIGHT';
    else if (key === 40 && direction !== 'UP') direction = 'DOWN';
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#eaeaea';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i === 0 ? 'green' : 'darkgreen';
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
        ctx.strokeStyle = 'white';
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, box, box);

    const snakeX = snake[0].x;
    const snakeY = snake[0].y;

    if (snakeX === food.x && snakeY === food.y) {
        score++;
        document.getElementById('score').innerText = `Score: ${score}`;
        food = spawnFood();
    } else {
        snake.pop();
    }

    let newHead;
    if (direction === 'LEFT') newHead = { x: snakeX - box, y: snakeY };
    else if (direction === 'UP') newHead = { x: snakeX, y: snakeY - box };
    else if (direction === 'RIGHT') newHead = { x: snakeX + box, y: snakeY };
    else if (direction === 'DOWN') newHead = { x: snakeX, y: snakeY + box };

    if (collision(newHead, snake) || newHead.x < 0 || newHead.y < 0 || newHead.x >= canvas.width || newHead.y >= canvas.height) {
        clearInterval(game);
        alert('Game Over! Your score was: ' + score);
    }

    snake.unshift(newHead);
}

function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x === array[i].x && head.y === array[i].y) {
            return true;
        }
    }
    return false;
}


let snake2 = [];
let score2 = 0;
let food2 = {x:5,
              y:5}

const canvas = document.getElementById("snake1");
const ctx = canvas.getContext("2d");
const canvas2 = document.getElementById("snake2");
const ctx2 = canvas2.getContext("2d");

const ground = new Image();
ground.src = "static/images/ground.png";

const foodImg = new Image();
foodImg.src = "static/images/food.png";

let box = 32;

let score = 0;

let food = {
  x: Math.floor((Math.random() * 17 + 1)) * box,
  y: Math.floor((Math.random() * 15 + 3)) * box,
};

let snake = [];
snake[0] = {
  x: 9 * box,
  y: 10 * box
};

document.addEventListener("keydown", direction);


function direction(event) {
  worker.postMessage(["key",event.keyCode])
}


function drawGame() {
  ctx.drawImage(ground, 0, 0);

  ctx.drawImage(foodImg, food.x, food.y);

  for(let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i == 0 ? "green" : "red";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
  }

  ctx.fillStyle = "white";
  ctx.font = "50px Arial";
  ctx.fillText(score, box * 2.5, box * 1.7);
}

function drawGame2() {
  ctx2.drawImage(ground, 0, 0);

  ctx2.drawImage(foodImg, food2.x, food2.y);

  for(let i = 0; i < snake2.length; i++) {
    ctx2.fillStyle = i == 0 ? "green" : "red";
    ctx2.fillRect(snake2[i].x, snake2[i].y, box, box);
  }

  ctx2.fillStyle = "white";
  ctx2.font = "50px Arial";
  ctx2.fillText(score2, box * 2.5, box * 1.7);
}

var worker = new Worker('static/scripts/gamescripts/snake2rt.js');

worker.onmessage = function(e) {
      if(e.data[0] == "first")
        {
          snake = e.data[1];
          food = e.data[2];
          score = e.data[3];
          drawGame();
        }
      else if(e.data[0] == "second")
        {
          snake2 = e.data[1];
          food2 = e.data[2];
          score2 = e.data[3]
          drawGame2();
        }
    }


worker.postMessage(["start",window.location.host])

//
// window.onbeforeunload = async function() {
//   let url = "test";
//       let response = await fetch(url,
//       {
//         method: 'GET',
//         //body: JSON.stringify({"playfield" : playfield, "tetromino" : tetromino}),
//         //headers: {"X-CSRFToken": csrftoken} ,
//       });

// }

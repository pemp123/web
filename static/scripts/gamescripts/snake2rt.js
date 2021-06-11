var connectionString;
var gameSocket;

let snake2 = [];
let score2 = 0;
let food2 = {x:5,
              y:5}

function connect() {
  console.log("123");
    gameSocket.onopen = function open() {
        console.log('WebSockets connection created.');
        // on websocket open, send the START event.
        gameSocket.send(JSON.stringify({
            "event": "START",
            "message": ""
        }));
    };

    gameSocket.onclose = function (e) {
        console.log('Socket is closed. Reconnect will be attempted in 1 second.', e.reason);
        setTimeout(function () {
            connect();
        }, 1000);
    };

    // Sending the info about the room
    gameSocket.onmessage = function (e) {
        // On getting the message from the server
        // Do the appropriate steps on each event.
        let data = JSON.parse(e.data);
        data = data["payload"];
        let message = data['message'];
        let event = data["event"];
        switch (event) {
            case "move":
                json = JSON.parse(message)
                snake2 = json.snake;
                food2 = json.food;
                score2 = json.score;
                postMessage(["second",snake2,food2,score2]);
                //console.log("123");
                break;
            default:
                console.log("1111")
        }
    };

    if (gameSocket.readyState == WebSocket.OPEN) {
        gameSocket.onopen();
    }
}

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

let dir;

function key_press(event) {
  if(event == 37 && dir != "right")
    dir = "left";
  else if(event == 38 && dir != "down")
    dir = "up";
  else if(event == 39 && dir != "left")
    dir = "right";
  else if(event == 40 && dir != "up")
    dir = "down";
}

function eatTail(head, arr) {
  for(let i = 0; i < arr.length; i++) {
    if(head.x == arr[i].x && head.y == arr[i].y)
      flag = false;
  }
}

function drawGame() {
  
  postMessage(["first",snake,food,score]);
  
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if(snakeX == food.x && snakeY == food.y) {
    score++;
    food = {
      x: Math.floor((Math.random() * 17 + 1)) * box,
      y: Math.floor((Math.random() * 15 + 3)) * box,
    };
  } else {
    snake.pop();
  }

  if(snakeX < box || snakeX > box * 17
    || snakeY < 3 * box || snakeY > box * 17)
    flag = false;

  if(dir == "left") snakeX -= box;
  if(dir == "right") snakeX += box;
  if(dir == "up") snakeY -= box;
  if(dir == "down") snakeY += box;

  let newHead = {
    x: snakeX,
    y: snakeY
  };

  eatTail(newHead, snake);

  snake.unshift(newHead);
  
}

 function temp()
    { 
      
      data = {
                "event": "move",
                "message": JSON.stringify({"snake" : snake,"food" : food,"score" : score})
            }
      gameSocket.send(JSON.stringify(data));
    }
var game;
var take;
var flag = true;
function test()
{
  if(flag)
    drawGame();
  temp()
}

function start(wind)
    {
      
      connectionString = 'wss://' + wind + '/test';
      gameSocket = new WebSocket(connectionString);
      take = connect();
      game = setInterval(test, 100);
    }

onmessage = function(e) {
  if(e.data[0] == "key")
    key_press(e.data[1]);
  else if (e.data[0] == "start")
    start(e.data[1])
}
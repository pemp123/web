// License CC0 1.0 Universal 
    // https://gist.github.com/straker/3c98304f8a6a9174efd8292800891ea1
    // https://tetris.fandom.com/wiki/Tetris_Guideline
    // var connectionString = 'wss://' + window.location.host + '/ws/play/' + '1' + '/';
    // var gameSocket = new WebSocket(connectionString);

    // получаем доступ к холсту
    const canvas = document.getElementById('tetris2');
    const canvas2 = document.getElementById('tetris1');
    const print_score = document.getElementById('score1');
    const context = canvas.getContext('2d');
    const context2 = canvas2.getContext('2d');
    var score = 0;
    print_score.innerHTML=score;
    // размер квадратика
    const grid = 32;
    // массив с последовательностями фигур, на старте — пустой
    var tetrominoSequence = [];

    // с помощью двумерного массива следим за тем, что находится в каждой клетке игрового поля
    // размер поля — 10 на 20, и несколько строк ещё находится за видимой областью
    var playfield = [];
    var playfield2 = [];

    // заполняем сразу массив пустыми ячейками
    // for (let row = -2; row < 20; row++) {
    //   playfield[row] = [];

    //   for (let col = 0; col < 10; col++) {
    //     playfield[row][col] = 0;
    //   }
    // }

    // как рисовать каждую фигуру
    // https://tetris.fandom.com/wiki/SRS
    const tetrominos = {
      'I': [
        [0,0,0,0],
        [1,1,1,1],
        [0,0,0,0],
        [0,0,0,0]
      ],
      'J': [
        [1,0,0],
        [1,1,1],
        [0,0,0],
      ],
      'L': [
        [0,0,1],
        [1,1,1],
        [0,0,0],
      ],
      'O': [
        [1,1],
        [1,1],
      ],
      'S': [
        [0,1,1],
        [1,1,0],
        [0,0,0],
      ],
      'Z': [
        [1,1,0],
        [0,1,1],
        [0,0,0],
      ],
      'T': [
        [0,1,0],
        [1,1,1],
        [0,0,0],
      ]
    };

    // цвет каждой фигуры
    const colors = {
      'I': 'cyan',
      'O': 'yellow',
      'T': 'purple',
      'S': 'green',
      'Z': 'red',
      'J': 'blue',
      'L': 'orange'
    };

    // счётчик
    let count = 0;
    let bigcount = 0;

    // текущая фигура в игре
    let tetromino;
    let tetromino2;
    // следим за кадрами анимации, чтобы если что — остановить игру
    let rAF = null;  
    // флаг конца игры, на старте — неактивный
    let gameOver = false;


    // // Функция возвращает случайное число в заданном диапазоне
    // // https://stackoverflow.com/a/1527820/2124254
    // function getRandomInt(min, max) {
    //   min = Math.ceil(min);
    //   max = Math.floor(max);

    //   return Math.floor(Math.random() * (max - min + 1)) + min;
    // }

    // // создаём последовательность фигур, которая появится в игре
    // //https://tetris.fandom.com/wiki/Random_Generator
    // function generateSequence() {
    //   // тут — сами фигуры
    //   const sequence = ['I', 'J', 'L', 'O', 'S', 'T', 'Z'];

    //   while (sequence.length) {
    //     // случайным образом находим любую из них
    //     const rand = getRandomInt(0, sequence.length - 1);
    //     const name = sequence.splice(rand, 1)[0];
    //     // помещаем выбранную фигуру в игровой массив с последовательностями
    //     tetrominoSequence.push(name);
    //   }
    // }

    // получаем следующую фигуру
    // function getNextTetromino() {
    //   // если следующей нет — генерируем
    //   if (tetrominoSequence.length === 0) {
    //     generateSequence();
    //   }
    //   // берём первую фигуру из массива
    //   const name = tetrominoSequence.pop();
    //   // сразу создаём матрицу, с которой мы отрисуем фигуру
    //   const matrix = tetrominos[name];

    //   // I и O стартуют с середины, остальные — чуть левее
    //   const col = playfield[0].length / 2 - Math.ceil(matrix[0].length / 2);

    //   // I начинает с 21 строки (смещение -1), а все остальные — со строки 22 (смещение -2)
    //   const row = name === 'I' ? -1 : -2;

    //   // вот что возвращает функция 
    //   return {
    //     name: name,      // название фигуры (L, O, и т.д.)
    //     matrix: matrix,  // матрица с фигурой
    //     row: row,        // текущая строка (фигуры стартую за видимой областью холста)
    //     col: col         // текущий столбец
    //   };
    // }

    // // поворачиваем матрицу на 90 градусов
    // // https://codereview.stackexchange.com/a/186834
    // function rotate(matrix) {
    //   const N = matrix.length - 1;
    //   const result = matrix.map((row, i) =>
    //     row.map((val, j) => matrix[N - j][i])
    //   );
    //   // на входе матрица, и на выходе тоже отдаём матрицу
    //   return result;
    // }

    // // проверяем после появления или вращения, может ли матрица (фигура) быть в этом месте поля или она вылезет за его границы
    // function isValidMove(matrix, cellRow, cellCol) {
    //   // проверяем все строки и столбцы
    //   for (let row = 0; row < matrix.length; row++) {
    //     for (let col = 0; col < matrix[row].length; col++) {
    //       if (matrix[row][col] && (
    //           // если выходит за границы поля…
    //           cellCol + col < 0 ||
    //           cellCol + col >= playfield[0].length ||
    //           cellRow + row >= playfield.length ||
    //           // …или пересекается с другими фигурами
    //           playfield[cellRow + row][cellCol + col])
    //         ) {
    //         // то возвращаем, что нет, так не пойдёт
    //         return false;
    //       }
    //     }
    //   }
    //   // а если мы дошли до этого момента и не закончили раньше — то всё в порядке
    //   return true;
    // }

    // // когда фигура окончательна встала на своё место
    // function placeTetromino() {
    //   // обрабатываем все строки и столбцы в игровом поле
    //   for (let row = 0; row < tetromino.matrix.length; row++) {
    //     for (let col = 0; col < tetromino.matrix[row].length; col++) {
    //       if (tetromino.matrix[row][col]) {

    //         // если край фигуры после установки вылезает за границы поля, то игра закончилась
    //         if (tetromino.row + row < 0) {
    //           return showGameOver();
    //         }
    //         // если всё в порядке, то записываем в массив игрового поля нашу фигуру
    //         playfield[tetromino.row + row][tetromino.col + col] = tetromino.name;
    //       }
    //     } 
    //   }

    //   // проверяем, чтобы заполненные ряды очистились снизу вверх
    //   for (let row = playfield.length - 1; row >= 0; ) {
    //     // если ряд заполнен
    //     if (playfield[row].every(cell => !!cell)) {
    //       score++;
    //       print_score.innerHTML=score;
    //       // очищаем его и опускаем всё вниз на одну клетку
    //       for (let r = row; r >= 0; r--) {
    //         for (let c = 0; c < playfield[r].length; c++) {
    //           playfield[r][c] = playfield[r-1][c];
    //         }
    //       }
    //     }
    //     else {
    //       // переходим к следующему ряду
    //       row--;
    //     }
    //   }
    //   // получаем следующую фигуру
    //   tetromino = getNextTetromino();
    // }

      // показываем надпись Game Over
      function showGameOver() {
        // прекращаем всю анимацию игры
        cancelAnimationFrame(rAF);
        // ставим флаг окончания
        gameOver = true;
        // рисуем чёрный прямоугольник посередине поля
        context.fillStyle = 'black';
        context.globalAlpha = 0.75;
        context.fillRect(0, canvas.height / 2 - 30, canvas.width, 60);
        // пишем надпись белым моноширинным шрифтом по центру
        context.globalAlpha = 1;
        context.fillStyle = 'white';
        context.font = '36px monospace';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillText('GAME OVER!', canvas.width / 2, canvas.height / 2);
        
      }

//     function getCookie(name) {
//     var cookieValue = null;
//     if (document.cookie && document.cookie != '') {
//         var cookies = document.cookie.split(';');
//         for (var i = 0; i < cookies.length; i++) {
//             var cookie = jQuery.trim(cookies[i]);
//             // Does this cookie string begin with the name we want?
//             if (cookie.substring(0, name.length + 1) == (name + '=')) {
//                 cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
//                 break;
//             }
//         }
//     }
//     return cookieValue;
//     } 
    

//     function connect() {
//     gameSocket.onopen = function open() {
//         console.log('WebSockets connection created.');
//         // on websocket open, send the START event.
//         gameSocket.send(JSON.stringify({
//             "event": "START",
//             "message": ""
//         }));
//     };

//     gameSocket.onclose = function (e) {
//         console.log('Socket is closed. Reconnect will be attempted in 1 second.', e.reason);
//         setTimeout(function () {
//             connect();
//         }, 1000);
//     };
//     // Sending the info about the room
//     gameSocket.onmessage = function (e) {
//         // On getting the message from the server
//         // Do the appropriate steps on each event.
//         let data = JSON.parse(e.data);
//         data = data["payload"];
//         let message = data['message'];
//         let event = data["event"];
//         switch (event) {
//             case "move":
//                 json = JSON.parse(message)
//                 playfield2 = json.playfield;
//                 tetromino2 = json.tetromino;
//                 break;
//             default:
//                 console.log("No event")
//         }
//     };

//     if (gameSocket.readyState == WebSocket.OPEN) {
//         gameSocket.onopen();
//     }
// }

//call the connect function at the start.


      // let url = "test";
      // let response = await fetch(url,
      // {
      //   method: 'POST',
      //   body: JSON.stringify({"playfield" : playfield, "tetromino" : tetromino}),
      //   headers: {"X-CSRFToken": csrftoken} ,
      // });

      // if (response.ok) { // если HTTP-статус в диапазоне 200-299
      // // получаем тело ответа (см. про этот метод ниже)
      // let json = await response.json();
      // playfield2 = json.playfield;
      // tetromino2 = json.tetromino;
      // //playfield2 = JSON.parse(json)
      // }
    


    function draw_first_window(){
      // не забываем про цвет текущей фигуры
      context.fillStyle = colors[tetromino.name];
      //temp()
      // отрисовываем её
      for (let row = 0; row < tetromino.matrix.length; row++) {
        for (let col = 0; col < tetromino.matrix[row].length; col++) {
          if (tetromino.matrix[row][col]) {

              // и снова рисуем на один пиксель меньше
            context.fillRect((tetromino.col + col) * grid, (tetromino.row + row) * grid, grid-1, grid-1);
          }
        }
      }
    }

    function draw_second_window(){
      context2.fillStyle = colors[tetromino2.name];
        //отрисовываем её
        for (let row = 0; row < tetromino2.matrix.length; row++) {
          for (let col = 0; col < tetromino2.matrix[row].length; col++) {
            if (tetromino2.matrix[row][col]) {

              // и снова рисуем на один пиксель меньше
              context2.fillRect((tetromino2.col + col) * grid, (tetromino2.row + row) * grid, grid-1, grid-1);
            }
          }
        }
    }
    // главный цикл игры
    function loop() {
      // начинаем анимацию
      rAF = requestAnimationFrame(loop);
      // очищаем холст
      context.clearRect(0,0,canvas.width,canvas.height);

      // рисуем игровое поле с учётом заполненных фигур
      for (let row = 0; row < 20; row++) {
        for (let col = 0; col < 10; col++) {
          if (playfield[row][col]) {
            const name = playfield[row][col];
            context.fillStyle = colors[name];

            // рисуем всё на один пиксель меньше, чтобы получился эффект «в клетку»
            context.fillRect(col * grid, row * grid, grid-1, grid-1);
          }
        }
      }

      // рисуем текущую фигуру

        draw_first_window();
      //}
    }

    function loop2() {
      
      // начинаем анимацию
      // очищаем холст
      //rAF = requestAnimationFrame(loop2);
      context2.clearRect(0,0,canvas2.width,canvas2.height);

      // рисуем игровое поле с учётом заполненных фигур
      for (let row = 0; row < 20; row++) {
        for (let col = 0; col < 10; col++) {
          if (playfield2[row][col]) {
            const name = playfield2[row][col];
            context2.fillStyle = colors[name];

            // рисуем всё на один пиксель меньше, чтобы получился эффект «в клетку»
            context2.fillRect(col * grid, row * grid, grid-1, grid-1);
          }
        }
      }

      draw_second_window();
      

      // // рисуем текущую фигуру
      // if (tetromino) {

      //   // фигура сдвигается вниз каждые 35 кадров
      //   if (++count > 35) {
      //     tetromino.row++;
      //     count = 0;

      //     // если движение закончилось — рисуем фигуру в поле и проверяем, можно ли удалить строки
      //     if (!isValidMove(tetromino.matrix, tetromino.row, tetromino.col)) {
      //       tetromino.row--;
      //       placeTetromino();
      //     }
      //   }

        // не забываем про цвет текущей фигуры
        

    }

    // следим за нажатиями на клавиши
    document.addEventListener('keydown', function(e) {
      // если игра закончилась — сразу выходим
      //if (gameOver) return;
      worker.postMessage(["key",e.which])
      // стрелки влево и вправо
    });

    var worker = new Worker('static/scripts/timer.js');

    async function startGame()
    {

      //console.log(csrftoken);
      cancelAnimationFrame(rAF);
      context.clearRect(0,0,canvas.width,canvas.height);
    //   for (let row = -2; row < 20; row++) {
    //   playfield[row] = [];

    //   for (let col = 0; col < 10; col++) {
    //     playfield[row][col] = 0;
    //   }
    // }
    // score=0;
      
    // tetromino = getNextTetromino();
    // loop();
    // loop2();
    }

    print_score.innerHTML=score;
    worker.postMessage(["start",window.location.host]);

    worker.onmessage = function(e) {
      if(e.data[0] == "first")
        {
          playfield = e.data[1];
          tetromino = e.data[2];
          loop();
        }
      else if(e.data[0] == "second")
        {
          playfield2 = e.data[1];
          tetromino2 = e.data[2];
          loop2();
        }
      if(e.data[0] == "score")
        {
          score = e.data[1];
        print_score.innerHTML=score;
        }
    }
    
    // старт игры
    //rAF = requestAnimationFrame(loop);
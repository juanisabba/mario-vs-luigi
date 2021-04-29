function juego() {
  const startButton = document.querySelector("#principal-menu .play");
  const resultLeft = document.getElementById("result-left");
  let player1Score = 0;
  const resultRight = document.getElementById("result-right");
  let player2Score = 0;
  const ball = document.getElementById("ball");
  const bar1 = document.getElementById("bar1");
  const bar2 = document.getElementById("bar2");
  const star = document.getElementById("star");
  const marioWin = document.getElementById("mario-win");
  const luigiWin = document.getElementById("luigi-win");
  const marioPlayAgain = document.querySelector(".mario-play-again");
  const luigiPlayAgain = document.querySelector(".luigi-play-again");
  const warningButton = document.querySelector('.warning-sign button')

  let time = 20;
  let movement = 7;
  let movementBar = 10;
  let width = document.documentElement.clientWidth - movement;
  let height = document.documentElement.clientHeight - movement;
  let controlGame;
  let player1;
  let player2;
  
  warningButton.onclick = function () {
    document.querySelector('.warning-sign').style.display = "none"
  }

  startButton.onclick = function () {
    document.getElementById("principal-menu").style.display = "none";
    ball.style.display = "block";
    resultRight.style.display = "inline-block";
    resultLeft.style.display = "inline-block";
    bar1.style.display = 'block'
    bar2.style.display = 'block'
    star.style.display = 'block'
    start();
  };

  function start() {
    init();

    controlGame = setInterval(play, time);
  }

  function init() {
    ball.state = 1;
    ball.direction = 1; // rigth 1, left 2
    player1 = new Object();
    player2 = new Object();
    player1.keyPress = false;
    player1.keyCode = null;
    player2.keyPress = false;
    player2.keyCode = null;
  }

  function point() {
    clearInterval(controlGame);
    if (ball.direction === 1) ball.direction = 2;
    else ball.direction = 1;
    ball.style.top = 0;
    ball.style.left = "50%";
    movement = 7;
    controlGame = setInterval(play, time);
  }

  function player1Win() {
    clearInterval(controlGame);
    marioWin.style.display = "grid";
    ball.style.display = "none";
    bar1.style.display = "none";
    bar2.style.display = "none";
    resultLeft.style.display = "none";
    resultRight.style.display = "none";
    star.style.display = "none";
  }

  marioPlayAgain.onclick = function () {
    ball.style.display = "block";
    bar1.style.display = "block";
    bar2.style.display = "block";
    resultLeft.style.display = "block";
    resultRight.style.display = "block";
    star.style.display = "block";
    bar1.style.top = "50%";
    bar2.style.top = "50%";
    movement = 7;
    ball.direction = 1;
    ball.style.top = 0;
    ball.style.left = "50%";
    player1Score = 0;
    player2Score = 0;
    resultLeft.setAttribute('src', 'img/0.png')
    resultRight.setAttribute('src', 'img/0.png')
    marioWin.style.display = "none";
    controlGame = setInterval(play, time);
  };

  function player2Win() {
    clearInterval(controlGame);
    luigiWin.style.display = "grid";
    ball.style.display = "none";
    bar1.style.display = "none";
    bar2.style.display = "none";
    resultLeft.style.display = "none";
    resultRight.style.display = "none";
    star.style.display = "none";
  }

  luigiPlayAgain.onclick = function () {
    ball.style.display = "block";
    bar1.style.display = "block";
    bar2.style.display = "block";
    star.style.display = "block";
    bar1.style.top = "50%";
    bar2.style.top = "50%";
    resultLeft.style.display = "block";
    resultRight.style.display = "block";
    movement = 7;
    ball.direction = 1;
    ball.style.top = 0;
    ball.style.left = "50%";
    player1Score = 0;
    player2Score = 0;
    resultLeft.setAttribute('src', 'img/0.png')
    resultRight.setAttribute('src', 'img/0.png')
    luigiWin.style.display = "none";
    controlGame = setInterval(play, time);
  };

  function play() {
    moveBall();
    moveBar();
    checkIfLost();
  }

  function checkIfLost() {
    //PLAYER 1
    if (ball.offsetLeft >= width + 25) {
      player1Score++;
      if (player1Score === 0) resultLeft.setAttribute('src', 'img/0.png')
      else if (player1Score === 1) resultLeft.setAttribute('src', 'img/1.png')
      else if (player1Score === 2) resultLeft.setAttribute('src', 'img/2.png')
      else if (player1Score === 3) resultLeft.setAttribute('src', 'img/3.png')
      else if (player1Score === 4) resultLeft.setAttribute('src', 'img/4.png')
      else if (player1Score === 5) resultLeft.setAttribute('src', 'img/5.png')
      else if (player1Score === 6) resultLeft.setAttribute('src', 'img/6.png')
      else if (player1Score === 7) resultLeft.setAttribute('src', 'img/7.png')
      else if (player1Score === 8) resultLeft.setAttribute('src', 'img/8.png')
      else if (player1Score === 9) resultLeft.setAttribute('src', 'img/9.png')
          
      if (player1Score === 10) player1Win();
      else point();

      //PLAYER 2
    } else if (ball.offsetLeft <= -25) {
      player2Score++;
      if (player2Score === 0) resultRight.setAttribute('src', 'img/0.png')
      else if (player2Score === 1) resultRight.setAttribute('src', 'img/1.png')
      else if (player2Score === 2) resultRight.setAttribute('src', 'img/2.png')
      else if (player2Score === 3) resultRight.setAttribute('src', 'img/3.png')
      else if (player2Score === 4) resultRight.setAttribute('src', 'img/4.png')
      else if (player2Score === 5) resultRight.setAttribute('src', 'img/5.png')
      else if (player2Score === 6) resultRight.setAttribute('src', 'img/6.png')
      else if (player2Score === 7) resultRight.setAttribute('src', 'img/7.png')
      else if (player2Score === 8) resultRight.setAttribute('src', 'img/8.png')
      else if (player2Score === 9) resultRight.setAttribute('src', 'img/9.png')

      if (player2Score === 10) player2Win();
      else point();
    }
  }

  function moveBall() {
    checkStateBall();
    switch (ball.state) {
      case 1: // derecha, abajo
        ball.style.left = ball.offsetLeft + movement + "px";
        ball.style.top = ball.offsetTop + movement + "px";
        break;
      case 2: // derecha, arriba
        ball.style.left = ball.offsetLeft + movement + "px";
        ball.style.top = ball.offsetTop - movement + "px";
        break;
      case 3: // izquierda, abajo
        ball.style.left = ball.offsetLeft - movement + "px";
        ball.style.top = ball.offsetTop + movement + "px";
        break;
      case 4: // izquierda, arriba
        ball.style.left = ball.offsetLeft - movement + "px";
        ball.style.top = ball.offsetTop - movement + "px";
        break;
    }
  }

  function checkStateBall() {
    if (collidePlayer2()) {
      ball.direction = 2;
      if (ball.state === 1) ball.state = 3;
      else if (ball.state === 2) ball.state = 4;
    } else if (collidePlayer1()) {
      ball.direction = 1;
      if (ball.state === 3) ball.state = 1;
      else if (ball.state === 4) ball.state = 2;
    }
    if (ball.direction === 1) {
      if (ball.offsetTop >= height) ball.state = 2;
      else if (ball.offsetTop <= 0) ball.state = 1;
    } else {
      if (ball.offsetTop >= height) ball.state = 4;
      else if (ball.offsetTop <= 0) ball.state = 3;
    }
  }

  function collidePlayer1() {
    if (
      ball.offsetLeft <= bar1.clientWidth &&
      ball.offsetTop >= bar1.offsetTop &&
      ball.offsetTop <= bar1.offsetTop + bar1.clientHeight
    ) {
      movement++;
      return true;
    }

    return false;
  }

  function collidePlayer2() {
    if (
      ball.offsetLeft >= width - bar2.clientWidth &&
      ball.offsetTop >= bar2.offsetTop &&
      ball.offsetTop <= bar2.offsetTop + bar2.clientHeight
    ) {
      movement++;
      return true;
    }
    return false;
  }

  function moveBar() {
    if (player1.keyPress) {
      if (player1.keyCode === 87 && bar1.offsetTop >= 10) {
        bar1.style.top = bar1.offsetTop - movementBar + "px";
      } else if (
        player1.keyCode === 83 &&
        bar1.offsetTop + bar1.clientHeight <= height
      ) {
        bar1.style.top = bar1.offsetTop + movementBar + "px";
      }
    }
    if (player2.keyPress) {
      if (player2.keyCode === 38 && bar2.offsetTop >= 10) {
        bar2.style.top = bar2.offsetTop - movementBar + "px";
      } else if (
        player2.keyCode === 40 &&
        bar2.offsetTop + bar2.clientHeight <= height
      ) {
        bar2.style.top = bar2.offsetTop + movementBar + "px";
      }
    }
  }

  document.onkeydown = function (e) {
    e = e || window.event;
    switch (e.keyCode) {
      case 87: //W
      case 83: //S
        player1.keyCode = e.keyCode;
        player1.keyPress = true;
        break;
      case 38: // UP ARROW
      case 40: // DOWN ARROW
        player2.keyCode = e.keyCode;
        player2.keyPress = true;
        break;
    }
  };

  document.onkeyup = function (e) {
    if (e.keyCode == 87 || e.keyCode == 83) player1.keyPress = false;
    if (e.keyCode == 38 || e.keyCode == 40) player2.keyPress = false;
  };
}
juego();

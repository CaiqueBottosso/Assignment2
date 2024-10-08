let character = document.getElementById("character");
let characterBottom = parseInt(
  window.getComputedStyle(character).getPropertyValue("bottom")
);
let characterRight = parseInt(
  window.getComputedStyle(character).getPropertyValue("right")
);
let characterWidth = parseInt(
  window.getComputedStyle(character).getPropertyValue("width")
);
let floor = document.getElementById("floor");
let floorBottom = parseInt(
  window.getComputedStyle(floor).getPropertyValue("bottom")
);
let floorHeight = parseInt(
  window.getComputedStyle(floor).getPropertyValue("height")
);
let allScreen = document.getElementById("game");
let isJumping = false;
let upTime;
let downTime;
let displayScore = document.getElementById("score");
let score = 0;

const arrayObstacles = [
  "./images/p-air.png",
  "./images/p-basket.png",
  "./images/p-cotton.png",
  "./images/p-earth.png",
  "./images/p-lava.png",
  "./images/p-meat.png",
  "./images/p-ocean.png",
  "./images/p-pink.png",
  "./images/p-sun.png",
  "./images/rock.png",
  "./images/ufo.png",
];

const arrayCharacters = [
  "./images/alien.png",
  "./images/alien2.png",
  "./images/astro1.png",
  "./images/astro2.png",
  "./images/astro3.png",
];

const arrayBackground = [
  "./images/bg1.jpg",
  "./images/bg2.jpg",
  "./images/bg3.jpg",
  "./images/bg4.jpg",
  "./images/bg5.jpg",
  "./images/bg6.jpg",
  "./images/bg7.jpg",
  "./images/bg8.jpg",
  "./images/bg9.jpg",
  "./images/bg10.png",
];

const jump = () => {
  if (isJumping) {
    return;
  }
  upTime = setInterval(() => {
    if (characterBottom >= floorHeight + 250) {
      clearInterval(upTime);
      downTime = setInterval(() => {
        if (characterBottom <= floorHeight + 10) {
          clearInterval(downTime);
          isJumping = false;
        }
        characterBottom -= 10;
        character.style.bottom = characterBottom + "px";
      }, 20);
    }
    characterBottom += 10;
    character.style.bottom = characterBottom + "px";
    isJumping = true;
  }, 20);
};

const showScore = () => {
  score++;
  displayScore.innerText = score;
};

const generateObstacles = () => {
  let obstacles = document.querySelector(".obstacles");
  let obstacle = document.createElement("div");
  obstacle.setAttribute("class", "obstacle");
  obstacles.appendChild(obstacle);

  let randomTimeout = Math.floor(Math.random() * 1000) + 1000;
  let obstacleRight = -30;
  let obstacleBottom = 100;
  let obstacleWidth = Math.floor(Math.random() * (50 - 10 + 1) + 10);
  let obstacleHeight = Math.floor(Math.random() * 50) + 50;
  obstacle.style.backgroundImage = `url(${
    arrayObstacles[Math.floor(Math.random() * 11)]
  })`;
  obstacle.style.backgroundSize = "contain";
  obstacle.style.backgroundRepeat = "no-repeat";
  const moveObstacle = () => {
    obstacleRight += 5;
    obstacle.style.right = obstacleRight + "px";
    obstacle.style.bottom = obstacleBottom + "px";
    obstacle.style.width = obstacleWidth + "px";
    obstacle.style.height = obstacleHeight + "px";
    if (
      characterRight >= obstacleRight - characterWidth &&
      characterRight <= obstacleRight + obstacleWidth &&
      characterBottom <= obstacleBottom + obstacleHeight
    ) {
      alert("Game over! Your score is: " + score);
      clearInterval(obstacleInterval);
      clearTimeout(obstacleTimeout);
      location.reload();
    }
  };

  let obstacleInterval = setInterval(moveObstacle, 20);
  let obstacleTimeout = setTimeout(generateObstacles, randomTimeout);
};

const control = (e) => {
  if (e.key == "ArrowUp" || e.key == " ") {
    jump();
  }
};

const game = () => {
  allScreen.style.backgroundImage = `url(${
    arrayBackground[Math.floor(Math.random() * 9)]
  })`;
  character.style.backgroundImage = `url(${
    arrayCharacters[Math.floor(Math.random() * 5)]
  })`;
  alert("Welcome to the jump game!");
  setInterval(showScore, 100);
  generateObstacles();
};

game();

document.addEventListener("keydown", control);

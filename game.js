// select canvas element
const canvas = document.getElementById("game");

// getContext of canvas = methods and properties to draw and do a lot of thing to the canvas
const ctx = canvas.getContext('2d');
width = canvas.width = window.innerWidth;
height = canvas.height = window.innerHeight;

document.addEventListener("keydown", handleKeydown, false);
document.addEventListener("keyup", handleKeyup, false);




let playerSpriteR = new Image();
playerSpriteR.addEventListener("load", drawSprite);
playerSpriteR.src = "images/purpleSpriteR.png";

let playerSpriteL = new Image();
playerSpriteL.addEventListener("load", drawSprite);
playerSpriteL.src = "images/purpleSpriteL.png";



let player = {
  //sprite sheet/animation info
  sx: 0,
  sy: 0,
  sWidth: 32,
  sHeight: 32,
  x: width/2,
  y: height / 2 - 60,
  dWidth: 128,
  dHeight: 128,
  numberOfFrames: 0,
  frameCount: 0,
  frameRate: 10, //higher number is slower
  currentFrame: 0,
  //gameplay
  speed: 8,
  width: 64,
  height: 84,
  vJump: 20,
  g: 5,
  jumping: false
}

// for smoother keydown and keyup movements
let up = false,
  down = false,
  left = false,
  right = false,
  facingLeft = false,
  idle = true,
  run = false,
  attack = false,
  punch1 = false,
  punch2 = false;

//game vars
let currentLevel = 0;

function changeSpriteFrames() {
  if (idle) player.numberOfFrames = 4;
  if (left || right || up || down) player.numberOfFrames = 6;
  if (player.jumping) player.numberOfFrames = 8;
  if (attack) player.numberOfFrames = 6;
}

function moveSprite() {
  if (up) player.y -= player.speed;
  if (down) player.y += player.speed;
  if (left) player.x -= player.speed;
  if (right) player.x += player.speed;
}

//control the Sprite with up and down arrows
function handleKeydown(e) {
  //down or up?
  if (e.keyCode == 40) {
    down = true;

    if (player.sy === 0) player.sy = 38;
  }
  if (e.keyCode == 38) {
    up = true;

    if (player.sy === 0) player.sy = 38;
  }
  //left or right?
  if (e.keyCode == 37) {
    left = true;
    facingLeft = true;
    player.sy = 38
  }
  if (e.keyCode == 39) {
    right = true;
    facingLeft = false;
    left = false;
    player.sy = 38;
  }
  //command key is attack
  if (e.keyCode == 91) {
    if (!attack) player.currentFrame = 0;
    attack = true;
  }
  //spacebar is jump
  if (e.keyCode == 32) {
    if (!player.jumping) player.currentFrame = 0;
    player.jumping = true;
  }
  e.preventDefault();
}

function handleKeyup(e) {
  if (e.keyCode == 40) {
    down = false;

    player.sy = 0
  }
  if (event.keyCode == 38) {
    up = false;

    player.sy = 0;
  }
  if (event.keyCode == 37) {
    left = false;

    player.sy = 0;
  }
  if (event.keyCode == 39) {

    right = false;
    player.sy = 0;
    //spacebar
  }
}

function drawSprite() {

  let playerSprite = playerSpriteR;
  //use the sprite sheet for the appropriate directiom
  facingLeft ? playerSprite = playerSpriteL : playerSprite = playerSpriteR

  //account for the 6px gutter on the sprite sheet
  ctx.drawImage(playerSprite, ((player.sWidth * player.currentFrame) + 6) + (player.currentFrame * 6), (player.sy + 6),
    player.sWidth, player.sHeight, player.x, player.y,
    player.dWidth, player.dHeight);
}







function drawRect(x, y, w, h, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
}


function render() {
  drawRect(200, height - 100, width - 400, 50, "white")

  drawSprite();
}

function update() {
  if (player.y + player.height < height - 150){
    player.y += player.g;
  } else {
    player.y = height - 150 - player.height
  }
  if (facingLeft) {
    if (player.frameCount % player.frameRate === 0) player.currentFrame--;
    if (player.currentFrame <= 7 - player.numberOfFrames) player.currentFrame = 7;
    player.frameCount++;

  } else {
    if (player.frameCount % player.frameRate === 0) player.currentFrame++;
    if (player.currentFrame >= player.numberOfFrames) player.currentFrame = 0
    player.frameCount++;
  }
  ///////////////////////////attack animation///////////////////////////
  if (attack) {
    player.sy = 152;
  }

  if (attack && player.currentFrame >= 5) {
    attack = false;
    player.sy = 0;
  }
  ///////////////////////////jump animation///////////////////////////

  if (player.jumping) {
    player.sy = 76;

    player.y -= player.speed;
  }
  if (player.jumping && player.currentFrame >= 7) {
    player.jumping = false;
    player.sy = 0;
  }

  //collision Detection

}




function startGame() {
  requestAnimationFrame(loop);

}


function loop() {
  ctx.clearRect(0, 0, width, height);
  render();
  moveSprite();
  update();
  changeSpriteFrames();
  requestAnimationFrame(loop);
}

startGame();

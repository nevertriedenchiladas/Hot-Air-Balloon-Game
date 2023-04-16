//variables
var bg, bgImg
var topGround, bottomGround
var balloon, balloonImg
var obstacleTop, obstacleTopImg
var obs1Top, obs2Top
var bottomObstaclesGroup
var topObstaclesGroup
var barGroup
var restart, restartImg
var gameOver, gameOverImg

var score = 0

var play = 1
var end = 0

var gameState = play

function preload() {
  bgImg = loadImage("assets/bg.png")
  balloonImg = loadAnimation("assets/balloon1.png", "assets/balloon2.png", "assets/balloon3.png")
  obs1Top = loadImage("assets/obsTop1.png")
  obs2Top = loadImage("assets/obsTop2.png")
  obsBottom1 = loadImage("assets/obsBottom1.png")
  obsBottom2 = loadImage("assets/obsBottom2.png")
  obsBottom3 = loadImage("assets/obsBottom3.png")
  restartImg = loadImage("assets/restart.png")
  gameOverImg = loadImage("assets/gameOver.png")
}

function setup() {
  createCanvas(800, 630)
  //background
  bg = createSprite(165, 485, 1, 1)
  bg.addImage(bgImg)
  bg.scale = 1.3
  //creating top and bottom ground
  topGround = createSprite(400, 10, 800, 20)
  bottomGround = createSprite(400, 490, 800, 20)
  topGround.visible = true
  bottomGround.visible = true
  //making balloon
  balloon = createSprite(100, 300, 20, 50)
  balloon.addAnimation("ballon",balloonImg)
  balloon.scale = 0.2
  //making button
  restart = createSprite(350, 100)
  restart.addImage(restartImg)
  restart.scale = 0.5
  restart.visible = false
  //gameOver sprite
  gameOver = createSprite(350, 150)
  gameOver.addImage(gameOverImg)
  gameOver.visible = false
  //creating groups
  bottomObstaclesGroup = new Group()
  topObstaclesGroup = new Group()
  barGroup = new Group()
}

function draw() {
  background("blue")
  
  if(gameState == play) {
      //making the hot air balloon jump
      if (keyDown ("space")) {
        balloon.velocityY -= 2
      }
      //adding gravity
      balloon.velocityY += 1
      //calling function
      spawnObstaclesTop()
      spawnObstaclesBottom()
      spawnBar()

      if (topObstaclesGroup.isTouching(balloon) || bottomObstaclesGroup.isTouching(balloon) || balloon.isTouching(topGround) || balloon.isTouching(bottomGround)) {
        gameState = end
      }
  }

  if(gameState == end) {
    //all sprites should stop moving in gameState end
    balloon.velocityY = 0
    balloon.velocityX = 0
    topObstaclesGroup.setVelocityXEach(0)
    bottomObstaclesGroup.setVelocityXEach(0)
    barGroup.setVelocityXEach(0)
    topObstaclesGroup.setLifetimeEach(-1)
    bottomObstaclesGroup.setLifetimeEach(-1)
    restart.visible = true
    gameOver.visible = true

    if(mousePressedOver(restart)) {
      reset()
    }
  }

  drawSprites()

  scoreDisplay();
}

function spawnObstaclesTop() {
  if(frameCount%60 == 0) {
    obstacleTop = createSprite(550, 50, 40, 50)
    //generate a random number
    var r = Math.round(random(1,2))
    obstacleTop.scale = 0.1
    switch(r) {
      case 1: obstacleTop.addImage(obs1Top)
      break;
      case 2: obstacleTop.addImage(obs2Top)
      break; 
    }
    obstacleTop.velocityX -= 4
    obstacleTop.lifetime = 200
    //adding group
    topObstaclesGroup.add(obstacleTop)
  }
}

function spawnObstaclesBottom() {
  if(frameCount%60 == 0) {
    var obstacleBottom = createSprite(400, 490, 40, 50)
    obstacleBottom.scale = 0.1
    obstacleBottom.velocityX -= 4
    obstacleBottom.lifetime = 200
    //generate random bottom obstacle
    var r = Math.round(random(1,3))
    switch(r) {
      case 1: obstacleBottom.addImage(obsBottom1)
      break;
      case 2: obstacleBottom.addImage(obsBottom2)
      break;
      case 3: obstacleBottom.addImage(obsBottom3)
      break;
    }
    obstacleBottom.debug = true
    //adding group
    bottomObstaclesGroup.add(obstacleBottom)
  }
}

function spawnBar() {
  if(frameCount%60 == 0) {
  var bar = createSprite(400, 500, 10, 400)
  bar.velocityX -= 4
  bar.lifetime = 200
  bar.debug = true
  barGroup.add(bar)
  }
}

function reset() {
  gameState = play
  gameOver.visible = false
  restart.visible = false
  topObstaclesGroup.destroyEach()
  bottomObstaclesGroup.destroyEach()
  barGroup.destroyEach()
  balloon.x = 100
  balloon.y = 300
}

function scoreDisplay() {
  if(balloon.isTouching(barGroup)) {
    score = score + 1
  }
  fill("blue")
  textSize(20)
  text("Score " + score, 250, 50)
}
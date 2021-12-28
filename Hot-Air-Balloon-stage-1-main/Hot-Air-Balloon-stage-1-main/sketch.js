var balloon, balloonImg, backgroundImg, bg, topObs, bottomObs, birdImg, building, buildingImg, edges, balloonObsImg, invisibleObs, score = 0
var gameState = 0
var topGround, bottomGround,gameOver,gameOverImg,restartImg,restart;
function preload() {
  balloonImg = loadAnimation("assets/balloon1.png", "assets/balloon2.png", "assets/balloon3.png")
  backgroundImg = loadImage("assets/bg.png");
  birdImg = loadImage("assets/obsTop2.png")
  buildingImg = loadImage("assets/obsBottom1.png");
  building2Img = loadImage("assets/obsBottom2.png");
  building3Img = loadImage("assets/obsBottom3.png");
  balloonObsImg = loadImage("assets/obsTop1.png");
  gameOverImg = loadImage("assets/gameOver.png")
  restartImg = loadImage("assets/restart.png")
}
function setup() {
  createCanvas(windowWidth - 20, windowHeight - 25);
  bg = createSprite(windowWidth / 2, 600)
  bg.addImage('bg', backgroundImg)
  bg.scale = 1.6
  topGround = createSprite(windowWidth / 2, 10, windowWidth, 20)
  bottomGround = createSprite(windowWidth / 2, windowHeight - 30, windowWidth, 20)
  balloon = createSprite(300, 200, 20, 50)
  balloon.addAnimation('balloon', balloonImg);
  balloon.scale = 0.3;
  gameOver = createSprite(windowWidth/2,windowHeight/2-40);
  gameOver.addImage("gameover",gameOverImg)
  restart = createSprite(windowWidth/2,windowHeight/2+30);
  restart.addImage("restart", restartImg) 
  edges = createEdgeSprites();
  invisibleObsGroup = new Group();
  topObsGroup = new Group();
  bottomObsGroup = new Group();

}
function draw() {
  background("black");
  //balloon.collide(edges[3])
  if (gameState === 0) {
    if (keyDown("SPACE")) {
      balloon.velocityY = -5
    }
    balloon.velocityY = balloon.velocityY + 0.08
    collideInvisibleObs();
    spawnTopObs();
    spawnBottomObs();
    if(balloon.isTouching(topGround)|| balloon.isTouching(bottomGround) ||balloon.isTouching(topObsGroup)||balloon.isTouching(bottomObsGroup)){
    gameState = 1; 
    }
  }if(gameState ===1){
    balloon.velocityX = 0
    balloon.velocityY = 0
    topObsGroup.setVelocityEach(0,0)
    bottomObsGroup.setVelocityEach(0,0)
   topObsGroup.setLifetimeEach(-1)
   bottomObsGroup.setLifetimeEach(-1)
  } 
  drawSprites()
  calculateScore();
 }

function spawnTopObs() {
  if (frameCount % 100 === 0) {
    topObs = createSprite(windowWidth - 20, random(30, 100))
    topObs.velocityX = -4
    topObs.scale = 0.2
    topObs.lifetime = windowWidth - 20 / 4
    balloon.depth = topObs.depth + 1
    var rand = Math.round(random(1, 2))
    switch (rand) {
      case 1: topObs.addImage("bird", birdImg);
        break;
      case 2: topObs.addImage("balloonObs", balloonObsImg);
        break;
      default: break;
    }
    topObsGroup.add(topObs)
  }
}

function spawnBottomObs() {
  if (frameCount % 120 === 0) {
    bottomObs = createSprite(windowWidth - 20, windowHeight - 200)
    bottomObs.velocityX = -4
    bottomObs.scale = 0.2
    bottomObs.lifetime = windowWidth - 20 / 4
    balloon.depth = bottomObs.depth + 1
    var random2 = Math.round(random(1, 3))
    switch (random2) {
      case 1: bottomObs.addImage("building", buildingImg)
        break;
      case 2: bottomObs.addImage("building2", building2Img)
        break;
      case 3: bottomObs.addImage("building", building3Img)
        break;
      default: break;
    }
    bottomObsGroup.add(bottomObs)
  }
}

function collideInvisibleObs() {
  if (frameCount % 100 === 0 || frameCount % 120 === 0) {
    invisibleObs = createSprite(windowWidth - 20, windowHeight / 2, 10, windowHeight)
    invisibleObs.velocityX = -4;
    invisibleObs.lifetime = windowWidth - 20 / 4
    invisibleObs.visible = false
    invisibleObsGroup.add(invisibleObs)
  }
}

function calculateScore() {
  // if(balloon.isTouching(invisibleObsGroup)){
  // score++;
  // }
  balloon.overlap(invisibleObsGroup, function (collector, collected) {
    collected.destroy();
    score = score + 10
  })

  textSize(30)
  fill("red");
  text("Score:" + score, 200, 50);
}
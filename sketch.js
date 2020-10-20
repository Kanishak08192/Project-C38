var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score;

var PLAY = 1; 
var END = 0;
var gameState = PLAY ; 
var score = 0;
var gameOver,restart ;
var gameOverImg , resartImg ;


function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  background_img = loadImage("background.png");
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
}



function setup() {
  createCanvas(600,200);


  trex = createSprite(200,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  trex.addAnimation("collided", trex_collided);

  ground = createSprite(200,260,400,20);
  ground.addImage("ground",groundImage);
  //ground.x = ground.width /2;
  //ground.velocityX = -(6 + 3 * score / 100);
  
  gameOver = createSprite(180,150);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.5;
  gameOver.visible = false;
  
  restart = createSprite(180,200);
  restart.addImage(restartImg);
  restart.scale = 0.5;
  restart.visible = false;
  
  camera.position.x = trex.x;
  camera.position.y = trex.y;
  
  invisibleGround = createSprite(200,265,400,10);
  invisibleGround.visible = false;
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
}

function draw() {
  background(background_img);
  text("Score: "+ score, 500,50);
  
  
  if(gameState == PLAY){
    
  score = score + Math.round(getFrameRate()/60);
  
  if(keyDown("space") && trex.y >= 180) {
    trex.velocityY = -10;
  }
  
  
    trex.velocityY = trex.velocityY + 0.9
  
 
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  
  
  
  spawnClouds();
  spawnObstacles();
    if(obstaclesGroup.isTouching(trex)){
      gameState = END;
  }
  }
  
else if(gameState==END){
gameOver.visible = true;
  restart.visible = true;
  
  ground.velocityX = 0;
  trex.velocityY = 0;
  obstaclesGroup.setVelocityXEach(0);
  cloudsGroup.setVelocityXEach(0);
  
  trex.changeAnimation("collided",trex_collided);
  
  obstaclesGroup.setLifetimeEach(-1);
  cloudsGroup.setLifetimeEach(-1);
  
  if(mousePressedOver(restart)){
    reset();
  }
}
    
  trex.collide(invisibleGround);
    
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,260,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 250;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,250,10,40);
    obstacle.velocityX = -4;
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}
  
  function reset(){
gameState = PLAY;
gameOver.visible=false;
restart.visible=false;

obstaclesGroup.destroyEach();
cloudsGroup.destroyEach();

trex.changeAnimation("running",trex_running);
score=0;
  }

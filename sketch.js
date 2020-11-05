var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score, survival_time;
var ground;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,300);
  
  ground = createSprite(300,270,600,10);
  ground.velocityX = -10;
  
  monkey = createSprite(50,240,0,10);
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.1;
  
  FoodGroup = new Group();
  obstacleGroup = new Group();
  
  score = 0;
  
  survival_time = 0;
  

  monkey.setCollider("circle",0,0,260);
  
}


function draw() {
  background("green");
  
  monkey.collide(ground);
  
  if(gameState===1){
      
    if(keyDown("space")&&monkey.y>220){
      monkey.velocityY = -15;
    }
  
    monkey.velocityY = monkey.velocityY+1.1;
  

  
    ground.x = ground.width/2;
    console.log(frameCount);
  
    if(monkey.isTouching(obstacleGroup)){
      gameState = 0;
    } 
    
    if(monkey.isTouching(FoodGroup)){
      FoodGroup.setLifetimeEach(0);
      score = score+1;
      
    } 
    
    survival_time = Math.ceil(frameCount/frameRate())

    SpawnFood();
    SpawnObstacles();  
  }
  
  if(gameState===0){
    ground.velocityX = 0;
    
    obstacleGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    
    FoodGroup.setVelocityXEach(0);
    FoodGroup.setLifetimeEach(-1);
    
    monkey.velocityY = 0;
    
  }

   
  fill("black");
  textSize(20);
  text("Score : " + score, 480,30);
  
  fill("black");
  textSize(20);

  text("Survival Time : " + survival_time, 30,30);


  drawSprites();
}

function reset(){
  gameState  = 1;
  
}

function SpawnObstacles(){
  var rand = Math.round(random(80,200));
  if(frameCount%rand===0){
    obstacle = createSprite(620,247,10,10);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX = -10;
    obstacle.scale = 0.1;
    obstacle.lifetime = 64;

    obstacle.setCollider("circle",0,0,260);
    
    obstacleGroup.add(obstacle);
  }
}

function SpawnFood(){
  var rand = Math.round(random(40,200));
  if(frameCount%rand===0){
    banana = createSprite(620,Math.round(random(100,180)),10,10);
    banana.addImage(bananaImage);
    banana.velocityX = -10;
    banana.scale = 0.1;
    banana.lifetime = 64;
    
    FoodGroup.add(banana);
  }
  
}
  






var score=0;

var ground,background1,banana,bananaImage,obstacleImage;
var ObstacleGroup,player_running,monkey,invisibleGround,bananaGroup;

function preload(){
player_running=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  obstacleImage=loadImage("stone.png");
  bananaImage=loadImage("banana.png");
  
}
function setup(){
  createCanvas(400,400);
 monkey=createSprite(50,130,20,50); 
  monkey.addAnimation("running",player_running);
  monkey.scale=0.12;
  
  ground=createSprite(200,180,400,20);
  ground.x=ground.width/2;
  ground.velocityX=-2;
  
  
  invisibleGround=createSprite(200,190,400,10);
  invisibleGround.visibile=false; 
  
bananaGroup=new Group();
  ObstacleGroup= new Group();
}

function draw(){
  
  background(210);
 
 if(bananaGroup.isTouching(monkey)) {
    score = score+2
    console.log(score)
    bananaGroup.destroyEach();  
    switch(score) {
    case 10: monkey.scale=0.12;
      break;
    case 20: monkey.scale=0.14;
      break;
    case 30: monkey.scale=0.16;
      break;
    case 40: monkey.scale=0.18
      break;
    default: break;
    }    
  }

  
  if(ObstacleGroup.isTouching(monkey)) {
    monkey.scale = 0.075;
    ObstacleGroup.destroyEach();
    score=0;
  }
  if(keyDown("space")){
    monkey.velocityY=-10;
  }
  
  monkey.velocityY=monkey.velocityY+0.8
  
  if(ground.x<0){
    ground.x=ground.width/2;
  } 
  monkey.collide(invisibleGround);
  spawnbananas();
  spawnobstacles();

  drawSprites();
 textSize(15);
text("score:"+ score,200,50);
    
}
function spawnbananas(){
 if(World.frameCount %100===0) {
banana=createSprite(280,60,20,10);
   banana.velocityX=-4;
 banana.addImage("banana",bananaImage);
   banana.scale=0.05;
   banana.lifetime=90;
   
   monkey.depth=bananaGroup.depth;
   monkey.depth=monkey.depth+1;
   
bananaGroup.add(banana);
   
  
 }
}
function spawnobstacles(){
  if(World.frameCount %140===0){
    obstacle=createSprite(400,180,20,10);
    obstacle.velocityX=-6;
    obstacle.scale=0.15;
    obstacle.addImage("obstacle",obstacleImage);
    obstacle.lifetime=200;
    
    ObstacleGroup.add(obstacle);
  }
}
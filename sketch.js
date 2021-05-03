var PLAY=1;
var END=0;
var gameState=1;

var background, backgroundImage, fruitGroup, alienGroup, enemyGroup;
var sword ,swordImage,monsterImage, alien1 ,alien2 ,fruit1 , fruit2, fruit3, fruit4, gameOver, alienImage,monster,gameOverImage ;

var score;

function preload(){
  backgroundImage = loadImage("image.jpg");
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  swordImage = loadImage("sword.png");
  alienImage = loadImage("alien1.png","alien2.png");
 monsterImage =loadImage("alien1.png","alien2.png");
  gameOverImage=loadImage("gameover.png");
}

function setup(){
  createCanvas=(600,600);
  
  background = createSprite(0,0,300,300);
  background.addImage(backgroundImage);
  background.scale = 0.8
  
  sword=createSprite(40,200,20,20);
   sword.addImage(swordImage);
   sword.scale=0.5;
  
  
  
  sword.setCollider("rectangle",0,0,40,40);

  
  score=0;
  
  fruitGroup=createGroup();
  enemyGroup=createGroup();
  

}

function draw(){
  
  
  if(gameState===PLAY){
    
    
    fruits();
    Enemy();
    
    
    sword.y=World.mouseY;
    sword.x=World.mouseX;
  
    
    if(fruitGroup.isTouching(sword)){
      fruitGroup.destroyEach();
      score=score+2;
    }
    else
    {
      
      if(enemyGroup.isTouching(sword)){
        gameState=END;
        
        fruitGroup.destroyEach();
        enemyGroup.destroyEach();
        fruitGroup.setVelocityXEach(0);
        enemyGroup.setVelocityXEach(0);
        
        
        sword.addImage(gameOverImage);
        sword.x=200;
        sword.y=200;
      }
    }
  }
  
  
  
  drawSprites();
  
  textSize(45);
  textFont("georgia");
  fill("pink");
  text("Score: "+ score, 150,50);
  
  console.log("this is ",gameState)
  
  
  
}

if(gameState===END){
   gameOver=createSprite(0,0,300,300);
  gameOver.addAnimation("gameOverImage");
  gameOver.scale=5;
   }


function Enemy(){
  if(World.frameCount%200===0){
    monster=createSprite(400,200,20,20);
    monster.addAnimation("moving", monsterImage);
    monster.y=Math.round(random(100,300));
    monster.velocityX=-8;
    monster.setLifetime=50;
    
    enemyGroup.add(monster);
  }
}

function fruits(){
  if(World.frameCount%40===0){
    fruit=createSprite(400,200,20,20);
    fruit.scale=0.2;
     r=Math.round(random(1,4));
    if (r == 1) {
      fruit.addImage(fruit1);
    } else if (r == 2) {
      fruit.addImage(fruit2);
    } else if (r == 3) {
      fruit.addImage(fruit3);
    } else {
      fruit.addImage(fruit4);
    }
    
    fruit.y=Math.round(random(50,340));
   
    fruit.velocityX=-7;
    fruit.setLifetime=100;
    
    fruitGroup.add(fruit);
  }
}















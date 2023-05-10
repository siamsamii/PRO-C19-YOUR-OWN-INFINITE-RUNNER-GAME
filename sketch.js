var vegeta, vegeta_foreward, vegeta_backwards;
var bomb, bombImg
var score = 0
var PLAY = 1;
var END = 0;
var gameState = SERVE;
var newImage;
var SERVE 
var reset, resetImg
var background1,backgroundImg
var reset, reset_button

function preload(){
  vegeta_foreward = loadImage("vegeta_standing.png")
  vegeta_backwards = loadImage("vegeta_backwards.png");

  backgroundimg = loadImage("bg_02_h.png")
  reset_button = loadImage("restart.png")

 resetImg = loadImage("restart.png")
  
 
  bombImg = loadImage("bomb.png")
}



function setup() {
    createCanvas(600, 600);

    vegeta = createSprite(50,160,20,50);
vegeta.addImage("foreward", vegeta_foreward);
vegeta.addImage("backwards",vegeta_backwards)
    vegeta.scale = 0.5
  


    background1 = createSprite(200,180,400,20);
    background1.addImage("background1",backgroundimg);
    background1.x = background1.width /2;
    restart = createSprite(500,100)
    restart.addImage("reset",reset_button)
  restart.scale = 0.5
  restart.visible = false
    vegeta.debug = true
    vegeta.setCollider("rectangle",0,0,120,330)
    bombsgroup = createGroup();
 
}


function draw() {
background("white")
  
  //console.log(message);
  
  
  if (gameState === SERVE){
  
    text("Spacebar to start the game", 300, 580 )
    vegeta.velocityX = 0
    vegeta.velocityY = 0
    bombsgroup.setVelocityXEach(0)
   
    background1.velocityX = 0
  
   
    if (keyDown("space")){
   gameState = PLAY
    }
  }
  
  if (gameState === PLAY){
    background.velocityX = -(4+3*score/250) 
background1.visible = true
        if(keyDown("UP_ARROW")) {
      vegeta.y = vegeta.y-4;
    }

    if(keyDown("DOWN_ARROW")) {
        vegeta.y =vegeta.y+4;
      }

      if(keyDown("LEFT_ARROW")) {
        vegeta.x =vegeta.x-4;
        vegeta.changeImage("backwards",vegeta_backwards)
      }
      if(keyDown("RIGHT_ARROW")) {
        vegeta.x =vegeta.x+4;
        vegeta.changeImage("foreward",vegeta_foreward)
      }

      background1.velocityX = -(4+3*score/250) 
      
  if (bombsgroup.isTouching(vegeta)){
    gameState= END;

  }
  
    
  score+=1
  if (score % 250 ===0){
    bombsgroup.velocityX= -(4+3*score/250)
  }
  
  spawnbombs() 
 
  }
  if (gameState === END){
  background1.velocityX = 0;
  vegeta.velocityX = 0;
  vegeta.velocityY = 0;
  bombsgroup.setVelocityXEach(0)
background1.velocityX = 0
 
  text("YOU LOSE", 300 ,580)

  restart.visible = true
  if (mousePressedOver(restart)){
    bombsgroup.destroyEach()
  
  restart.visible = false
    gameState = PLAY
    vegeta.x = 50
    vegeta.y = 160
    score = 0
  }
  
  
  }
    
    if (background1.x < 0){
      background1.x = background1.width/2;
    }
    

  
  

  
  stroke(45)
    text("score "+score,10,580) 
   vegeta.depth = background1.depth;
   vegeta.depth +=1

    drawSprites();
  }
  


function spawnbombs() {
    if (frameCount % 60 === 0) {
      bomb = createSprite(600,100,40,10);
      bomb.addImage(bombImg)
      bomb.y = Math.round(random(10,390))
      bomb.scale = 0.2;
      bomb.velocityX = -3;
      
      
      bomb.lifetime = 225
      bombsgroup.add(bomb)
      }
      
  }
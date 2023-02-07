var backgroundImage
var birdImage;
var bird
var coinImage;
var pipeBottomImage;
var pipeTopImage;
var pipeBottom;
var pipeTop;
var pipeTopGroup;
var pipeBottomGroup;
var gameState = "play"
var birdStill;
var score = 0

function preload(){
    backgroundImage = loadImage("Images/background1.png");
    coinImage = loadImage("Images/coin.png");
    pipeBottomImage = loadImage("Images/pipeBottom.png");
    pipeTopImage = loadImage("Images/pipeTop.png");
    birdImage = loadAnimation("Images/bird1.png","Images/bird2.png","Images/bird3.png","Images/bird4.png");
    birdStill = loadAnimation("Images/bird2.png")
}
function setup(){
    createCanvas(1400,550);
    bird = createSprite(100,220,100,100);
    bird.addAnimation("bird", birdImage);
    bird.addAnimation("birdStill", birdStill);
    bird.changeAnimation("bird");
    
    bird.scale= 0.5;
    pipeTopGroup = new Group()
    pipeBottomGroup = new Group()
    coinGroup = new Group()
    
   
}
function draw(){
    background(backgroundImage);
    textSize(20)
    text("Score:"+ score,50,50);
    if(gameState == "play"){
    spawningPipesTop();
    spawningPipesBottom();
    
    spawningCoin();
    
    if(keyIsDown(UP_ARROW)){
        bird.position.y = bird.position.y-10;
       
    }
     if(keyIsDown(DOWN_ARROW)){
        bird.position.y = bird.position.y+10;
        
    }
    bird.setCollider("rectangle",0,0,250,200)
}

    drawSprites()
    if(bird.isTouching(pipeTopGroup) || bird.isTouching(pipeBottomGroup)){
    gameState = "end"
        collidingBird(); 
    }
    if(bird.isTouching(coinGroup)){
    score = score+1
    }
   console.log(gameState)

}

function spawningPipesTop(){
    if(frameCount%156 == 0){
        position = [10,30,50,70]
        pipeTop = createSprite(1400, random(position),100,100);
        pipeTop.velocityX = -4
        pipeTop.addImage(pipeTopImage)
        pipeTopGroup.add(pipeTop);
    }

}
function spawningPipesBottom(){
    if(frameCount%331 == 55){
        position = [490, 470, 450, 430 ]
        pipeBottom = createSprite(1400, random(position),100,100);
        pipeBottom.velocityX = -4;
        pipeBottom.addImage(pipeBottomImage)
        pipeBottomGroup.add(pipeBottom);
    }
}
function spawningCoin(){
    if(frameCount%330 == 10){
        coin = createSprite(1400, Math.round(random(20,500)),100,100);
        coin.velocityX = -4;
        coin.addImage(coinImage)
        coinGroup.add(coin);
        coin.scale = 0.1
    }
}

function collidingBird(){
    
        pipeTopGroup.setVelocityXEach(0)
        pipeBottomGroup.setVelocityXEach(0)
        coinGroup.setVelocityXEach(0)
        bird.velocityY = 0
        bird.changeAnimation("birdStill");
       
    }




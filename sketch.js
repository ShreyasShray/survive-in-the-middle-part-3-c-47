var player;
var bullet;
var bullet, bulletGroup;
var enemy, enemyGroup;
var area;
var health = 100;
var healthbar;
var score = 0;
var gamestate = "start";
var shootingSound;
var boomSound;
var gameover_image;

function preload(){
  shootingSound = loadSound("shooting.mp3");
  boomSound = loadSound("boom.mp3");
  gameover_image = loadImage("gameover.png");
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  healthbar = createSprite(windowWidth/2 + 100, 40, 100, 10);
  healthbar.shapeColor = "pink";
  area = createSprite(windowWidth/2, windowHeight/2, 120, 120);
  area.shapeColor = "green";
  player = createSprite(windowWidth/2, windowHeight/2, 16, 16);
  player.shapeColor = "blue";
  enemyGroup = new Group();
  bulletGroup = new Group();
}

function draw() {
  if(gamestate === "start"){
    background("white");
    textSize(24);
    fill("black");
    stroke("black");
    text("Press 'space' to start the game", windowWidth/2 - 200, windowHeight/2 - 200);

    if(keyDown('space')){
      gamestate = "play";
    }
  }else if(gamestate === "play"){

    background("grey");

    if(keyDown(LEFT_ARROW)){
      player.rotation = player.rotation - 4;
      player.rotateToDirection = true;
    }

    if(keyDown(RIGHT_ARROW)){
      player.rotation = player.rotation + 4;
      player.rotateToDirection = true;
    }

    if(keyDown("space")){
      bullet = createSprite(player.x, player.y, 5, 10);
      bullet.shapeColor = "red";
      bullet.setSpeedAndDirection(8, player.rotation - 90);
      bullet.rotation = player.rotation;
      bullet.lifeTime = 100;
      bulletGroup.add(bullet);
      shootingSound.play();
    }

    if(frameCount % 200 - score === 0){
      var select = Math.round(random(1, 4));
      switch(select){
        case 1: enemy = createSprite(Math.round(random(player.x - 250 + 0, player.x - 250 + 100)), Math.round(random(player.y -250 + 0, player.y -250 + 200)), 18, 18);
        enemy.shapeColor = "yellow";
        enemy.setVelocity(2, 1.5);
        enemy.lifeTime = 100;
        enemyGroup.add(enemy);
        break;
        case 2: enemy = createSprite(Math.round(random(player.x -250 + 0, player.x -250 + 100)), Math.round(random(player.y - 250 + 300, player.y - 250 + 500)), 18, 18);
        enemy.shapeColor = "yellow";
        enemy.setVelocity(2, -1.5);
        enemy.lifeTime = 100;
        enemyGroup.add(enemy);
        break;
        case 3: enemy = createSprite(Math.round(random(player.x -250 + 400, player.x - 250 + 500)), Math.round(random(player.y -250 + 0, player.y - 250 + 200)), 18, 18);
        enemy.shapeColor = "yellow";
        enemy.setVelocity(-2, 1.5);
        enemy.lifeTime = 100;
        enemyGroup.add(enemy);
        break;
        case 4: enemy = createSprite(Math.round(random(player.x -250 + 400, player.x - 250 + 500)), Math.round(random(player.y -250 + 300, player.y - 250 + 500)), 18, 18);
        enemy.shapeColor = "yellow";
        enemy.setVelocity(-2, -1.5);
        enemy.lifeTime = 100;
        enemyGroup.add(enemy);
        break;
      }
    }

    for(var i = 0; i <= enemyGroup.length; i++){
      if(bullet){
      if(bullet.isTouching(enemyGroup)){
        enemyGroup.destroyEach();
        bulletGroup.destroyEach();
        score = score + 1;
        boomSound.play();
      }
    }
    }

    if(enemyGroup.isTouching(area)){
      health = health - 0.4;
      healthbar.width = health;
      healthbar.x = windowWidth/2 + 50 + health/2;
    }

    if(health <= 0){
      health = 0;
      gamestate = "end";
    }
    console.log(Math.round(health));

    drawSprites();

    textSize(20);
    fill("black");
    stroke("black");
    text("Score : " + score, windowWidth/2 + 100 - 125, healthbar.y + 35);
    text("Health: ", windowWidth/2 + 100 - 125, healthbar.y + 5)
  }else if(gamestate === "end"){
    image(gameover_image, 0, 0, windowWidth, windowHeight);
  }
}
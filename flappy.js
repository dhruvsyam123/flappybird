// the Game object used by the phaser.io library
var stateActions = { preload: preload, create: create, update: update };
// Phaser parameters:
// - game width
// - game height
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)
var game = new Phaser.Game(790, 400, Phaser.AUTO, 'game', stateActions);
/*
 * Loads all resources for the game and gives them names.
 */

var score = 0;
var labelScore;
var player;
var pipes= []
function preload() {
  game.load.image('playerImg','../assets1/flappy.png');
  game.load.image('playerImg1','../assets1/flappy_superman.png');
  game.load.image('playerImg2','../assets1/flappy_frog.png');
  game.load.audio('sound','../assets1/point.ogg');
  game.load.image('pipeBlock', '../assets1/pipe2-body.png');
}

/*
 * Initialises the game. This function is only called once.
 */
function create() {
  game.physics.startSystem(Phaser.Physics.ARCADE)
  game.stage.setBackgroundColor('#99FF33');  // set the background colour of the scene
  game.add.text(125,160, 'Welcome to Flappy Bird by Dhruv Syam', {font:'30px Comic Sans MS  ', fill:'#FFFFFF'});
  player=game.add.sprite(100, 270, 'playerImg');
  game.physics.arcade.enable(player)
  player.body.velocity.y= 0
  player.body.gravity.y= 200
  labelScore= game.add.text(20,20,'0');
  //game.add.sprite(100, 270, 'playerImg1');
  //game.add.sprite(200,200, 'playerImg2');
  game.input.onDown.add(clickHandler)

  game.input
          .keyboard.addKey(Phaser.Keyboard.SPACEBAR)
          .onDown.add(playerJump);

/*  game.input
          .keyboard.addKey(Phaser.Keyboard.RIGHT)
          .onDown.add(moveRight);

  game.input
          .keyboard.addKey(Phaser.Keyboard.LEFT)
          .onDown.add(moveLeft);
  game.input
          .keyboard.addKey(Phaser.Keyboard.UP)
          .onDown.add(moveUp);
  game.input
          .keyboard.addKey(Phaser.Keyboard.DOWN)
          .onDown.add(moveDown);
*/
  var pipeInterval= 1.5 * Phaser.Timer.SECOND;
  game.time.events.loop(pipeInterval,generatePipe)
  generatePipe()
}
/*
 * This function updates the scene. It is called for every new frame.
 */
function update() {
  game.physics.arcade.overlap(
    player,
    pipes,
    gameOver);

  if(player.body.y<-40 || player.body.y > 400){
    gameOver()
  }
}


function gameOver(){
  location.reload()
}

function moveRight(){
  player.x=player.x+30;
}

function moveLeft(){
  player.x=player.x-30;
}

function moveUp(){
  player.y=player.y-30;
}
function moveDown(){
  player.y=player.y+30;
}
function changeScore(){
  score= score+1;
  labelScore.setText(score.toString())
}

function clickHandler(event){
    game.add.sprite(event.x,event.y, 'playerImg2');
}

function spaceHandler(){
  game.sound.play('sound')
}

function generatePipe(){

var gapStart= game.rnd.integerInRange(1,5)

  for(var count= 0;count<8;count++){
    if(count!= gapStart && count!=gapStart+1 ){
      addPipeBlock(790, count*50)
    }
  }
  changeScore()

}



function addPipeBlock(x, y){
  var block= game.add.sprite(x, y, 'pipeBlock')
  pipes.push(block)
  game.physics.arcade.enable(block)
  block.body.velocity.x=-200
}

function playerJump(){
  player.body.velocity.y=-150
}

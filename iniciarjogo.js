var game = new Phaser.Game
(800, 600, Phaser.AUTO, '', 
{ 
	preload: preload, 
	create: create, 
	update: update 
});

//var sky
var button

function preload() {
	
	game.load.image('sky', 'assets/fundofase6.png');
	game.load.image('button', 'assets/Play.png');
	
}

function create () {
	
	button = game.add.button(game.world.centerX -30, 130, 'Play', actionOnClick, this, 0, 1, 2);
	
	button.onInputOver.add(over, this);
	button.onInputOut.add(out, this);
	button.onInputUp.add(up, this);
	
}

function Over()
{
	console.log('button over', arguments);
}
function Out()
{
	console.log('button out');
}
function up()
{
	console.log('button up');
}

function actionOnClick()
{
	//window.location.replace("level1.html");	
}
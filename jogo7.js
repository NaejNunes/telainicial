var game = new Phaser.Game
(800, 600, Phaser.AUTO, '', 
{ 
	preload: preload, 
	create: create, 
	update: update 
});

var player;
var platforms;
var platforms1;
var platforms2;
var platforms3;
var cursors;
var stars;
var score = 0;
var scoreText;
var scoreText2;
var music;
var level;
var cogumelos;
var tema;
var fim;


function preload() {
    game.load.image('sky', 'assets/fundofase7teste2.png');
	game.load.image('ground', 'assets/tijolofase7.png');
	game.load.image('blocks', 'assets/blocofase7teste6.png');
	game.load.spritesheet('jogador', 'assets/jogador1.png', 32, 48);
	game.load.image('star', 'assets/moeda.png');
	game.load.audio('som','assets/som.mp3');

	game.load.image('bomba2', 'assets/bomba2.png');	
	game.load.image('cogumelo', 'assets/bomba2.png');	
	game.load.audio('tema', 'assets/SonicT.mp3');		
	game.load.audio('fim', 'assets/sonicfim.mp3');
	
}

function create() {
		
	game.physics.startSystem(Phaser.Physics.ARCADE);		
    game.add.sprite(0, 0, 'sky');

	
    platforms = game.add.group();
    platforms.enableBody = true;
    var ground = platforms.create(0, game.world.height - 10, 'ground');
    ground.scale.setTo(4, 4);
    ground.body.immovable = true;
    
	var ledge = platforms.create(0, 100, 'blocks');
    ledge.body.immovable = true;
	
    ledge = platforms.create(200, 180, 'blocks');
    ledge.body.immovable = false;
	
	platforms3 = platforms.create(200, 180, 'blocks');
    platforms3.body.immovable = true;
	
	ledge = platforms.create(400, 260, 'blocks');
    ledge.body.immovable = false;
	
	platforms1 = platforms.create(400, 260, 'blocks');
    platforms1.body.immovable = false;
	
	ledge = platforms.create(600, 340, 'blocks');
    ledge.body.immovable = true;
	
	ledge = platforms.create(400, 420, 'blocks');
    ledge.body.immovable = true;
	
	ledge = platforms.create(200, 500, 'blocks');
    ledge.body.immovable = true;
	
	music = game.sound.play('som');
	tema = game.sound.play('tema');
	tema.play();
	
	
	player = game.add.sprite(32, game.world.height - 150, 'jogador');
    
	game.physics.arcade.enable(player);
    
	player.body.bounce.y = 0.1;
    player.body.gravity.y = 600;
    player.body.collideWorldBounds = true;
	
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);
	
	cursors = game.input.keyboard.createCursorKeys();
	
	
	stars = game.add.group();
    stars.enableBody = true;
	
	
	
    for (var i = 0; i < 18; i++)
    {
        var star = stars.create(i * 34, 0, 'star');
        star.body.gravity.y = 300;
        star.body.bounce.y = 0.5 + Math.random() * 0.2;
		
		star = stars.create(50, 600, 'star');
		star.body.gravity.x = 300;
		star.body.bounce.x = 0.5 + Math.random() * 0.2;
		
		
    }
	
	
	
	
	cogumelos = game.add.group();
	cogumelos.enableBody = true;
	
	for (var i = 1; i < 10; i++){
        var cogumelo = cogumelos.create(i *385, 300, 'cogumelo');
        cogumelo.body.gravity.y = 300;
        cogumelo.body.bounce.y = 0.5 + Math.random() * 0.2;
		
    }
	
	
	var cog = cogumelos.create(1350, 550, 'cogumelo');
	cog.body.gravity.x = -100;
	cog.body.bounce.x = 0.5 + Math.random() * 0.2;
	
		
	var cog2 = cogumelos.create(50, 200, 'cogumelo');
	cog2.body.gravity.y = 100;
	cog2.body.bounce.y = 0.5 + Math.random() * 0.2;
	
	
	
	
    scoreText = game.add.text
	(16, 16, 'Moeda: 0', 
	{ fontSize: '32px', fill: '#F00' }
	);
	
	scoreText2 = game.add.text(290, 300, '', { fontSize: '32px', fill: '#ffffff' }	);
	
	
    cursors = game.input.keyboard.createCursorKeys();
	
	level = game.add.text
	(650, 16, 'Nível 7', 
	{ fontSize: '32px', fill: '#FFD851' }
	);
	
	
}

function update() {
	
	
	var hitPlatform = game.physics.arcade.collide
	(player, platforms);
	
	
    game.physics.arcade.collide(stars, platforms);
	game.physics.arcade.collide(stars, platforms1);
    game.physics.arcade.collide(stars, platforms3);
	
	
	
	if(platforms1.position.x <= 600){ platforms1.body.velocity.x = 50;}else{platforms1.position.x = 0;}
	if(platforms3.position.x <= 600){ platforms3.body.velocity.x = 50;}else{platforms3.position.x = 0;}

	game.physics.arcade.collide
	(cogumelos, platforms);
	
	
	game.physics.arcade.overlap(
	player, 
	stars, 
	collectStar, 
	null, 
	this);
	
	
	game.physics.arcade.overlap(
	player, 
	cogumelos, 
	killPlayer, 
	null, 
	this);
	
	
    player.body.velocity.x = 0;
	
    if (cursors.left.isDown){		
        player.body.velocity.x = -500;
        player.animations.play('left');
    }
    else if (cursors.right.isDown){		
        player.body.velocity.x = 500;
        player.animations.play('right');
	}
    else{
        player.animations.stop();
        player.frame = 4;
    }
	
	
	if (cursors.up.isDown 
		&& 
		player.body.touching.down 
		&& 
		hitPlatform)
		{
			player.body.velocity.y = -500;
		}
	
}

function collectStar (player, star) {
    
	music.play();
	star.kill();
	score += 10;
	
	if(score < 180)
	{
		scoreText.text = 'Moeda: ' + score;
		
		
	}else{
		
		scoreText2.text = 'Você venceu';
		
		tema.stop();
	}
	
}

function killPlayer (player, cogumelo) {
    
	fim = game.sound.play('fim');
	tema.stop();
	
	fim.play();
	player.kill();
		
	scoreText = game.add.text
	(290, 300, 'GAME OVER', 
	{ fontSize: '32px', fill: '#030303' }
	);
	
}












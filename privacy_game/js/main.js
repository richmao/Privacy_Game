//predefine all states before creating the game.
var Preloader = function() {};
Preloader.prototype = {
	preload: function(){
		game.physics.startSystem(Phaser.Physics.ARCADE);
		game.load.image('player', 'assets/img/cursor_prototype.png');
		game.load.image('enemy', 'assets/img/enemy_prototype.png');
	},
	create: function(){
		game.state.start('Gameplay');
	}
}

var Gameplay = function() {};
Gameplay.prototype = {
	create: function(){
		game.stage.backgroundColor = "#4FFFF4";

		game.world.setBounds(0, 0, 1920, 1920);

		pl = this.game.add.group();
		player = new Player(game, game.world.width/2, game.world.height/2);
		pl.add(player);
		
		player.anchor.setTo(0.5, 0.5);
		player.body.collideworldbounds = true;

		enemies = this.game.add.group();

		game.camera.follow(player, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);

		health = 100;
		healthText = game.add.text(16,16, 'Health: 100', {fontSize: '32px', fill: '#000'});
		healthText.fixedToCamera = true;
	},
	update: function() {
		
		//go towards mouse pointer when mouse button down
		if (game.input.activePointer.isDown)
		{
			player.rotation = game.physics.arcade.moveToPointer(player, 60, game.input.activePointer, 500) + 1.81;
		}else{
			//player comes to a smooth stop when mouse button is let go
			player.body.velocity.x *= 0.9;
			player.body.velocity.y *= 0.9;
		}

		enemytimer++;
		//every 5 seconds
		if(enemytimer === 500){
			console.log("spawn enemies");
			//spawns random amount of enemies (1-10) at random location
			for(let x = 0; x < Math.random() * 10; x++){
				var enemy = new Enemy(game, Math.random() * game.world.width, Math.random() * game.world.height, 'enemy');
				game.add.existing(enemy);
				enemies.add(enemy);
			}
			enemytimer = 0;
		}

		//enemy collision with player
		game.physics.arcade.overlap(player, enemies, this.enemyCollision, null, this);
		
		//lose condition
		if(health == 0){
			game.state.start('GameOver');
		}

	},
	//enemy collision with player
	enemyCollision: function(player, enemy) {
		enemy.kill();
		health -= 10;
		healthText.text = 'Health: ' + health;
	}
}

//Game Over state
var GameOver = function() {};
GameOver.prototype = {
	preload: function(){
	},
	create: function(){
		game.add.text(100, 100, 'Game Over', {fontSize: '32px', fill: '#000'});
	}
}

//create game and new states
var game = new Phaser.Game(667, 375, Phaser.AUTO, 'Test');
game.state.add('Preloader', Preloader);
game.state.add('Gameplay', Gameplay);
game.state.add('GameOver', GameOver);


//make global variables so level doesn't have to be reloaded after game over state
var player;
var pl;
var enemytimer = 0;
var enemies;
var health;
var healthText;

//start game preloading
game.state.start('Preloader');

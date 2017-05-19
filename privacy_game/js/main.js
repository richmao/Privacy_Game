//predefine all states before creating the game.
var Preloader = function() {};
Preloader.prototype = {
	preload: function(){
		game.physics.startSystem(Phaser.Physics.P2JS);
		game.physics.p2.setImpactEvents(true);
		game.load.image('bg', 'assets/img/background.png');
		game.load.image('player', 'assets/img/cursor.png');
		game.load.image('enemy', 'assets/img/enemy.png');
		game.load.image('home', 'assets/img/home.png');
		game.load.audio('music', ['assets/audio/track3.mp3', 'assets/audio/track3.ogg']);
	},
	create: function(){
		game.state.start('MainMenu');
	}
}

var MainMenu = function(game){};
MainMenu.prototype = {
	preload: function(){
		//load assets
	},
	create: function(){
        game.add.text(250, 165, 'Press space to play', {fontSize: '32px', fill: '#FFF'});
        game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
	},
	update: function(){
		//spacebar press to go to next state
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
			console.log('Goto Game');
			game.state.start('Gameplay');
		}
		game.input.onDown.add(this.gofull, this);
	},
	gofull: function() {

	    if (game.scale.isFullScreen)
	    {
	        game.scale.stopFullScreen();
	    }
	    else
	    {
	        game.scale.startFullScreen(false);
	    }

	}
}

var Gameplay = function() {};
Gameplay.prototype = {
	create: function(){
		background = game.add.sprite(0, 0, 'bg');

		game.world.setBounds(0, 0, 2048, 2048);

		pl = this.game.add.group();
		player = new Player(game, game.world.width/2 + 100, game.world.height/2);
		pl.add(player);
		
		player.anchor.setTo(0.5, 0.5);
		player.body.collideworldbounds = true;

		enemies = this.game.add.group();

		//game.camera.follow(player, Phaser.Camera.FOLLOW_LOCKON, 0.5, 0.5);

		homebase = new Home(game, 'home');
		game.add.existing(homebase);

		music = game.add.audio('music');
        music.loop = true;
    	music.play();
	},
	update: function() {
		
		//check for collision between enemy and player
		//game.physics.arcade.collide(enemies, pl);

		enemytimer++;
		//every 5 seconds
		if(enemytimer === 500){
			console.log("spawn enemies");
			//spawns random amount of enemies (1-10) at random location
			for(let x = 0; x < Math.random() * 10; x++){
				
				//spawn enemies 800 away at random angle
				var angle = Math.random() * 6.28;
				var randX = homebase.x + Math.cos(angle) * 800;
				var randY = homebase.y + Math.sin(angle) * -800;
				
				var enemy = new Enemy(game, randX, randY, 'enemy', homebase);
				game.add.existing(enemy);
				enemies.add(enemy);
			}
			enemytimer = 0;
		}
	}
}

//Game Over state
var GameOver = function() {};
GameOver.prototype = {
	preload: function(){
	},
	create: function(){
		game.add.text(100, 100, 'Game Over, press space to play again', {fontSize: '32px', fill: '#FFFFFF'});
	},
	update: function(){
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
			console.log('Goto Menu');
			game.state.start('MainMenu');
		}
	}
}

//create game and new states
var game = new Phaser.Game(2048, 2048, Phaser.AUTO, 'Test');
game.state.add('Preloader', Preloader);
game.state.add('Gameplay', Gameplay);
game.state.add('MainMenu', MainMenu);
game.state.add('GameOver', GameOver);


//make global variables so level doesn't have to be reloaded after game over state
var player;
var pl;
var enemytimer = 0;
var enemies;
var homebase;

//start game preloading
game.state.start('Preloader');

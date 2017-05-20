//predefine all states before creating the game.
var Preloader = function() {};
Preloader.prototype = {
	preload: function(){
		game.load.image('bg', 'assets/img/background.png');
		game.load.image('player', 'assets/img/cursor.png');
		game.load.image('enemy', 'assets/img/enemy.png');
		game.load.image('home', 'assets/img/home.png');
		game.load.image('bullet', 'assets/img/bullet.png');
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
        game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.gofull();
	},
	update: function(){
		//spacebar press to go to next state
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
			console.log('Goto Game');
			game.state.start('Gameplay');
		}
		//game.input.onDown.add(this.gofull, this);
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

		game.world.setBounds(0, 0, 1024, 576);

		pl = this.game.add.group();
		player = new Player(game, game.world.width/2, game.world.height/2);
		pl.add(player);
		
		player.anchor.setTo(0.5, 0.5);
		player.body.collideWorldBounds = true;

		enemies = this.game.add.group();

		bullets = this.game.add.group();

		homebase = new Home(game, 'home');
		game.add.existing(homebase);

		music = game.add.audio('music');
        music.loop = true;
    	music.play();
	},
	update: function() {
		enemytimer++;
		//every 5 seconds
		if(enemytimer === 500){
			console.log("spawn enemies");
			//spawns random amount of enemies (1-10) at random location
			for(let x = 0; x < Math.random() * (10 + diffmultiplier); x++){
				
				//spawn enemies 300 away at random angle
				var angle = Math.random() * 6.28;
				var randX = homebase.x + Math.cos(angle) * 300;
				var randY = homebase.y + Math.sin(angle) * -300;
				
				var enemy = new Enemy(game, randX, randY, 'enemy', homebase);
				game.add.existing(enemy);
				enemies.add(enemy);
			}
			enemytimer = 0;
		}
		game.world.bringToTop(bullets);
		game.world.bringToTop(pl);
	},
	render: function(){
		 // enemies.forEach(function(enemy) {
		 // 	game.debug.body(enemy);
		 // }, this);


		 // bullets.forEach(function(bullet) {
		 // 	game.debug.body(bullet);
		 // }, this);

		 // game.debug.body(player);
		 // game.debug.body(homebase);
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
			music.stop();
			game.state.start('MainMenu');
		}
	}
}

//create game and new states
var game = new Phaser.Game(1024, 576, Phaser.AUTO, 'Test');
game.state.add('Preloader', Preloader);
game.state.add('Gameplay', Gameplay);
game.state.add('MainMenu', MainMenu);
game.state.add('GameOver', GameOver);


//make global variables so level doesn't have to be reloaded after game over state
var player;
var pl;
var diffmultiplier;
var enemytimer = 0;
var enemies;
var homebase;
var bullets;

//start game preloading
game.state.start('Preloader');

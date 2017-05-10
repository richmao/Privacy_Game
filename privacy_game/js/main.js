//predefine all states before creating the game.
var Preloader = function() {};
Preloader.prototype = {
	preload: function(){
		game.physics.startSystem(Phaser.Physics.ARCADE);
		game.load.image('player', 'assets/img/cursor_prototype.png');
	},
	create: function(){
		game.state.start('Gameplay');
	}
}

var Gameplay = function() {};
Gameplay.prototype = {
	create: function(){
		pl = this.game.add.group();
		player = new Player(game, 0, 0);
		pl.add(player);
		
		player.anchor.setTo(0.5, 0.5);
		player.body.collideworldbounds = true;
	},
	update: function() {
		

		
	}
}


//create game and new states
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'Test');
game.state.add('Preloader', Preloader);
game.state.add('Gameplay', Gameplay);


//make global variables so level doesn't have to be reloaded after game over state
var player;
var pl;

//start game preloading
game.state.start('Preloader');

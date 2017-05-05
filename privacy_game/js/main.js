//I predefine all states before creating the game.
var Preloader = function() {};
Preloader.prototype = {
	preload: function(){
		game.physics.startSystem(Phaser.Physics.ARCADE);
	}
}


//create game and new states
var game = new Phaser.Game(1000, 600, Phaser.AUTO, 'Test');
game.state.add('Preloader', Preloader);


//make global variables so level doesn't have to be reloaded after game over state


//start game preloading
game.state.start('Preloader');
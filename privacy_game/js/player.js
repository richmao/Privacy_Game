'use strict';

var Player = function (game, x, y, frame) {
	Phaser.Sprite.call(this, game, x, y, 'player', frame);
	
	//this.scale.x = 0.1;
	//this.scale.y = 0.1;
	
	game.physics.enable(this, Phaser.Physics.ARCADE);
};

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function() {
	
};

'use strict';

var Player = function (game, x, y, frame) {
	Phaser.Sprite.call(this, game, x, y, 'player', frame);
	
	//this.scale.x = 0.1;
	//this.scale.y = 0.1;
	
	game.physics.enable(this, Phaser.Physics.ARCADE);
	this.body.angularDrag = 100;
};

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

var touchX = 0;
var touchY = 0;
var accelValue = 40;
var downTime = 0;

Player.prototype.update = function() {
	
	this.body.angularAcceleration = 0;
	
	//go towards mouse pointer when mouse button down
	if (game.input.activePointer.isDown)
	{
		//only start moving after a fifth of a second had passed
		//makes it easier to spin without interfering with movement
		//should probably be replaced with something more elegant in the future
		downTime += game.time.elapsed;
		if (downTime > 200){
			game.physics.arcade.moveToPointer(player, 60, game.input.activePointer, 500) + 1.81;
		}
		
		//rotate charracter when swiping across screen, equal to speed of swipe
		//TODO: differentiate swiping from different sides, right now it assumes from top right of character
		this.body.angularAcceleration -= accelValue * (touchX - game.input.mousePointer.x);
		this.body.angularAcceleration -= accelValue * (touchY - game.input.mousePointer.y);
	}else{
		//player comes to a smooth stop when mouse button is let go
		player.body.velocity.x *= 0.9;
		player.body.velocity.y *= 0.9;
		//set cursor downtime to zero since it was released
		downTime = 0;
	}
	
	touchX = game.input.mousePointer.x;
	touchY = game.input.mousePointer.y;
};

'use strict';

var Player = function (game, x, y, frame) {
	Phaser.Sprite.call(this, game, x, y, 'player', frame);
	
	game.physics.enable(this, Phaser.Physics.ARCADE);
	this.anchor.x = 0.5;
	this.anchor.y = 0;

	this.scale.setTo(0.5);
	this.totalBullets = 5;
	this.numBullets = 0;
	this.speed = 2;

	this.currPowerup = "None";
	this.powerupText = game.add.text(game.world.width - 400, game.world.height - 48, 'Power Up: None', {fontSize: '32px', fill: '#FFF'});
	this.powerupText.fixedToCamera = true;

	this.cursors = game.input.keyboard.createCursorKeys();
	this.fireKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	this.PUKey = game.input.keyboard.addKey(Phaser.Keyboard.Q);
};

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function() {
	if (this.cursors.up.isDown) {
        this.move(this, this.speed);
    }
    else if (this.cursors.down.isDown) {
    	this.move(this, -this.speed);
    }

    if (this.cursors.left.isDown) {
        this.body.rotation -= 3;
    }
    else if (this.cursors.right.isDown) {
        this.body.rotation += 3;
    }

	if(this.fireKey.justPressed()){
		this.fire();
	}

	if(this.PUKey.justPressed()){
		//use powerup
		if(this.currPowerup == 'Dash'){
			player.speed += 2;
		}

		this.currPowerup = "None";
		this.powerupText.text = 'Power Up: ' + this.currPowerup;
	}

	game.physics.arcade.overlap(powerups, player, this.collect, null, this);

};

Player.prototype.fire = function(){
	if (this.numBullets < this.totalBullets){
        console.log('fired');
        var bullet = new Bullet(game, this.x, this.y, 'bullet');
        bullets.add(bullet);
        bullet.rotation = this.rotation;
        game.physics.arcade.velocityFromRotation(this.rotation - (90 * (Math.PI / 180)), 600, bullet.body.velocity);
		this.numBullets++;
	}
}

Player.prototype.move = function(object, distance) {
	object.body.x = object.body.x + distance * Math.cos(object.rotation - (90 * (Math.PI / 180)));
	object.body.y = object.body.y + distance * Math.sin(object.rotation - (90 * (Math.PI / 180)));
}

Player.prototype.collect = function(player, powerup) {
	if (this.currPowerup == "None"){
		this.currPowerup = powerup.id;
		powerup.kill();
		this.powerupText.text = 'Power Up: ' + this.currPowerup;
	}
}
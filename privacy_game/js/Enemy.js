function Enemy(game, x, y, key, home) {
	Phaser.Sprite.call(this, game, x, y, key);
	game.physics.enable(this, Phaser.Physics.ARCADE);
	this.anchor.set(0.5);
	
	console.log('enemy created');
	
	this.homeBase = home;
	
	radians = game.physics.arcade.angleBetween(this, homebase);
	degrees = radians * (180/Math.PI);
	game.physics.arcade.velocityFromAngle(degrees, 40 + diffmultiplier, this.body.velocity);
	
}

//add to constructor to Enemy prototype
Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;

//override default update function
Enemy.prototype.update = function() {
	
}


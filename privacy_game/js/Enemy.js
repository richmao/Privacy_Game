function Enemy(game, x, y, key, frame) {
	Phaser.Sprite.call(this, game, x, y, key, frame);
	game.physics.enable(this, Phaser.Physics.ARCADE);
	this.anchor.set(0.5);
	//var s = Math.random() + 0.5;
	this.scale.x = 0.1;
	this.scale.y = 0.1;

	//this.body.velocity.x = 10;
	//this.body.velocity.y = 10;


	console.log('enemy created');
}

//add to constructor to Enemy prototype
Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;

//override default update function
Enemy.prototype.update = function() {
	radians = game.physics.arcade.angleBetween(this, homebase);
	degrees = radians * (180/Math.PI);
	game.physics.arcade.velocityFromAngle(degrees, 60, this.body.velocity);
	
}
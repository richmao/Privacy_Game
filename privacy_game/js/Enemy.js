function Enemy(game, x, y, velx, vely, key, frame) {
	Phaser.Sprite.call(this, game, x, y, key, frame);
	this.anchor.set(0.5);
	var s = Math.random() + 0.5;
	this.scale.x = s;
	this.scale.y = s;

	game.physics.enable(this);
	this.body.velocity.x = velx;
	this.body.velocity.y = vely;
}

//add to constructor to Enemy prototype
Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;

//override default update function
Enemy.prototype.update = function() {

	
	//wrap around screen TEMPORARY FOR DUMB AI
	if(this.x < 0 - this.width/2)
		this.x = game.width + this.width/2;
	else(this.x > game.width + this.width/2)
		this.x = 0 - this.width/2;
	if(this.y < 0 - this.height/2)
		this.y = game.height + this.height/2;
	else(this.y > game.height + this.height/2)
		this.y = 0 - this.height/2;
}
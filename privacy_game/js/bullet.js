function Bullet(game, x, y, key,) {
	Phaser.Sprite.call(this, game, x, y, key);

	game.physics.enable(this, Phaser.Physics.ARCADE);

	//game.physics.p2.enable(this, false);
	this.anchor.set(0.5);
	//var s = Math.random() + 0.5;
	
	console.log('bullet created');

	this.checkWorldBounds = true;
	this.events.onOutOfBounds.add(this.bulletOut, this);
}

//add to constructor to Bullet prototype
Bullet.prototype = Object.create(Phaser.Sprite.prototype);
Bullet.prototype.constructor = Bullet;

//override default update function
Bullet.prototype.update = function() {
	game.physics.arcade.overlap(enemies, bullets, this.hitEnemy, null, this);
}

Bullet.prototype.bulletOut = function() {
	this.kill();
	console.log('killed bullet');
	player.numBullets--;
}

Bullet.prototype.hitEnemy = function(enemy, bullet) {
	enemy.kill();
	bullet.kill();
	player.numBullets--;
}
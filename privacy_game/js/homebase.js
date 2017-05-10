function Home(game, key, frame) {
	Phaser.Sprite.call(this, game, game.world.width/2, game.world.height/2, key, frame);
	game.physics.enable(this, Phaser.Physics.ARCADE);
	this.anchor.set(0.5);
	//this.scale.x = 0.1;
	//this.scale.y = 0.1;
	this.health = 100;

	this.healthText = game.add.text(16,16, 'Health: 100', {fontSize: '32px', fill: '#FFF'});
	this.healthText.fixedToCamera = true;
}

//add to constructor to Home prototype
Home.prototype = Object.create(Phaser.Sprite.prototype);
Home.prototype.constructor = Home;

//override default update function
Home.prototype.update = function() {
	//lose condition
	if(this.health <= 0){
		game.state.start('GameOver');
	}

	//enemy collision with player
	game.physics.arcade.overlap(this, enemies, this.enemyCollision, null, this);
}

//enemy collision with home
Home.prototype.enemyCollision = function(home, enemy) {
	enemy.kill();
	this.health -= 10;
	this.healthText.text = 'Health: ' + this.health;
}
function Home(game, key, frame) {
	Phaser.Sprite.call(this, game, game.world.width/2, game.world.height/2, key, frame);
	game.physics.enable(this, Phaser.Physics.ARCADE);
	this.anchor.set(0.5);
	this.health = 100;
	this.score = 0;
	this.scoretimer = 0;

	this.scoreText = game.add.text(16, game.world.height - 48, 'Score: 0', {fontSize: '32px', fill: '#FFF'});
	this.scoreText.fixedToCamera = true;

	this.healthText = game.add.text(300,game.world.height - 48, 'Health: 100', {fontSize: '32px', fill: '#FFF'});
	this.healthText.fixedToCamera = true;
	
	this.body.static = true;
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

	this.scoretimer++;
	if(this.scoretimer % 100 == 0){
		this.score++;
		this.scoretimer = 0;
		this.scoreText.text = 'Score: ' + this.score;
	}

	diffmultiplier = (this.score * 0.1);
	
	game.physics.arcade.overlap(enemies, homebase, this.homeHit, null, this);
}

//enemy collision with home
Home.prototype.homeHit = function(home, enemy) {
		enemy.kill();
		this.health -= 10;
		this.healthText.text = 'Health: ' + this.health;
		if(this.health == 10){
			aboutToLose.play();
		}
		//enemyEnterSounds[Math.floor(Math.random() * 3)].play();
}
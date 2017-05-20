function Enemy(game, x, y, key, home) {
	Phaser.Sprite.call(this, game, x, y, key);
	//game.physics.p2.enable(this, false);
	game.physics.enable(this, Phaser.Physics.ARCADE);
	this.anchor.set(0.5);
	//var s = Math.random() + 0.5;
	
	console.log('enemy created');
	
	this.homeBase = home;
	
	this.body.whatAmI = "enemy";
	this.shortestDistance = 99999;
	
	radians = game.physics.arcade.angleBetween(this, homebase);
	degrees = radians * (180/Math.PI);
	game.physics.arcade.velocityFromAngle(degrees, 60 + diffmultiplier, this.body.velocity);
	
}

//add to constructor to Enemy prototype
Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;

//override default update function
Enemy.prototype.update = function() {
	
	// var dx = this.x - this.homeBase.x;
	// var dy = this.y - this.homeBase.y;
 //    var distance = Math.sqrt(dx * dx + dy * dy);
	
	// if (this.shortestDistance - distance < 0.5){
	// 	accelerateToObject(this,this.homeBase,30);
	// }
	
	// if (distance < this.shortestDistance){
	// 	this.shortestDistance = distance;
	// }
	// else if(distance - this.shortestDistance > 500 || distance > 850){
	// 	console.log("enemy killed");
	// 	this.destroy();
	// }
}


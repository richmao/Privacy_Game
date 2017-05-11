function Enemy(game, x, y, key, home) {
	Phaser.Sprite.call(this, game, x, y, key);
	game.physics.p2.enable(this, false);
	this.anchor.set(0.5);
	//var s = Math.random() + 0.5;
	
	console.log('enemy created');
	
	homeBase = home;
	
	this.body.whatAmI = "enemy";
	
	//radians = game.physics.arcade.angleBetween(this, homebase);
	//degrees = radians * (180/Math.PI);
	//game.physics.arcade.velocityFromAngle(degrees, 60, this.body.velocity);
	
}

//add to constructor to Enemy prototype
Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;

var homeBase;

//override default update function
Enemy.prototype.update = function() {
	accelerateToObject(this,homeBase,30);
}

function accelerateToObject(obj1, obj2, speed) {
    if (typeof speed === 'undefined') { speed = 60; }
    var angle = Math.atan2(obj2.y - obj1.y, obj2.x - obj1.x);
    obj1.body.rotation = angle + game.math.degToRad(90);  // correct angle of angry bullets (depends on the sprite used)
    obj1.body.force.x = Math.cos(angle) * speed;    // accelerateToObject 
    obj1.body.force.y = Math.sin(angle) * speed;
}
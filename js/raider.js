function Raider(game,spacer,x,y)
{
	this.specer=spacer
	this.game=game;
	this.x=x;
	this.y=y;
	this.render=null;
	this.alive=false;
	this.fireRate=1000;
	this.nextFire=0;
	
	
	this.bullets = game.add.group();
    this.bullets.enableBody = true;
    this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
    this.bullets.createMultiple(20, 'bullet', 0, false);
    this.bullets.setAll('anchor.x', 0.5);
    this.bullets.setAll('anchor.y', 0.5);
    this.bullets.setAll('outOfBoundsKill', true);
    this.bullets.setAll('checkWorldBounds', true);	
	
	
	
	game.physics.enable(this, Phaser.Physics.ARCADE);
}
Raider.prototype.update = function(posy)
{

	if(this.render==null){
			
		if(posy>this.y){
			this.render=this.game.add.sprite(this.x,posy-this.y,'raider');
			this.render.anchor.setTo(0.5);
			this.game.physics.arcade.enableBody(this.render);
			this.alive=true;
			}
	}
	else
	{
		if(!this.render.alive) return;
		this.render.position.y=posy-this.y;
		this.game.physics.arcade.overlap(this.specer, this.render, colide2, null, this);
		this.fire();
		if(2*this.game.world.centerY<this.render.position.y){
			this.render.kill();
			}
	}
	
}
Raider.prototype.fire = function() {
		if (!this.render.alive) return;
        if (this.game.time.now > this.nextFire && this.bullets.countDead() > 0)
        {
            this.nextFire = this.game.time.now + this.fireRate;
            var bullet = this.bullets.getFirstDead();
            bullet.reset(this.render.x, this.render.y);
			bullet.body.velocity.y = 400;
        }
}
Raider.prototype.kill = function() {
	this.render.kill();
}
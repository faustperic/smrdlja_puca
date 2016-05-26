function Spacer(game,spacer,x,y)
{
	
	this.game=game;
	this.fireRate=500;
	this.nextFire=0;
	this.bullets = game.add.group();
    this.bullets.enableBody = true;
    this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
    this.bullets.createMultiple(20, 'bullet', 0, false);
    this.bullets.setAll('anchor.x', 0.5);
    this.bullets.setAll('anchor.y', 0.5);
    this.bullets.setAll('outOfBoundsKill', true);
    this.bullets.setAll('checkWorldBounds', true);	
	
	
	
	
	this.render=this.game.add.sprite(x,y,spacer);
	this.position=this.render.position;
	game.physics.enable(this, Phaser.Physics.ARCADE);
	this.game.physics.arcade.enableBody(this.render);
	this.render.anchor.setTo(0.5);
	this.render.scale.setTo(1);
	this.cursors = game.input;
	this.fireButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

}
Spacer.prototype.update = function(posy)
{
	if(!this.render.alive) return;
	
	var target={x:this.cursors.x-spacer.position.x,y:this.cursors.y-spacer.position.y};
	var len=Math.sqrt(target.x*target.x+target.y*target.y)/5;
	if(len>1){
		spacer.position.x+=target.x/len;
		spacer.position.y+=target.y/len;
	}
	if(this.cursors.activePointer.isDown)this.fire();
	if(this.fireButton.isDown) this.fire();
}
Spacer.prototype.fire = function() {
		if (!this.render.alive) return;
        if (this.game.time.now > this.nextFire && this.bullets.countDead() > 0)
        {
            this.nextFire = this.game.time.now + this.fireRate;
            var bullet = this.bullets.getFirstDead();
            bullet.reset(this.render.x, this.render.y);
			bullet.body.velocity.y = -400;
        }
}
Spacer.prototype.kill = function() {
	this.render.kill();
}
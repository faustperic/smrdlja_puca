function Raider(game,spacer,x,y)
{
	this.specer=spacer
	this.game=game;
	this.x=x;
	this.y=y;
	this.render=null;
	this.ded=false;
	game.physics.enable(this, Phaser.Physics.ARCADE);
}
Raider.prototype.update = function(posy)
{
	if(this.ded) return;
	if(this.render==null){
		if(posy>this.y){
			this.render=this.game.add.sprite(this.x,posy-this.y,'raider');
			this.render.anchor.setTo(0.5);
			this.game.physics.arcade.enableBody(this.render);
			}
	}
	else
	{
		this.render.position.y=posy-this.y;
		this.game.physics.arcade.overlap(this.specer, this.render, colide2, null, this);
		if(2*this.game.world.centerY<this.render.position.y){
			this.render.kill();
			this.ded=true;
			}
	}
	
}
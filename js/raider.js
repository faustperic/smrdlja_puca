function Raider(game,x,y)
{
	this.game=game;
	this.x=x;
	this.y=y;
	this.render=null;
}
Raider.prototype.update = function(posy)
{
	if(this.render==null){
		if(posy>this.y)
			this.render=this.game.add.sprite(this.x,posy-this.y,'raider');
	}
	else
	{
		this.render.position.y=posy-this.y;
	}
	
}
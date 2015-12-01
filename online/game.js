/* global Phaser */
var game=new Phaser.Game(640,480,Phaser.AUTO);
var GameState=
{
	preload:function()
	{
		this.load.image('bacground','background.png');
		this.load.image('spacer','Spacer.png');
	},
	create: function()
	{
		this.background1=this.game.add.sprite(0,0,'bacground');
		this.background1.scale.setTo(1);
		this.background2=this.game.add.sprite(0,-this.background1.height,'bacground');
		this.background1right=this.game.add.sprite(this.background1.width,0,'bacground');
		this.background2right=this.game.add.sprite(this.background1.width,-this.background1.height,'bacground');
		this.pepa=5;
		this.spacer=this.game.add.sprite(this.game.world.centerX,this.game.world.centerY,'spacer');
		this.spacer.anchor.setTo(0.5);
		this.spacer.scale.setTo(1);
		
		this.background2.scale.setTo(1);
	},
	update:function()
	{
		this.pepa+=0.1;
		this.spacer.position.x=this.game.world.centerX+Math.sin(this.pepa)*200;
		this.spacer.position.y=this.game.world.centerY+Math.cos(this.pepa)*200;
		this.background1.position.y+=.5;
		
		if(this.background1.position.y>1*this.background1.height){
			this.background1.position.y-=2*this.background1.height;
			}
		this.background1right.position.y=this.background1.position.y;
		this.background2.position.y+=.5;
		if(this.background2.position.y>1*this.background1.height)
			this.background2.position.y-=2*this.background1.height;
		this.background2right.position.y=this.background2.position.y;
	}
}

game.state.add('GameState',GameState);
game.state.start('GameState');
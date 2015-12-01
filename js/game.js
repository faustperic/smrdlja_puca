/* global Phaser */
var game=new Phaser.Game(640,480,Phaser.AUTO);
var GameState=
{
	preload:function()
	{
		this.load.image('bacground','texture/Nautilus.png');
		this.load.image('spacer','texture/Spacer.png');
		this.load.image('raider','texture/Raider-256K.png');
	},
	create: function()
	{
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		this.background1=this.game.add.sprite(0,0,'bacground');
		this.background1.scale.setTo(1);
		this.background2=this.game.add.sprite(0,-this.background1.height,'bacground');
		this.background1right=this.game.add.sprite(this.background1.width,0,'bacground');
		this.background2right=this.game.add.sprite(this.background1.width,-this.background1.height,'bacground');
		this.pepa=5;
		this.spacer=this.game.add.sprite(this.game.world.centerX,this.game.world.centerY,'spacer');
		//enableing physics
		this.game.physics.arcade.enableBody(this.spacer);
		this.spacer.anchor.setTo(0.5);
		this.spacer.scale.setTo(1);
		this.background2.scale.setTo(1);
		this.cursors = game.input;
		this.enemies=[];
		var i=0;
		for(i=0; i<50;i++)
		{
			this.enemies.push(new Raider(this.game,this.spacer,this.game.world.centerX+200*Math.sin(i*5),this.game.world.centerY+i*100));
		}
	},
	update:function()
	{
		this.pepa+=1;
		this.enemies.forEach(function(element) {
			element.update(this.pepa);
		}, this);
		var target={x:this.cursors.x-this.spacer.position.x,y:this.cursors.y-this.spacer.position.y};
		var len=Math.sqrt(target.x*target.x+target.y*target.y)/5;
		if(len>1){
			this.spacer.position.x+=target.x/len;
			this.spacer.position.y+=target.y/len;
		}
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

//function if colide 2 kill 2
function colide2(first,second){
	first.kill();
	second.kill();
}
game.state.add('GameState',GameState);
game.state.start('GameState');
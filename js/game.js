/* global Phaser */
var game=new Phaser.Game(640,480,Phaser.AUTO);
var bullets;
var bulletTime = 0;
var fireButton;
var spacer;
var GameState=
{
	preload:function()
	{
		this.load.image('bacground','texture/Nautilus.png');
		this.load.image('spacer','texture/Spacer.png');
		this.load.image('raider','texture/Raider-256K.png');
		game.load.spritesheet('kaboom', 'texture/explode.png', 128, 128);
		game.load.image('bullet', 'texture/bullet.png');
	},
	create: function()
	{
		//  Our bullet group
    	bullets = game.add.group();
    	bullets.enableBody = true;
    	bullets.physicsBodyType = Phaser.Physics.ARCADE;
    	bullets.createMultiple(30, 'bullet');
    	bullets.setAll('anchor.x', 0.5);
    	bullets.setAll('anchor.y', 1);
    	bullets.setAll('outOfBoundsKill', true);
    	bullets.setAll('checkWorldBounds', true);
		
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		this.background1=this.game.add.sprite(0,0,'bacground');
		this.background1.scale.setTo(1);
		this.background2=this.game.add.sprite(0,-this.background1.height,'bacground');
		this.background1right=this.game.add.sprite(this.background1.width,0,'bacground');
		this.background2right=this.game.add.sprite(this.background1.width,-this.background1.height,'bacground');
		this.pepa=5;
		spacer=this.game.add.sprite(this.game.world.centerX,this.game.world.centerY,'spacer');
		//enableing physics
		this.game.physics.arcade.enableBody(spacer);
		spacer.anchor.setTo(0.5);
		spacer.scale.setTo(1);
		this.background2.scale.setTo(1);
		this.cursors = game.input;
		this.enemies=[];
		var i=0;
		for(i=0; i<50;i++)
		{
			this.enemies.push(new Raider(this.game,spacer,this.game.world.centerX+200*Math.sin(i*5),this.game.world.centerY+i*100));
		}
		//  An explosion pool
    	explosions = game.add.group();
    	explosions.createMultiple(30, 'kaboom');
    	explosions.forEach(setupInvader, this);
		
		fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	},
	update:function()
	{
		this.pepa+=1;
		this.enemies.forEach(function(element) {
			element.update(this.pepa);
		}, this);
		var target={x:this.cursors.x-spacer.position.x,y:this.cursors.y-spacer.position.y};
		var len=Math.sqrt(target.x*target.x+target.y*target.y)/5;
		if(len>1){
			spacer.position.x+=target.x/len;
			spacer.position.y+=target.y/len;
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
		
		//  Firing?
        if (fireButton.isDown)
        {
            fireBullet();
        }

        //  Run collision
        game.physics.arcade.overlap(bullets, this.enemies, collisionHandler, null, this);
	}
}

//function if colide 2 kill 2
function colide2(first,second){
	first.kill();
	second.kill();
	//  And create an explosion :)
    var explosion = explosions.getFirstExists(false);
    explosion.reset(second.body.x, second.body.y);
    explosion.play('kaboom', 30, false, true);
}
function setupInvader (invader) {

    invader.anchor.x = 0.5;
    invader.anchor.y = 0.5;
    invader.animations.add('kaboom');
}

function fireBullet () {

    //  To avoid them being allowed to fire too fast we set a time limit
    if (game.time.now > bulletTime)
    {
        //  Grab the first bullet we can from the pool
        var bullet = bullets.getFirstExists(false);

        if (bullet)
        {
            //  And fire it
			console.debug("metak je ispaljeeen! " + spacer.x +"  "+ spacer.y + 8);
            bullet.reset(spacer.x, spacer.y + 8);
            bullet.body.velocity.y = -400;
            bulletTime = game.time.now + 200;
        }
    }

}

function resetBullet (bullet) {

    //  Called if the bullet goes out of the screen
    bullet.kill();

}

function collisionHandler (bullet, alien) {

    //  When a bullet hits an alien we kill them both
    bullet.kill();
    alien.kill();

    //  And create an explosion :)
    var explosion = explosions.getFirstExists(false);
    explosion.reset(alien.body.x, alien.body.y);
    explosion.play('kaboom', 30, false, true);
}
game.state.add('GameState',GameState);
game.state.start('GameState');
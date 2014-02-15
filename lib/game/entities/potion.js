ig.module(
	'game.entities.potion'
)
.requires(
    'game.entities.collectable'
)
.defines(function(){

	EntityPotion = EntityCollectable.extend({

        animSheet: new ig.AnimationSheet( 'media/potion.png', 7, 7 ),
        size: {x:7,y:7},
        offset: {x:0,y:0},
        health: 1,

        // SOUND
        sPotion: new ig.Sound( 'media/sounds/potion.mp3', false ),

		init: function( x, y, settings ) {
			this.parent( x, y, settings );
			this.addAnim( 'idle', 0.1, [0,0,0,0,0,0,0,0,0,0,1,2] );
            this.currentAnim.gotoRandomFrame();
		},

        reset: function( x, y, settings ) {
            this.parent( x, y, settings );
            this.currentAnim.gotoRandomFrame();
        },

        check: function(other){
            if(other instanceof EntityPlayer){
                this.sPotion.play();
                other.poisonTimer.set(0);
                other.health += this.health;                
                if( other.health > other.maxHealth ) other.health = other.maxHealth;
                this.kill();
            }
            this.parent();
        },        					

    });

});
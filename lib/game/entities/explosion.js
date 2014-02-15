ig.module(
	'game.entities.explosion'
)
.requires(
    'game.entities.particle'
)
.defines(function(){

	EntityExplosion = EntityParticle.extend({
		
		animSheet: new ig.AnimationSheet( 'media/explosion.png', 16, 16 ),
		size: { x:8, y:2 },
		offset: { x:4, y:13 },
		lifetime:1,
		fadetime: 999,
		playOnce: true,
		attackRange: 14,
		attackDamage: 1,
		stuntTime: 0.8,	

		// SOUND
        sExplosion: new ig.Sound( 'media/sounds/explosion.mp3', true ),	

		init: function( x, y, settings ) {
			this.parent( x, y, settings );
			this.addAnim( 'idle', 0.1, [0,1,2,3,4,5,6,7,8,9,10,11,12,13] );			
			this.updateZindex();
			this.giveDamage = true;
			this.sExplosion.play();
		},
		
		reset: function( x, y, settings ) {
        	this.parent( x, y, settings );
        	this.updateZindex();
        	this.giveDamage = true;
        	this.playOnce = true;
        	this.currentAnim.rewind();
        },

		updateZindex: function(){
		    this.zIndex = this.pos.y;			    
        	ig.game.sortEntitiesDeferred();
        	this.sExplosion.play();
		},

		

        update: function(){
        	this.parent();

        	if(this.currentAnim.frame == 3 && this.giveDamage){
	        	for ( var i = 0; i < ig.game.entities.length; i++ ) {				
					if( (ig.game.entities[i] instanceof EntityNPC) || (ig.game.entities[i] instanceof EntityPlayer)){
						if( ig.game.entities[i].distanceTo(this) < this.attackRange ){							
							ig.game.entities[i].receiveDamage(this.attackDamage);
						}
					}
				}
				this.giveDamage = false;
			}

			
        }


    });

});
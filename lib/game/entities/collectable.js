ig.module(
	'game.entities.collectable'
)
.requires(
    'impact.entity',
    'impact.entity-pool'
)
.defines(function(){

	EntityCollectable = ig.Entity.extend({

        type: ig.Entity.TYPE.B,
        checkAgainst: ig.Entity.TYPE.BOTH,
        collides: ig.Entity.COLLIDES.ACTIVE,        

		init: function( x, y, settings ) {
			this.parent( x, y, settings );
			this.zIndex = this.pos.y;
		},

        reset: function( x, y, settings ) {
            this.parent( x, y, settings );
            this.zIndex = this.pos.y;
        },

        updateZindex: function(){
            if( this.vel.y !== 0 ) {                                                                                    
                this.zIndex = this.pos.y;               
                ig.game.sortEntitiesDeferred();
            }
        },

        update: function(){
            this.parent();
            if(this.vel.x !== 0 || this.vel.y !== 0){
                this.updateZindex();
            }
        }

    });

    ig.EntityPool.enableFor( EntityCollectable );

});
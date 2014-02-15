
ig.module(
	'game.entities.block'
)
.requires(
    'game.entities.particle'
)
.defines(function(){

	EntityBlock = EntityParticle.extend({

		animSheet: new ig.AnimationSheet( 'media/block.png', 29, 13 ),
		size: { x:29, y:13 },
		offset: { x:0, y:0 },
		lifetime:1,
        fadetime: 999,
        playOnce: true,
		zIndex: 1,

		init: function( x, y, settings ) {
			this.parent( x, y, settings );
			this.addAnim( 'idle', 0.1, [0,1,2,3,4,5] );
		},

		reset: function( x, y, settings ) {
        	this.parent( x, y, settings );
            this.currentAnim.rewind();
        },

    });

});
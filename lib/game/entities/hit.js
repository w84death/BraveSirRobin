
ig.module(
	'game.entities.hit'
)
.requires(
    'game.entities.particle'
)
.defines(function(){

	EntityHit = EntityParticle.extend({
		
		animSheet: new ig.AnimationSheet( 'media/hit.png', 9, 9 ),
		size: { x:9, y:9 },
		offset: { x:0, y:0 },
		lifetime:0.1,
		zIndex: 9999,

		init: function( x, y, settings ) {
			this.parent( x, y, settings );

			this.addAnim( 'idle', 1, [0] );
		},

		reset: function( x, y, settings ) {
        	this.parent( x, y, settings );
        	this.timer.set(0);
        },

    });

});
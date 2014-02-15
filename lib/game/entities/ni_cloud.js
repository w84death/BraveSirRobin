
ig.module(
	'game.entities.ni_cloud'
)
.requires(
    'game.entities.particle'
)
.defines(function(){

	EntityNiCloud = EntityParticle.extend({
		
		animSheet: new ig.AnimationSheet( 'media/ni_cloud.png', 10, 10 ),
		size: { x:10, y:10 },
		offset: { x:0, y:0 },
		lifetime:0.2,
		zIndex: 9999,

		init: function( x, y, settings ) {
			this.parent( x, y, settings );
			this.addAnim( 'idle', 1, [0] );
		},

    });

});
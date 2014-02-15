ig.module(
	'game.entities.gate_bricks'
)
.requires(
    'game.entities.gate'
)
.defines(function(){

	EntityGate_bricks = EntityGate.extend({

		animSheet: new ig.AnimationSheet( 'media/gate_bricks.png', 16, 16 ),

		init: function( x, y, settings ) {
			this.parent( x, y, settings );
		}

    });
});
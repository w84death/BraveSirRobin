ig.module(
	'game.entities.gate_blue'
)
.requires(
    'game.entities.gate'
)
.defines(function(){

	EntityGateBlue = EntityGate.extend({

		animSheet: new ig.AnimationSheet( 'media/maps/gate_blue.png', 16, 16 ),

		init: function( x, y, settings ) {
			this.parent( x, y, settings );
		}

    });
});
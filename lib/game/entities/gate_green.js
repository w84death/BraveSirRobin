ig.module(
	'game.entities.gate_green'
)
.requires(
    'game.entities.gate'
)
.defines(function(){

	EntityGateGreen = EntityGate.extend({

		animSheet: new ig.AnimationSheet( 'media/maps/gate_green.png', 16, 16 ),

		init: function( x, y, settings ) {
			this.parent( x, y, settings );
		}

    });
});
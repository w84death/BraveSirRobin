ig.module(
	'game.entities.gate_red'
)
.requires(
    'game.entities.gate'
)
.defines(function(){

	EntityGateRed = EntityGate.extend({

		animSheet: new ig.AnimationSheet( 'media/maps/gate_red.png', 16, 16 ),

		init: function( x, y, settings ) {
			this.parent( x, y, settings );
		}

    });
});
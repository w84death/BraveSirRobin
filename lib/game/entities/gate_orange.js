ig.module(
	'game.entities.gate_orange'
)
.requires(
    'game.entities.gate'
)
.defines(function(){

	EntityGateOrange = EntityGate.extend({

		animSheet: new ig.AnimationSheet( 'media/maps/gate_orange.png', 16, 16 ),

		init: function( x, y, settings ) {
			this.parent( x, y, settings );
		}

    });
});
ig.module(
	'game.entities.gate_rocks'
)
.requires(
    'game.entities.gate'
)
.defines(function(){

	EntityGate_rocks = EntityGate.extend({

		animSheet: new ig.AnimationSheet( 'media/gate_rocks.png', 16, 16 ),

		init: function( x, y, settings ) {
			this.parent( x, y, settings );
		}

    });
});
ig.module(
	'game.entities.gate_forest'
)
.requires(
    'game.entities.gate'
)
.defines(function(){

	EntityGate_forest = EntityGate.extend({

		animSheet: new ig.AnimationSheet( 'media/gate_forest.png', 16, 16 ),

		init: function( x, y, settings ) {
			this.parent( x, y, settings );
		}
        
    });
});
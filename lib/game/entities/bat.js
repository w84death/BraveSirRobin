ig.module(
	'game.entities.bat'
)
.requires(
    'game.entities.npc'
)
.defines(function(){

	EntityBat = EntityNPC.extend({

		animSheet: new ig.AnimationSheet( 'media/bat.png', 7, 9 ),
		size: {x: 4, y:3},
		offset: {x: 1, y: 6},
		health: 2,
		idleTime: 5,
        moveTime: 30, 
		attackDamage: 1,
		attackSpeed: 1.5,
		attackRange: 14,
		stuntTime: 0.5,
		score: 5,
		movement: 25,

		init: function( x, y, settings ) {
			this.parent( x, y, settings );
			this.addAnim( 'idle', 0.2, [0,1,2,3] );
			this.addAnim( 'move', 0.2, [0,1,2,3] );
			this.addAnim( 'attack', 0.2, [0,1,2,3] );
		},

		reset: function( x, y, settings ) {
        	this.parent( x, y, settings );
        },

		update: function(){
			this.parent();
		},
        
    });
});
ig.module(
	'game.entities.bee'
)
.requires(
    'game.entities.npc'
)
.defines(function(){

	EntityBee = EntityNPC.extend({

		animSheet: new ig.AnimationSheet( 'media/bee.png', 12, 18 ),
		size: {x: 8, y:4},
		offset: {x: 2, y: 14},
		health: 2,
		idleTime: 5,
        moveTime: 30,
		attackDamage: 1,
		attackSpeed: 1.5,
		attackRange: 14,
		followRange: 40,
		stuntTime: 0.5,
		score: 5,
		movement: 25,

		init: function( x, y, settings ) {
			this.parent( x, y, settings );
			this.addAnim( 'idle', 0.1, [0,1,0,1,0,1,2,3,2,3,2,3] );
			this.addAnim( 'move', 0.1, [0,1,0,1,0,1,2,3,2,3,2,3] );
			this.addAnim( 'attack', 0.1, [4,5,4,5,6,7,6,7] );
		},

		reset: function( x, y, settings ) {
        	this.parent( x, y, settings );
        },

		update: function(){
			this.parent();
		},

    });
});
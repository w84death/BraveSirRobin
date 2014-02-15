ig.module(
	'game.entities.rabbit'
)
.requires(
    'game.entities.npc'
)
.defines(function(){

	EntityRabbit = EntityNPC.extend({

		animSheet: new ig.AnimationSheet( 'media/rabbit.png', 12, 12 ),
		size: {x: 5, y:3},
		offset: {x: 5, y: 8},
		flip: false,
		attackRange: 10,
		attackDamage: 6,
		attackSpeed: 1,
		stuntTime: 1,
		health: 10,
		idleTime: 80,
        moveTime: 45,
		score: 100,

		init: function( x, y, settings ) {
			this.parent( x, y, settings );
			this.addAnim( 'idle', 0.5, [7,8,7,7,7,8,7,9] );
			this.addAnim( 'attack', 0.1, [4,5,6] );
			this.addAnim( 'move', 0.1, [0,1,2,3] );
		},

    });
});
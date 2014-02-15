ig.module(
	'game.entities.spider_junior'
)
.requires(
    'game.entities.npc'
)
.defines(function(){

	EntitySpiderJunior = EntityNPC.extend({

		animSheet: new ig.AnimationSheet( 'media/spider_junior.png', 12, 12 ),
		size: {x: 5, y:3},
		offset: {x: 5, y: 8},
		flip: false,
		attackRange: 10,
		attackDamage: 1,
		attackSpeed: 0.6,
		followRange: 25,
		stuntTime: 0.4,
		health: 1,
		movement: 28,
		idleTime: 10,
        moveTime: 45,
		score: 5,

		init: function( x, y, settings ) {
			this.parent( x, y, settings );
			this.addAnim( 'idle', 0.5, [7,7,3] );
			this.addAnim( 'attack', 0.1, [4,5,6] );
			this.addAnim( 'move', 0.1, [0,1,2] );
		},

    });
});
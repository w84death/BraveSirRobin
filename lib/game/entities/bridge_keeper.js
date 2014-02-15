ig.module(
	'game.entities.bridge_keeper'
)
.requires(
    'game.entities.npc'
)
.defines(function(){

	EntityBridgeKeeper = EntityNPC.extend({

		animSheet: new ig.AnimationSheet( 'media/bridge_keeper.png', 12, 12 ),
		size: {x: 5, y:3},
		offset: {x: 5, y: 8},
		flip: false,
		attackRange: 20,
		attackDamage: 0,
		attackSpeed: 1,
		stuntTime: 0.5,
		movement: 15,
		health: 8,
		idleTime: 50,
        moveTime: 5, 
		score: 75,
		attackExplosion: true,

		init: function( x, y, settings ) {
			this.parent( x, y, settings );
			this.addAnim( 'idle', 0.1, [7] );
			this.addAnim( 'attack', 0.5, [4,5,6] );
			this.addAnim( 'move', 0.1, [0,1,2,3] );
		},
        
    });
});
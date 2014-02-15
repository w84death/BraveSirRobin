ig.module(
	'game.entities.spider'
)
.requires(
    'game.entities.npc'
)
.defines(function(){

	EntitySpider = EntityNPC.extend({

		animSheet: new ig.AnimationSheet( 'media/spider.png', 16, 16 ),
		size: {x: 13, y:4},
		offset: {x: 2, y: 12},
		flip: false,
		attackRange: 10,
		attackDamage: 1,
		attackSpeed: 1,
		followRange: 25,
		stuntTime: 0.8,
		health: 4,
		movement: 30,
		idleTime: 40,
        moveTime: 45,
		score: 100,
		poison: 3,

		init: function( x, y, settings ) {
			this.parent( x, y, settings );
			this.addAnim( 'idle', 0.5, [8,8,9] );
			this.addAnim( 'attack', 0.1, [5,6,7] );
			this.addAnim( 'move', 0.1, [1,2,3,4] );
		},

		update: function(){
			this.parent();

			// leave web
			/*if((Math.random()*1000)<<0 > 990){
				ig.game.spawnEntity( EntityWeb, this.pos.x, this.pos.y );
			}*/

		}

    });
});
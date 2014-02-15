ig.module(
	'game.entities.ni'
)
.requires(
    'game.entities.npc'
)
.defines(function(){

	EntityNi = EntityNPC.extend({

		animSheet: new ig.AnimationSheet( 'media/ni.png', 10, 22 ),
		size: {x: 6, y:3},
		offset: {x: 2, y: 19},
		flip: false,
		health: 10,
		idleTime: 10,
        moveTime: 25, 
		attackDamage: 5,
		attackSpeed: 1.5,
		attackRange: 12,
		stuntTime: 1,
		score: 100,
		movement: 15,
		niCloud: true,

		init: function( x, y, settings ) {
			this.parent( x, y, settings );
			this.addAnim( 'idle', 0.1, [7] );
			this.addAnim( 'attack', 0.5, [4,5,6,5,4] );
			this.addAnim( 'move', 0.2, [0,1,2,3] );
		},

		reset: function( x, y, settings ) {
        	this.parent( x, y, settings );
        },

		update: function(){
			
			this.parent();

			if(!this.flip){
				this.offset.x = 2;
			}else{
				this.offset.x = 2;
			}
		},
        
    });
});
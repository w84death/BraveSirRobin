ig.module(
	'game.entities.black_knight'
)
.requires(
    'game.entities.npc'
)
.defines(function(){

	EntityBlackKnight = EntityNPC.extend({

		animSheet: new ig.AnimationSheet( 'media/black_knight.png', 12, 12 ),
		size: {x: 5, y:3},
		offset: {x: 5, y: 8},
		flip: false,
		attackRange: 12,
		health: 6,
		idleTime: 30,
        moveTime: 45, 
		score: 30,

		init: function( x, y, settings ) {
			this.parent( x, y, settings );
			this.addAnim( 'idle', 0.1, [7] );
			this.addAnim( 'attack', 0.1, [4,5,6] );
			this.addAnim( 'move', 0.1, [0,1,2,3] );
			this.addAnim( 'noarms_idle', 0.2, [15] );
			this.addAnim( 'noarms_move', 0.2, [8,9,10,11] );
			this.addAnim( 'nolegs_idle', 0.2, [23] );
			this.addAnim( 'nolegs_move', 0.2, [16,17,18,19] );

			this.attackDamage = 3;
			this.attackSpeed = 0.8;
			this.movement = 20;
			this.pre = '';
		},

		reset: function( x, y, settings ) {
        	this.parent( x, y, settings );

        	this.attackDamage = 3;
			this.attackSpeed = 0.8;
			this.movement = 20;
			this.pre = '';
        },

		update: function(){

			this.parent();

			if(this.health < 4){
				this.attackDamage = 1;
				this.pre = 'noarms';			
			}
			if(this.health < 2){
				this.attackDamage = 0;
				this.movement = 10;				
				this.pre = 'nolegs';
			}

			if(this.pre !== ''){
				if(this.vel.x !== 0 || this.vel.y !== 0){
					this.currentAnim = this.anims[this.pre + '_move'];
				}else
				if(this.attack){
					this.currentAnim = this.anims[this.pre + '_idle'];
				}else{
					this.currentAnim = this.anims[this.pre + '_idle'];
				}
			}
		},
        
    });
});
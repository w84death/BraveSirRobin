ig.module(
	'game.entities.wall'
)
.requires(
    'impact.entity',
    'impact.entity-pool'
)
.defines(function(){

	EntityWall = ig.Entity.extend({

        type: ig.Entity.TYPE.B,
        checkAgainst: ig.Entity.TYPE.A,
        collides: ig.Entity.COLLIDES.FIXED,        
        animSheet: new ig.AnimationSheet( 'media/wall.png', 16, 16 ),
        size: {x:16,y:12},
        offset: {x:0,y:4},
        health: 10,
        killScore:5,
        name: 'wall',

        init: function( x, y, settings ) {
            this.parent( x, y, settings );
            this.zIndex = this.pos.y;

            this.addAnim( 'idle', 1, [0] );
            this.zIndex = this.pos.y;
        },

        reset: function( x, y, settings ) {
            this.parent( x, y, settings );
            this.zIndex = this.pos.y;
        },

        kill: function(){
            ig.game.score -= this.killScore;
            this.parent();
        },

        receiveDamage: function(){
            //    this.sHurt.play()
            dmg = 1;
            ig.game.spawnEntity( EntityHit, this.pos.x-2, this.pos.y-4 );
            ig.game.spawnEntity( EntityMsg, this.pos.x+2, this.pos.y-6, {msg:this.health + ' left', red:true} );
            this.parent(dmg);
        },

    });

    ig.EntityPool.enableFor( EntityWall );
});
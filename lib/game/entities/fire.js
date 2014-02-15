ig.module(
	'game.entities.fire'
)
.requires(
    'impact.entity'
)
.defines(function(){

	EntityFire = ig.Entity.extend({

        type: ig.Entity.TYPE.B,
        checkAgainst: ig.Entity.TYPE.BOTH,
        collides: ig.Entity.COLLIDES.NONE,
        animSheet: new ig.AnimationSheet( 'media/fire.png', 12, 28 ),
        size: {x:11,y:5},
        offset: {x:0,y:23},

        init: function( x, y, settings ) {
            this.parent( x, y, settings );
            this.zIndex = this.pos.y;

            this.addAnim( 'idle', 0.2, [0,1,2,3,4,5] );
            this.currentAnim.gotoRandomFrame();
            this.zIndex = this.pos.y;
        },

        check: function(other){

            other.receiveDamage(1,false,{x:this.pos.x, y:this.pos.y},50);
            this.parent();
        },

    });
});
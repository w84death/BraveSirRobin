ig.module(
	'game.entities.chest'
)
.requires(
    'impact.entity'
)
.defines(function(){

	EntityChest = ig.Entity.extend({

        type: ig.Entity.TYPE.B,
        checkAgainst: ig.Entity.TYPE.A,
        collides: ig.Entity.COLLIDES.FIXED,        
        animSheet: new ig.AnimationSheet( 'media/chest.png', 14, 10 ),
        size: {x:14,y:3},
        offset: {x:1,y:7},
        name: 'chest',

		init: function( x, y, settings ) {
			this.parent( x, y, settings );
			this.zIndex = this.pos.y;

			this.addAnim( 'closed', 1, [0] );
            this.addAnim( 'open', 1, [1] );
            this.currentAnim = this.anims['closed'];
		},       					

        update: function() {
            this.parent();
            var robin = ig.game.getEntityByName('robin');
            if(robin){
                if( this.distanceTo(robin) < 10){
                    this.currentAnim = this.anims['open'];

                    // BUY?
                    if(ig.input.pressed('action')){
                        if(robin.gold > 0){
                            ig.game.spawnEntity( EntityPotion, this.pos.x+(24- ((Math.random()*48)<<0)), this.pos.y+(24 - ((Math.random()*48)<<0)) );
                            robin.gold--;
                            ig.game.spawnEntity( EntityMsg, this.pos.x+4, this.pos.y-12, {msg:'+POTION', blue:true} );
                        }else{
                            ig.game.spawnEntity( EntityMsg, this.pos.x+4, this.pos.y-12, {msg:'NO GOLD', blue:true} );
                        }
                    }

                }else{
                    this.currentAnim = this.anims['closed'];
                }
            }



        }

    });

});
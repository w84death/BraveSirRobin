ig.module(
	'game.entities.bush'
)
.requires(
    'impact.entity'
)
.defines(function(){

	EntityBush = ig.Entity.extend({

        animSheet: new ig.AnimationSheet( 'media/maps/green_extras.png', 16, 16 ),
        size: {x:16,y:16},
        position: 'top',

		init: function( x, y, settings ) {
			this.parent( x, y, settings );

			this.addAnim( 'top', 1, [0,1,2] );
            this.addAnim( 'bottom', 1, [3,4,5] );
            this.addAnim( 'left', 1, [6,7,8] );
            this.addAnim( 'right', 1, [9,10,11] );

            this.position = settings.position;
            this.currentAnim = this.anims[this.position];
            this.currentAnim.gotoRandomFrame();
		},

        update: function(){

        }


    });

});
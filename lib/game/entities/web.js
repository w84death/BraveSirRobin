
ig.module(
    'game.entities.web'
)
.requires(
    'game.entities.particle'
)
.defines(function(){

    EntityWeb = EntityParticle.extend({

        animSheet: new ig.AnimationSheet( 'media/web.png', 17, 14 ),
        size: { x:17, y:14 },
        offset: { x:0, y:0 },
        lifetime:10,
        fadetime: 8,
        //zIndex: 10,

        init: function( x, y, settings ) {
            this.parent( x, y, settings );
            this.addAnim( 'idle', 1, [0] );
        },

        reset: function( x, y, settings ) {
            this.parent( x, y, settings );
            this.timer.set(0);
        },

    });

});
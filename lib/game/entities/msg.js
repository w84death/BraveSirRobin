
ig.module(
	'game.entities.msg'
)
.requires(
    'game.entities.particle'
)
.defines(function(){

	EntityMsg = EntityParticle.extend({

		fontRed: new ig.Font( 'media/font/red.png' ),
		fontBlue: new ig.Font( 'media/font/blue.png' ),
		fontGreen: new ig.Font( 'media/font/green.png' ),
		lifetime:1.5,
		fadetime: 1,
		zIndex: 9999,


		init: function( x, y, settings ) {
			this.parent( x, y, settings );
			this.pos.x -= ig.game.screen.x;
			this.pos.y -= ig.game.screen.y;
			this.blue = settings.blue;
			this.green = settings.green;
			this.message = settings.msg;
		},

		reset: function( x, y, settings ) {
        	this.parent( x, y, settings );
        	this.timer.set(0);
        	this.pos.x -= ig.game.screen.x;
			this.pos.y -= ig.game.screen.y;
        	this.blue = settings.blue;
        	this.green = settings.green;
        	this.message = settings.msg;
        },

        update: function() {
			this.parent();
			this.pos.y -= 0.25;
			if(this.blue){
				this.fontBlue.alpha = this.alpha;
			}else
			if(this.green){
				this.fontGreen.alpha = this.alpha;
			}else{
				this.fontRed.alpha = this.alpha;
			}
		},

		draw: function() {
			this.parent();
			if(this.blue){
				this.fontBlue.draw(this.message, this.pos.x, this.pos.y,ig.Font.ALIGN.CENTER);
			}else
			if(this.green){
				this.fontGreen.draw(this.message, this.pos.x, this.pos.y,ig.Font.ALIGN.CENTER);
			}else{
				this.fontRed.draw(this.message, this.pos.x, this.pos.y,ig.Font.ALIGN.CENTER);
			}
		}

    });

});
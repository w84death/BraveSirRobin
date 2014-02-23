ig.module(
	'game.entities.gate'
)
.requires(
    'impact.entity'
)
.defines(function(){

	EntityGate = ig.Entity.extend({

        //animSheet: new ig.AnimationSheet( 'media/maps/gate_orange.png', 16, 16 ),
        size: {x:16,y:16},
        position: 'top',
        spriteType: 'top',
        state: 'closed',
        bats: 0,
        blackKnight: 0,
        spawnEnemies: 1,
        toSpawn: 0,
        spawnIndex:0,
        spawnPointRate: 1,
        spawnPoint: {},


		init: function( x, y, settings ) {
			this.parent( x, y, settings );

			this.addAnim( 'top_closed', 1, [1] );
            this.addAnim( 'top_opening', 0.5, [1,2,3,4,5] );
            this.addAnim( 'top_open', 1, [0] );
            this.addAnim( 'top_closing', 0.5, [5,4,3,2,1] );

            this.addAnim( 'side_closed', 1, [7] );
            this.addAnim( 'side_opening', 0.5, [7,8,9,10,11] );
            this.addAnim( 'side_open', 1, [6] );
            this.addAnim( 'side_closing', 0.5, [11,10,9,8,7] );

            this.timer = new ig.Timer();

            this.position = settings.position;
            if(this.position == 'bottom') this.spriteType = 'top';
            if(this.position == 'left' || this.position == 'right') this.spriteType = 'side';

            this.currentAnim = this.anims[this.spriteType + '_' + this.state];

            if(this.position == 'top'){
                this.spawnPoint = {x:this.pos.x+8,y:this.pos.y + 36};
                this.center = {x:this.pos.x+8, y:this.pos.y + 12};
            }
            if(this.position == 'bottom'){
                this.spawnPoint = {x:this.pos.x+8,y:this.pos.y - 20};
                this.center = {x:this.pos.x+8, y:this.pos.y + 4};
            }
            if(this.position == 'right'){
                this.spawnPoint = {x:this.pos.x - 20 ,y:this.pos.y+8};
                this.center = {x:this.pos.x+4, y:this.pos.y + 8};
            }
            if(this.position == 'left'){
                this.spawnPoint = {x:this.pos.x + 36,y:this.pos.y+8};
                this.center = {x:this.pos.x+12, y:this.pos.y + 8};
            }

            this.flipSprites();
		},

        flipSprites: function(){
            if(this.position == 'bottom'){
                this.currentAnim.flip.y = true;
            }
            if(this.position == 'right'){
                this.currentAnim.flip.x = true;
            }
        },

        open: function(){
            if(this.state == 'closed'){
                this.toSpawn = ig.game.quest.levels[ig.game.quest.currentLevel].waves[ig.game.wave].entities.length;
                this.state = 'opening';
                this.currentAnim = this.anims[this.spriteType + '_' + this.state];
                this.currentAnim.rewind();
            }
        },

        close: function(){
            if(this.state == 'open'){
                this.state = 'closing';
                this.currentAnim = this.anims[this.spriteType + '_' + this.state];
                this.currentAnim.rewind();
            }
        },

        spawnEnemy: function(){
            if(this.spawnIndex < this.toSpawn){
                ig.game.spawnEntity( ig.game.quest.levels[ig.game.quest.currentLevel].waves[ig.game.wave].entities[this.spawnIndex++], this.center.x, this.center.y, {destiny: {x:this.spawnPoint.x,y:this.spawnPoint.y}} );
            }else{
                this.toSpawn = 0;
                this.spawnIndex = 0;
            }
        },

        update: function() {
            this.parent();

            if(ig.game.wave < ig.game.quest.levels[ig.game.quest.currentLevel].waves.length){
                if(this.state == 'opening' && this.currentAnim.loopCount > 0){
                    this.state = 'open';
                }
                if(this.state == 'closing' && this.currentAnim.loopCount > 0){
                    this.state = 'closed';
                }

                this.currentAnim = this.anims[this.spriteType + '_' + this.state];

                this.flipSprites();

                if(this.state == 'open'){
                    if(this.toSpawn > 0){
                        if(this.timer.delta() > 0){
                            this.spawnEnemy();
                            this.timer.set(this.spawnPointRate);
                        }
                    }else{
                        this.close();
                    }
                }
            }
        }

    });

});
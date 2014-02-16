ig.module(
    'game.entities.gold'
)
.requires(
    'game.entities.collectable'
)
.defines(function(){

    EntityGold = EntityCollectable.extend({

        animSheet: new ig.AnimationSheet( 'media/gold.png', 4, 8 ),
        size: {x:4,y:3},
        offset: {x:0,y:5},
        gold: 1,
        goldTime: 7,
        timer: new ig.Timer(),
        collectRange: 20,
        movement: 30,

        // SOUND
        //sGoldPickup: new ig.Sound( 'media/sounds/gold.mp3', false ),
        //sGoldDrop: new ig.Sound( 'media/sounds/gold.mp3', false ),

        init: function( x, y, settings ) {
            this.parent( x, y, settings );
            this.addAnim( 'idle', 0.1, [3,4,5] );
            this.addAnim( 'drop', 0.1, [0,1,2] );
            this.currentAnim = this.anims['drop'];
            this.currentAnim.rewind();
            this.gold = settings.gold;
            this.drop = true;
            this.timer.set(this.goldTime);

        },

        reset: function( x, y, settings ) {
            this.parent( x, y, settings );
            this.currentAnim.rewind();
            this.gold = settings.gold;
            this.drop = true;
            this.timer.set(this.goldTime);
        },

        check: function(other){
            if(other instanceof EntityPlayer){
                //this.sGoldPickup.play();
                other.gold += this.gold;
                ig.game.spawnEntity( EntityMsg, other.pos.x, other.pos.y-6, {msg:'+'+this.gold, blue:true} );
                this.kill();
            }
            this.parent();
        },

        update: function(){
            this.parent();
            if(this.drop && this.currentAnim.loopCount>0){
                //this.sGoldDrop.play();
                this.drop = false;
                this.currentAnim = this.anims['idle'];
            }

            if(this.timer.delta() > 0){
                this.kill();
            }


            var hero = ig.game.getEntityByName('robin');
            if(hero){
                if(hero.distanceTo(this) < this.collectRange){
                   if(this.pos.x > hero.pos.x + 4 || this.pos.x < hero.pos.x - 4){
                        if(this.pos.x > hero.pos.x){
                            this.vel.x = -this.movement;
                            this.flip = false;
                        }
                        if(this.pos.x <= hero.pos.x){
                            this.vel.x = this.movement;
                            this.flip = true;
                        }
                    }
                    if(this.pos.y > hero.pos.y + 4 || this.pos.y < hero.pos.y - 4){
                        if(this.pos.y > hero.pos.y){
                            this.vel.y = -this.movement;
                        }
                        if(this.pos.y <= hero.pos.y){
                            this.vel.y = this.movement;
                        }
                    }
                }else{
                    if(this.vel.x > 0) this.vel.x -= 1;
                    if(this.vel.x < 0) this.vel.x += 1;
                    if(this.vel.y > 0) this.vel.y -= 1;
                    if(this.vel.y < 0) this.vel.y += 1;
                }
            }

        },

        draw: function(){
            if(this.timer.delta() > -1){
                if(this.timer.delta().toFixed(1) % 0.1 == 0){
                    return;
                }
            }
            this.parent();
        }

    });

});
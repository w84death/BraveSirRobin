ig.module(
	'game.entities.npc'
)
.requires(
    'impact.entity',
    'impact.entity-pool'
)
.defines(function(){

	EntityNPC = ig.Entity.extend({

        // PHYCICS
        type: ig.Entity.TYPE.B,
    	checkAgainst: ig.Entity.TYPE.BOTH,
		friction: {x:100,y:100},

		sHurt: new ig.Sound( 'media/sounds/attack.mp3', false ),

		flip: false,
        movement: 50,
        attackDamage: 1,
        pushStrenght: 12,
        attackSpeed: 0.2,
        attackRange: 24,
        defenceFactor: 2,
        followRange: 20,
        stuntTime: 0.5,
        attackExplosion: false,
        score: 10,
        idleTime: 100,
        moveTime: 50,
        simpleAI: {
        	idle:0,
			up:0,
			down:0,
			left:0,
			right:0
		},
		destiny: {},
		swarmAttack: false,
		inteligence: 7,
		poison: false,

		init: function( x, y, settings ) {
			this.parent( x, y, settings );
			this.timer = new ig.Timer();
			this.destiny = settings.destiny;
			this.collides = ig.Entity.COLLIDES.NEVER;
			if(settings.destiny){
				this.goToDestiny = true;
			}else{
				this.goToDestiny = false;
			}
		},

		reset: function( x, y, settings ) {
        	this.parent( x, y, settings );
        	this.timer.set(0);
        	this.destiny = settings.destiny;
        	if(settings.destiny){
				this.goToDestiny = true;
			}else{
				this.goToDestiny = false;
			}
			this.collides = ig.Entity.COLLIDES.NEVER;
        },

        kill: function(){
        	if(ig.game.getEntityByName('robin')){
        		ig.game.score += this.score;
        	}
        	ig.game.spawnEntity( EntityGold, this.pos.x - 16 + ( (Math.random()*32)<<0 ), this.pos.y - 16 + ( (Math.random()*32)<<0 ), {gold:1} );
        	this.parent();
        },

		check: function(other){
			if(other instanceof EntityPlayer){
				if( this.timer.delta() > 0 ){
					other.receiveDamage(this.attackDamage);
					ig.game.spawnEntity( EntityHit, other.pos.x-2, other.pos.y-4 );
					this.timer.set(this.attackSpeed);
				}
			}
			this.parent();
		},

		updateZindex: function(){
			if( this.vel.y !== 0 ) {
			    this.zIndex = this.pos.y;
            	ig.game.sortEntitiesDeferred();
			}
		},

		think: function(){
        	var random = (Math.random()*200)<<0;

        	if( this.simpleAI.up + this.simpleAI.right + this.simpleAI.down + this.simpleAI.left + this.simpleAI.idle < 1){
	        	if( random < 25 ){
	        		this.simpleAI.up += (Math.random()*this.moveTime)<<0;
	        	}else
	        	if( random < 50 ){
					this.simpleAI.right += (Math.random()*this.moveTime)<<0;
	        	}else
	        	if( random < 75 ){
	        		this.simpleAI.down += (Math.random()*this.moveTime)<<0;
	        	}else
	        	if( random < 100 ){
	        		this.simpleAI.left += (Math.random()*this.moveTime)<<0;
	        	}else{
	        		this.simpleAI.idle += (Math.random()*this.idleTime)<<0;
	        	}
        	}

        },

        pushOut: function(pos,pushStrength){
        	if(pos){
	        	if( this.pos.x < pos.x){
	        		this.vel.x = -pushStrength;
	        	}
	        	if( this.pos.x >= pos.x){
	        		this.vel.x = pushStrength;
	        	}
	        	if( this.pos.y < pos.y){
	        		this.vel.y = -pushStrength;
	        	}
	        	if( this.pos.y >= pos.y){
	        		this.vel.y = pushStrength;
	        	}
	        }
        },

        receiveDamage: function(dmg,critical,pos,pushStrength){
        	if(critical){
        		dmg *= 2;
				ig.game.spawnEntity( EntityMsg, this.pos.x, this.pos.y-6, {msg:dmg+'!'} );
				this.pushOut(pos,pushStrength);
				this.parent(dmg);
        	}else{
				if( Math.random()*10 > this.defenceFactor){
					this.sHurt.play();
					ig.game.spawnEntity( EntityHit, this.pos.x-2, this.pos.y-4 );
					ig.game.spawnEntity( EntityMsg, this.pos.x, this.pos.y-6, {msg:dmg} );
					this.pushOut(pos,pushStrength);
					this.parent(dmg);
				}else{
					ig.game.spawnEntity( EntityMsg, this.pos.x, this.pos.y-6, {msg:'miss'} );
				}
			}
		},

		update: function() {
			this.parent();
			this.updateZindex();

			if(ig.game.pause) return;

			var hero = ig.game.getEntityByName('robin'),
				grails = ig.game.getEntitiesByType(EntityGrail),
				target = null,
				distance = {
					id:0,
					dist:999
				};


				if(grails.length > 0){
					for (var i = 0; i < grails.length; i++) {
						if(this.distanceTo(grails[i]) < distance.dist) {
							distance.id = i;
							distance.dist = this.distanceTo(grails[i]);
						}
					};
					target = grails[distance.id];
				}

				if(hero){
					if(hero.distanceTo(this) < this.followRange || this.swarmAttack){
						target = hero;
					}
				}


			if(this.goToDestiny){

				if(this.pos.x < this.destiny.x){
					this.pos.x++;
				}else
				if(this.pos.x > this.destiny.x){
					this.pos.x--;
				}else
				if(this.pos.y < this.destiny.y){
					this.pos.y++;
				}else
				if(this.pos.y > this.destiny.y){
					this.pos.y--;
				}


				if( (this.pos.x << 0) == this.destiny.x && (this.pos.y << 0) == this.destiny.y ){
					this.goToDestiny = false;
					this.collides = ig.Entity.COLLIDES.LITE;
				}

			}else{
				this.think();

				if( this.simpleAI.up > 0 ) this.simpleAI.up -= 1;
	        	if( this.simpleAI.right > 0 ) this.simpleAI.right -= 1;
	        	if( this.simpleAI.down > 0 ) this.simpleAI.down -= 1;
	        	if( this.simpleAI.left > 0 ) this.simpleAI.left -= 1;
	        	if( this.simpleAI.idle > 0 ) this.simpleAI.idle -= 1;

	        	if(!this.attack ){
	        		if(target){
	        			if( (Math.random()*10)<<0 > this.inteligence ){
	        				// FOLLW PLAYER
	        				if(this.pos.x > target.pos.x + 4 || this.pos.x < target.pos.x - 4){
		        				if(this.pos.x > target.pos.x){
		        					this.vel.x = -this.movement;
					                this.flip = false;
		        				}
		        				if(this.pos.x < target.pos.x){
		        					this.vel.x = this.movement;
					                this.flip = true;
		        				}
		        			}
		        			if(this.pos.y > target.pos.y + 4 || this.pos.y < target.pos.y - 4){
		        				if(this.pos.y > target.pos.y){
		        					this.vel.y = -this.movement;
		        				}
		        				if(this.pos.y < target.pos.y){
		        					this.vel.y = this.movement;
		        				}
		        			}

	        			}else{
	        				// MOVE FREELYY
							if( this.simpleAI.left > 0 ) {
				                this.vel.x = -this.movement;
				                this.flip = false;
							}
							if( this.simpleAI.right > 0  ) {
				                this.vel.x = this.movement;
				                this.flip = true;
							}
							if( this.simpleAI.up > 0 ) {
				                this.vel.y = -this.movement;
							}
							if( this.simpleAI.down > 0  ) {
				                this.vel.y = this.movement;
							}
						}

						if(this.vel.x > 0) this.vel.x -= 1;
						if(this.vel.x < 0) this.vel.x += 1;
						if(this.vel.y > 0) this.vel.y -= 1;
						if(this.vel.y < 0) this.vel.y += 1;
					}
				}else{
					if(this.vel.x > 0) this.vel.x -= 1;
					if(this.vel.x < 0) this.vel.x += 1;
					if(this.vel.y > 0) this.vel.y -= 1;
					if(this.vel.y < 0) this.vel.y += 1;
				}

				// ATTACK
				if(target){
					if( target.distanceTo(this) < this.attackRange ){
						this.attack = true;
						this.currentAnim = this.anims['attack'];
						if( this.timer.delta() > 0 ){
							this.timer.set(this.attackSpeed);
						}else
						if( this.timer.delta().toFixed(1) > -0.01 ){
							this.currentAnim.rewind();

							target.receiveDamage(this.attackDamage, this.poison, {x:this.pos.x, y:this.pos.y}, this.pushStrenght);

							if(this.attackExplosion){
									ig.game.spawnEntity( EntityExplosion, target.pos.x+(16 - ((Math.random()*32)<<0)), target.pos.y+(16 - ((Math.random()*32)<<0)) );
							}
							this.timer.set(this.attackSpeed);
							if(this.niCloud) ig.game.spawnEntity( EntityNiCloud, this.pos.x-2, this.pos.y - 28 );
						}
					}
				}
			}

			if(this.vel.x !== 0 || this.vel.y !== 0){
				this.currentAnim = this.anims['move'];
			}else
			if(this.attack){
				if(this.currentAnim.loopCount > 0){
					this.attack = false;
				}else{
					this.currentAnim = this.anims['attack'];
				}
			}else{
				this.currentAnim = this.anims['idle'];
			}

			this.currentAnim.flip.x = this.flip;

			if(!this.flip){
				this.offset.x = 5;
			}else{
				this.offset.x = 2;
			}

		},

    });

	ig.EntityPool.enableFor( EntityNPC );

});
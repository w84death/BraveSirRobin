ig.module(
	'game.entities.player'
)
.requires(
    'impact.entity'
)
.defines(function(){

	EntityPlayer = ig.Entity.extend({

		// GFX
		animSheet: new ig.AnimationSheet( 'media/hero.png', 12, 12 ),
		size: {x: 5, y:3},
		offset: {x: 5, y: 8},
		flip: false,

		// PHYSICS
        type: ig.Entity.TYPE.A,
        checkAgainst: ig.Entity.TYPE.B,
        collides: ig.Entity.COLLIDES.ACTIVE,
        friction: {x:100,y:100},
        speed: 50,

        // SOUND
        sHurt: new ig.Sound( 'media/sounds/hurt.mp3', false ),
        sLevelUp: new ig.Sound( 'media/sounds/level_up.mp3', false ),
        sLose: new ig.Sound( 'media/sounds/lose.mp3', false ),

        // SETTINGS
        name: 'robin',
        gold: 0,
        health: 3,
        maxHealth: 3,

        pushStrength: 80,
        pushArea: 16,

        poisonTimer: new ig.Timer(),
        timer: new ig.Timer(),
        defenceTimer: new ig.Timer(),


		init: function( x, y, settings ) {
			this.parent( x, y, settings );

			this.addAnim( 'idle', 0.1, [7] );
			this.addAnim( 'block', 1, [8] );
			this.addAnim( 'attack', 0.1, [4,5,6] );
			this.addAnim( 'move', 0.1, [0,1,2,3] );

			this.maxHealth = ig.game.stats.health;
			this.health = this.maxHealth;
		},

		reset: function( x, y, settings ) {
        	this.parent( x, y, settings );
        	this.maxHealth = ig.game.stats.health;
			this.health = this.maxHealth;
        },

		updateZindex: function(){
			if( this.vel.y !== 0 ) {
			    this.zIndex = this.pos.y;
            	ig.game.sortEntitiesDeferred();
			}
		},

		kill: function(){
			this.sLose.play();
			ig.game.respawnTimer.set(ig.game.respawnTime);
			this.parent();
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

		receiveDamage: function(dmg, poison,pos,pushStrength){
			if( Math.random()*10 > ig.game.defence.missFactor || ( ig.game.defence.timer.delta() < 0 && this.pos.x !== 0 && this.pos.y !== 0) ){

				this.pushOut(pos,pushStrength);
				if(poison){
					this.poisonTimer.set(poison);
				}
				this.sHurt.play();
				ig.game.spawnEntity( EntityHit, this.pos.x-2, this.pos.y-4 );
				if(!poison){
					ig.game.spawnEntity( EntityMsg, this.pos.x, this.pos.y-6, {msg:dmg} );
					this.parent(dmg);
				}
			}else{
				ig.game.spawnEntity( EntityMsg, this.pos.x, this.pos.y-6, {msg:'miss'} );
			}
		},

		update: function() {
			this.parent();
			this.updateZindex();

			if(!ig.input.state('defence')){
				if( ig.input.state('left') ) {
	                this.vel.x = -this.speed;
	                this.flip = false;
				}else
				if( ig.input.state('right')) {
	                this.vel.x = this.speed;
	                this.flip = true;
				}
				if( ig.input.state('up') ) {
	                this.vel.y = -this.speed;
				}else
				if( ig.input.state('down')) {
	                this.vel.y = this.speed;
				}
			}

			if(this.vel.x > 0) this.vel.x -= 1;
			if(this.vel.x < 0) this.vel.x += 1;
			if(this.vel.y > 0) this.vel.y -= 1;
			if(this.vel.y < 0) this.vel.y += 1;


			// ATTACK

			if(ig.input.pressed('attack')){
				this.vel.x = 0;
				this.vel.y = 0;
				this.currentAnim = this.anims['attack'];
				if(this.currentAnim.loopCount>0){
					this.currentAnim.rewind();
				}
				for ( var i = 0; i < ig.game.entities.length; i++ ) {
					if( ig.game.entities[i] instanceof EntityNPC ){
						if( ig.game.entities[i].distanceTo(this) < this.attackRange ){
							var p = 100 - ig.game.swords[ig.game.activeSword].chargePercentage;

							if( p > 20 ){

								var critical = false;
								if(p > 80){
									if((Math.random()*100)<<0 <= ( 10 + (2*ig.game.stats.attack) ) ){
										critical = true;
									}
								}

								var damage = (Math.random()*ig.game.swords[ig.game.activeSword].attack.max + ig.game.stats.attack)<<0;
								damage = damage < ig.game.swords[ig.game.activeSword].attack.min ? ig.game.swords[ig.game.activeSword].attack.min : damage;

								if(p < 100){
									damage *= p*0.01;
									damage = damage <<0;
								}

								ig.game.entities[i].receiveDamage(damage,critical,{x:this.pos.x, y:this.pos.y},this.pushStrength);

								if(ig.game.swords[ig.game.activeSword].fire){
									ig.game.spawnEntity( EntityExplosion, ig.game.entities[i].pos.x+(16 - ((Math.random()*32)<<0)), ig.game.entities[i].pos.y+(16 - ((Math.random()*32)<<0)) );
								}
							}
							ig.game.swords[ig.game.activeSword].timer.set(ig.game.swords[ig.game.activeSword].charge);
							return;
						}
					}
				}
				ig.game.swords[ig.game.activeSword].timer.set(ig.game.swords[ig.game.activeSword].charge);
			}


			// PUSH/BLOCK

			if(ig.input.pressed('defence') && ig.game.defence.timer.delta() > 0){
				ig.game.spawnEntity( EntityBlock, this.pos.x-12,this.pos.y-5 );
				ig.game.defence.timer.set((ig.game.defence.charge + (ig.game.stats.defence*0.5)).toFixed(1));
				ig.game.defence.protectionTimer.set((ig.game.stats.defence*0.5).toFixed(1) );
				for ( var i = 0; i < ig.game.entities.length; i++ ) {
					if( ig.game.entities[i] instanceof EntityNPC ){
						if( ig.game.entities[i].distanceTo(this) < this.pushArea + ig.game.stats.defence){
							ig.game.entities[i].pushOut(this.pos,this.pushStrength);
						}
					}
				}

			}

			// POISON

			if(this.poisonTimer.delta()<0){
				if(this.timer.delta() > 0){
					this.health -= 1;
					if(this.health < 0) this.kill();
					this.sHurt.play();
					ig.game.spawnEntity( EntityMsg, this.pos.x, this.pos.y-6, {msg:1, green:true} );
					this.timer.set(1);
				}
			}

			// ANIMATIONS
			if(ig.game.swords[ig.game.activeSword].timer.delta() < 0){
				if(this.currentAnim.loopCount>0){
					if(this.vel.x !== 0 || this.vel.y !== 0){
						this.currentAnim = this.anims['move'];
					}else{
						this.currentAnim = this.anims['idle'];
					}
				}
			}else
			if(this.vel.x !== 0 || this.vel.y !== 0){
				this.currentAnim = this.anims['move'];
			}else{
				if(ig.game.defence.timer.delta() < 0){
					this.currentAnim = this.anims['block'];
				}else{
					this.currentAnim = this.anims['idle'];
				}
			}

			this.currentAnim.flip.x = this.flip;

			if(!this.flip){
				this.offset.x = 5;
			}else{
				this.offset.x = 2;
			}

		},

    });
});
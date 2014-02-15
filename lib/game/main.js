/*
----------------------------------------------------------------------------

    KRZYSZTOF JANKOWSKI
    GLOBAL GAME JAM

    abstract: Brave Sir Robin
    created: 25-01-2014
    license: do what you want and dont bother me

    webpage: http://p1x.in
    twitter: @w84death

----------------------------------------------------------------------------
*/
ig.module(
	'game.main'
)
.requires(
	//'impact.debug.debug',
	'impact.game',
	'impact.font',

	// PLUGINS
	'plugins.gamepad',

	// LEVELS
	'game.levels.menu',
	'game.levels.menuhd',
	'game.levels.intro',
	'game.levels.arena',
	'game.levels.forest',
	'game.levels.rocks',
	'game.levels.bricks',

	// PLAYER
	'game.entities.player',
	'game.entities.npc',
	'game.entities.bat',
	'game.entities.black_knight',
	'game.entities.bridge_keeper',
	'game.entities.ni',
	'game.entities.ni_cloud',
	'game.entities.rabbit',
	'game.entities.spider',
	'game.entities.spider_junior',


	// GATES
	'game.entities.gate',
	'game.entities.gate_forest',
	'game.entities.gate_rocks',
	'game.entities.gate_bricks',

	// ITEMS
	'game.entities.grail',
	'game.entities.chest',
	'game.entities.collectable',
	'game.entities.potion',
	'game.entities.gold',
	'game.entities.web',
	'game.entities.fire',

	// POWERUPS

	// PARTICLE
	'game.entities.particle',
	'game.entities.hit',
	'game.entities.msg',
	'game.entities.explosion',
	'game.entities.block'

)
.defines(function(){

MyGame = ig.Game.extend({

	// GFX
	clearColor: 	"#493c2b",
	fontWhite: 		new ig.Font( 'media/font/white.png' ),
	fontBlack: 		new ig.Font( 'media/font/black.png' ),
	debugSheet: 	new ig.Image( 'media/debug.png' ),

	logoSheet: 		new ig.Image( 'media/logo.png' ),
	logoBigSheet: 	new ig.Image( 'media/logo2.png' ),
	gameOverSheet: 	new ig.Image( 'media/game_over.png' ),

	bookSheet: 		new ig.Image( 'media/book.png' ),
	mapSheet: 		new ig.Image( 'media/map_of_the_quest.png' ),
	flagSheet: 		new ig.Image( 'media/flag.png' ),

	buttonSheet: 	new ig.Image( 'media/button.png' ),
	buttonSmallSheet: 	new ig.Image( 'media/button_small.png' ),
	handSheet: 		new ig.Image( 'media/hand.png' ),

	swordSheet: 	new ig.Image( 'media/swords.png' ),
	guiIconsSheet: 	new ig.Image( 'media/gui_icons.png' ),
	chestSheet: 	new ig.Image( 'media/big_chest.png' ),
	potionSheet: 	new ig.Image( 'media/big_potion.png' ),

	panelStats: 	new ig.Image( 'media/panel_stats.png' ),
	panelSwords: 	new ig.Image( 'media/panel_swords.png' ),
	panelShort: 	new ig.Image( 'media/panel_short.png' ),
	panelLong: 		new ig.Image( 'media/panel_long.png' ),

	// AUDIO
	sMenu: 			new ig.Sound( 'media/sounds/menu.*', false ),

	// SETTINGS
	debug: 						false,
	pause: 						true,
	gravity: 					0,
	STATE: 						'intro',
	timer: 						new ig.Timer(),
	respawnTimer: 				new ig.Timer(),
	waveTimer: 					new ig.Timer(),
	nextWave: 					15,
	spawnTime: 					4,
	respawnTime: 				3,
	wave: 						0,
	spawnPotions: 				3,
	maxStats: 					14,
	showErrorMessage: 			null,

	// CAMERA
	cameraFollow: 				true,
	sX: 						0,
    sY: 						0,
    k: 							0.98,

	/*
	EntityBat
	EntityBlackKnight
	EntityBridgeKeeper
	EntityNi
	EntityRabbit
	EntitySpider
	EntitySpiderJunior
	*/

	// QUEST
	quest: {
		levels:[{
			waves: [
				{entities:['EntityBat']},
				{entities:['EntityBat','EntityBat']},
				{entities:['EntityBat', 'EntityBat', 'EntitySpiderJunior']},
				{entities:['EntitySpiderJunior', 'EntitySpiderJunior', 'EntitySpiderJunior']},
				{entities:['EntitySpiderJunior', 'EntitySpiderJunior', 'EntitySpiderJunior', 'EntitySpider']},
				{entities:['EntityBlackKnight', 'EntityBlackKnight', 'EntitySpider', 'EntitySpider']}
			],
			title: 'Title of the first map',
			open:true
		},{
			waves: [
				{entities:['EntitySpiderJunior','EntitySpiderJunior','EntitySpider']},
				{entities:['EntityBridgeKeeper','EntitySpider']},
				{entities:['EntityBridgeKeeper', 'EntityBridgeKeeper', 'EntityNi']},
				{entities:['EntityNi', 'EntityNi', 'EntityRabbit']},
				{entities:['EntityRabbit', 'EntityRabbit', 'EntityRabbit', 'EntityRabbit']}
			],
			title: 'Title of the second map',
			open:true
		},{
			waves: [
				{entities:['EntityBat']},
				{entities:['EntityBat','EntityBat']},
				{entities:['EntityBat', 'EntityBat', 'EntitySpiderJunior']},
				{entities:['EntityBridgeKeeper', 'EntityBat', 'EntitySpiderJunior']},
				{entities:['EntityBridgeKeeper', 'EntityRabbit', 'EntitySpiderJunior', 'EntitySpider']},
				{entities:['EntityBlackKnight', 'EntityBlackKnight', 'EntitySpider', 'EntitySpider']}
			],
			title: 'Title of the third map',
			open:true
		},{
			waves: [
				{entities:['EntitySpiderJunior','EntitySpiderJunior']},
				{entities:['EntitySpiderJunior','EntitySpiderJunior','EntitySpiderJunior']},
				{entities:['EntityBat', 'EntityBat', 'EntitySpiderJunior']},
				{entities:['EntityBridgeKeeper', 'EntityBat', 'EntitySpiderJunior']},
				{entities:['EntityBridgeKeeper', 'EntityRabbit', 'EntitySpiderJunior', 'EntitySpider']},
				{entities:['EntityBlackKnight', 'EntityBlackKnight', 'EntitySpider', 'EntitySpider']}
			],
			title: 'Title of the fourth map',
			open:true
		},{
			waves: [],
			title: 'Title of the five map',
			open:false
		}],
		currentLevel: 0

	},

	// HERO STATS
	stats: {
		gold: 					50,
		potions: 				1,
		points: 				7,
		maxStats: 				12,
		health: 				1,
		maxHealth: 				1,
		attack: 				1,
		defence: 				1
	},

	swords: [
		{
			active: 			true,
			owned: 				true,
			price: 				0,
			name: 				'Air',
			attack:{
				min: 			1,
				max: 			2,
			},
			charge: 			0.5,
			chargePercentage:	100,
			timer: 				new ig.Timer()
		},
		{
			active: 			false,
			owned: 				false,
			price: 				50,
			name: 				'Water',
			attack:{
				min: 			3,
				max: 			3,
			},
			charge: 			0.8,
			chargePercentage: 	100,
			cold: 				true,
			timer: 				new ig.Timer()
		},
		{
			active: 			false,
			owned: 				false,
			price: 				100,
			name: 				'Fire',
			attack:{
				min: 			1,
				max: 			6,
			},
			charge: 			1.5,
			chargePercentage: 	100,
			fire: 				true,
			timer: 				new ig.Timer()
		},
		{
			active: 			false,
			owned: 				false,
			price: 				60,
			name: 				'Earth',
			attack:{
				min: 			2,
				max: 			4,
			},
			charge: 			1.2,
			chargePercentage: 	100,
			timer: 				new ig.Timer()
		}
	],
	activeSword: 0,

	potions: {
		price: 					20,
		quantity: 				1,
		health: 				1,
	},

	defence: {
		range: 20,
        charge:4,
        protection: 2,
        chargePercentage:100,
        missFactor: 2,
        timer: new ig.Timer()
	},

	// SCORES
	highScoreTable: '22266',
	minGameScoreToHighscore: 35,
	scoresFromGameJolt: 0,
	score: 0,
	gold: 0,
	lastScore: 0,
	NPCs: 0,

	// GUI
	GUI: {},

	// POINTER
	pointer: {
		state: 0,
		pos: {x:0, y:0},
		pos2: {x:10, y:10},
		currentRoad: {x:0,y:0},
		road: {
			quest:[[]],
			help:[[]],
			hero:[[],[],[],[]],
			shop:[[],[],[]],
			map:[[]]
		}
	},


	init: function() {

		// GUI

		this.GUI.centerTop = {x:ig.system.width*0.5,y:12};
		this.GUI.centerMiddle = {x:ig.system.width*0.5,y:50};
		this.GUI.centerBottom = {x:ig.system.width*0.5,y:ig.system.height - 12};

		this.GUI.stats = {x:ig.system.width*0.5,y:50};
		this.GUI.shop = {x:ig.system.width*0.5,y:24};
		this.GUI.map = {x:ig.system.width*0.5,y:66};



		// PPOINTER ROAD
		this.pointer.road.quest[0][0] = {x:this.GUI.centerMiddle.x+46,y:this.GUI.centerMiddle.y+98, action: 'next'};
		this.pointer.road.help[0][0] = {x:this.GUI.centerMiddle.x+46,y:this.GUI.centerMiddle.y+98, action: 'next'};

		this.pointer.road.hero[0][1] = {x:this.GUI.centerBottom.x+38,y:this.GUI.centerBottom.y-5, action: 'next'};
		this.pointer.road.hero[0][0] = {x:this.GUI.centerBottom.x-32,y:this.GUI.centerBottom.y-5, action: 'auto'};
		this.pointer.road.hero[1][0] = {x:this.GUI.stats.x+51,y:this.GUI.stats.y+14, action: 'add', value:'health'};
		this.pointer.road.hero[1][1] = {x:this.GUI.stats.x+41,y:this.GUI.stats.y+14, action: 'remove', value:'health'};
		this.pointer.road.hero[2][0] = {x:this.GUI.stats.x+51,y:this.GUI.stats.y+24, action: 'add', value:'attack'};
		this.pointer.road.hero[2][1] = {x:this.GUI.stats.x+41,y:this.GUI.stats.y+24, action: 'remove', value:'attack'};
		this.pointer.road.hero[3][0] = {x:this.GUI.stats.x+51,y:this.GUI.stats.y+34, action: 'add', value:'defence'};
		this.pointer.road.hero[3][1] = {x:this.GUI.stats.x+41,y:this.GUI.stats.y+34, action: 'remove', value:'defence'};


		this.pointer.road.shop[1][0] = {x:this.GUI.shop.x-77,y:this.GUI.shop.y+84, action: 'sword', value:0};
		this.pointer.road.shop[1][1] = {x:this.GUI.shop.x-16,y:this.GUI.shop.y+84, action: 'sword', value:1};
		this.pointer.road.shop[1][2] = {x:this.GUI.shop.x+45,y:this.GUI.shop.y+84, action: 'sword', value:2};
		this.pointer.road.shop[1][3] = {x:this.GUI.shop.x+106,y:this.GUI.shop.y+84, action: 'sword', value:3};
		this.pointer.road.shop[2][0] = {x:this.GUI.shop.x+20,y:this.GUI.shop.y+112, action: 'potion'};
		this.pointer.road.shop[0][0] = {x:this.GUI.centerBottom.x+82,y:this.GUI.centerBottom.y-6, action: 'next'};

		this.pointer.road.map[0][0] = {x:this.GUI.map.x-67,y:this.GUI.map.y+30, action: 'chooseLevel', value:0};
		this.pointer.road.map[0][1] = {x:this.GUI.map.x-11,y:this.GUI.map.y+26, action: 'chooseLevel', value:1};
		this.pointer.road.map[0][2] = {x:this.GUI.map.x+19,y:this.GUI.map.y+18, action: 'chooseLevel', value:2};
		this.pointer.road.map[0][3] = {x:this.GUI.map.x+39,y:this.GUI.map.y+33, action: 'chooseLevel', value:3};
		this.pointer.road.map[0][4] = {x:this.GUI.map.x+66,y:this.GUI.map.y+18, action: 'chooseLevel', value:4};

		// KEYS
		ig.input.bind( ig.KEY.LEFT_ARROW, 'left' );
		ig.input.bind( ig.KEY.RIGHT_ARROW, 'right' );
		ig.input.bind( ig.KEY.UP_ARROW, 'up' );
		ig.input.bind( ig.KEY.DOWN_ARROW, 'down' );
		ig.input.bind( ig.KEY.X, 'attack' );
		ig.input.bind( ig.KEY.S, 'defence' );

		ig.input.bind( ig.KEY.ENTER, 'action' );
		ig.input.bindTouch( '#canvas', 'action' );
		ig.input.bind( ig.KEY.M, 'quest' );

		ig.input.bind( ig.KEY.F, 'secretA' );
		ig.input.bind( ig.KEY.J, 'secretB' );

		// GAMEPAD
		Gamepad.mappings.one = [
	        [ 'dpadUp', 'up' ],
	        [ 'dpadDown', 'down' ],
	        [ 'dpadLeft', 'left' ],
	        [ 'dpadRight', 'right' ],
	        [ 'leftStickX', 'left', 'right' ],
	        [ 'leftStickY', 'up', 'down' ],
	        [ 'faceButton0', 'attack' ],
	        [ 'faceButton1', 'defence' ],
	        [ 'faceButton2', 'action' ],
	        [ 'faceButton3', 'action4' ]
	    ];

		// MUSIC LIST
		ig.music.add( 'media/music/menu.mp3' );
		ig.music.volume = 0.7;

        // LOAD MENU
		this.loadLevel( LevelMenuhd );
		this.screen.y = 5;
		this.loadHightScores();
		ig.music.play();
	},

	connectToGameJolt: function(params){
		var url,
			privateKey = '67153e1c20bcd89b7da31a320f00603e',
			gameID = '21623';
		if(params.type == 'add_score'){
			url = "http://gamejolt.com/api/game/v1/scores/add/?game_id="+gameID+"&score='"+ params.score +" points'&sort="+ params.score +"&guest="+ params.name + "&table_id="+params.highScoreTable;
		}
		if(params.type == 'get_scores'){
			url = "http://gamejolt.com/api/game/v1/scores/?game_id="+gameID+"&format=json&limit=99999&table_id="+params.highScoreTable;
		}

		var hashURL = CryptoJS.SHA1(url+privateKey);
		var xhr = new XMLHttpRequest();
		xhr.open('GET', url+'&signature='+hashURL);
		xhr.onreadystatechange = function (data) {
			if(xhr.readyState == 4){
				ig.game.scoresFromGameJolt = JSON.parse(xhr.response);
			}
		}
		xhr.send();
	},

	loadHightScores: function(){
		this.scoresFromGameJolt = false;
		this.connectToGameJolt({
			type: 'get_scores',
			highScoreTable: this.highScoreTable
		});
	},

	sendHighscore: function(){
		if(this.lastScore > this.minGameScoreToHighscore){
			this.connectToGameJolt({
				type: 'add_score',
				score: this.lastScore,
				highScoreTable: this.highScoreTable,
				name: 'Brave Sir Robin'
			});
		}
	},

	clearLevel: function(){
		for (var i = 0; i < this.entities.length; i++) {
			this.entities[i] = null;
		}
		this.timer.set(0);
		this.waveTimer.set(0);
		this.wave = 0;
	},

	countNPCs: function(){
		this.NPCs = 0;
		for ( var i = 0; i < ig.game.entities.length; i++ ) {
			if( ig.game.entities[i] instanceof EntityNPC ){
				this.NPCs++;
			}
		}
	},

	pointerMovement: function(){
		this.pointer.pos.x = this.pointer.road[this.STATE][this.pointer.currentRoad.y][this.pointer.currentRoad.x].x;
		this.pointer.pos.y = this.pointer.road[this.STATE][this.pointer.currentRoad.y][this.pointer.currentRoad.x].y;

		if(ig.input.pressed('action')){
			this.pointer.state = 1;
		}
		if(ig.input.released('action')){
			this.pointer.state = 0;
		}

		if(ig.input.pressed('right')){
			this.sMenu.play();
			this.pointer.currentRoad.x += 1;
			if(this.pointer.currentRoad.x > this.pointer.road[this.STATE][this.pointer.currentRoad.y].length-1){
				this.pointer.currentRoad.x = 0;
			}
		}
		if(ig.input.pressed('left')){
			this.sMenu.play();
			this.pointer.currentRoad.x -= 1;
			if(this.pointer.currentRoad.x < 0){
				this.pointer.currentRoad.x = this.pointer.road[this.STATE][this.pointer.currentRoad.y].length-1;
			}
		}
		if(ig.input.pressed('down')){
			this.sMenu.play();

			this.pointer.currentRoad.y += 1;
			if(this.pointer.currentRoad.y > this.pointer.road[this.STATE].length-1){
				this.pointer.currentRoad.y = 0;
			}
			if(!this.pointer.road[this.STATE][this.pointer.currentRoad.y][this.pointer.currentRoad.x]){
				this.pointer.currentRoad.x = 0;
			}
		}
		if(ig.input.pressed('up')){
			this.sMenu.play();
			this.pointer.currentRoad.y -= 1;
			if(this.pointer.currentRoad.y < 0){
				this.pointer.currentRoad.y = this.pointer.road[this.STATE].length-1;
			}
			if(!this.pointer.road[this.STATE][this.pointer.currentRoad.y][this.pointer.currentRoad.x]){
				this.pointer.currentRoad.x = 0;
			}
		}
	},

	drawDebug: function(){
		for (var i = 0; i < this.pointer.road[this.STATE].length; i++) {
			for (var j = 0; j < this.pointer.road[this.STATE][i].length; j++) {
				this.debugSheet.draw(this.pointer.road[this.STATE][i][j].x,this.pointer.road[this.STATE][i][j].y);
			};
		};
	},

	loadNewLevel: function(level){
		if(level === false){
			level = this.quest.currentLevel;
		}

		if(level == 0){
			this.loadLevel( LevelForest );
			this.quest.currentLevel = 0;
		}
		if(level == 1){
			this.loadLevel( LevelArena );
			this.quest.currentLevel = 1;
		}
		if(level == 2){
			this.loadLevel( LevelRocks );
			this.quest.currentLevel = 2;
		}
		if(level == 3){
			this.loadLevel( LevelBricks );
			this.quest.currentLevel = 3;
		}

		this.screen.y = -16;
		this.startGame();

	},

	spawnPlayer: function(instant){
		ig.game.spawnEntity( EntityPlayer, this.getEntityByName('chest').pos.x-16, this.getEntityByName('chest').pos.y );
	},

	startGame: function(){
		this.STATE = 'game';
		this.timer.set(0);
		this.pause = false;
		this.spawnPlayer();
	},

	endGame: function(){
		this.sendHighscore();
		this.score = 0;
		this.STATE = 'game_over';
		this.pause = true;

		for (var i = 0; i < ig.game.entities.length; i++) {
			ig.game.entities[i].kill();
		};

		for (var i = 0; i < 16; i++) {
			ig.game.spawnEntity( EntityExplosion, this.GUI.centerMiddle.x+(64 - ((Math.random()*128)<<0)), this.GUI.centerMiddle.y+(74 - ((Math.random()*16)<<0)) );
		};
	},

	levelClear: function(){
		for (var i = 0; i < ig.game.entities.length; i++) {
			if( ig.game.entities[i].name == 'grail' ){
				this.stats.points += 1;
			}
		};
		if(this.quest.currentLevel < this.quest.levels.length)
			this.quest.levels[this.quest.currentLevel+1].open = true;
		ig.music.play();
		this.clearLevel();
		this.loadLevel( LevelMenuhd );
		this.STATE = 'hero';
	},

	calculatePercentage: function(){
		var t = this.swords[this.activeSword].timer.delta().toFixed(1)*(-10);
		var a = this.swords[this.activeSword].charge*10;
		var p = Math.round((t/a)*100);
		p = p<0 ? 0 : p;

		this.swords[this.activeSword].chargePercentage = p;

		t = this.defence.timer.delta().toFixed(1)*(-10);
		a = this.defence.charge*10;
		p = Math.round((t/a)*100);
		p = p<0 ? 0 : p;

		this.defence.chargePercentage = p;
	},

	centerCamera: function(){
		var robin = this.getEntityByName('robin');

		if( robin ) {
            this.sX = this.k * this.sX + (1.0 - this.k) * robin.pos.x;
            this.sY = this.k * this.sY + (1.0 - this.k) * robin.pos.y;
		}

		this.screen.x = this.sX - ig.system.width*0.5;
        this.screen.y = this.sY- ig.system.height*0.5;
	},

	update: function() {
		Gamepad.handleInput();
		this.parent();

		if(this.STATE == 'hero' || this.STATE == 'shop' || this.STATE == 'quest' || this.STATE == 'help'){
			this.screen.y = 5;
		}

		if(this.STATE == 'map'){

			this.pointerMovement();

			var action = this.pointer.road[this.STATE][this.pointer.currentRoad.y][this.pointer.currentRoad.x].action,
				value = this.pointer.road[this.STATE][this.pointer.currentRoad.y][this.pointer.currentRoad.x].value;

			if(ig.input.released('action')){
				if(action == 'chooseLevel'){
					if(this.quest.levels[value].open){
						ig.music.fadeOut(1);
						this.loadNewLevel(value);
					}
				}
			}
		}

		if(this.STATE == 'shop'){
			this.pointerMovement();

			var action = this.pointer.road[this.STATE][this.pointer.currentRoad.y][this.pointer.currentRoad.x].action,
				value = this.pointer.road[this.STATE][this.pointer.currentRoad.y][this.pointer.currentRoad.x].value;

			// SHOP stuff
			if(ig.input.released('action')){
				if(action == 'sword'){
					if(this.swords[value].owned && !this.swords[value].active){
						for (var i = 0; i < this.swords.length; i++) {
							this.swords[i].active = false;
						};
						this.swords[value].active = true;
						this.activeSword = value;
					}
					if(!this.swords[value].owned){
						if(this.swords[value].price <= this.stats.gold){
							this.stats.gold -= this.swords[value].price;
							this.swords[value].owned = true;
						}
					}
				}
				if(action == 'potion'){
					if(this.potions.price <= this.stats.gold){
							this.stats.gold -= this.potions.price;
							this.potions.quantity += 4;
						}
				}
				if(action == 'next'){
					this.STATE = 'map';
					this.pointer.currentRoad = {x:0,y:0};
					return;
				}
			}
		}

		if(this.STATE == 'hero'){

			this.pointerMovement();

			var action = this.pointer.road[this.STATE][this.pointer.currentRoad.y][this.pointer.currentRoad.x].action,
				value = this.pointer.road[this.STATE][this.pointer.currentRoad.y][this.pointer.currentRoad.x].value;

			if(ig.input.released('action')){
				if(action == 'add'){
					if(this.stats[value]<this.stats.maxStats && this.stats.points > 0){
						this.stats[value] += 1;
						this.stats.points -= 1;
					}
				}
				if(action == 'remove'){
					if(this.stats[value]>1){
						this.stats[value] -= 1;
						this.stats.points += 1;
					}
				}
				if(action == 'auto'){
					this.stats.health = 5;
					this.stats.attack = 3;
					this.stats.defence = 2;
					this.stats.points = 0;
					this.pointer.currentRoad = {x:1,y:0};
				}
				if(action == 'next'){
					this.STATE = 'shop';
					this.pointer.currentRoad = {x:0,y:0};
					return;
				}
			}
		}



		if(this.STATE == 'help'){
			this.pointerMovement();

			var action = this.pointer.road[this.STATE][this.pointer.currentRoad.y][this.pointer.currentRoad.x].action;

			if(ig.input.released('action')){
				if(action == 'next'){
					this.STATE = 'hero';
					this.pointer.currentRoad = {x:0,y:0};
					return;
				}
			}
		}

		if(this.STATE == 'quest'){
			this.pointerMovement();

			var action = this.pointer.road[this.STATE][this.pointer.currentRoad.y][this.pointer.currentRoad.x].action;

			if(ig.input.released('action')){
				if(action == 'next'){
					this.STATE = 'help';
					this.pointer.currentRoad = {x:0,y:0};
					return;
				}
			}
		}

		if(this.STATE == 'intro'){

			if(ig.input.released('action')){
				this.loadLevel( LevelMenuhd );
				this.STATE = 'quest';
				this.pointer.currentRoad = {x:0,y:0};
				return;
			}
		}

		if(this.STATE == 'game'){

			// CAMERA

			if(this.cameraFollow) this.centerCamera();

			this.calculatePercentage();

			if(this.wave < this.quest.levels[this.quest.currentLevel].waves.length){
				if(this.waveTimer.delta() > 0){
					for (var i = 0; i < this.entities.length; i++) {
						if(this.entities[i] instanceof EntityGate){
							this.entities[i].open();
						}
					}
					this.wave++;
					this.waveTimer.set(this.nextWave);
				}
			}else{
				this.countNPCs();
				if(this.NPCs < 1){
					this.levelClear();
				}
			}

			if(!this.getEntityByName('robin') && this.respawnTimer.delta() > 0){
				this.spawnPlayer();
			}

			if(ig.game.getEntitiesByType(EntityGrail).length < 1){
				this.endGame();
			}

			if(ig.input.released('quest')){
				ig.music.play();
				this.clearLevel();
				this.loadLevel( LevelMenuhd );
				this.pointer.currentRoad = {x:0,y:0};
				this.STATE = 'hero';
				this.pause = true;
				return;
			}

			if(ig.input.state('secretA') && ig.input.state('secretB')){
				ig.game.spawnEntity( EntityGold, this.getEntityByName('chest').pos.x+(64- ((Math.random()*128)<<0)), this.getEntityByName('chest').pos.y+(64 - ((Math.random()*128)<<0)), {gold:1});
			}
		}

		if(this.STATE == 'game_over'){
			if(ig.input.released('action')){
				ig.music.play();
				this.clearLevel();
				this.loadLevel( LevelMenuhd );
				this.pointer.currentRoad = {x:0,y:0};
				this.STATE = 'hero';
				return;
			}
		}
	},

	drawPointer: function(){
		this.handSheet.drawTile(this.pointer.pos.x,this.pointer.pos.y,this.pointer.state,13,17);
	},

	drawHeader: function(string){
		this.panelLong.draw(this.GUI.centerTop.x-55, this.GUI.centerTop.y-11);
		this.fontWhite.draw( string, this.GUI.centerTop.x, this.GUI.centerTop.y-5, ig.Font.ALIGN.CENTER );

	},

	drawButton: function(options){
		if(options.small){
			this.buttonSmallSheet.draw(options.x, options.y );
			this.fontWhite.draw( options.title, options.x+19, options.y+5, ig.Font.ALIGN.CENTER );
		}else{
			this.buttonSheet.draw(options.x, options.y );
			this.fontWhite.draw( options.title, options.x+35, options.y+5, ig.Font.ALIGN.CENTER );
		}
	},

	draw: function() {
		this.parent();

		if(this.STATE == 'intro'){

			this.logoBigSheet.draw(this.GUI.centerMiddle.x-89, this.GUI.centerMiddle.y+6);

			if( this.timer.delta().toFixed(0) % 2 != 0){
				this.fontBlack.draw('PRESS ENTER', this.GUI.centerBottom.x, this.GUI.centerBottom.y-48, ig.Font.ALIGN.CENTER );
			}
			this.fontBlack.draw('Game design & code: P1X Games', this.GUI.centerBottom.x, this.GUI.centerBottom.y-24, ig.Font.ALIGN.CENTER );
			this.fontBlack.draw('(c) 2014', this.GUI.centerBottom.x, this.GUI.centerBottom.y-14, ig.Font.ALIGN.CENTER );
		}

		if(this.STATE == 'quest'){

			// TOP
			this.drawHeader('\"THE QUEST\"');

			// CENTER
 			this.bookSheet.draw(this.GUI.centerMiddle.x-103, this.GUI.centerMiddle.y-24);



			var msg = 'many';
			if(this.scoresFromGameJolt){
				if(this.scoresFromGameJolt.response && this.scoresFromGameJolt.response.success == "true"){
					if(this.scoresFromGameJolt.response.scores.length > 1){
						msg = this.scoresFromGameJolt.response.scores.length;
					}
				}
			}

			this.fontWhite.draw( 'You are Sir Robin\nknown as the Brave.\nYou have to protect\nthe Holy Grail from\nthe hordes of evil\nbeasts.\n\nThere were '+msg+'\nheroes before You.\nAnd none of them\nhave come back\nfrom the dungeons.', this.GUI.centerMiddle.x-90, this.GUI.centerMiddle.y-10, ig.Font.ALIGN.LEFT );
			this.fontWhite.draw( 'You are our last\nand only hope.\n\nWe\'re giving You\n'+ this.stats.gold+' gold to spend\nfor equipement.\n\nChose Your stats\nwisely and fight\nto the end!', this.GUI.centerMiddle.x+12, this.GUI.centerMiddle.y-10, ig.Font.ALIGN.LEFT );


			// BUTTONS

			this.buttonSheet.draw(this.GUI.centerMiddle.x + 16, this.GUI.centerMiddle.y+86);
			this.fontWhite.draw( 'Next', this.GUI.centerMiddle.x+50, this.GUI.centerMiddle.y+91, ig.Font.ALIGN.CENTER );

			// POINTER
			this.drawPointer();
		}

		if(this.STATE == 'help'){
			// TOP
			this.drawHeader('HOW TO PLAY');

			this.bookSheet.draw(this.GUI.centerMiddle.x-103, this.GUI.centerMiddle.y-24);

			this.fontWhite.draw( 'Protect Grails from\nbeing destroyed by\nenemies.\n\nYou gain new stats\npoints for each\nsaved grail.\n\nCollect gold to buy\nbetter gear and\npotions.', this.GUI.centerMiddle.x-90, this.GUI.centerMiddle.y-10, ig.Font.ALIGN.LEFT );
			this.fontWhite.draw( 'Gamepad setup.\n\nAnalog to move\nX to attack\nA to block\nB to use potions', this.GUI.centerMiddle.x+12, this.GUI.centerMiddle.y-10, ig.Font.ALIGN.LEFT );


			// BOTTOM
			this.buttonSheet.draw(this.GUI.centerMiddle.x + 16, this.GUI.centerMiddle.y+86);
			this.fontWhite.draw( 'Next', this.GUI.centerMiddle.x+50, this.GUI.centerMiddle.y+91, ig.Font.ALIGN.CENTER );

			// POINTER
			this.drawPointer();
		}

		if(this.STATE == 'hero'){
			// TOP
			this.drawHeader('CHARACTER GENERATION');

			var string = 'points';
			if(this.stats.points == 1) string = 'point';

			this.fontWhite.draw('You have '+this.stats.points+' ' +string+ '.', this.GUI.centerTop.x, this.GUI.centerTop.y+16, ig.Font.ALIGN.CENTER)
			this.fontWhite.draw('Spend them on stats below or use auto option.', this.GUI.centerTop.x, this.GUI.centerTop.y+26, ig.Font.ALIGN.CENTER)

			// MIDDLE

			this.panelStats.draw(this.GUI.stats.x-71, this.GUI.stats.y+1);
			var sprite;

			for (var i = 0; i < this.stats.maxStats; i++) {
				// HEALTH
				sprite = 2;
				if(this.stats.maxHealth > i) sprite = 1;
				if(this.stats.health > i) sprite = 0;

				this.guiIconsSheet.drawTile(this.GUI.stats.x-60 + (i*8),this.GUI.stats.y+10,sprite,8);

				// ATTACK
				sprite = 4;
				if(this.stats.attack > i) sprite = 3;
				this.guiIconsSheet.drawTile(this.GUI.stats.x-60 + (i*8),this.GUI.stats.y+20,sprite,8);

				// DEFENCE
				sprite = 6;
				if(this.stats.defence > i) sprite = 5;
				this.guiIconsSheet.drawTile(this.GUI.stats.x-60 + (i*8),this.GUI.stats.y+30,sprite,8);
			};

			// +++
			sprite = this.stats.points>0 ? 7 : 9;
			if(this.stats.health==this.stats.maxStats) sprite = 9;
			this.guiIconsSheet.drawTile(this.GUI.stats.x-46 + (this.stats.maxStats*8),this.GUI.stats.y+10,sprite,8);
			sprite = this.stats.points>0 ? 7 : 9;
			if(this.stats.attack==this.stats.maxStats) sprite = 9;
			this.guiIconsSheet.drawTile(this.GUI.stats.x-46 + (this.stats.maxStats*8),this.GUI.stats.y+20,sprite,8);
			sprite = this.stats.points>0 ? 7 : 9;
			if(this.stats.defence==this.stats.maxStats) sprite = 9;
			this.guiIconsSheet.drawTile(this.GUI.stats.x-46 + (this.stats.maxStats*8),this.GUI.stats.y+30,sprite,8);

			// ---
			sprite = this.stats.health>1 ? 8 : 9;
			this.guiIconsSheet.drawTile(this.GUI.stats.x-56 + (this.stats.maxStats*8),this.GUI.stats.y+10,sprite,8);
			sprite = this.stats.attack>1 ? 8 : 9;
			this.guiIconsSheet.drawTile(this.GUI.stats.x-56 + (this.stats.maxStats*8),this.GUI.stats.y+20,sprite,8);
			sprite = this.stats.defence>1 ? 8 : 9;
			this.guiIconsSheet.drawTile(this.GUI.stats.x-56 + (this.stats.maxStats*8),this.GUI.stats.y+30,sprite,8);

			// DESCRIPTION

			var string = this.stats.health>1 ? 'hits points' : 'hit point';
			this.fontWhite.draw( 'Your hero can survive '+this.stats.health+' '+string+' from enemies.\n'+
					'Have +' +this.stats.attack+ ' to max attack and '+ ( 10 + (2*this.stats.attack) ) + '% of critical hit.\n'+
					'Defence protection will last '+ (ig.game.stats.defence*0.5).toFixed(1) + ' sec. and recharge after '+(ig.game.defence.charge + (ig.game.stats.defence*0.5)).toFixed(1)+' sec.', this.GUI.centerBottom.x, this.GUI.centerBottom.y-60, ig.Font.ALIGN.CENTER );

			// BUTTONS

			this.buttonSheet.draw(this.GUI.centerBottom.x - 66, this.GUI.centerBottom.y-17);
			this.fontWhite.draw( 'Auto stats', this.GUI.centerBottom.x-32, this.GUI.centerBottom.y-12, ig.Font.ALIGN.CENTER );

			this.buttonSheet.draw(this.GUI.centerBottom.x + 4, this.GUI.centerBottom.y-17);
			this.fontWhite.draw( 'Next step', this.GUI.centerBottom.x+38, this.GUI.centerBottom.y-12, ig.Font.ALIGN.CENTER );

			// POINTER
			this.drawPointer();
		}

		if(this.STATE == 'shop'){
			// TOP
			this.drawHeader('WELCOME TO THE SHOP');

			// SWORDS

			this.fontBlack.draw('Attack:', this.GUI.shop.x-132, this.GUI.shop.y+42, ig.Font.ALIGN.LEFT )
			this.fontBlack.draw('Charge:', this.GUI.shop.x-132, this.GUI.shop.y+52, ig.Font.ALIGN.LEFT )
			this.fontBlack.draw('Price:', this.GUI.shop.x-132, this.GUI.shop.y+62, ig.Font.ALIGN.LEFT )

			var title,price,string;

			for (var i = 0; i < 4; i++) {

				this.swordSheet.drawTile(this.GUI.shop.x-80+(60*i),this.GUI.shop.y,i,15,28);
				this.fontBlack.draw( this.swords[i].name, this.GUI.shop.x-72+(60*i), this.GUI.shop.y+32, ig.Font.ALIGN.CENTER );
				this.fontWhite.draw(this.swords[i].attack.min+' - '+this.swords[i].attack.max, this.GUI.shop.x-72+(60*i), this.GUI.shop.y+42, ig.Font.ALIGN.CENTER );
				this.fontWhite.draw(this.swords[i].charge.toFixed(1)+' sec.', this.GUI.shop.x-72+(60*i), this.GUI.shop.y+52, ig.Font.ALIGN.CENTER );
				price = this.swords[i].owned ? '-' : this.swords[i].price + 'g';
				this.fontBlack.draw( price, this.GUI.shop.x-72+(60*i), this.GUI.shop.y+62, ig.Font.ALIGN.CENTER );
				if(this.swords[i].active){
					this.fontWhite.draw( 'SELECTED', this.GUI.shop.x-72+(60*i), this.GUI.shop.y+78, ig.Font.ALIGN.CENTER );
				}else{
					if(this.swords[i].owned){
						title = 'USE';
						this.drawButton({title:title,x:this.GUI.shop.x-92+(60*i),y:this.GUI.shop.y+72,small:true});
					}else{
						if(this.swords[i].price <= this.stats.gold){
							title = 'BUY';
							this.drawButton({title:title,x:this.GUI.shop.x-92+(60*i),y:this.GUI.shop.y+72,small:true});
						}else{
							title = 'need gold';
							this.fontWhite.draw( title, this.GUI.shop.x-72+(60*i), this.GUI.shop.y+78, ig.Font.ALIGN.CENTER );
						}
					}
				}
			}



			// POTIONS
			this.potionSheet.draw(this.GUI.shop.x-52,this.GUI.shop.y+100);
			this.fontBlack.draw( this.potions.price + 'g', this.GUI.shop.x-32,this.GUI.shop.y+106, ig.Font.ALIGN.LEFT );

			if(this.potions.price <= this.stats.gold){
				this.drawButton({title:'BUY 4x POTION',x:this.GUI.shop.x-10,y:this.GUI.shop.y+100});
			}else{
				this.fontWhite.draw( 'need gold', this.GUI.shop.x+14,this.GUI.shop.y+106, ig.Font.ALIGN.CENTER );
			}


			// CHEST
			this.chestSheet.draw(this.GUI.centerBottom.x-120,this.GUI.centerBottom.y-18);
			string = (this.potions.quantity == 1) ? 'potion' : 'potions';
			this.fontBlack.draw( 'You have '+ this.stats.gold + ' gold and '+ this.potions.quantity + ' ' + string + '.', this.GUI.centerBottom.x-96, this.GUI.centerBottom.y-12, ig.Font.ALIGN.LEFT );

			// BUTTONS
			this.drawButton({title:'Next step',x:this.GUI.centerBottom.x+52,y:this.GUI.centerBottom.y-18});

			// POINTER
			this.drawPointer();

		}

		if(this.STATE == 'map'){
			// TOP
			this.logoSheet.draw(this.GUI.centerTop.x-50, this.GUI.centerTop.y+6);

			this.fontWhite.draw('CHOOSE YOUR ADVENTURE', this.GUI.centerTop.x, this.GUI.centerTop.y+50, ig.Font.ALIGN.CENTER)

			//CENTER

			this.mapSheet.draw(this.GUI.map.x-81, this.GUI.map.y-24);

			var value = this.pointer.road[this.STATE][this.pointer.currentRoad.y][this.pointer.currentRoad.x].value;

			if(this.quest.levels[value].open){
				this.fontBlack.draw('\"'+this.quest.levels[value].title+'\"\nWaves: '+this.quest.levels[value].waves.length, this.GUI.map.x, this.GUI.map.y+74, ig.Font.ALIGN.CENTER)
			}else{
				this.fontBlack.draw('Complete other maps to unlock this location!', this.GUI.map.x, this.GUI.map.y+74, ig.Font.ALIGN.CENTER)
			}

			for (var i = 0; i < this.pointer.road[this.STATE][0].length; i++) {
				var flag = this.pointer.road[this.STATE][0][i];
				if(this.quest.levels[i].open){
					this.flagSheet.draw(flag.x+1,flag.y-7);
				}
			};

			// POINTER
			this.drawPointer();
		}

		if(this.STATE == 'game'){

			var robin = this.getEntityByName('robin'),
				sprite, gold;

			// TOP
			this.panelLong.draw( this.GUI.centerTop.x-55,  this.GUI.centerTop.y-11);
			this.fontWhite.draw( 'WAVE: ' + this.wave, this.GUI.centerTop.x-44, this.GUI.centerTop.y-5, ig.Font.ALIGN.LEFT );
			if(this.wave < this.quest.levels[this.quest.currentLevel].waves.length){
				this.fontWhite.draw( 'NEXT: ' + -(this.waveTimer.delta()<<0) + ' sec.', this.GUI.centerTop.x, this.GUI.centerTop.y-5, ig.Font.ALIGN.LEFT );
			}else{
				this.fontWhite.draw( 'LAST WAVE!', this.GUI.centerTop.x, this.GUI.centerTop.y-5, ig.Font.ALIGN.LEFT );
			}

			this.panelShort.draw( this.GUI.centerTop.x-110,  this.GUI.centerTop.y-11);
			this.panelShort.draw( this.GUI.centerTop.x+64,  this.GUI.centerTop.y-11);

			this.guiIconsSheet.drawTile(this.GUI.centerTop.x-100,this.GUI.centerTop.y-6,10,8);
			this.guiIconsSheet.drawTile(this.GUI.centerTop.x+72,this.GUI.centerTop.y-6,11,8);

			this.fontWhite.draw( this.potions.quantity, this.GUI.centerTop.x-88, this.GUI.centerTop.y-5, ig.Font.ALIGN.LEFT );
			gold = robin ? this.stats.gold + robin.gold : this.stats.gold;
			this.fontWhite.draw( gold, this.GUI.centerTop.x+86, this.GUI.centerTop.y-5, ig.Font.ALIGN.LEFT );

			// BOTTOM

			this.panelLong.draw( this.GUI.centerBottom.x-55,  this.GUI.centerBottom.y-7);
			this.panelShort.draw( this.GUI.centerBottom.x-110,  this.GUI.centerBottom.y-7);
			this.panelShort.draw( this.GUI.centerBottom.x+64,  this.GUI.centerBottom.y-7);

			if(robin){
				// health
				for (var i = 0; i < this.stats.maxStats; i++) {
					sprite = 2;
					if(robin.maxHealth > i) sprite = 1;
					if(robin.health > i) sprite = 0;

					this.guiIconsSheet.drawTile(this.GUI.centerBottom.x-47 + (i*8),this.GUI.centerBottom.y-2,sprite,8);
				}

			}else{
				this.fontWhite.draw( 'RESPAWN IN.. ' + -(this.respawnTimer.delta().toFixed(1)), this.GUI.centerMiddle.x, this.GUI.centerMiddle.y + 28, ig.Font.ALIGN.CENTER );
			}


			// sword
			for (var i = 0; i < 4; i++) {
				sprite = 4;

				var p = this.swords[this.activeSword].chargePercentage;
				if( (100-p) > i*20 || p < 0) sprite = 3;

				this.guiIconsSheet.drawTile(this.GUI.centerBottom.x-104 + (i*8),this.GUI.centerBottom.y-2,sprite,8);
			}

			// defence
			for (var i = 0; i < 4; i++) {
				sprite = 6;

				var p = this.defence.chargePercentage;
				if( (100-p) > i*20 || p < 0) sprite = 5;

				this.guiIconsSheet.drawTile(this.GUI.centerBottom.x+72 + (i*8),this.GUI.centerBottom.y-2,sprite,8);
			}

		}

		if(this.STATE == 'game_over'){

			this.gameOverSheet.draw(this.GUI.centerMiddle.x-43, this.GUI.centerMiddle.y-34);

			this.fontWhite.draw( 'YOU SCORE ' + this.lastScore + '!', this.GUI.centerMiddle.x, this.GUI.centerMiddle.y + 40, ig.Font.ALIGN.CENTER );
		}

		if(this.debug) this.drawDebug();

	}
});

function toggleFullScreen() {
  if (!document.fullscreenElement &&    // alternative standard method
      !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement ) {  // current working methods
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) {
      document.documentElement.msRequestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) {
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
      document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
}

GameLoader = ig.Loader.extend({

    draw: function() {
        var w = ig.system.realWidth,
        	h = ig.system.realHeight;
        ig.system.context.fillStyle = '#493c2b';
        ig.system.context.fillRect( 0, 0, w, h );

        var logo = new Image(),
        	image = new Image();
        image.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAHCAYAAADAp4fuAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkZGM0Q3MUVGN0RBQTExRTNCQURFQTIxRURERjE4OTJFIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkZGM0Q3MUYwN0RBQTExRTNCQURFQTIxRURERjE4OTJFIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RTJDRkRDNDY3REE5MTFFM0JBREVBMjFFRERGMTg5MkUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RkYzRDcxRUU3REFBMTFFM0JBREVBMjFFRERGMTg5MkUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4png02AAAAVklEQVR42mL8//8/Awi86TICMRhFys4xMIIEQQI8kVYMX5YfA8kzMsEEjrucYADRQPCfCSQDUmG5xwKhkgECGGECIIIJZDBMAsZgkVE3/o/EBwOAAAMA3Pkhi6MK5N8AAAAASUVORK5CYII=";
        logo.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAUCAYAAAC9BQwsAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkUyQ0ZEQzQ0N0RBOTExRTNCQURFQTIxRURERjE4OTJFIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkUyQ0ZEQzQ1N0RBOTExRTNCQURFQTIxRURERjE4OTJFIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RTJDRkRDNDI3REE5MTFFM0JBREVBMjFFRERGMTg5MkUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RTJDRkRDNDM3REE5MTFFM0JBREVBMjFFRERGMTg5MkUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7Tx6srAAAAvklEQVR42mL8//8/Awj8eJwDZhx3OQHmW+6xYEDm6yb/Y4ACRhDBxEAmYNynZgy26Znde6I0SB0SZKDIRhaY25/dJk4DTD35fvwPDdb96iYoJl6ey4SVDwttym2EAWB84tXwZfkxCkMVlhKAAMVmDtkpKC6A2UR5ykHzIsPSVGUUAXdVfhSbYIB6NsLAmy4jsIRI2TlGKJ+BOjZKqxmhWHlnjyV6KIKBwVxGBur6UUbd+D8xGp7cPEtZPAIEGAA8eE2/CXAmPgAAAABJRU5ErkJggg==";

        var percentage = (this.status * 100).round();

		ig.system.context.drawImage(logo, (ig.system.realWidth*0.5)-7, (ig.system.realHeight*0.5)-50);

		if(percentage>40){
			ig.system.context.drawImage(image, (ig.system.realWidth*0.5)-28, ig.system.realHeight*0.5);
		}
        if(percentage>60){
        	ig.system.context.drawImage(image, (ig.system.realWidth*0.5)-12, ig.system.realHeight*0.5);
        }
        if(percentage>80){
        	ig.system.context.drawImage(image, (ig.system.realWidth*0.5)+4, ig.system.realHeight*0.5);
        }
        if(percentage>90){
        	ig.system.context.drawImage(image, (ig.system.realWidth*0.5)+20, ig.system.realHeight*0.5);
        }
    }
});

	var w = 320,
		h = 180,
		z = 3,
		fps = 24;

	ig.Sound.enabled = false;
	ig.Sound.channels = 16;

	var c = document.createElement('canvas');
  	c.id = 'canvas';
  	document.body.appendChild(c);

	ig.main( '#canvas', MyGame, fps, w, h, z, GameLoader);

});
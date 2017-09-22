var theGame = function(game)
{
	var player;
	var velocity;
	var cursors;

	tribunesPng = ["tribune_full.png", "tribune_empty.png"];
	arrowsPng = ["arrow_white.png", "arrow_yellow.png"];
	tentsPng  = ["tent_blue.png", "tent_blue_large.png", "tent_red.png", "tent_red_large.png"];
	rocksPng = ["rock1.png", "rock2.png", "rock3.png"];
	tiresPng = ["tires_red.png", "tires_white.png"];
	treesPng = ["tree_large.png", "tree_small.png"];
	carsPng = ["car_red_2.png", "car_green_2.png", "car_blue_2.png", "car_yellow_2.png", "car_black_2.png"];
	ArrowsPoints = [{"x":1320, "y":700}, {"x":360, "y":1160}];
	numOfTrees = 6;
	numOfRocks = 5;
	numOfTires = 12;
	
	var cPoint;
	var curPoint;
	CirclesPoints = [{"x": 1220,"y":550}, {"x": 1250,"y":1200},{"x": 1500,"y":1500},{"x": 1000,"y":1500},
	{"x": 980,"y":1000},{"x": 620,"y":1000},{"x": 470,"y":1380},{"x": 350,"y":800},
	{"x": 430,"y":480}, {"x": 680,"y":480}];
	
	numofCircles = 2;
	completedCircles = 0;
	var startCircleTime, startRaceTime, circleTime, raceTime, bestCircleTime, bestRaceTime;
	canMove = false;
}

theGame.prototype = {
	init: function(numofCircles)
	{
		this.numofCircles = numofCircles;
	},
	create: function()
	{
	
	this.localStorageInit();
	
	game.time.advancedTiming = true;
    game.physics.startSystem(Phaser.Physics.P2JS);
	//game.physics.p2.setImpactEvents(true);
	
	//load map with layers
	var map = game.add.tilemap('tilemap');
	map.addTilesetImage('ss_road','tilesRoad');
	
	
	var layer2 = map.createLayer('TL2');
	var layer1 = map.createLayer('TL1');
	//map.setCollisionBetween(1,12);
	//game.physics.p2.convertTilemap(map, layer2);
	
	//Materials
	/*
	rockMaterial = game.physics.p2.createMaterial('rockMaterial');
	carMaterial = game.physics.p2.createMaterial('carMaterial');
	contactMaterial = game.physics.p2.createContactMaterial(rockMaterial, carMaterial);
	worldMaterial = game.physics.p2.createMaterial('worldMaterial');
	game.physics.p2.setWorldMaterial(worldMaterial, true, true, true, true);
	*/
	
	// Group TRIBUNES
    tribunes = game.add.physicsGroup(Phaser.Physics.P2JS);
    tribunes.enableBody = true;

	random = Math.floor( Math.random() * tribunesPng.length );
    tribune1 = tribunes.create(900, 250, 'objsXML', tribunesPng[random]);
	random = Math.floor( Math.random() * tribunesPng.length );
	tribune2 = tribunes.create(400, 250, 'objsXML', tribunesPng[random]);
	tribune1.body.static = true;
	tribune2.body.static = true;

	// Group ROCKS
	var rocks = game.add.group();
	rocks.enableBody = true;
	rocks.physicsBodyType = Phaser.Physics.P2JS;
	
	for(var i = 0; i < numOfRocks; ++i)
	{
		var xRockStart = 1500, xRockEnd = 1800;
		var yRockStart = 300, yRockEnd = 1000;
		random = Math.floor( Math.random() * rocksPng.length );
		currentxRock = Math.random() * (xRockEnd - xRockStart) + xRockStart;
		currentyRock = Math.random() * (yRockEnd - yRockStart) + yRockStart;
		rock = rocks.create(currentxRock, currentyRock, 'objsXML', rocksPng[random]);
		rock.body.static = true;
		//rock.body.setMaterial(rockMaterial);
		//rock.body.clearShapes();
		//rock.body.loadPolygon('physicsRock', rocksPng[random].substr(0,rocksPng[random].length - 4));
	}

	//Group ARRAWS
	var arrows = game.add.group();
	arrows.enableBody = false;
	random = Math.floor(Math.random() * arrowsPng.length);
	for(var i = 0; i < ArrowsPoints.length; ++i)
	{
		for(var j = 0; j < 3; ++j)
		{
			arrow = arrows.create(ArrowsPoints[i].x, ArrowsPoints[i].y + j * 40, 'objsXML', arrowsPng[random]);
			arrow.scale.setTo(0.5);
			arrow.angle = i % 2 == 0 ? 180 : 0;
		}
	}
	
	//Group TIRES
	var tires = game.add.physicsGroup(Phaser.Physics.P2JS);
    tires.enableBody = true;
	tireX = 550;
	tireY = 660;
	random = Math.floor( Math.random() * tiresPng.length );
    for(var i = 0; i < numOfTires; i++)
	{
		for (var j = 0; j < 2; ++j)
		{
			tire = tires.create(tireX + i * 50,tireY + j * 80, 'objsXML', tiresPng[random]);
			tire.scale.setTo(0.7);
			tire.body.setCircle(20);
			tire.body.CollideBounds = false;
		}
	}

    // PLAYER
	random = Math.floor( Math.random() * carsPng.length );
    player = game.add.sprite(620, 500, 'carsXML', carsPng[random]);
	
	player.anchor.setTo(0.5);
	game.physics.p2.enableBody(player);
	player.body.clearShapes();
	player.body.loadPolygon('physicsCar', 'car_black_2');
	//player.body.setMaterial(carMaterial);
	player.body.collideWorldBounds = true;
	player.body.allowrotation = true;
	player.body.angle = 90;  
	game.camera.follow(player);
	
	
	

	// Group TENTS
    tents = game.add.physicsGroup(Phaser.Physics.P2JS);
    tents.enableBody = true;

	random = Math.floor( Math.random() * tentsPng.length );
    tent1 = tents.create(1600, 850, 'objsXML', tentsPng[random]);
	random = Math.floor( Math.random() * tentsPng.length );
	tent2 = tents.create(1600, 1100, 'objsXML', tentsPng[random]);
	tent1.body.setCircle(20);
	tent2.body.setCircle(20);
	tent1.body.kinematic = true;
	tent2.body.kinematic = true;

	//Group Trees
	trees = game.add.physicsGroup(Phaser.Physics.P2JS);
    trees.enableBody = true;
	
	var xTreeStart = 0, xTreeEnd = 150;
	var yTreeStart = 300, yTreeEnd = 1800;
	for(var i = 0; i < numOfTrees; ++i)
	{
		random = Math.floor( Math.random() * treesPng.length );
		currentxTree = Math.random() * (xTreeEnd - xTreeStart) + xTreeStart;
		currentyTree = Math.random() * (yTreeEnd - yTreeStart) + yTreeStart;
		tree = trees.create(currentxTree, currentyTree, 'objsXML', treesPng[random]);
		tree.body.setCircle(10);
		tree.body.kinematic = true;
	}

	//Create cPoint
	cPoint = game.add.sprite(CirclesPoints[0].x,CirclesPoints[0].y, 'cPoint');
	var expand = cPoint.animations.add('expand');
	cPoint.animations.play('expand', 30 ,true);
	curPoint = 0;

	
	layer1.resizeWorld();
	layer1.wrap = true;
	
    //  The text
    RaceTimeText = game.add.text(16, 48, 'Время: 0', { fontSize: '16px', fill: 'green' });
	RaceTimeText.fixedToCamera = true;
	CircleTimeText = game.add.text(16, 16, 'Круг: 0/' + numofCircles, { fontSize: '16px', fill: 'green' });
	CircleTimeText.fixedToCamera = true;
	if(localStorage.getItem('bestRaceTime' + numofCircles) == Number.MAX_VALUE)
		RaceBestTimeText = game.add.text(16, 64, 'Лучшее время: 0', { fontSize: '16px', fill: 'green' });
	else
		RaceBestTimeText = game.add.text(16, 64, 'Лучшее время: ' + localStorage.getItem('bestRaceTime' + numofCircles), { fontSize: '16px', fill: 'green' });
	RaceBestTimeText.fixedToCamera = true;
	//if(localStorage.getItem('bestCircleTime') == Number.MAX_VALUE)
		//CircleBestTimeText = game.add.text(16, 32, 'Лучший круг: 0', { fontSize: '16px', fill: 'green' });
	//else
		//CircleBestTimeText = game.add.text(16, 32, 'Лучший круг: ' + localStorage.getItem('bestCircleTime'), { fontSize: '16px', fill: 'green' });
	//CircleBestTimeText.fixedToCamera = true;
	
	style = {font: "400px Arial", fill: "#ff6A6A" };
	ThreeTwoOneText3 = game.add.text(500, 300, "3", style);
	ThreeTwoOneText2 = game.add.text(550 ,300, "2", style);
	ThreeTwoOneText1 = game.add.text(550, 300, "1", style);
	ThreeTwoOneText3.alpha = 0.0;
	ThreeTwoOneText2.alpha = 0.0;
	ThreeTwoOneText1.alpha = 0.0;
	
	game.add.tween(ThreeTwoOneText3).to({alpha: 1.0}, 1000, "Linear", true,1000);
	game.add.tween(ThreeTwoOneText3).to({alpha: 0.0}, 1000, "Linear", true,1500);
	game.add.tween(ThreeTwoOneText2).to({alpha: 1.0}, 1000, "Linear", true,2000);
	game.add.tween(ThreeTwoOneText2).to({alpha: 0.0}, 1000, "Linear", true,2500);
	game.add.tween(ThreeTwoOneText1).to({alpha: 1.0}, 1000, "Linear", true,3000);
	game.add.tween(ThreeTwoOneText1).to({alpha: 0.0}, 1000, "Linear", true,3500);
	
	//  Our controls
    cursors = game.input.keyboard.createCursorKeys();
	
    game.time.events.add(Phaser.Timer.SECOND * 4, this.startTimers, this);
	},
	
	update: function()
	{
		
	if (this.checkOverlap(player, cPoint))
	{
		if(curPoint == CirclesPoints.length)
		{
			this.CircleComplete();
		}
		curPoint %= CirclesPoints.length;
		cPoint.x = CirclesPoints[curPoint].x;
		cPoint.y = CirclesPoints[curPoint].y;
		curPoint++;
	}
	
    //Reset the players velocity (movement)
	player.body.angularVelocity = 0;
	player.body.setZeroVelocity();

	if(canMove)
	{
		if (cursors.up.isDown && velocity <= 700)
		{
			if(velocity < 0)
				
				velocity = 0;	
			else
				velocity += 5;
		}
		else if(cursors.down.isDown && velocity > -300)
		{
			if(velocity >= 0)
							
				velocity-=20;
							
			else			
				velocity-=5;
		}
		else
		{
			if(velocity <= 5 && velocity >= -5)
				velocity = 0;
			if (velocity >= 0)
				velocity -= 5;
			if(velocity <= 0)
				velocity +=5;
		}
							
		/*Set X and Y Speed of Velocity*/
		player.body.velocity.x = velocity * Math.cos((player.angle-90)*0.01745);
		player.body.velocity.y = velocity * Math.sin((player.angle-90)*0.01745);
					
		/*Rotation of Car*/
		if (cursors.left.isDown)
			player.body.angularVelocity = -5*(velocity/1000);
		else if (cursors.right.isDown)
			player.body.angularVelocity = 5*(velocity/1000);
		else
			player.body.angularVelocity = 0;
		
		//показываем время
		this.showTime();
	}
	},
	
	checkOverlap: function (spriteA, spriteB)
	{
		
		var boundsA = spriteA.getBounds();
		var boundsB = spriteB.getBounds();
		return Phaser.Rectangle.intersects(boundsA, boundsB);
	},

	showTime: function  () {

		raceTime = (new Date().getTime() - startRaceTime) / 1000;
		RaceTimeText.text = 'Время: ' + raceTime;
		circleTime = (new Date().getTime() - startCircleTime) / 1000;
		CircleTimeText.text = "Круг: " + (completedCircles + 1) + "/" + numofCircles;
	},

	CircleComplete: function ()
	{
		completedCircles++;
		//сохраняем результаты круга
		if(circleTime < localStorage.getItem('bestCircleTime'))
			localStorage.setItem('bestCircleTime', circleTime);
		//CircleBestTimeText.text = 'Лучший круг: ' + localStorage.getItem('bestCircleTime');
		startCircleTime = new Date().getTime();
		if(completedCircles == numofCircles)
		{
			//сохраняем результаты гонки
			if(raceTime < localStorage.getItem('bestRaceTime' + numofCircles))
				localStorage.setItem('bestRaceTime' + numofCircles, raceTime);
			RaceBestTimeText.text = 'Лучшее время: '+ localStorage.getItem('bestRaceTime' + numofCircles);
			//останавливаем движение
			canMove = false;
			FinishText = game.add.text(500, 400, "Finish!", {font: "100px Arial", fill: "#ff6A6A" });
			FinishText.alpha = 0.0;
			game.add.tween(FinishText).to({alpha: 1.0}, 1000, "Linear", true);
			game.add.tween(FinishText).to({alpha: 0.0}, 1000, "Linear", true, 1000);
			game.time.events.add(2000, function () {this.game.state.start("GameOver",true,false,circleTime, raceTime, numofCircles);});
				
			//cPoint.destroy();
		}
	},

	startTimers: function ()
	{
		startCircleTime = new Date().getTime();
		startRaceTime = new Date().getTime();
		canMove = true;
		velocity = 0;
		completedCircles = 0;
	},
	
	localStorageInit: function()
	{
		if(localStorage.getItem('bestRaceTime' + numofCircles) == null)
			localStorage.setItem('bestRaceTime' + numofCircles, Number.MAX_VALUE);
		if(localStorage.getItem('bestCircleTime') == null)
			localStorage.setItem('bestCircleTime', Number.MAX_VALUE);
	},

	render: function ()
	{
		game.debug.text("fps" + game.time.fps || '--', 2, 14, "#00ff00");
	}
	};
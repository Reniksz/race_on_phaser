var theGame = function(game) {};

theGame.prototype = {
    completedCircles: 0,
    canMove: false,
    raceComplete: false,
    velocity: 0,
    CirclesPoints: [{
            "x": 1220,
            "y": 550
        }, {
            "x": 1250,
            "y": 1200
        }, {
            "x": 1500,
            "y": 1500
        }, {
            "x": 1000,
            "y": 1500
        },
        {
            "x": 980,
            "y": 1000
        }, {
            "x": 620,
            "y": 1000
        }, {
            "x": 470,
            "y": 1380
        }, {
            "x": 350,
            "y": 800
        },
        {
            "x": 430,
            "y": 480
        }, {
            "x": 680,
            "y": 480
        }
    ],
    WorldCenterX: 0,
    WorldCenterY: 0,

    init: function(numofCircles) {
        this.numofCircles = numofCircles;
        this.WorldCenterX = game.world.centerX;
        this.WorldCenterY = game.world.centerY;
        this.canMove = false;
        this.localStorageInit();
        that = this;
    },

    create: function() {
        game.time.advancedTiming = true;
        game.physics.startSystem(Phaser.Physics.P2JS);

        //load map with layers
        var map = game.add.tilemap('tilemap');
        map.addTilesetImage('ss_road', 'tilesRoad');

        var layer2 = map.createLayer('TL2');
        var layer1 = map.createLayer('TL1');
		layer1.resizeWorld();
        layer1.wrap = true;
		
        // Create objects
        var i, j;
        this.createTribunes();
        this.createRocks();
        this.createArraws();
        this.createPlayer();
        this.createTents();
        this.createTrees();
        this.createcPoint();
        this.createUIText();
        this.create321Text();

        //  Our controls
        cursors = game.input.keyboard.createCursorKeys();

        game.time.events.add(Phaser.Timer.SECOND * 4, this.startTimers,
            this);
    },

    createTribunes: function() {
        var tribunesPng = ["tribune_full.png", "tribune_empty.png"];

        tribunes = game.add.physicsGroup(Phaser.Physics.P2JS);
        tribunes.enableBody = true;

        random = Math.floor(Math.random() * tribunesPng.length);
        tribune1 = tribunes.create(900, 250, 'objsXML', tribunesPng[
            random]);
        random = Math.floor(Math.random() * tribunesPng.length);
        tribune2 = tribunes.create(400, 250, 'objsXML', tribunesPng[
            random]);
        tribune1.body.static = true;
        tribune2.body.static = true;
    },

    createRocks: function() {
        var rocksPng = ["rock1.png", "rock2.png", "rock3.png"];
        var numOfRocks = 5;

        var rocks = game.add.group();
        rocks.enableBody = true;
        rocks.physicsBodyType = Phaser.Physics.P2JS;

        for (i = 0; i < numOfRocks; ++i) {
            var xRockStart = 1500,
                xRockEnd = 1800;
            var yRockStart = 300,
                yRockEnd = 1000;
            random = Math.floor(Math.random() * rocksPng.length);
            currentxRock = Math.random() * (xRockEnd - xRockStart) +
                xRockStart;
            currentyRock = Math.random() * (yRockEnd - yRockStart) +
                yRockStart;
            rock = rocks.create(currentxRock, currentyRock, 'objsXML',
                rocksPng[random]);
            rock.body.static = true;
        }
    },

    createArraws: function() {
        var arrowsPng = ["arrow_white.png", "arrow_yellow.png"];
        var ArrowsPoints = [{
            "x": 1320,
            "y": 700
        }, {
            "x": 360,
            "y": 1160
        }];

        var arrows = game.add.group();
        arrows.enableBody = false;
        random = Math.floor(Math.random() * arrowsPng.length);
        for (i = 0; i < ArrowsPoints.length; ++i) {
            for (j = 0; j < 3; ++j) {
                arrow = arrows.create(ArrowsPoints[i].x, ArrowsPoints[i]
                    .y + j * 40, 'objsXML', arrowsPng[random]);
                arrow.scale.setTo(0.5);
                arrow.angle = i % 2 == 0 ? 180 : 0;
            }
        }
    },

    createTents: function() {
        var tentsPng = ["tent_blue.png", "tent_blue_large.png", "tent_red.png",
            "tent_red_large.png"
        ];

        tents = game.add.physicsGroup(Phaser.Physics.P2JS);
        tents.enableBody = true;

        random = Math.floor(Math.random() * tentsPng.length);
        tent1 = tents.create(1600, 850, 'objsXML', tentsPng[random]);
        random = Math.floor(Math.random() * tentsPng.length);
        tent2 = tents.create(1600, 1100, 'objsXML', tentsPng[random]);
        tent1.body.setCircle(20);
        tent2.body.setCircle(20);
        tent1.body.kinematic = true;
        tent2.body.kinematic = true;
    },

    createTrees: function() {
        var treesPng = ["tree_large.png", "tree_small.png"];
        var numOfTrees = 6;

        trees = game.add.physicsGroup(Phaser.Physics.P2JS);
        trees.enableBody = true;

        var xTreeStart = 0,
            xTreeEnd = 150;
        var yTreeStart = 300,
            yTreeEnd = 1800;
        for (i = 0; i < numOfTrees; ++i) {
            random = Math.floor(Math.random() * treesPng.length);
            currentxTree = Math.random() * (xTreeEnd - xTreeStart) +
                xTreeStart;
            currentyTree = Math.random() * (yTreeEnd - yTreeStart) +
                yTreeStart;
            tree = trees.create(currentxTree, currentyTree, 'objsXML',
                treesPng[random]);
            tree.body.setCircle(10);
            tree.body.kinematic = true;
        }
    },

    createTires: function() {
        var tiresPng = ["tires_red.png", "tires_white.png"];
        var numOfTires = 12;

        var tires = game.add.physicsGroup(Phaser.Physics.P2JS);
        tires.enableBody = true;
        tireX = 550;
        tireY = 660;
        random = Math.floor(Math.random() * tiresPng.length);
        for (i = 0; i < numOfTires; i++) {
            for (j = 0; j < 2; ++j) {
                tire = tires.create(tireX + i * 50, tireY + j * 80,
                    'objsXML', tiresPng[random]);
                tire.scale.setTo(0.7);
                tire.body.setCircle(20);
                tire.body.CollideBounds = false;
            }
        }
    },

    createPlayer: function() {
        var carsPng = ["car_red_2.png", "car_green_2.png", "car_blue_2.png",
            "car_yellow_2.png", "car_black_2.png"
        ];

        random = Math.floor(Math.random() * carsPng.length);
        player = game.add.sprite(620, 500, 'carsXML', carsPng[random]);
        player.anchor.setTo(0.5);
        game.physics.p2.enableBody(player);
        player.body.clearShapes();
        player.body.loadPolygon('physicsCar', 'car_black_2');
        player.body.collideWorldBounds = true;
        player.body.allowrotation = true;
        player.body.angle = 90;
        game.camera.follow(player);
    },

    createcPoint: function() {
        this.cPoint = game.add.sprite(this.CirclesPoints[0].x, this.CirclesPoints[0].y,
            'cPoint');
        var expand = this.cPoint.animations.add('expand');
        this.cPoint.animations.play('expand', 30, true);
        curPoint = 0;
    },

    createUIText: function() {
        RaceTimeText = game.add.text(16, 48, 'Время: 0', {
            fontSize: '16px',
            fill: 'green'
        });
        RaceTimeText.fixedToCamera = true;
        CircleTimeText = game.add.text(16, 16, 'Круг: 0/' +
            this.numofCircles, {
                fontSize: '16px',
                fill: 'green'
            });
        CircleTimeText.fixedToCamera = true;
    },

    create321Text: function() {
        var style = {
            font: "400px Arial",
            fill: "#ff6A6A"
        };
        ThreeTwoOneText3 = game.add.text(500, 300, "3", style);
        ThreeTwoOneText2 = game.add.text(550, 300, "2", style);
        ThreeTwoOneText1 = game.add.text(550, 300, "1", style);
        ThreeTwoOneText3.alpha = 0.0;
        ThreeTwoOneText2.alpha = 0.0;
        ThreeTwoOneText1.alpha = 0.0;

        game.add.tween(ThreeTwoOneText3).to({
            alpha: 1.0
        }, 1000, "Linear", true, 1000);
        game.add.tween(ThreeTwoOneText3).to({
            alpha: 0.0
        }, 1000, "Linear", true, 1500);
        game.add.tween(ThreeTwoOneText2).to({
            alpha: 1.0
        }, 1000, "Linear", true, 2000);
        game.add.tween(ThreeTwoOneText2).to({
            alpha: 0.0
        }, 1000, "Linear", true, 2500);
        game.add.tween(ThreeTwoOneText1).to({
            alpha: 1.0
        }, 1000, "Linear", true, 3000);
        game.add.tween(ThreeTwoOneText1).to({
            alpha: 0.0
        }, 1000, "Linear", true, 3500);
    },

    update: function() {
        if (this.raceComplete == false && this.checkOverlap(player, this.cPoint)) {
            if (curPoint == this.CirclesPoints.length) {
                this.CircleComplete();
            }
            curPoint %= this.CirclesPoints.length;
            this.cPoint.x = this.CirclesPoints[curPoint].x;
            this.cPoint.y = this.CirclesPoints[curPoint].y;
            curPoint++;
        }

        //Reset the players velocity (movement)
        player.body.angularVelocity = 0;
        player.body.setZeroVelocity();

        if (this.canMove) {
            if (cursors.up.isDown && velocity <= 700) {
                if (velocity < 0)

                    velocity = 0;
                else
                    velocity += 5;
            } else if (cursors.down.isDown && velocity > -300) {
                if (velocity > 0)

                    velocity -= 20;

                else
                    velocity -= 5;
            } else {
                if (velocity <= 5 && velocity >= -5)
                    velocity = 0;
                if (velocity > 5)
                    velocity -= 5;
                if (velocity < -5)
                    velocity += 5;
            }

            /*Set X and Y Speed of Velocity*/
            player.body.velocity.x = velocity * Math.cos((player.angle -
                90) * 0.01745);
            player.body.velocity.y = velocity * Math.sin((player.angle -
                90) * 0.01745);

            /*Rotation of Car*/
            if (cursors.left.isDown)
                player.body.angularVelocity = -5 * (velocity / 1000);
            else if (cursors.right.isDown)
                player.body.angularVelocity = 5 * (velocity / 1000);
            else
                player.body.angularVelocity = 0;

            //показываем время
            if (!this.raceComplete)
                this.showTime();
        } else
        if (this.velocity > 0) {
            this.velocity -= 10;
            player.body.velocity.x = velocity * Math.cos((player.angle -
                90) * 0.01745);
            player.body.velocity.y = velocity * Math.sin((player.angle -
                90) * 0.01745);
        }

    },

    checkOverlap: function(spriteA, spriteB) {
        var boundsA = spriteA.getBounds();
        var boundsB = spriteB.getBounds();
        return Phaser.Rectangle.intersects(boundsA, boundsB);
    },

    showTime: function() {
        raceTime = (new Date().getTime() - startRaceTime) / 1000;
        RaceTimeText.text = 'Время: ' + raceTime;
        circleTime = (new Date().getTime() - startCircleTime) / 1000;
        CircleTimeText.text = "Круг: " + (completedCircles + 1) + "/" +
            this.numofCircles;
    },

    CircleComplete: function() {
        completedCircles++;

        //сохраняем результаты круга
        if (circleTime < localStorage.getItem('bestCircleTime'))
            localStorage.setItem('bestCircleTime', circleTime);
        //CircleBestTimeText.text = 'Лучший круг: ' + localStorage.getItem('bestCircleTime');
        startCircleTime = new Date().getTime();
        if (completedCircles == this.numofCircles) {
            //сохраняем результаты гонки
            if (raceTime < localStorage.getItem('bestRaceTime' +
                    this.numofCircles))
                localStorage.setItem('bestRaceTime' + this.numofCircles,
                    raceTime);

            game.time.events.add(2000, this.createButton);
            this.cPoint.destroy();
            this.raceComplete = true;
            this.showModal(raceTime, this.numofCircles, localStorage.getItem(
                'bestRaceTime' + this.numofCircles), this.game);
        }
    },

    startTimers: function() {
        startCircleTime = new Date().getTime();
        startRaceTime = new Date().getTime();
        this.canMove = true;
        this.raceComplete = false;
        velocity = 0;
        completedCircles = 0;
    },

    goToState: function() {
        game.state.start(this.name);
    },

    createButton: function() {
        var playAgain = game.add.button(200, 50,
            "playAgain", that.goToState, {
                name: "GameSettings"
            });
        playAgain.anchor.setTo(0.5);
        playAgain.scale.setTo(0.5);
        playAgain.fixedToCamera = true;
    },

    localStorageInit: function() {
        if (localStorage.getItem('bestRaceTime' + this.numofCircles) == null)
            localStorage.setItem('bestRaceTime' + this.numofCircles, Number.MAX_VALUE);
        if (localStorage.getItem('bestCircleTime') == null)
            localStorage.setItem('bestCircleTime', Number.MAX_VALUE);
    },

    render: function() {
        //game.debug.text("fps" + game.time.fps || '--', 2, 14, "#00ff00");
    },

    showModal: function(raceTime, numofCircles, bestRaceTime, game) {
        jQuery(function($) {
            var Modal = Backbone.Modal.extend({
                template: '#modal-template',
                submitEl: '.bbm-button',
                events: {
                    'click .bbm-button': 'playAgain'
                },
                playAgain: function() {
                    game.state.start('GameSettings');
                }
            });

            var modalView = new Modal({
                model: new Backbone.Model({
                    result: raceTime,
                    numOfCircles: numofCircles,
                    bestResult: bestRaceTime
                })
            });
            $('.app').html(modalView.render().el);
        });
    }
};
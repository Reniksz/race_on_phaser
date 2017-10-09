var preload = function(game) {};

preload.prototype = {
	
    preload: function() {
        var preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'preload');
        preloadBar.anchor.setTo(0.5);
        this.game.load.setPreloadSprite(preloadBar);

        //load assets
        game.load.tilemap('tilemap', 'assets/json/asphalt.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('tilesRoad', 'assets/Spritesheets/ss_road.png');
        game.load.image('gametitle', 'assets/PNG/UI/background.png');
        game.load.image('play', 'assets/PNG/UI/play_button.png');
        game.load.image('arrowLeft', 'assets/PNG/UI/arrow_left_2.png');
        game.load.image('arrowRight', 'assets/PNG/UI/arrow_right_2.png');
        game.load.image('ok', 'assets/PNG/UI/start.png');
        game.load.image('playAgain', 'assets/PNG/UI/playagain.png');
        game.load.image('settingsTitle', 'assets/PNG/UI/settingsBackground.png');
        game.load.spritesheet('cPoint', 'assets/Spritesheets/cPoint.png', 64, 64);
        game.load.atlasXML('carsXML', 'assets/Spritesheets/spritesheet_vehicles.png',
            'assets/Spritesheets/spritesheet_vehicles.xml');
        game.load.atlasXML('objsXML', 'assets/Spritesheets/spritesheet_objects.png',
            'assets/Spritesheets/spritesheet_objects.xml');
        game.load.physics('physicsCar', 'assets/json/playerCar.json');
    },
	
    create: function() {
        this.state.start('GameTitle');
    }
};
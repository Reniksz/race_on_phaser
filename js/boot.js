var boot = function(game) {};

boot.prototype = {
	
    preload: function() {
        this.load.image('preload', 'assets/PNG/UI/loading_text.png');
    },
	
    create: function() {
        this.game.stage.backgroundColor = '#fff';
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
		
        this.state.start('Preload');
    }
};
var boot = function(game){}

boot.prototype = {
	preload: function()
	{
		this.load.image('preload', 'assets/PNG/UI/loading_text.png');
	},
	create: function()
	{
		this.game.stage.backgroundColor = '#fff';
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.scale.pageAlignHorizontally = true;
		//this.scale.minWidth = 240;
		//this.scale.minHeight = 170;
		//this.scale.maxWidth = 2880;
		//this.scale.maxHeight = 1920;
		
		this.state.start('Preload');
	}
};
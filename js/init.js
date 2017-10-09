var game = new Phaser.Game(document.getElementById("phaser-game").offsetWidth,
	document.getElementById("phaser-game").offsetHeight, Phaser.CANVAS, "phaser-game");
	
game.state.add('Boot', boot);
game.state.add('Preload', preload);
game.state.add('GameTitle', gameTitle);
game.state.add('GameSettings', gameSettings);
game.state.add('TheGame', theGame);

game.state.start('Boot');
var divWidth = document.getElementById("phaser-game").offsetWidth;
var divHeight = document.getElementById("phaser-game").offsetHeight;

var game = new Phaser.Game(divWidth,divHeight, Phaser.AUTO, "phaser-game"); 
game.state.add('Boot', boot);
game.state.add('Preload', preload);
game.state.add('GameTitle', gameTitle);
game.state.add('GameSettings', gameSettings);
game.state.add('TheGame', theGame);
game.state.add('GameOver', gameOver);

game.state.start('Boot');
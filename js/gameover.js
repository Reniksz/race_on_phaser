var gameOver = function(game){}
gameOver.prototype = {
	
	init: function()
	{
		this.game.world.width = document.getElementById("phaser-game").offsetWidth;
		this.game.world.height = document.getElementById("phaser-game").offsetHeight;
	},
  	create: function(){
		var declinationText = "";
		switch(true)
		{
			case numofCircles == 1: 
				this.declinationText = "круг";
				break;
			case numofCircles > 1 && numofCircles < 5:
				console.log("2 rheuf");
				this.declinationText = "круга";
				break;
			case numofCircles > 4 && numofCircles < 10:
				this.declinationText = "кругов";
				break;
			default:
				break;
		}
		var youResult = this.game.add.text(game.world.centerX,game.world.centerY - 200, "Ваш результат: " + raceTime, {
			font: "40px Arial",
			fill: "black",
			fontWeight: "bold",
		});
		youResult.anchor.setTo(0.5);
  		var resultText = this.game.add.text(game.world.centerX,game.world.centerY - 100, "Лучший результат за " + numofCircles + " " + this.declinationText + ": " + localStorage.getItem('bestRaceTime' + numofCircles), {
			font: "30px Arial",
			fill: "black",
			fontWeight: "bold",
		});
		resultText.anchor.setTo(0.5);
		var playAgain = this.game.add.button(game.world.centerX,game.world.centerY + 50,"playAgain",this.goToSettings,this);
		playAgain.anchor.setTo(0.5);
	},
	goToSettings: function(){
		this.game.state.start("GameSettings");
	}
}
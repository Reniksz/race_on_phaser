var gameSettings = function(game) {};

gameSettings.prototype = {
    numofCircles: 2,

    init: function() {
        this.game.world.width = document.getElementById("phaser-game").offsetWidth;
        this.game.world.height = document.getElementById("phaser-game").offsetHeight;
        that = this;
    },

    create: function() {
        var settingsTitle = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY -
            220,
            'settingsTitle');
        settingsTitle.anchor.setTo(0.5);
        game.add.tween(settingsTitle).from({
            x: this.game.world.centerX - 200
        }, 700, Phaser.Easing.Bounce.Off, true);

        var StaticText = game.add.text(game.world.centerX, game.world.centerY - 120, "Circles", {
            font: "70px Arial",
            fill: "black",
            fontWeight: "bold",
        });
        StaticText.anchor.setTo(0.5);

        var textCircles = game.add.text(game.world.centerX, game.world.centerY, this.numofCircles, {
            font: "80px Arial",
            fill: "black",
            fontWeight: "bold",
        });
        textCircles.anchor.setTo(0.5);

        var arrowLeft = this.game.add.button(this.game.world.centerX - 150, this.game.world.centerY,
            'arrowLeft', this.editNumofCircles, {
                i: -1,
                DynamicText: textCircles
            }, this);
        arrowLeft.anchor.setTo(0.5);
        arrowLeft.alpha = 0.5;
        arrowLeft.onInputOver.add(this.overButton, this);
        arrowLeft.onInputOut.add(this.outButton, this);

        var arrowRight = this.game.add.button(this.game.world.centerX + 150, this.game.world.centerY,
            'arrowRight', this.editNumofCircles, {
                i: 1,
                DynamicText: textCircles
            }, this);
        arrowRight.anchor.setTo(0.5);
        arrowRight.alpha = 0.5;
        arrowRight.onInputOver.add(this.overButton, this);
        arrowRight.onInputOut.add(this.outButton, this);

        var okButton = this.game.add.button(this.game.world.centerX, this.game.world.centerY + 150,
            'ok', this.playTheGame, this);
        okButton.anchor.setTo(0.5);
    },

    editNumofCircles: function() {
        if ((this.i < 0 && that.numofCircles > 1) || this.i > 0 && that.numofCircles < 9)
            that.numofCircles += this.i;
        this.DynamicText.text = that.numofCircles;
    },

    playTheGame: function() {
        this.game.state.start('TheGame', true, false, this.numofCircles);
    },

    overButton: function(button) {
        button.alpha = 1;
    },

    outButton: function(button) {
        button.alpha = 0.5;
    }
};
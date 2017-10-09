var gameTitle = function(game) {};

gameTitle.prototype = {

    init: function() {
        this.game.world.width = document.getElementById("phaser-game").offsetWidth;
        this.game.world.height = document.getElementById("phaser-game").offsetHeight;
    },

    create: function() {
        var gameTitle = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY - 100,
            'gametitle');
        gameTitle.anchor.setTo(0.5);

        var playButton = this.game.add.button(this.game.world.centerX, this.game.world.centerY + 100,
            'play', this.toTheState, {
                name: "GameSettings"
            });
        playButton.anchor.setTo(0.5);
        playButton.onInputOver.add(this.overButton, this);
        playButton.onInputOut.add(this.outButton, this);
    },

    toTheState: function() {
        game.state.start(this.name);
    },

    overButton: function(button) {
        button.scale.setTo(1.1);
    },

    outButton: function(button) {
        button.scale.setTo(1);
    }
};
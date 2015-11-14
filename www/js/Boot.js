define(['phaser', 'Preloader', 'Game'], function (Phaser, Preloader, Game) {
    'use strict';

    function Boot (game) {
        // code me!
    }

    Boot.prototype.constructor = Boot;

    Boot.prototype.init = function () {
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
    };
    
    Boot.prototype.create = function () {
        this.game.state.add('Preloader', Preloader);
        this.game.state.add('Game', Game);
        this.game.state.start('Preloader');
    };

    return Boot;
});
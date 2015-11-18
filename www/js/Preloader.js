define(['phaser'], function (Phaser) {
    'use strict';
    
    function Preloader (game) {
        // use init method!
    }
    
    Preloader.prototype.constructor = Preloader;
    
    Preloader.prototype.preload = function () {
	    // load audio
	    this.load.audio('sfx_kick', 'assets/kick.ogg');
	    this.load.audio('sfx_whistle', 'assets/whistle.ogg');
	    this.load.audio('sfx_ahh', 'assets/ahh.ogg');
	    this.load.audio('sfx_celebration', 'assets/celebration.ogg');

        // load images
        this.load.image('bg', 'assets/bg.png');
        this.load.image('ball', 'assets/ball.png');
	    this.load.image('fg_menu', 'assets/fg_menu.png');
	    this.load.image('fg_black', 'assets/fg_black.png');
	    this.load.image('btn_newgame', 'assets/btn_newgame.png');
	    this.load.image('btn_exit', 'assets/btn_exit.png');
    };
    
    Preloader.prototype.create = function () {
        this.game.state.start('Menu');
    };
    
    return Preloader;
});
define(['phaser'], function (Phaser) {
    'use strict';
    
    function Preloader (game) {
        // code me!
    }
    
    Preloader.prototype.constructor = Preloader;
    
    Preloader.prototype.preload = function () {        
        // load city 01
        this.load.image('bg', 'assets/bg.png');
        this.load.image('ball', 'assets/ball.png');
    };
    
    Preloader.prototype.create = function () {
        this.game.state.start('Game');
    };
    
    return Preloader;
});
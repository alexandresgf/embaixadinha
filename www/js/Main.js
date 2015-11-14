define(['phaser', 'Boot'], function (Phaser, Boot) {
    'use strict';

    var game;

    game = new Phaser.Game(450, 800, Phaser.AUTO, 'game');
    game.state.add('Boot', Boot);
    game.state.start('Boot');
});
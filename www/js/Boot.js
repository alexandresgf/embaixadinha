define(['phaser', 'Preloader', 'Menu', 'Game', 'GameOver', 'Ads'], function (Phaser, Preloader, Menu, Game, GameOver, Ads) {
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
	    // start admob
	    if (AdMob) {
		    AdMob.createBanner({
			    adId: 'ca-app-pub-6827992750433454/4589489121',
			    autoShow: false,
			    isTesting: true,
			    overlap: true
		    });

		    AdMob.prepareInterstitial({
			    adId: 'ca-app-pub-6827992750433454/7542955524',
			    autoShow: false,
			    isTesting: true,
			    overlap: true
		    });
	    }

	    // setup game states
        this.game.state.add('Preloader', Preloader);
	    this.game.state.add('Menu', Menu);
        this.game.state.add('Game', Game);
	    this.game.state.add('GameOver', GameOver);
	    this.game.state.add('Ads', Ads);
        this.game.state.start('Preloader');
    };

    return Boot;
});
define(['phaser', 'Preloader', 'Menu', 'Game', 'GameOver', 'Ads'], function (Phaser, Preloader, Menu, Game, GameOver, Ads) {
    'use strict';

    function Boot (game) {
        // use init method!
    }

    Boot.prototype.constructor = Boot;

    Boot.prototype.init = function () {
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
    };
    
    Boot.prototype.create = function () {
	    // start analytics
	    window.analytics.startTrackerWithId('UA-70227806-2');

	    // start admob
	    if (AdMob) {
		    AdMob.createBanner({
			    adId: 'ca-app-pub-7403543083567100/2876399875',
			    autoShow: false,
			    isTesting: false,
			    overlap: true
		    });

		    AdMob.prepareInterstitial({
			    adId: 'ca-app-pub-7403543083567100/4353133078',
			    autoShow: false,
			    isTesting: false,
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
define(['phaser', 'Preloader', 'Menu', 'Help', 'Game', 'GameOver', 'Ads'], function (Phaser, Preloader, Menu, Help, Game, GameOver, Ads) {
    'use strict';

    function Boot (game) {
        // use init method!
    }

    Boot.prototype.constructor = Boot;

    Boot.prototype.init = function () {
	    // verify votes
	    var bootUp = JSON.parse(localStorage.getItem('bootUp')) || { openCount: 1, voted: false };

        if ((bootUp.openCount === 2 || !(bootUp.openCount % 5)) && !bootUp.voted) {
	        navigator.notification.confirm(
			        'Gostaria de avaliar o nosso jogo?!',

			        function (index) {
				        switch (index) {
					        case 1:
						        bootUp.openCount++;
						        break;

					        case 2:
						        bootUp.voted = true;
						        window.open(
								        'https://play.google.com/store/apps/details?id=br.com.brofistcorp.embaixadinha',
								        '_system'
						        );
						        break;

					        case 3:
						        bootUp.voted = true;
						        break;

				        }

				        localStorage.setItem('bootUp', JSON.stringify(bootUp));
			        },

			        'VOTE!',

			        ['Depois', 'Votar!', 'Não']
	        );
        } else {
	        bootUp.openCount++;
	        localStorage.setItem('bootUp', JSON.stringify(bootUp));
        }

	    // setup phaser screen
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
    };
    
    Boot.prototype.create = function () {
	    // start analytics
	    window.analytics.startTrackerWithId('UA-70227806-2');

	    // start admob
	    if (AdMob)
		    AdMob.prepareInterstitial({
			    adId: 'ca-app-pub-7403543083567100/4353133078',
			    autoShow: false,
			    isTesting: false,
			    overlap: true
		    });

	    // setup counters to show admob
	    localStorage.setItem('showAdsCounter', this.game.rnd.integerInRange(1, 3));
	    localStorage.setItem('newGameCounter', 0);

	    // remove last counter if exists
	    if (localStorage.getItem('newGameCount'))
	        localStorage.removeItem('newGameCount');

	    // setup game states
        this.game.state.add('Preloader', Preloader);
	    this.game.state.add('Menu', Menu);
	    this.game.state.add('Help', Help);
        this.game.state.add('Game', Game);
	    this.game.state.add('GameOver', GameOver);
	    this.game.state.add('Ads', Ads);
        this.game.state.start('Preloader');
    };

    return Boot;
});
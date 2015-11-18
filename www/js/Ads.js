define(['phaser'], function (Phaser) {
	'use strict';

	function Ads (game) {
		// listen when ad is closed
		document.addEventListener('onAdDismiss', function (data) {
			if (localStorage.quit == 0)
				game.state.start('Game');
			else if (localStorage.quit == 1)
				game.state.start('Menu');
		});
	}

	Ads.prototype.constructor = Ads;

	Ads.prototype.create = function () {
		// set backscreen color
		this.game.stage.backgroundColor = '#000';

		// start admob
		if (AdMob && navigator.connection.type !== Connection.NONE)
			AdMob.showInterstitial();
		else if (localStorage.quit == 0)
			this.game.state.start('Game');
		else if (localStorage.quit == 1)
			this.game.state.start('Menu');
	};

	return Ads;
});
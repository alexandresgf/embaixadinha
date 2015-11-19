define(['phaser'], function (Phaser) {
	'use strict';

	function Ads (game) {
		// listen when ad is closed
		document.addEventListener('onAdDismiss', function (data) {
			var quit = Number(localStorage.getItem('quit'));

			if (quit)
				game.state.start('Menu');
			else
				game.state.start('Game');
		});
	}

	Ads.prototype.constructor = Ads;

	Ads.prototype.create = function () {
		var quit = Number(localStorage.getItem('quit'));

		// set backscreen color
		this.game.stage.backgroundColor = '#000';

		// start admob
		if (AdMob && navigator.connection.type !== Connection.NONE)
			AdMob.showInterstitial();
		else if (quit)
			this.game.state.start('Menu');
		else
			this.game.state.start('Game');
	};

	return Ads;
});
define(['phaser'], function (Phaser) {
	'use strict';

	function Ads (game) {
		// listen when ad is closed
		document.addEventListener('onAdDismiss', function (data) {
			if (!localStorage.quit)
				game.state.start('Game');
			else
				game.state.start('Menu');
		});
	}

	Ads.prototype.constructor = Ads;

	Ads.prototype.create = function () {
		// start admob
		if (AdMob)
			AdMob.showInterstitial();
	};

	return Ads;
});
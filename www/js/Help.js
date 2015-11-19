define(['phaser'], function (Phaser) {
	'use strict';

	function Help (game) {
		// use init method!
	}

	Help.prototype.constructor = Help;

	Help.prototype.create = function () {
		// step counter
		this._step = 1;

		// page 01
		this.game.add.sprite(0, 0, 'how_to_p01');

		// page 02
		this._page02 = this.game.add.sprite(this.game.width, 0, 'how_to_p02');

		// add text label
		var label = 'TAP para continuar';
		var labelConf = { font: '30px Lucida Console', fill: '#fff', align: 'center' };
		this._label = this.game.add.text(this.game.camera.width / 2, this.game.camera.height - 200, label, labelConf);
		this._label.anchor.set(0.5);

		// add the blinking text
		this.game.add.tween(this._label).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true, 0, 500, true);

		// tap to next page
		this.input.onTap.add(function () {
			switch (this._step) {
				case 1:
					this.game.add.tween(this._page02).to({ x: 0 }, 100, Phaser.Easing.Linear.None, true);
					this._step++;
					break;

				case 2:
					this.game.state.start('Game');
					break;
			}
		}, this);
	};

	return Help;
});
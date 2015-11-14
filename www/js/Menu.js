define(['phaser'], function (Phaser) {
	'use strict';

	function Menu (game) {
		// code me!
	}

	Menu.prototype.constructor = Menu;

	Menu.prototype.create = function () {
		// add the backscreen color
		this.game.stage.backgroundColor = '#54992e';

		// add background
		this.game.add.sprite(0, 0, 'bg');

		// add foreground
		this.game.add.sprite(0, 0, 'fg_menu');

		// add text label
		var label = 'TAP para começar';
		var labelConf = { font: '30px Lucida Console', fill: '#fff', align: 'center' };
		this._label = this.game.add.text(this.game.camera.width / 2, this.game.camera.height - 200, label, labelConf);
		this._label.anchor.set(0.5);

		// add the blinking text
		this.game.add.tween(this._label).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true, 0, 500, true);

		// tap to start
		this.input.onTap.add(function () {
			this.game.state.start('Game');
		}, this);
	};

	return Menu;
});
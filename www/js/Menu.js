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

		// add buttons
		this._btnNewGame = this.game.add.button(this.game.camera.width / 2, this.game.camera.height / 2 + 150, 'btn_play', this.play, this);
		this._btnExit = this.game.add.button(this.game.camera.width / 2, this.game.camera.height / 2 + 250, 'btn_help', this.help, this);
		this._btnNewGame.anchor.set(0.5);
		this._btnExit.anchor.set(0.5);
	};

	Menu.prototype.play = function () {
		this.game.state.start('Game');
	};

	Menu.prototype.help = function () {
		this.game.state.start('Help');
	};

	return Menu;
});
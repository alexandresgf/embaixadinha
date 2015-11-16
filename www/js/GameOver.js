define(['phaser'], function (Phaser) {
	'use strict';

	function GameOver (game) {
		// code me!
	}

	GameOver.prototype.constructor = GameOver;

	GameOver.prototype.create = function () {
		// add backscreen color
		this.game.stage.backgroundColor = '#54992e';

		// add background
		this.game.add.sprite(0, 0, 'bg');

		// add foreground
		this.game.add.sprite(0, 0, 'fg_black');

		// load record
		var record = localStorage.getItem('record');

		// add title for record
		var title = 'RECORD\n' + this.toHHMMSS(record);
		var titleConf = { font: '50px Lucida Console', fill: '#fff', align: 'center' };
		this._title = this.game.add.text(this.game.camera.width / 2, this.game.camera.height / 2 - 200, title, titleConf);
		this._title.anchor.set(0.5);

		// add buttons
		this._btnNewGame = this.game.add.button(this.game.camera.width / 2, this.game.camera.height / 2, 'btn_newgame', this.newGame, this);
		this._btnExit = this.game.add.button(this.game.camera.width / 2, this.game.camera.height / 2 + 100, 'btn_exit', this.exit, this);
		this._btnNewGame.anchor.set(0.5);
		this._btnExit.anchor.set(0.5);
	};

	GameOver.prototype.toHHMMSS = function (sec_num) {
		var hours   = Math.floor(sec_num / 3600);
		var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
		var seconds = sec_num - (hours * 3600) - (minutes * 60);

		if (hours   < 10)
			hours   = '0'+ hours;

		if (minutes < 10)
			minutes = '0' + minutes;

		if (seconds < 10)
			seconds = '0' + seconds;

		return hours + ':' + minutes + ':' + seconds;
	};

	GameOver.prototype.newGame = function () {
		if (localStorage.newGameCount) {
			localStorage.newGameCount = Number(localStorage.newGameCount) + 1;

			if (localStorage.newGameCount == 3) {
				localStorage.newGameCount = 0;
				localStorage.quit = 0;
				this.game.state.start('Ads');

				return;
			}
		} else {
			localStorage.newGameCount = 1;
		}

		this.game.state.start('Game');
	};

	GameOver.prototype.exit = function () {
		if (AdMob)
			AdMob.hideBanner();

		localStorage.quit = 1;
		this.game.state.start('Ads');
	};

	return GameOver;
});
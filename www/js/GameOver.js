define(['phaser'], function (Phaser) {
	'use strict';

	function GameOver (game) {
		// use init method!
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
		var showAdsCounter = Number(localStorage.getItem('showAdsCounter'));
		var newGameCounter = Number(localStorage.getItem('newGameCounter'));

		if (newGameCounter === showAdsCounter) {
			localStorage.setItem('quit', 0);
			localStorage.setItem('showAdsCounter', this.game.rnd.integerInRange(1, 3));
			localStorage.setItem('newGameCounter', 0);
			this.game.state.start('Ads');
		} else {
			localStorage.setItem('newGameCounter', ++newGameCounter);
			this.game.state.start('Game');
		}
	};

	GameOver.prototype.exit = function () {
		localStorage.setItem('quit', 1);
		this.game.state.start('Ads');
	};

	return GameOver;
});
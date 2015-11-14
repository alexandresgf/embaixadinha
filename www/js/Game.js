define(['phaser'], function (Phaser) {
	'use strict';

	function Game (game) {
        // the ball
		this._ball = null;

		// kick timer
		this._kickTimer = 0;

		// string timer
		this._timerTitle = null;

		// current time (sec)
		this._timerCurr = 0;
    }

    Game.prototype.constructor = Game;

    Game.prototype.create = function () {
	    // start arcade physics
	    this.game.physics.startSystem(Phaser.Physics.ARCADE);

	    // set gravity on y-axis
	    this.game.physics.arcade.gravity.y = 950;

	    // add the backscreen color
	    this.game.stage.backgroundColor = '#54992e';

	    // add the background
	    this.game.add.sprite(0, 0, 'bg');

	    // setup the ball
	    this._ball = this.game.add.sprite(this.game.camera.width / 2, this.game.camera.height / 2, 'ball');
	    this._ball.anchor.set(0.5);
	    this._ball.inputEnabled = true;
	    this._ball.events.onInputDown.add(this.kickUp, this);

	    // add physics to the ball
	    this.game.physics.enable(this._ball, Phaser.Physics.ARCADE);
	    this._ball.body.collideWorldBounds = true;

	    // add time counter
	    this.game.time.events.loop(Phaser.Timer.SECOND, this.toHHMMSS, this);

	    // add timer title
	    var label = '00:00:00';
	    var labelConf = { font: '60px Lucida Console', fill: '#fff', align: 'center' };
	    this._timerTitle = this.game.add.text(0, 0, label, labelConf);
	    this._timerTitle.x = this.game.camera.width / 2;
	    this._timerTitle.y = this._timerTitle.height / 2 + 10;
	    this._timerTitle.anchor.set(0.5);
    };

	Game.prototype.update = function () {
		// game over
		if (this._ball.body.velocity.y === 0) {
			this._timerCurr = 0;
			this.game.state.start('Game');
		}
	};

	Game.prototype.kickUp = function () {
		if (this.game.time.now > this._kickTimer) {
			this._ball.body.velocity.y = -500;
			this._kickTimer = this.game.time.now + 1000;
		}
	};

	Game.prototype.toHHMMSS = function () {
		var sec_num = ++this._timerCurr;
		var hours   = Math.floor(sec_num / 3600);
		var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
		var seconds = sec_num - (hours * 3600) - (minutes * 60);

		if (hours   < 10)
			hours   = '0'+ hours;

		if (minutes < 10)
			minutes = '0' + minutes;

		if (seconds < 10)
			seconds = '0' + seconds;

		this._timerTitle.setText(hours + ':' + minutes + ':' + seconds);
	};

    return Game;
});
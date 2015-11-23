define(['phaser'], function (Phaser) {
	'use strict';

	var global_ball;

	function Game (game) {
        // use init method!
    }

    Game.prototype.constructor = Game;

	Game.prototype.init = function () {
		// google analytics track game screen
		window.analytics.trackView('Embaixadinha - Game Screen');

		// the ball
		this._ball = null;

		// kick timer
		this._kickTimer = 0;

		// kick power
		this._kickPow = 300;

		// string timer
		this._timerTitle = null;

		// current time (sec)
		this._timerCurr = 0;

		// current record
		this._record = localStorage.getItem('record') || 0;

		// new record flag
		this._isNewRecord = false;

		// sfx kick
		this._sfxKick = null;

		// sfx whistle
		this._sfxWhistle = null;

		// sfx lose ball
		this._sfxAhh = null;

		// sfx new record
		this._sfxCelebration = null;
	};

    Game.prototype.create = function () {
	    // start arcade physics
	    this.game.physics.startSystem(Phaser.Physics.ARCADE);

	    // set gravity on y-axis
	    this.game.physics.arcade.gravity.y = 950;

	    // add backscreen color
	    this.game.stage.backgroundColor = '#54992e';

	    // add background
	    this.game.add.sprite(0, 0, 'bg');

	    // add sound effects
	    this._sfxWhistle = this.game.add.audio('sfx_whistle');
	    this._sfxKick = this.game.add.audio('sfx_kick');
	    this._sfxAhh = this.game.add.audio('sfx_ahh');
	    this._sfxCelebration = this.game.add.audio('sfx_celebration');

	    // create ball
	    this._ball = this.game.add.sprite(this.game.width / 2, this.game.height, 'ball');

	    // add physics to the ball
	    this.game.physics.enable(this._ball, Phaser.Physics.ARCADE);

	    // setup ball
	    this._ball.anchor.set(0.5);
	    this._ball.inputEnabled = true;
	    this._ball.events.onInputDown.add(this.kickUp, this);
	    global_ball = this._ball;

	    // setup accelerometer
	    this._watchAccID = navigator.accelerometer.watchAcceleration(
			    function (acceleration) {
				    global_ball.body.velocity.x += acceleration.x * -3;
			    },

			    function () {
				    throw '[ERROR] Can\'t get acceleration values.';
			    },

			    { frequency: 5 }
	    );

	    // add timer title
	    var label = '00:00:00';
	    var labelConf = { font: '60px Lucida Console', fill: '#fff', align: 'center' };
	    this._timerTitle = this.game.add.text(0, 0, label, labelConf);
	    this._timerTitle.x = this.game.width / 2;
	    this._timerTitle.y = this._timerTitle.height / 2 + 10;
	    this._timerTitle.anchor.set(0.5);

	    // add timer events
	    this.game.time.events.loop(Phaser.Timer.SECOND, this.toHHMMSS, this);
	    this.game.time.events.loop(Phaser.Timer.SECOND * 10, this.updatePower, this);

	    // start the game
	    this._sfxWhistle.play();
	    this.game.add.tween(this._ball.body.velocity).to({ y: -900 }, 100, Phaser.Easing.Linear.None, true);
    };

	Game.prototype.update = function () {
		// show if the ball is ready to kick
		if (this.game.time.now > this._kickTimer)
			this._ball.tint = 0x00ff00;
		else
			this._ball.tint = 0xffffff;

		// game over
		if (this._ball.body.y > this.game.height) {
			this._sfxAhh.play();
			this.game.time.events.removeAll();
			navigator.accelerometer.clearWatch(this._watchAccID);
			this.save();
			this.game.state.start('GameOver');
		}
	};

	Game.prototype.kickUp = function () {
		if (this.game.time.now > this._kickTimer) {
			this._sfxKick.play();

			if (this.game.input.x < this._ball.x)
				this._ball.body.velocity.x += this._kickPow;
			else if (this.game.input.x > this._ball.x)
				this._ball.body.velocity.x -= this._kickPow;

			this._ball.body.velocity.y = -500;
			this._kickTimer = this.game.time.now + 500;
		}
	};

	Game.prototype.updatePower = function () {
		this._kickPow += 25;
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

		if (sec_num > this._record && !this._isNewRecord && this._record !== 0) {
			this._sfxCelebration.play();
			this._isNewRecord = true;
		}

		this._timerTitle.setText(hours + ':' + minutes + ':' + seconds);
	};

	Game.prototype.save = function () {
		if (this._timerCurr > this._record) {
			this._record = this._timerCurr;
			this._isNewRecord = false;
		}

		this._timerCurr = 0;
		localStorage.setItem('record', this._record);
	};

    return Game;
});
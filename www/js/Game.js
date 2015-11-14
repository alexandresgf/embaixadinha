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

		// sfx kick
		this._sfxKick = null;

		// sfx whistle
		this._sfxWhistle = null;
    }

    Game.prototype.constructor = Game;

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

	    // setup the ball
	    this._ball = this.game.add.sprite(this.game.camera.width / 2, this.game.camera.height, 'ball');
	    this._ball.anchor.set(0.5);
	    this._ball.inputEnabled = true;
	    this._ball.events.onInputDown.add(this.kickUp, this);

	    // add physics to the ball
	    this.game.physics.enable(this._ball, Phaser.Physics.ARCADE);

	    // add timer title
	    var label = '00:00:00';
	    var labelConf = { font: '60px Lucida Console', fill: '#fff', align: 'center' };
	    this._timerTitle = this.game.add.text(0, 0, label, labelConf);
	    this._timerTitle.x = this.game.camera.width / 2;
	    this._timerTitle.y = this._timerTitle.height / 2 + 10;
	    this._timerTitle.anchor.set(0.5);

	    // add timer
	    this.game.time.events.loop(Phaser.Timer.SECOND, this.toHHMMSS, this);

	    // start the game
	    this._sfxWhistle.play();
	    this.game.add.tween(this._ball.body.velocity).to({ y: -900 }, 100, Phaser.Easing.Linear.None, true);

	    // AdMob
	    if (AdMob)
		    AdMob.createBanner({
			    adId: 'ca-app-pub-8801691334215483/6136203255',
			    position: AdMob.AD_POSITION.BOTTOM_CENTER,
			    autoShow: true,
			    isTesting: true,
			    overlap: true
		    });
    };

	Game.prototype.update = function () {
		// game over
		if (this._ball.body.y > this.game.camera.height) {
			this.game.time.events.removeAll();
			this.save();
			this.game.state.start('GameOver');
		}
	};

	Game.prototype.kickUp = function () {
		if (this.game.time.now > this._kickTimer) {
			this._sfxKick.play();
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

	Game.prototype.save = function () {
		var record = localStorage.getItem('record');

		if (record === null || this._timerCurr > record)
			record = this._timerCurr;

		this._timerCurr = 0;
		localStorage.setItem('record', record);
	};

    return Game;
});
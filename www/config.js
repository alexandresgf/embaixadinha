require.config({
    baseUrl: 'js/',
    paths: {
        phaser: '../lib/phaser'
    },
    shim: {
        'phaser': {
            exports: 'Phaser'
        }
    }
});

requirejs(['Main']);
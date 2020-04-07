(function () {
    'use strict';

    requirejs.config({
        baseUrl: "src/",

        paths: {
            'phaser':'libs/phaser/build/phaser',
            'phaser3-nineslice' : 'libs/plugins/nineSlice/nineslice.min',
            'game_init' :'bundle/gameBundle'
        },

        shim: {
            'phaser': {
                exports: 'Phaser'
            }
        }
    });

    define(["require", "game_init", "phaser"],function(require, GameInit, Phaser)
    {   
        var game_init = new  GameInit();
        game_init.start();
        return;
    });
}());

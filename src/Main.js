'use strict';

let cursors;

let config = {
    type: Phaser.WEBGL,
    width: 640,
    height: 480,
    physics:{
        default: 'arcade',
        arcade: {
            debug: false,
            gravity:{
                x:0,
                y:0
            }
        }
    },
    scene: [Play,Menu]
};

let game = new Phaser.Game(config);

// reserve keyboard vars
//let keyLEFT, keyRIGHT, keyUP, keyDOWN, keyF;
let config = {
    type: Phaser.CANVAS,
    width: 1280,
    height: 960,
    scene: [Menu, Play]
}

let game = new Phaser.Game(config);

// reserve keyboard vars
let keyLEFT, keyRIGHT, keyUp, keyDown;
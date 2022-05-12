let config = {
    type: Phaser.Auto,
    width: 640,
    height: 480,
    scene: [Play,Menu]
}

let game = new Phaser.Game(config);

// reserve keyboard vars
let keyLEFT, keyRIGHT, keyUP, keyDOWN;
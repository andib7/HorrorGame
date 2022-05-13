class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        // load images/tile sprites
        this.load.image('player', './assets/sprites/Crab.png');
    }

    create() {
        //create game objects
        this.player = new Player(this, 100, 100, 'player').setOrigin(.5, 0);

        // Use Phaser-provided cursor key creation function
        cursors = this.input.keyboard.createCursorKeys();

    }

    update() {
        this.player.update(cursors);
    }
    
}
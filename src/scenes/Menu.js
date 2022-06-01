class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        this.load.image('main', './assets/background/mainscreen_120final.jpg');
        this.load.audio('sfx_pickup', './assets/audio/itempickup.wav');
    }

    create() {
        this.background = this.add.image(game.config.width / 2, game.config.height / 2, 'main');
        // Use Phaser-provided cursor key creation function
        cursors = this.input.keyboard.createCursorKeys();
    }

    update() {  
        if (cursors.space.isDown) {
            this.scene.start('playScene'); 
        }
    }
}
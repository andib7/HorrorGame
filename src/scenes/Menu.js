class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        this.load.image('main', './assets/background/mainscreen_120final.jpg');
        this.load.audio('sfx_pickup', './assets/audio/itempickup.wav'); //https://freesound.org/people/scholzi982/sounds/566188/
        this.load.audio('sfx_win', './assets/audio/endsound.wav'); //https://freesound.org/people/InspectorJ/sounds/346212/
        this.load.audio('sfx_page', './assets/audio/page.wav'); //https://freesound.org/people/flag2/sounds/63318/
        this.load.audio('sfx_tear', './assets/audio/tear.wav');  //https://freesound.org/people/F.M.Audio/sounds/556939/
        this.load.audio('sfx_footsteps', './assets/audio/footsteps.wav'); //https://freesound.org/people/Rudmer_Rotteveel/sounds/502507/
        this.load.audio('sfx_splash', './assets/audio/splash.wav'); //https://freesound.org/people/zxin/sounds/381243/
        //this.load.audio('sfx_playerstep', './assets/audio/playerfootstep.wav'); //could not get this to work correctly
        this.load.audio('music_background', './assets/audio/music.mp3'); //https://freesound.org/people/13NHarri/sounds/250676/
    }

    create() {
        this.background = this.add.image(game.config.width / 2, game.config.height / 2, 'main');
        // Use Phaser-provided cursor key creation function
        cursors = this.input.keyboard.createCursorKeys();
    }

    update() {  
        if (cursors.space.isDown) {
            this.sound.play('sfx_page');
            this.scene.start('playScene'); 
        }
    }
}
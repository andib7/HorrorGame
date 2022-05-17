class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        // load images/tile sprites
        this.load.image('background', './assets/background/background.png');
        this.load.atlas('playerAtlas', './assets/sprites/120_textureatlas.png', './assets/sprites/120map.json');
        this.load.image('metalFile', './assets/sprites/metalfile.jpg');
        this.load.image('metalBar', './assets/sprites/metalbar.jpg')
    }

    create() {
        //textConfig
        let textConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#ADD8E6',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }

        // Set up animations
        // Idle left
        this.anims.create({
            key: 'idle_left',
            frames: this.anims.generateFrameNames('playerAtlas', {
                prefix: 'idle_left_',
                start: 1,
                end: 3,
                suffix: '',
                zeroPad: 4
            }),
            frameRate: 5,
            repeat: -1,
            repeatDelay: 2500,
            yoyo: true
        });
        // Idle right
        this.anims.create({
            key: 'idle_right',
            frames: this.anims.generateFrameNames('playerAtlas', {
                prefix: 'idle_right_',
                start: 1,
                end: 3,
                suffix: '',
                zeroPad: 4
            }),
            frameRate: 5,
            repeat: -1,
            repeatDelay: 2500,
            yoyo: true
        });
        // Idle down
        this.anims.create({
            key: 'idle_down',
            frames: this.anims.generateFrameNames('playerAtlas', {
                prefix: 'idle_down_',
                start: 1,
                end: 3,
                suffix: '',
                zeroPad: 4
            }),
            frameRate: 5,
            repeat: -1,
            repeatDelay: 2500,
            yoyo: true
        });
        // Idle up
        this.anims.create({
            key: 'idle_up',
            frames: this.anims.generateFrameNames('playerAtlas', {
                prefix: 'idle_up_',
                start: 1,
                end: 3,
                suffix: '',
                zeroPad: 4
            }),
            frameRate: 5,
            repeat: -1,
            repeatDelay: 2500,
            yoyo: true
        });
        // Run left
        this.anims.create({
            key: 'run_left',
            frames: this.anims.generateFrameNames('playerAtlas', {
                prefix: 'run_left_',
                start: 1,
                end: 10,
                suffix: '',
                zeroPad: 4
            }),
            frameRate: 30,
            repeat: -1,
        });
        // Run right
        this.anims.create({
            key: 'run_right',
            frames: this.anims.generateFrameNames('playerAtlas', {
                prefix: 'run_right_',
                start: 1,
                end: 10,
                suffix: '',
                zeroPad: 4
            }),
            frameRate: 30,
            repeat: -1,
        });
        // Run down
        this.anims.create({
            key: 'run_down',
            frames: this.anims.generateFrameNames('playerAtlas', {
                prefix: 'run_down_',
                start: 1,
                end: 10,
                suffix: '',
                zeroPad: 4
            }),
            frameRate: 30,
            repeat: -1,
        });
        // Run up
        this.anims.create({
            key: 'run_up',
            frames: this.anims.generateFrameNames('playerAtlas', {
                prefix: 'run_up_',
                start: 1,
                end: 10,
                suffix: '',
                zeroPad: 4
            }),
            frameRate: 30,
            repeat: -1,
        });
        
        //create game objects
        this.background = this.add.image(game.config.width / 2, game.config.height / 2, 'background')
        this.player = new Player(this, 100, 100, 'playerAtlas').setOrigin(.5, 0); 
        this.object1 = new Interactable(this, game.config.width / 2, game.config.height / 2, 'metalFile', 0, "vase").setScale(.15);

        // Use Phaser-provided cursor key creation function
        cursors = this.input.keyboard.createCursorKeys();

        var self = this; //for some reason this is the only way I can actually display text
        
        //collider for interactable objects
        this.physics.add.collider(
            this.player,
            this.object1,
            function (_player, _object1) {
                if(_player.body.touching && _object1.body.touching){
                    this.objName = _object1.objectName;
                    self.add.text(50,50, "Interact with " + this.objName +"?");

                    //self.inputHandler();
                }
            }
        )
    }

    update() {
        this.player.update();
    }

    inputHandler(){
        this.userInp = window.prompt("Interact with item? (y or n)");
    }
    
}
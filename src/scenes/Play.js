class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        // load images/tile sprites
        this.load.atlas('playerAtlas', './assets/sprites/120_textureatlas.png', './assets/sprites/120map.json');
        this.load.image('background', './assets/background/background.png');
        this.load.image('background2', './assets/background/background2.jpg');
        this.load.image('bookshelf', './assets/sprites/bookshelf.PNG');
        this.load.image('bed', './assets/sprites/bed.png');
        this.load.image('drawer', './assets/sprites/drawer.png');
        this.load.image('door', './assets/sprites/door.png');
        this.load.image('trapdoor', './assets/sprites/trapdoor.png');
        this.load.image('trapdooropen', './assets/sprites/trapdooropen.png');
        this.load.image('metalfile', './assets/sprites/metalfile.png');
        this.load.image('metalbar', './assets/sprites/metalbar.png');
        this.load.image('net', './assets/sprites/net.png');
        this.load.image('key', './assets/sprites/key.png');
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
            frameRate: 10,
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
            frameRate: 10,
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
            frameRate: 10,
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
            frameRate: 10,
            repeat: -1,
        });
        
        //create game objects
        this.background = this.add.image(game.config.width / 2, game.config.height / 2, 'background');

        this.player = new Player(this, game.config.width / 2, game.config.height / 2, 'playerAtlas').setOrigin(.5, 0); 

        this.bookshelf = new Interactable(this, 380, 220, 'bookshelf', 0, "Bookcase").setScale(.8);
        this.drawer = new Interactable(this, 890, 210, 'drawer', 0, "Drawer").setScale(.8);
        this.bed = new Interactable(this, 1050, 720, 'bed', 0, "Bed").setScale(.8);
        this.trapDoor = new Interactable(this, 150, 415, 'trapdoor', 0, "Trap Door").setScale(.8);
        this.door = new Interactable(this, 1165, 215, 'door', 0, "Door").setScale(.8);
        
        this.metalFile = new Collectable(this, 400, 900, 'metalfile').setScale(.1);
        this.metalBar = new Collectable(this, 500, 900, 'metalbar').setScale(.1);
        this.net = new Collectable(this, 600, 900, 'net').setScale(.1);
        this.key = new Collectable(this, 700, 900, 'key').setScale(.1);

        var self = this; //for some reason this is the only way I can actually display text
        var currentText = self.add.text(50, 50, "NULL text");
        currentText.setVisible(false);
        // Use Phaser-provided cursor key creation function
        cursors = this.input.keyboard.createCursorKeys();
        
        //collider for interactable objects
        this.physics.add.collider(
            this.player,
            this.bookshelf,
            function (_player, _object) {
                if(_player.body.touching && _object.body.touching){
                    //self.add.text(50, 50, "Interact with " + _object1.objectName +"?");
                    this.userInp = window.prompt("Interact with bookshelf? (y or n)");
                    if(this.userInp == "y" && self.metalFile.found == true){
                        currentText.setVisible(false);
                        currentText = self.add.text(50, 50, "You look through the books and find nothing more");
                    } else if(this.userInp == "y"){
                        currentText.setVisible(false);
                        currentText = self.add.text(50, 50, "You look through the books and find a metal file");
                        self.sound.play('sfx_pickup');
                        self.metalFile.getItem();
                    }
                }
            }
        )
        this.physics.add.collider(
            this.player,
            this.drawer,
            function (_player, _object) {
                if (_player.body.touching && _object.body.touching) {
                    this.userInp = window.prompt("Interact with drawer? (y or n)");
                    if (this.userInp == "y" && self.net.found == true) {
                        currentText.setVisible(false);
                        currentText = self.add.text(50, 50, "You look through the drawer and find nothing more");
                    } else if (this.userInp == "y") {
                        currentText.setVisible(false);
                        currentText = self.add.text(50, 50, "You look through the drawer and find a net");
                        self.sound.play('sfx_pickup');
                        self.net.getItem();
                    }
                }
            }
        )
        this.physics.add.collider(
            this.player,
            this.bed,
            function (_player, _object) {
                if (_player.body.touching && _object.body.touching) {
                    this.userInp = window.prompt("Interact with bed? (y or n)");
                    if (this.userInp == "y" && self.metalBar.found == true || this.userInp == "y" && self.metalFile.found == false) {
                        currentText.setVisible(false);
                        currentText = self.add.text(50, 50, "You find nothing on the bed");
                    } else if (this.userInp == "y" && self.metalFile.found == true) {
                        currentText.setVisible(false);
                        currentText = self.add.text(50, 50, "You use the metal file to saw off a metal bar from the bed");
                        self.sound.play('sfx_pickup');
                        self.metalBar.getItem();
                    }
                }
            }
        )
        this.trapdoorOpen = false;
        this.physics.add.collider(
            this.player,
            this.trapDoor,
            function (_player, _object) {
                if (_player.body.touching && _object.body.touching) {
                    //self.add.text(50, 50, "Interact with " + _object1.objectName +"?");
                    this.userInp = window.prompt("Interact with trap door? (y or n)");
                    self.player.x++;
                    if (this.userInp == "y" && self.key.found == true && self.trapdoorOpen == true) {
                        currentText.setVisible(false);
                        currentText = self.add.text(50, 50, "You use the net in the trap door and find nothing more");
                    } else if (this.userInp == "y" && self.metalBar.found == false && self.trapdoorOpen == false) {
                        currentText.setVisible(false);
                        currentText = self.add.text(50, 50, "You try to open the trap door but it is too hard to open");
                    } else if (this.userInp == "y" && self.metalBar.found == true && self.trapdoorOpen == false) {
                        _object.setTexture('trapdooropen');
                        currentText.setVisible(false);
                        currentText = self.add.text(50, 50, "You pry open the trap door with the metal bar");
                        self.trapdoorOpen = true;
                    } else if (this.userInp == "y" && self.net.found == true && self.trapdoorOpen == true) {
                        currentText.setVisible(false);
                        currentText = self.add.text(50, 50, "You use the net in the trap door and find a rusted key");
                        self.sound.play('sfx_pickup');
                        self.key.getItem();
                    } else if (this.userInp == "y" && self.net.found == false && self.trapdoorOpen == true) {
                        currentText.setVisible(false);
                        currentText = self.add.text(50, 50, "You try to reach into the trap door but you fall in and die");
                    } 
                }
            }
        )
        this.physics.add.collider(
            this.player,
            this.door,
            function (_player, _object1) {
                if (_player.body.touching && _object1.body.touching) {
                    //self.add.text(50, 50, "Interact with " + _object1.objectName +"?");
                    this.userInp = window.prompt("Interact with door? (y or n)");
                    if (this.userInp == "y" && self.metalBar.found == false) {
                        currentText.setVisible(false);
                        currentText = self.add.text(50, 50, "You try to open the door but it won't budge");
                    } else if (this.userInp == "y" && self.metalBar.found == true && self.key.found == false) {
                        currentText.setVisible(false);
                        currentText = self.add.text(50, 50, "You try to pry open the door but you make too much sound so you get killed");
                    }
                    else if (this.userInp == "y" && self.key.found == true) {
                        currentText.setVisible(false);
                        currentText = self.add.text(50, 50, "You use the key to open the door and finally escape!");
                    }
                }
            }
        )
    }

    update() {
        this.player.update();
    }

}
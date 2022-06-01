class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        // load images/tile sprites
        this.load.atlas('playerAtlas', './assets/sprites/120_textureatlas.png', './assets/sprites/120map.json');
        this.load.image('background', './assets/background/new_background.png');
        this.load.image('bookshelf', './assets/sprites/bookshelf.PNG');
        this.load.image('bed', './assets/sprites/bed.png');
        this.load.image('drawer', './assets/sprites/drawer.png');
        this.load.image('door', './assets/sprites/door.png');
        this.load.image('trapdoor', './assets/sprites/trapdoor.png');
        this.load.image('trapdooropen', './assets/sprites/open_trapdoor.png');
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

        

        this.bookshelf = new Interactable(this, 470, 150, 'bookshelf', 0, "Bookcase").setScale(.3);
        this.drawer = new Interactable(this, 840, 160, 'drawer', 0, "Drawer").setScale(.3);
        
        this.trapDoor = new Interactable(this, 190, 500, 'trapdoor', 0, "Trap Door").setScale(.2); 
        this.trapDoor.setVisible(false);
        this.trapDoorImage = this.add.image(190, 500, 'trapdoor').setScale(.3);
        this.door = new Interactable(this, 1100, 170, 'door', 0, "Door").setScale(.1);
        this.door.setVisible(false);
        this.doorImage = this.add.image(1165, 197, 'door').setScale(.23);
        this.doorImage.rotation = .07;
        this.player = new Player(this, game.config.width / 2, game.config.height / 2, 'playerAtlas').setOrigin(.5, 0); //player moved to this layer for better visuals when colliding
        this.bed = new Interactable(this, 1050, 700, 'bed', 0, "Bed").setScale(.2);
        this.bed.setVisible(false);
        this.bedImage = this.add.image(1050, 680, 'bed').setScale(.4); //since collisions were off we added an image to be in place for the object
        
        this.metalFile = new Collectable(this, 400, 900, 'metalfile').setScale(.1);
        this.metalBar = new Collectable(this, 500, 900, 'metalbar').setScale(.1);
        this.net = new Collectable(this, 600, 900, 'net').setScale(.1);
        this.key = new Collectable(this, 700, 900, 'key').setScale(.1);

        var self = this; //for some reason this is the only way I can actually display text
        this.currentText = self.add.text(50, 50, "NULL text");
        this.currentText.setVisible(false);
        this.trapdoorOpen = false;
        this.interactBool = false;
        this.collisionItem = "none";
        
        // Use Phaser-provided cursor key creation function
        cursors = this.input.keyboard.createCursorKeys();
        
        //collider for interactable objects
        this.physics.add.collider(
            this.player,
            this.bookshelf,
            function (_player, _object) {
                if(_player.body.touching && _object.body.touching){
                    self.collisionItem = "bookshelf";
                    self.currentText.setVisible(false);
                    self.currentText = self.add.text(50, 50, "Interact with " + _object.objectName +"? ");
                    self.interactBool = true;
                }
            }
        )
        this.physics.add.collider(
            this.player,
            this.drawer,
            function (_player, _object) {
                if (_player.body.touching && _object.body.touching) {
                    self.collisionItem = "drawer";
                    self.currentText.setVisible(false);
                    self.currentText = self.add.text(50, 50, "Interact with " + _object.objectName +"? ");
                    self.interactBool = true;
                }
            }
        )
        this.physics.add.collider(
            this.player,
            this.bed,
            function (_player, _object) {
                if (_player.body.touching && _object.body.touching) {
                    self.collisionItem = "bed";
                    self.currentText.setVisible(false);
                    self.currentText = self.add.text(50, 50, "Interact with " + _object.objectName +"? ");
                    self.interactBool = true;
                }
            }
        )
        this.physics.add.collider(
            this.player,
            this.trapDoor,
            function (_player, _object) {
                if (_player.body.touching && _object.body.touching) {
                    self.collisionItem = "trapdoor";
                    self.currentText.setVisible(false);
                    self.currentText = self.add.text(50, 50, "Interact with " + _object.objectName +"? ");
                    self.interactBool = true;
                }
            }
        )
        this.physics.add.collider(
            this.player,
            this.door,
            function (_player, _object) {
                if (_player.body.touching && _object.body.touching) {
                    self.collisionItem = "door";
                    self.currentText.setVisible(false);
                    self.currentText = self.add.text(50, 50, "Interact with " + _object.objectName +"? ");
                    self.interactBool = true;
                }
            }
        )
    }

    update() { 
        this.player.update();
        if (cursors.space.isDown) {
            if(this.interactBool){
                if(this.collisionItem == "bookshelf"){
                    if(this.metalFile.found){ //when already found
                        this.currentText.setVisible(false);
                        this.currentText = this.add.text(50, 50, "You look through the books and find nothing more");
                        this.collisionItem == "none";
                        this.interactBool = false;
                    } else {
                        this.currentText.setVisible(false);
                        this.currentText = this.add.text(50, 50, "You look through the books and find a metal file");
                        this.sound.play('sfx_pickup');
                        this.metalFile.getItem();
                        this.collisionItem == "none";
                        this.interactBool = false;
                    }
                }
                else if(this.collisionItem == "drawer"){
                    if (this.net.found) {
                        this.currentText.setVisible(false);
                        this.currentText = this.add.text(50, 50, "You look through the drawer and find nothing more");
                        this.collisionItem == "none";
                        this.interactBool = false;
                    } else {
                        this.currentText.setVisible(false);
                        this.currentText = this.add.text(50, 50, "You look through the drawer and find a net");
                        this.sound.play('sfx_pickup');
                        this.net.getItem();
                        this.collisionItem == "none";
                        this.interactBool = false;
                    }
                }
                else if(this.collisionItem == "bed"){
                    if (this.metalBar.found || !this.metalFile.found) {
                        this.currentText.setVisible(false);
                        this.currentText = this.add.text(50, 50, "You find nothing on the bed");
                        this.collisionItem == "none";
                        this.interactBool = false;
                    } else {
                        this.currentText.setVisible(false);
                        this.currentText = this.add.text(50, 50, "You use the metal file to saw off a metal bar from the bed");
                        this.sound.play('sfx_pickup');
                        this.metalBar.getItem();
                        this.collisionItem == "none";
                        this.interactBool = false;
                    }
                }
                else if(this.collisionItem == "trapdoor"){
                    if (this.key.found && this.trapdoorOpen) {
                        this.currentText.setVisible(false);
                        this.currentText = this.add.text(50, 50, "You use the net in the trap door and find nothing more");
                        this.collisionItem == "none";
                        this.interactBool = false;
                    } else if (!this.metalBar.found && !this.trapdoorOpen) {
                        this.currentText.setVisible(false);
                        this.currentText = this.add.text(50, 50, "You try to open the trap door but it is too hard to open");
                        this.collisionItem == "none";
                        this.interactBool = false;
                    } else if (this.metalBar.found && !this.trapdoorOpen) {
                        this.trapDoorImage.setVisible(false);
                        this.trapDoorImage = this.add.image(170, 460, 'trapdooropen').setScale(.3);
                        this.currentText.setVisible(false);
                        this.currentText = this.add.text(50, 50, "You pry open the trap door with the metal bar");
                        this.trapdoorOpen = true;
                        this.collisionItem == "none";
                        this.interactBool = false;
                    } else if (this.net.found && this.trapdoorOpen ) {
                        this.currentText.setVisible(false);
                        this.currentText = this.add.text(50, 50, "You use the net in the trap door and find a rusted key");
                        this.sound.play('sfx_pickup');
                        this.key.getItem();
                        this.collisionItem == "none";
                        this.interactBool = false;
                    } else if (!this.net.found && this.trapdoorOpen) {
                        this.currentText.setVisible(false);
                        this.currentText = this.add.text(50, 50, "You try to reach into the trap door but you fall in and die");
                        this.collisionItem == "none";
                        this.interactBool = false;
                    } 
                }
                else if(this.collisionItem == "door"){
                    if (!this.metalBar.found) {
                        this.currentText.setVisible(false);
                        this.currentText = this.add.text(50, 50, "You try to open the door but it won't budge");
                        this.collisionItem == "none";
                        this.interactBool = false;
                    } else if (this.metalBar.found && !this.key.found ) {
                        this.currentText.setVisible(false);
                        this.currentText = this.add.text(50, 50, "You try to pry open the door but you make too much sound so you get killed");
                        this.collisionItem == "none";
                        this.interactBool = false;
                    }
                    else if (this.key.found) {
                        this.currentText.setVisible(false);
                        this.currentText = this.add.text(50, 50, "You use the key to open the door and finally escape!");
                        this.collisionItem == "none";
                        this.interactBool = false;
                    }
                }
            }
        }
        else if (cursors.shift.isDown) {
            this.currentText.setVisible(false);
            this.collisionItem == "none";
            this.interactBool = false;
        }
    }

}
class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        // load images/tile sprites
        this.load.image('player', './assets/sprites/Crab.png');
        this.load.image('object1', './assets/sprites/sheep.png');
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
        
        

        //create game objects
        this.player = new Player(this, 100, 100, 'player').setOrigin(.5, 0);
        this.object1 = new Interactable(this, 200, 200, 'object1', 0, "vase").setOrigin(.5, 0);

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

                    self.inputHandler();
                }
            }
        )
        

    }

    update() {
        this.player.update(cursors);
        
        
    }

    inputHandler(){
        this.userInp = window.prompt("Interact with item? (y or n)");
    }
    
}
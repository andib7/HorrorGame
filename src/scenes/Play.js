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
        //create game objects
        this.player = new Player(this, 100, 100, 'player').setOrigin(.5, 0);
        this.object1 = new Interactable(this, 200, 200, 'object1', 0, "vase").setOrigin(.5, 0);

        // Use Phaser-provided cursor key creation function
        cursors = this.input.keyboard.createCursorKeys();

        //collider for interactable objects
        this.physics.add.collider(
            this.player,
            this.object1,
            function(_player, _object1){
                if(_player.body.touching && _object1.body.touching){
                    console.log("Interact with %s?", _object1.objectName);
                }
            }
        )

    }

    update() {
        this.player.update(cursors);
        
        
    }
    
}
class Collectable extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this); //add to scene
        this.setVisible(false);
        this.found = false;
    }

    getItem(){
        this.setVisible(true);
        this.found = true; 
    }
}
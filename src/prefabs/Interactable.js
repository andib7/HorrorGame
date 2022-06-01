class Interactable extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, name) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this); //add to scene
        this.setImmovable(true);
        this.objectName = name;
    }
}
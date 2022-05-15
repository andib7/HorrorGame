class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this); //add to scene
        this.VELOCITY = 150;
    }

    update(cursors) {
        if (cursors.left.isDown) {
            this.body.setVelocity(-this.VELOCITY, 0);
        } else if (cursors.right.isDown) {
            this.body.setVelocity(this.VELOCITY, 0);
        } else if (cursors.up.isDown) {
            this.body.setVelocity(0, -this.VELOCITY);
        } else if (cursors.down.isDown) {
            this.body.setVelocity(0, this.VELOCITY);
        }
        else {
            this.body.setVelocity(0, 0);
        }
    }
}
class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this); //add to scene
        this.setCollideWorldBounds(true);
        this.VELOCITY = 350;
    }

    create(){
        
    }
    
    update() {
        if (cursors.left.isDown) { 
            this.body.setVelocity(-this.VELOCITY, 0);
            this.anims.play('run_left', true);
        } else if (cursors.right.isDown) {
            this.body.setVelocity(this.VELOCITY, 0);
            this.anims.play('run_right', true);
        } else if (cursors.up.isDown) {
            this.body.setVelocity(0, -this.VELOCITY);
            this.anims.play('run_up', true);
        } else if (cursors.down.isDown) {
            this.body.setVelocity(0, this.VELOCITY);
            this.anims.play('run_down', true);
        } else if (!cursors.right.isDown && !cursors.left.isDown && !cursors.down.isDown && !cursors.up.isDown) {
            this.body.setVelocity(0,0);
            // add code for idle animation play here:
            if (this.anims.isPlaying && this.anims.currentAnim.key === 'run_left') {
                this.anims.play('idle_left');
            }
            if (this.anims.isPlaying && this.anims.currentAnim.key === 'run_right') {
                this.anims.play('idle_right');
            }
            if (this.anims.isPlaying && this.anims.currentAnim.key === 'run_down') {
                this.anims.play('idle_down');
            }
            if (this.anims.isPlaying && this.anims.currentAnim.key === 'run_up') {
                this.anims.play('idle_up');
            }
        }
    }


}
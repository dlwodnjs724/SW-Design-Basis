class Beam extends Phaser.GameObjects.Sprite {
  constructor(scene) {

    var x = scene.player.x;
    var y = scene.player.y + 100;

    super(scene, x, y, "beam");

    // 3.2 add to scene
    scene.add.existing(this);

    // 3.3
    this.play("beam_anim");
    scene.physics.world.enableBody(this);
    this.body.velocity.x = 700;


    // 4.2 add the beam to the projectiles group
    scene.projectiles.add(this);

  }


  update() {

    // 3.4 Frustum culling
    if (this.y < 32) {
      this.destroy();
    }
  }
}

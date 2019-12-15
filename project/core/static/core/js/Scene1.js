class Scene1 extends Phaser.Scene {
  constructor() {
    super({
      key: "bootGame",
      visible: false,
      active: false
    });
  }

  preload() {
    this.load.image("background", "/static/core/assets/images/sea_background.png");

    this.load.spritesheet("scoreboard", "/static/core/assets/images/scoreboard.png", {
      frameWidth: 1850,
      frameHeight: 800
    });
    this.load.spritesheet("ship", "/static/core/assets/images/shark1.png", {
      frameWidth: 256,
      frameHeight: 256
    });
    this.load.spritesheet("ship2", "/static/core/assets/spritesheets/fish1.png", {
      frameWidth: 64,
      frameHeight: 64
    });
    this.load.spritesheet("ship3", "/static/core/assets/spritesheets/shripm.png", {
      frameWidth: 64,
      frameHeight: 64
    });
    this.load.spritesheet("hema1", "/static/core/assets/spritesheets/hema1.png", {
      frameWidth: 64,
      frameHeight: 64
    });
    this.load.spritesheet("explosion", "/static/core/assets/spritesheets/explosion.png", {
      frameWidth: 16,
      frameHeight: 16
    });
    this.load.spritesheet("power-up", "/static/core/assets/spritesheets/power-up.png", {
      frameWidth: 16,
      frameHeight: 16
    });
    this.load.spritesheet("player", "/static/core/assets/spritesheets/Hwang_2.png", {
      frameWidth: 120,
      frameHeight: 200
    });
    //1.1 load the spritesheet for the beam
    this.load.spritesheet("beam", "/static/core/assets/images/soccer_ball.png", {
      frameWidth: 32,
      frameHeight: 32
    });
    this.load.bitmapFont("pixelFont", "/static/core/assets/font/font.png", "/static/core/assets/font/font.xml");

    this.load.audio("audio_beam", ["/static/core/assets/sounds/beam.ogg", "/static/core/assets/sounds/beam.mp3"]);
    this.load.audio("audio_explosion", ["/static/core/assets/sounds/explosion.ogg", "/static/core/assets/sounds/explosion.mp3"]);
    this.load.audio("audio_pickup", ["/static/core/assets/sounds/pickup.ogg", "/static/core/assets/sounds/pickup.mp3"]);
    this.load.audio("music", ["/static/core/assets/sounds/sci-fi_platformer12.ogg", "/static/core/assets/sounds/sci-fi_platformer12.mp3"]);

  }

  create() {
    this.add.text(20, 20, "Loading game...");
    this.scene.start("playGame");

    this.anims.create({
      key: "ship1_anim",
      frames: this.anims.generateFrameNumbers("ship"),
      frameRate: 20,
      repeat: -1
    });
    this.anims.create({
      key: "ship2_anim",
      frames: this.anims.generateFrameNumbers("ship2"),
      frameRate: 20,
      repeat: -1
    });
    this.anims.create({
      key: "ship3_anim",
      frames: this.anims.generateFrameNumbers("ship3"),
      frameRate: 20,
      repeat: -1
    });
    this.anims.create({
      key: "hema1_anim",
      frames: this.anims.generateFrameNumbers("hema1"),
      frameRate: 20,
      repeat: -1
    });
    this.anims.create({
      key: "explode",
      frames: this.anims.generateFrameNumbers("explosion"),
      frameRate: 20,
      repeat: 0,
      hideOnComplete: true
    });

    this.anims.create({
      key: "red",
      frames: this.anims.generateFrameNumbers("power-up", {
        start: 0,
        end: 1
      }),
      frameRate: 20,
      repeat: -1
    });
    this.anims.create({
      key: "gray",
      frames: this.anims.generateFrameNumbers("power-up", {
        start: 2,
        end: 3
      }),
      frameRate: 20,
      repeat: -1
    });
    this.anims.create({
      key: "thrust",
      frames: this.anims.generateFrameNumbers("player"),
      frameRate: 5,
      repeat: -1
    });
    // 1.2 animation for the beam
    this.anims.create({
      key: "beam_anim",
      frames: this.anims.generateFrameNumbers("beam"),
      frameRate: 20,
      repeat: -1
    });
  }
}

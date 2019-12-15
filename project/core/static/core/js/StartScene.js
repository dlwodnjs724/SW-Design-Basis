class StartScene extends Phaser.Scene {
  constructor() {
    super({
      key: "startScene",
      visible: true,
      active: true
    });
  }

  preload() {
  }

  create() {
    this.button = this.add.image(config.width / 2, config.height / 2, "startButton");
    this.button.setInteractive();
    this.button.on("pointerup", this.startStadiumStage, this);
    // this.button.on("pointerdown", () => {
    //   this.scene.start("playGame");
    // }, this);
  }

  update() {
  }

  startStadiumStage() {
    this.scene.start("bootGame")
  }
}

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
    this.background = this.add.tileSprite(0, 0, config.width, config.height, "startBackground");
    this.background.setOrigin(0, 0);

    this.startButton = this.add.image(config.width / 2, config.height * 2 / 3, "startBall").setScale(0.4);
    this.startButton.setInteractive();
    this.startButton.on("pointerup", () => {
      console.log(config.audioTag);
      config.audioTag.src = "";
      this.scene.start("mainScene");
    });

    this.button = this.add.image(config.width * 10 / 11, config.height * 2 / 3, "startSea").setScale(0.7);
    this.button.setInteractive();
    this.button.on("pointerup", () => {
      console.log(config.audioTag);
      config.audioTag.pause();
      this.scene.start("seaScene")
    }, this);

    this.add.text(config.width / 2, config.height / 3, "Van Dijk'DOR\n(반 다이크도르)", {
      font: "70px Nanum",
    }).setOrigin(0.5, 0.5);
  }
}

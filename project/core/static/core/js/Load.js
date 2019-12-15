class Load extends Phaser.Scene {
  constructor() {
    super({
      key: "Load",
      visible: true,
      active: true
    });
  }

  preload() {
    this.load.image("background", "/static/core/assets/images/sea_background.png");
    this.load.image("startButton", "/static/core/assets/images/shark1.png");

    // this.add.image(0,0,"TitleImg").setOrigin(0,0).setPosition(0,0);

    // this.map1 = this.add.image(config.width / 2 - 160, config.height * 3 / 4, "map1");
    // this.map2 = this.add.image(config.width / 2 + 160, config.height * 3 / 4, "map2");
    // this.map1.setScale(0.16);
    // this.map2.setScale(0.16);
  }

  create() {
    this.scene.start("startScene")
  }
}

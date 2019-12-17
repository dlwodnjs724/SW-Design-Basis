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
    this.load.image("startBackground", "/static/core/assets/images/champions_stadium.jpg");
    this.load.image("fieldBackground", "/static/core/assets/images/rbk.png");
    this.load.image("whiteBackground", "/static/core/assets/images/white_background.png");
    this.load.image("startSea", "/static/core/assets/images/shark1.png");
    this.load.image("startBall", "/static/core/assets/images/main_football.png");
    this.load.image("home", "/static/core/assets/images/home.png");

    this.load.spritesheet("scoreboard", "/static/core/assets/images/scoreboard.png", {
      frameWidth: 1850,
      frameHeight: 800
    });
    this.load.spritesheet("shark", "/static/core/assets/images/shark1.png", {
      frameWidth: 256,
      frameHeight: 256
    });
    this.load.spritesheet("fish", "/static/core/assets/spritesheets/fish1.png", {
      frameWidth: 64,
      frameHeight: 64
    });
    this.load.spritesheet("shrimp", "/static/core/assets/spritesheets/shripm.png", {
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
    this.load.spritesheet("player", "/static/core/assets/spritesheets/Hwang_2.png", {
      frameWidth: 120,
      frameHeight: 200
    });

    this.load.spritesheet("van", "/static/core/assets/spritesheets/vandijk.png", {
      frameWidth: 129,
      frameHeight: 150
    });
    this.load.spritesheet("shoes", "/static/core/assets/images/soccer_shoe.png", {
      frameWidth: 64,
      frameHeight: 64
    });
    this.load.spritesheet("whistle", "/static/core/assets/images/whistle.png", {
      frameWidth: 64,
      frameHeight: 64
    });
    this.load.spritesheet("card", "/static/core/assets/spritesheets/penalty_card.png", {
      frameWidth: 256,
      frameHeight: 256
    });

    this.load.spritesheet("beam", "/static/core/assets/images/soccer_ball.png", {
      frameWidth: 32,
      frameHeight: 32
    });


    this.load.bitmapFont("pixelFont", "/static/core/assets/font/font.png", "/static/core/assets/font/font.xml");

    this.load.audio("audio_beam", ["/static/core/assets/sounds/beam.ogg", "/static/core/assets/sounds/beam.mp3"]);
    this.load.audio("audio_explosion", ["/static/core/assets/sounds/explosion.ogg", "/static/core/assets/sounds/explosion.mp3"]);
    this.load.audio("audio_pickup", ["/static/core/assets/sounds/pickup.ogg", "/static/core/assets/sounds/pickup.mp3"]);
    this.load.audio("music", ["/static/core/assets/sounds/sci-fi_platformer12.ogg", "/static/core/assets/sounds/sci-fi_platformer12.mp3"]);
    this.load.audio("babyshark", ["/static/core/assets/sounds/babyshark.ogg", "/static/core/assets/sounds/babyshark.mp3"]);
    this.load.audio("believer", ["/static/core/assets/sounds/believer.ogg", "/static/core/assets/sounds/believer.mp3"]);
  }

  create() {
    this.scene.start("startScene")
  }
}

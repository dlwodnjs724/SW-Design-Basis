var gameSettings = {
  playerSpeed: 200,
  maxPowerups: 2,
  powerUpVel: 50,
};

var config = {
  type: Phaser.CANVAS,
  width: 1850,
  height: 800,
  backgroundColor: 0x000000,
  scene: [Load, StartScene, Scene1, Scene2, EndScene],
  pixelArt: true,
  physics: {
    default: "arcade",
    arcade: {
      gravity: {y: 9800},
      debug: false
    }
  },
  audio: {
    disableWebAudio: true
  },
  canvas: document.querySelector('#canvas'),
  audioTag: document.querySelector("#champions_audio")
};


var game = new Phaser.Game(config);

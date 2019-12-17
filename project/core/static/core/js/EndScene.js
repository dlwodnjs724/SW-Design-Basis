class EndScene extends Phaser.Scene {
  constructor() {
    super({
      key: "endScene",
      visible: false,
      active: false
    });
  }

  init(score) {
    this.score = score.score;
  }

  preload() {
  }

  create() {
    this.sendScore(this.score);

    this.background = this.add.tileSprite(0, 0, config.width, config.height, "whiteBackground");
    this.background.setOrigin(0, 0);

    this.add.text(config.width / 2, config.height / 3, `${this.score}점을 기록하셨습니다.`, {
      font: "70px Nanum",
      color: "black",
    }).setOrigin(0.5, 0.5);

    this.homeButton = this.add.image(config.width / 2, config.height * 6 / 7, "home").setScale(0.3);
    this.homeButton.setInteractive();
    this.homeButton.on("pointerup", () => {
      this.scene.start("startScene");
    });
  }

  sendScore(score) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/score/", true);
    xhr.setRequestHeader("x-csrf-token", "fetch");
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(`score=${this.score}`);
    xhr.onreadystatechange = function (e) {
      if (xhr.readyState !== XMLHttpRequest.DONE) return;
      let json = JSON.parse(xhr.response);
      if (xhr.status === 201) {
        alert(`Ranking Board에 점수가 기록되었습니다.`);
      } else if (xhr.status === 200) {
        alert(`로그인 되어 있지 않아 점수가 기록되지 않습니다.`)
      } else {
        alert(xhr.responseText);
      }
    };
  }
}

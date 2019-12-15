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
    this.add.text(config.width / 2, config.height / 2, `${this.score}점을 기록하셨습니다.`);
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
        alert(`${score}점을 기록하셨습니다. 스코어 보드에 점수가 기록되었습니다.`);
      } else if (xhr.status === 200) {
        alert(`${score}점을 기록하셨습니다.\n로그인 되어 있지 않아 점수가 기록되지 않습니다.`)
      } else {
        alert(xhr.responseText);
      }
    };
  }
}

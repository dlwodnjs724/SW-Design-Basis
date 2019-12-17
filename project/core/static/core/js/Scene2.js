class Scene2 extends Phaser.Scene {
  constructor() {
    super({
      key: "seaScene",
      visible: false,
      active: false
    });
  }

  create() {
    this.anims.create({
      key: "shark_anim",
      frames: this.anims.generateFrameNumbers("shark"),
      frameRate: 20,
      repeat: -1
    });
    this.anims.create({
      key: "fish_anim",
      frames: this.anims.generateFrameNumbers("fish"),
      frameRate: 20,
      repeat: -1
    });
    this.anims.create({
      key: "shrimp_anim",
      frames: this.anims.generateFrameNumbers("shrimp"),
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

    this.background = this.add.tileSprite(0, 0, config.width, config.height, "background");
    this.background.setOrigin(0, 0);

    var graphics = this.add.graphics();
    graphics.fillStyle(0x000000, 1);
    // graphics.beginPath();
    // graphics.moveTo(0, 0);
    // graphics.lineTo(config.width, 0);
    // graphics.lineTo(config.width, 20);
    // graphics.lineTo(0, 20);
    // graphics.lineTo(0, 0);
    // graphics.closePath();
    // graphics.fillPath();
    this.score = 0;
    this.space = 0;
    this.life = 3;

    this.scoreLabel = this.add.bitmapText(280, 47, "pixelFont", "SCORE", 50);
    this.spaceLabel = this.add.bitmapText(360, 93, "pixelFont", "ATTACK", 40);
    this.lifeLabel = this.add.bitmapText(263, 93, "pixelFont", "LIFE", 40);

    this.scoreLabel.setDepth(1);
    this.lifeLabel.setDepth(1);
    this.spaceLabel.setDepth(1);

    //color
    this.lifeLabel.tint = 0x000000;
    this.scoreLabel.tint = 0x000000;
    this.spaceLabel.tint = 0x000000;


    this.lifeLabel.text = " " + 3;
    this.spaceLabel.text = " " + 0;
    this.scoreLabel.text = " " + 0;


    this.beamSound = this.sound.add("audio_beam", {volume: 0.3});
    this.explosionSound = this.sound.add("audio_explosion", {volume: 0.3});
    this.pickupSound = this.sound.add("audio_pickup", {volume: 0.3});
    this.bkMusic = this.sound.add("babyshark");
    this.bkMusic.play({
      volume: 0.35,
      loop: true
    });
    // this.music = this.sound.add("music");

    this.scoreboard = this.add.sprite(0, 0, "scoreboard").setOrigin(0, 0);
    this.shark = this.add.sprite(config.width / 2 - 50, config.height / 3, "shark");
    this.fish = this.add.sprite(config.width / 2, config.height * 2 / 3, "fish");
    this.shrimp = this.add.sprite(config.width / 2 + 50, config.height * 3 / 3, "shrimp");

    //this.shark.angle += 90;
    //this.fish.angle += 90;
    //this.shrimp.angle += 90;

    this.enemies = this.physics.add.group();
    this.enemies.add(this.shark);
    this.enemies.add(this.fish);
    this.enemies.add(this.shrimp);


    this.shark.play("shark_anim");
    this.fish.play("fish_anim");
    this.shrimp.play("shrimp_anim");

    this.shark.setInteractive();
    this.fish.setInteractive();
    this.shrimp.setInteractive();
    this.shark.body.setAllowGravity(false);
    this.fish.body.setAllowGravity(false);
    this.shrimp.body.setAllowGravity(false);

    this.input.on('gameobjectdown', this.destroyShip, this);

    /*
    this.add.text(20, 20, "Playing game", {
      font: "25px Arial",
      fill: "yellow"
    });
    */

    this.physics.world.setBoundsCollision();


    this.player = this.physics.add.sprite(70, config.height, "player");
    this.player.play("thrust");
    this.cursorKeys = this.input.keyboard.createCursorKeys();
    this.player.setCollideWorldBounds(true);


    this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    // 4.1 create group to hold all our projectiles
    this.projectiles = this.add.group();


    this.physics.add.overlap(this.player, this.enemies, this.hurtPlayer, null, this);
    this.physics.add.overlap(this.projectiles, this.enemies, this.hitEnemy, null, this);
  }


  hurtPlayer(player, enemy) {
    this.life -= 1;
    var lifeFormated = this.zeroPad(this.life, 1);
    this.lifeLabel.text = " " + lifeFormated;

    this.resetShipPos(enemy);

    if (this.player.alpha < 1) {
      return;
    }

    var explosion = new Explosion(this, player.x, player.y);
    player.disableBody(true, true);

    this.time.addEvent({
      delay: 1000,
      callback: this.resetPlayer,
      callbackScope: this,
      loop: false
    });

    //this.resetPlayer();
    player.x = 70;
    player.y = config.height;
  }

  hitEnemy(projectiles, enemy) {
    var explosion = new Explosion(this, enemy.x + 5, enemy.y + 5);
    projectiles.destroy();
    this.resetShipPos(enemy);
    this.score += 15;
    var scoreFormated = this.zeroPad(this.score, 1);
    this.scoreLabel.text = " " + scoreFormated;
    this.explosionSound.play();
  }

  resetPlayer() {
    var x = 70;
    var y = config.height;
    this.player.enableBody(true, x, y, true, true);

    this.player.alpha = 0.5;  //Make the PLAYER TRANSPARENT

    var tween = this.tweens.add({
      targets: this.player,
      y: config.height,
      ease: "Power1",
      duration: 1500,
      repeat: 0,
      onComplete: function () {
        this.player.alpha = 1;
      },
      callbackScope: this
    });
  }

  zeroPad(number, size) {
    var stringNumber = String(number);
    while (stringNumber.length < (size || 2)) {
      stringNumber = "0" + stringNumber;
    }
    return stringNumber;
  }

  update() {
    let acceleration = this.space / 100 + 2 / this.life;
    let speed1 = 5;
    let speed2 = 6;
    let speed3 = 7;
    this.moveShip(this.shark, speed1 + speed1 * acceleration);
    this.moveShip(this.fish, speed2 + speed2 * acceleration);
    this.moveShip(this.shrimp, speed3 + speed3 * acceleration);
    // this.shark.alpha = 0;
    // this.fish.alpha = 0;
    // this.shrimp.alpha = 0;

    this.background.tilePositionX += 5;


    this.movePlayerManager();

    if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
      // 2.1 call a function to create a beam instance
      if (this.player.active) {
        this.shootBeam();
      }

    }

    // 4.2 update all the beams
    for (var i = 0; i < this.projectiles.getChildren().length; i++) {
      var beam = this.projectiles.getChildren()[i];
      beam.body.setAllowGravity(false);
      beam.update();
    }

    if (this.life <= 0) {
      this.bkMusic.stop();
      this.scene.start("endScene", {
        score: this.score
      });
    }
  }

  // 2.2 create the shootBeam function
  shootBeam() {
    // 4.2 add the beam to the croup
    var beam = new Beam(this);

    this.space += 1;
    var spaceFormated = this.zeroPad(this.space, 1);
    this.spaceLabel.text = " " + spaceFormated;

    this.beamSound.play();
  }


  movePlayerManager() {

    this.player.setVelocity(0);

    // this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    //
    // if (this.keyW.isDown) {
    //   console.log(1);
    //   this.sound.add("babyshark").play({
    //     volume: 1,
    //     loop: true
    //   });
    // }

    if (this.cursorKeys.left.isDown) {
      this.player.setVelocityX(-gameSettings.playerSpeed);
    } else if (this.cursorKeys.right.isDown) {
      this.player.setVelocityX(gameSettings.playerSpeed);
    }

    if (this.cursorKeys.up.isDown) {
      //  this.player.setVelocityY(-gameSettings.playerSpeed);
      this.player.setVelocityY(-500);

    } else if (this.cursorKeys.down.isDown) {
      this.player.setVelocityY(gameSettings.playerSpeed);
    }
  }


  moveShip(ship, speed) {
    ship.x -= speed;

    if (ship.x < 0) {
      this.resetShipPos(ship);
    }
  }

  resetShipPos(ship) {
    ship.x = config.width;
    var randomY = Phaser.Math.Between(300, config.height - 100);
    ship.y = randomY;
  }

  destroyShip(pointer, gameObject) {
    gameObject.setTexture("explosion");
    gameObject.play("explode");
  }
}

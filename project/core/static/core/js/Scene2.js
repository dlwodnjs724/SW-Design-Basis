class Scene2 extends Phaser.Scene {
  constructor() {
    super({
      key: "playGame",
      visible: false,
      active: false
    });
  }

  create() {

    this.background = this.add.tileSprite(0, 0, config.width, config.height, "background");
    this.background.setOrigin(0, 0);

    var graphics = this.add.graphics();
    graphics.fillStyle(0x000000, 1);
    graphics.beginPath();
    graphics.moveTo(0, 0);
    graphics.lineTo(config.width, 0);
    graphics.lineTo(config.width, 20);
    graphics.lineTo(0, 20);
    graphics.lineTo(0, 0);
    graphics.closePath();
    graphics.fillPath();
    this.score = 0;
    this.space = 0;
    this.life = 3;
    this.scoreLabel = this.add.bitmapText(10, 5, "pixelFont", "SCORE", 16);
    this.spaceLabel = this.add.bitmapText(590, 5, "pixelFont", "ATTACK", 16);
    this.lifeLabel = this.add.bitmapText(300, 5, "pixelFont", "LIFE", 16);
    this.lifeLabel.text = "LIFE " + 3;
    this.spaceLabel.text = "ATTACK " + 0;

    this.beamSound = this.sound.add("audio_beam");
    this.explosionSound = this.sound.add("audio_explosion");
    this.pickupSound = this.sound.add("audio_pickup");

    this.music = this.sound.add("music");

    var musicConfig = {
      mute: false,
      volume: 1,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: false,
      delay: 0
    };

    this.scoreboard = this.add.sprite(0, 0, "scoreboard").setOrigin(0, 0);
    this.ship1 = this.add.sprite(config.width / 2 - 50, config.height / 3, "ship");
    this.ship2 = this.add.sprite(config.width / 2, config.height * 2 / 3, "ship2");
    this.ship3 = this.add.sprite(config.width / 2 + 50, config.height * 3 / 3, "ship3");

    //this.ship1.angle += 90;
    //this.ship2.angle += 90;
    //this.ship3.angle += 90;

    this.enemies = this.physics.add.group();
    this.enemies.add(this.ship1);
    this.enemies.add(this.ship2);
    this.enemies.add(this.ship3);


    this.ship1.play("ship1_anim");
    this.ship2.play("ship2_anim");
    this.ship3.play("ship3_anim");

    this.ship1.setInteractive();
    this.ship2.setInteractive();
    this.ship3.setInteractive();
    this.ship1.body.setAllowGravity(false);
    this.ship2.body.setAllowGravity(false);
    this.ship3.body.setAllowGravity(false);

    this.input.on('gameobjectdown', this.destroyShip, this);

    /*
    this.add.text(20, 20, "Playing game", {
      font: "25px Arial",
      fill: "yellow"
    });
    */

    this.physics.world.setBoundsCollision();

    this.powerUps = this.physics.add.group();


    for (var i = 0; i < gameSettings.maxPowerups; i++) {
      var powerUp = this.physics.add.sprite(16, 16, "power-up");
      this.powerUps.add(powerUp);
      powerUp.setRandomPosition(0, 0, game.config.width, game.config.height);

      if (Math.random() > 0.5) {
        powerUp.play("red");
      } else {
        powerUp.play("gray");
      }

      powerUp.setVelocity(gameSettings.powerUpVel, gameSettings.powerUpVel);
      powerUp.setCollideWorldBounds(true);
      powerUp.setBounce(0.7);

    }

    this.player = this.physics.add.sprite(70, config.height, "player");
    this.player.play("thrust");
    this.cursorKeys = this.input.keyboard.createCursorKeys();
    this.player.setCollideWorldBounds(true);


    this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    // 4.1 create group to hold all our projectiles
    this.projectiles = this.add.group();


    this.physics.add.collider(this.projectiles, this.powerUps, function (projectiles, powerUp) {
      projectiles.destroy();
    });
    this.physics.add.overlap(this.player, this.powerUps, this.pickPowerUp, null, this);
    this.physics.add.overlap(this.player, this.enemies, this.hurtPlayer, null, this);
    this.physics.add.overlap(this.projectiles, this.enemies, this.hitEnemy, null, this);


  }

  pickPowerUp(player, powerUp) {
    powerUp.disableBody(true, true);
    this.pickupSound.play();
  }

  hurtPlayer(player, enemy) {


    this.life -= 1;
    var lifeFormated = this.zeroPad(this.life, 1);
    this.lifeLabel.text = "LIFE " + lifeFormated;

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
    var scoreFormated = this.zeroPad(this.score, 6);
    this.scoreLabel.text = "SCORE " + scoreFormated;
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
    this.moveShip(this.ship1, speed1 + speed1 * acceleration);
    this.moveShip(this.ship2, speed2 + speed2 * acceleration);
    this.moveShip(this.ship3, speed3 + speed3 * acceleration);
    // this.ship1.alpha = 0;
    // this.ship2.alpha = 0;
    // this.ship3.alpha = 0;

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
    this.spaceLabel.text = "ATTACK " + spaceFormated;

    this.beamSound.play();
  }


  movePlayerManager() {

    this.player.setVelocity(0);

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

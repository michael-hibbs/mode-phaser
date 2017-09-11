
import Utils from '../Utils';
import NokiaText from '../Components/NokiaText';
import Button from '../Components/Button';

export default class MenuState extends Phaser.State {
  title1: Phaser.Text;
  title2: Phaser.Text;
  gibs: Phaser.Particles.Arcade.Emitter;
  playButton: Phaser.Button;
  fading: boolean;

  preload() {
    this.load.spritesheet('button', 'assets/button_base.png', 80, 20);
    this.load.spritesheet('ImgGibs', 'assets/Mode/spawner_gibs.png', 12, 12);
    this.load.audio('SndHit', 'assets/Mode/menu_hit.mp3');
    this.load.audio('SndHit2', 'assets/Mode/menu_hit_2.mp3');
  }

  init() {
    this.fading = false;

    console.log(this.gibs);
  }

  create() {
    let { game, world } = this;
    let { width, height } = world;

    // this.playButton = game.add.button(game.world.centerX, game.world.centerY, 'button', null, this, 2, 1, 0);
    // this.playButton = new Button(this.game, 'hello', game.world.centerX, game.world.centerY, 'button', null, this, 2, 1, 0)

    this.gibs = this.game.add.emitter(width/2, height/2-10);
    this.gibs.setSize(100, 30);
    this.gibs.setYSpeed(-200, 0);
    this.gibs.setRotation(-720, 720);
    this.gibs.gravity.setTo(0, 100);
    this.gibs.makeParticles('ImgGibs', [0, 1, 2, 3, 4, 5], 320, true);

    // FIXME: enable antialiasing for text
    //the letters "mo"
    this.title1 = new NokiaText(game, width + 16, height/3, 'mo', 32, '#3a5c39', true);
    game.physics.arcade.enable(this.title1);
    this.title1.body.collideWorldBounds = false;
    this.title1.body.acceleration.x = -width;
    this.title1.anchor.setTo(0, 0);

    //the letters "de"
    this.title2 = new NokiaText(game, -60, this.title1.y, 'de', 32, '#3a5c39', true);
    game.physics.arcade.enable(this.title2);
    this.title2.body.collideWorldBounds = false;
    this.title2.body.acceleration.x = width;
    this.title2.anchor.setTo(0, 0);
  }

  update() {
    let { width, height, centerX, centerY } = this.world
    let { keyboard } = this.game.input;
    let { Keyboard: Key } = Phaser;

    if (this.title2.x > this.title1.x + this.title1.width - 4) {
      // We remove physics from the titles here so that we can
      // manipulate their positions and rotations
      this.title1.body = null;
      this.title2.body = null;
      this.title2.position.x = this.title1.x + this.title1.width - 4

      this.game.sound.play('SndHit');
      this.game.camera.flash(0xd8eba2, 500);
      this.game.camera.shake(0.035, 500);
      this.title1.fill = this.title2.fill = '#d8eba2';
      this.gibs.start(true, 5000, null, 650);
      this.title1.angle = Math.random()*35-15;
      this.title2.angle = Math.random()*35-15;

      let byline = new NokiaText(this.game, width/2-39, height/3+39, 'by Adam Atomic', 8, '#3a5c39');

      this.world.add(new Button(this.game, 'flixel.org', centerX, centerY + 24, 'button', this.onFlixel, this, 2, 1, 0));
      this.world.add(new Button(this.game, 'music: dannyB', centerX, centerY + 48, 'button', this.onDanny, this, 2, 1, 0));

      let playText = new NokiaText(this.game, centerX, centerY + 106, 'X+C TO PLAY', 8, '#729954');
      playText.anchor = Utils.TEXTCENTER;

      this.playButton = this.world.add(new Button(this.game, 'CLICK HERE', centerX, centerY + 102, 'button', this.onPlay, this, 2, 1, 0));
    }

    // TODO?: Attract mode

    if (!this.fading && keyboard.isDown(Key.X) && keyboard.isDown(Key.C)) {
      this.fading = true;
      this.game.sound.play('SndHit2');
      this.camera.flash(0xd8eba2, 500);
      this.camera.fade(0x121c1b, 1000, true);
      this.camera.onFadeComplete.add(this.onFade, this);
    }
  }

  onFade() {
    this.state.start('play');
  }

  onFlixel() {
    window.open("http://flixel.org", "_blank");
  }

  onDanny() {
    window.open("http://dbsoundworks.com", "_blank");
  }

  onPlay() {
    this.playButton.destroy();
    this.game.sound.play('SndHit2');
  }
}

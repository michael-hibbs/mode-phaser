import Player from '../Components/Player';

export default class PlayState extends Phaser.State {
  music: Phaser.Sound;
  player: Player;

  preload() {
    Player.load(this);

    this.load.audio('SndMode', 'assets/Mode/mode.mp3');
  }

  create() {
    this.player = new Player(this.game, this.world.centerX, this.world.centerY);

    this.music = this.sound.add('SndMode', 1, true);
    this.music.play();
  }

  shutdown() {
    this.music.destroy();
  }

  update() {

  }
  render() {
  }
}

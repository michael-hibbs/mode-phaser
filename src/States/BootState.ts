export default class BootState extends Phaser.State {
  init() {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    this.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
    this.scale.setUserScale(2, 2);

    this.stage.backgroundColor = 0xff131c1b;

    this.game.state.start('menu');
  }
}

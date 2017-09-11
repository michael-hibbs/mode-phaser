import Config from './Config';

import BootState from './States/BootState';
import MenuState from './States/MenuState';
import PlayState from './States/PlayState';

export default class Game extends Phaser.Game {
  constructor() {
    super();

    this.parseConfig(Config.phaser);

    this.state.add('boot', BootState, false);
    this.state.add('menu', MenuState, false);
    this.state.add('play', PlayState, false);

    this.state.start('boot');
  }
}

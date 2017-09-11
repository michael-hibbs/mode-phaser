import NokiaText from './NokiaText';
import Utils from '../Utils';

export default class Button extends Phaser.Button {
  text: Phaser.Text;

  constructor(game: Phaser.Game, text?: string, x?: number, y?: number, key?: string, callback?: Function, callbackContext?: any, overFrame?: string | number, outFrame?: string | number, downFrame?: string | number, upFrame?: string | number) {
    super(game, x, y, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame);

    this.anchor.setTo(0.5, 0.5);

    this.text = new NokiaText(game, 0, 4, text, 8, '#d8eba2', false);
    this.text.anchor = Utils.TEXTCENTER;

    this.addChild(this.text);
  }
}

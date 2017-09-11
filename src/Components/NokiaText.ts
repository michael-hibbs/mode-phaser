export default class NokiaText extends Phaser.Text {
  constructor(
    game: Phaser.Game,
    width: number,
    height: number,
    text: string,
    fontSize: number = 8,
    color: string = '#d8eba2',
    addToGame: boolean = true
  ) {
    super(game, width, height, text, {
      font: 'nokiafc22',
      fill: color,
      fontSize: fontSize
    })

    if(addToGame) { game.add.existing(this) };
  }
}

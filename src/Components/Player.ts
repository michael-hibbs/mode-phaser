export default class Player extends Phaser.Sprite {
  static KEY = 'ImgSpaceman';
  static ASSET = 'assets/Mode/spaceman.png';

  body: Phaser.Physics.Arcade.Body;
  bullets: Phaser.Group;
  jumpPower: number;
  aim: number;

  // NOTE: We're keeping track of our own facing direction here rather than
  // using body.facing because body.facing also updates when the player is
  // moving up or down. This causes issues with the shoot-jumping mechanism in
  // Mode, because after jumping and landing you are still facing downwards
  // according to Phaser, which means you can hop by pressing the shoot button.
  // Flixel doesn't track up/down facing, so this is not an issue in Mode.
  facing: number;

  static load(state: Phaser.State) {
    state.load.spritesheet(Player.KEY, Player.ASSET, 8, 8, 11);
  }

  constructor(game: Phaser.Game, x: number, y: number, addToGame: boolean = true) {
    super(game, x, y, Player.KEY);

    if (addToGame) this.game.add.existing(this);
    this.game.physics.arcade.enable(this);

    this.anchor.setTo(0.5, 0.5);

    //

    this.jumpPower = 200;
    this.facing = Phaser.RIGHT;

    let runSpeed = 80;
    this.body.drag.x = runSpeed * 8;
    this.body.acceleration.y = 420;
    this.body.collideWorldBounds = true;
    this.body.maxVelocity.x = runSpeed;
    this.body.maxVelocity.y = this.jumpPower;

    //

    this.animations.add('idle', [0]);
    this.animations.add('run', [1,2,3,0], 12, true);
    this.animations.add('jump', [4]);
    this.animations.add('idle_up', [5]);
    this.animations.add('run_up', [6,7,8,5], 12, true);
    this.animations.add('jump_up', [9]);
    this.animations.add('jump_down', [10]);


  }

  update() {
    let { keyboard } = this.game.input;
    let { UP, DOWN, LEFT, RIGHT, Keyboard: Key } = Phaser;

    this.body.acceleration.x = 0;

    //MOVEMENT
    if (keyboard.isDown(Key.A) || keyboard.isDown(Key.LEFT)) {
      // NOTE: Mode uses `facing` here and flixel uses that to flip the sprite
      // around, but we need to do it manually because phaser does not
      // manipulate the sprite based on `body.facing`.
      // NB: This will break if you change the default scale.
      this.scale.x = -1;
      this.facing = LEFT;
      this.body.acceleration.x -= this.body.drag.x;
    }
    else if(keyboard.isDown(Key.D) || keyboard.isDown(Key.RIGHT)) {
      this.scale.x = 1;
      this.facing = RIGHT;
      this.body.acceleration.x += this.body.drag.x;
    }
    if (!this.body.velocity.y && keyboard.downDuration(Key.X, 10)) {
      this.body.velocity.y = -this.jumpPower;
    }

    //AIMING
    if (keyboard.isDown(Key.W) || keyboard.isDown(Key.UP)) {
      this.aim = UP;
    }
    else if (this.body.velocity.y && (keyboard.isDown(Key.S) || keyboard.isDown(Key.DOWN))) {
      this.aim = DOWN;
    } else {
      this.aim = this.facing;
    }

    //ANIMATION
    if (this.body.velocity.y != 0) {
      if (this.aim == UP) this.play('jump_up');
      else if (this.aim == DOWN) this.play('jump_down');
      else this.play('jump');
    }
    else if(this.body.velocity.x == 0) {
      if (this.aim == UP) this.play('idle_up');
      else this.play('idle');
    }
    else {
      if(this.aim == UP) this.play("run_up");
			else this.play("run");
    }

    //SHOOTING
		// if(FlxG.keys.justPressed("C"))
		// {
		// 	if(flickering)
		// 		FlxG.play(SndJam);
		// 	else
		// 	{
		// 		getMidpoint(_point);
		// 		(_bullets.recycle(Bullet) as Bullet).shoot(_point,_aim);
		// 		if(_aim == DOWN)
		// 			velocity.y -= 36;
		// 	}
		// }

    //SHOOTING
    if (keyboard.downDuration(Key.C, 10)) {
      if (this.aim == DOWN) this.body.velocity.y -= 36
    }
  }
}

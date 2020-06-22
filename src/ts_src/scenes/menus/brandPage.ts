import { MimiKSounds } from "../../game/gameCommons";

export class BrandPage extends Phaser.Scene
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/
  
  create()
  : void
  {
    this.cameras.main.setBackgroundColor(0xed1c24);

    ///////////////////////////////////
    // Play Audio

    this.sound.playAudioSprite
    (
      MimiKSounds.kMimiKAudioSprite,
      MimiKSounds.kMettaIntro,
      {
        volume : 0.5
      }
    );

    ///////////////////////////////////
    // Metta Logo

    this._metta_logo = this.add.sprite
    (
      this.game.canvas.width * 0.5,
      this.game.canvas.height * 0.5,
      'landpage_2',
      'metta_logo.png'
    );
    this._metta_logo.setScale(0.0, 0.0);

    let metta_logo_tween = 
    this.add.tween
    ({
      targets : this._metta_logo,
      scale : {from : 0.0, to : 1.0},
      ease : "Bounce",
      duration : 1000,
      delay : 500
    });

    metta_logo_tween.on
    (
      'complete',
      this._fadeIn_Complete,
      this
    );

    ///////////////////////////////////
    // Foreground

    let texture : Phaser.GameObjects.Graphics;
    texture = this.add.graphics();

    texture.fillStyle(0x0a0136);
    texture.fillRect(0, 0, 1080, 1920);

    texture.generateTexture('_mx_ui_box', 1080, 1920);
    texture.destroy();

    this._foreground = this.add.sprite
    (
      this.game.canvas.width * 0.5,
      this.game.canvas.height * 0.5,
      '_mx_ui_box'
    );

    this.add.tween
    ({
      targets : this._foreground,
      alpha : {from : 1.0, to : 0.0},
      ease : "Linear",
      duration : 500,
    });

    return;
  }

  /****************************************************/
  /* Private                                          */
  /****************************************************/
  
  _fadeIn_Complete()
  : void
  {
    let metta_logo_tween =   
    this.add.tween
    ({
      targets : this._foreground,
      alpha : {from : 0.0, to : 1.0},
      ease : "Linear",
      duration : 500,
      delay : 3500
    });

    metta_logo_tween.on
    (
      'complete',
      this._fadeOut_Complete,
      this
    );
    return;
  }

  _fadeOut_Complete()
  : void
  {   
    let metta_logo_tween = 
    this.add.tween
    ({
      targets : this._foreground,
      alpha : {from : 1.0, to : 1.0},
      ease : "Linear",
      duration : 500
    });

    metta_logo_tween.on
    (
      'complete',
      this._next_scene,
      this
    );
    return;
  }

  _next_scene()
  : void
  {     
    this.scene.start('welcomePage');
  }

  _metta_logo : Phaser.GameObjects.Sprite;

  _foreground : Phaser.GameObjects.Sprite;
}
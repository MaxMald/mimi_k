import { MxActor } from "../../utilities/component/mxActor";
import { SpriteComponent } from "../../game/components/spriteComponent";

export class WelcomePage extends Phaser.Scene
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/
  
  create()
  : void
  {

    let screenHalfWidth : number = this.game.canvas.width * 0.5;
    let screenHeight : number = this.game.canvas.height;

    /****************************************************/
    /* Cat                                              */
    /****************************************************/
    
    this._m_cat = MxActor.Create(0);

    let cat_spriteComponent : SpriteComponent = new SpriteComponent();
    cat_spriteComponent.setSprite
    (
      this.add.sprite
      (
        0, 0,
        'landpage',
        'cat.png'
      )
    );
    this._m_cat.addComponent(cat_spriteComponent);
    this._m_cat.init();

    this._m_cat.setRelativePosition
    (
      screenHalfWidth,
      screenHeight - cat_spriteComponent.getHeight() * 0.5
    );

    return;
  }

  update()
  : void
  {
    this._m_cat.update();
    return;
  }

  destroy()
  : void
  {
    this._m_cat.destroy();
    return;
  }

  /****************************************************/
  /* Private                                          */
  /****************************************************/
  
  /**
   * 
   */
  _m_cat : MxActor;
}
import { MxComponent } from "../../../../utilities/component/mxComponent";
import { COMPONENT_ID, MANAGER_ID } from "../../../gameCommons";
import { MxActor } from "../../../../utilities/component/mxActor";
import { SpriteComponent } from "../../../components/spriteComponent";
import { MasterManager } from "../../../managers/masteManager/masterManager";
import { GameController } from "../../../managers/gameManager/components/gameController";
import { BitmapTextComponent } from "../../../components/bitmapTextComponent";

export class AlertPopupController extends MxComponent
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/
  
  constructor()
  {
    super(COMPONENT_ID.kAlertPopupController);
    return;
  }

  init(_actor : MxActor)
  : void
  {
    ///////////////////////////////////
    // Setup listeners

    let master : MxActor = MasterManager.GetInstance();
    let gameManager : MxActor = master.get_child(MANAGER_ID.kGameManager);
    let gameController : GameController = gameManager.getComponent<GameController>
    (
      COMPONENT_ID.kGameController
    );

    gameController.on('timeout', this.open, this);

    ///////////////////////////////////
    // Get components

    this._m_spriteComponent = _actor.getComponent<SpriteComponent>
    (
      COMPONENT_ID.kSprite
    );

    this._m_textComponent = _actor.getComponent<BitmapTextComponent>
    (
      COMPONENT_ID.kBitmapText
    );

    this.m_isOpen = true;
    this.reset();
    return;
  }

  prepare(_scene : Phaser.Scene)
  : void
  {
    this._m_scene = _scene;
    return;
  }

  reset()
  : void
  {
    if(this.m_isOpen) {
      this.m_isOpen = !this.m_isOpen;

      this._m_spriteComponent.setScale(0.0, 1.0);
      this._m_spriteComponent.setVisible(false);

      this._m_textComponent.setScale(0.0, 0.0);
      this._m_textComponent.setVisible(false);
    }
    return;
  }

  open()
  : void
  {
    if(!this.m_isOpen) {
      this.m_isOpen = !this.m_isOpen;

      this._m_spriteComponent.setVisible(true);

      let sprite : Phaser.GameObjects.Sprite = this._m_spriteComponent.getSprite();
      this._m_spriteTween = this._m_scene.tweens.add
      ({
        targets: sprite,
        scaleX : 5.5,
        duration: 200,
        ease: 'Linear'
      });

      this._m_textComponent.setVisible(true);

      let text : Phaser.GameObjects.BitmapText = this._m_textComponent.getBitmapTextObject();
      this._m_scene.tweens.add
      ({
        targets: text,
        scaleY : 1.0,
        scaleX : 1.0,
        duration: 500,
        ease: 'Bounce'
      });
    }
    return;
  }

  destroy()
  : void
  {
    return;
  }

  m_isOpen : boolean;

  /****************************************************/
  /* Private                                          */
  /****************************************************/
  
  /**
   * 
   */
  _m_scene : Phaser.Scene;

  /**
   * 
   */
  _m_spriteComponent : SpriteComponent;

  /**
   * 
   */
  _m_textComponent : BitmapTextComponent;

  /**
   * 
   */
  _m_spriteTween : Phaser.Tweens.Tween;
}
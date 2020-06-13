import { MxComponent } from "../../../../utilities/component/mxComponent"
import { COMPONENT_ID, SAND_CLOCK_PART_ID } from "../../../gameCommons"
import { MxActor } from "../../../../utilities/component/mxActor";
import { ClockController } from "./clockController";
import { SpriteComponent } from "../../../components/spriteComponent";

export class SandClockController extends MxComponent
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/
  
  constructor()
  {
    super(COMPONENT_ID.kSandClockController);
    return;
  }

  init(_actor : MxActor)
  : void
  {
    ///////////////////////////////////
    // Upper Texture

    this._m_upperTexture = _actor.get_child
    (
      SAND_CLOCK_PART_ID.kLowerTexture
    );

    let upperTextureSprite : SpriteComponent 
      = this._m_upperTexture.getComponent<SpriteComponent>(COMPONENT_ID.kSprite);
    
    this._m_upperInitPoistion = new Phaser.Math.Vector2
    (
      this._m_upperTexture._m_relative_position.x,
      this._m_upperTexture._m_relative_position.y
    );

    this._m_upperTraslation = new Phaser.Math.Vector2
    (
      0,
      upperTextureSprite.getHeight()
    );

    ///////////////////////////////////
    // Lower Texture

    this._m_lowerTexture = _actor.get_child
    (
      SAND_CLOCK_PART_ID.kUpperTexture
    );

    let lowerTextureSprite : SpriteComponent
      = this._m_lowerTexture.getComponent<SpriteComponent>(COMPONENT_ID.kSprite);
    
    this._m_lowerTexture.setRelativePosition
    (
      this._m_lowerTexture._m_relative_position.x,
      this._m_lowerTexture._m_relative_position.y + lowerTextureSprite.getHeight() 
    );
    
    this._m_lowerInitPosition = new Phaser.Math.Vector2
    (
      this._m_lowerTexture._m_relative_position.x,
      this._m_lowerTexture._m_relative_position.y
    )

    this._m_lowerTraslation = new Phaser.Math.Vector2
    (
      0,
      -lowerTextureSprite.getHeight()
    );

    ///////////////////////////////////
    // CLock Controller

    this._m_clockController = _actor.getComponent<ClockController>
    (
      COMPONENT_ID.kClockController
    );
    return;
  }

  update(_actor : MxActor)
  : void
  {
    let percent = this._m_clockController.m_current_time 
                / this._m_clockController._m_totalSeconds;
        
    this._m_upperTexture.setRelativePosition
    (
      this._m_upperInitPoistion.x + (this._m_upperTraslation.x * percent),
      this._m_upperInitPoistion.y + (this._m_upperTraslation.y * percent)
    );

    this._m_lowerTexture.setRelativePosition
    (
      this._m_lowerInitPosition.x + (this._m_lowerTraslation.x * percent),
      this._m_lowerInitPosition.y + (this._m_lowerTraslation.y * percent)
    );
    return;
  }

  destroy()
  : void
  {
    return;
  }

  /****************************************************/
  /* Private                                          */
  /****************************************************/

  /**
   * 
   */
  _m_clockController : ClockController;

  /**
   * 
   */
  _m_upperTexture : MxActor;

  /**
   * 
   */
  _m_lowerTexture : MxActor;

  /**
   * 
   */
  _m_upperInitPoistion : Phaser.Math.Vector2;

  /**
   * 
   */
  _m_lowerInitPosition : Phaser.Math.Vector2;

  /**
   * 
   */
  _m_upperTraslation : Phaser.Math.Vector2;

  /**
   * 
   */
  _m_lowerTraslation : Phaser.Math.Vector2;
}
import { MxComponent } from "../../../../utilities/component/mxComponent";
import { COMPONENT_ID, MESSAGE_ID, MimiKSounds } from "../../../gameCommons";

export class CarouselSound extends MxComponent
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/
  
  constructor()
  {
    super(COMPONENT_ID.kCarouselSound);
    return;
  }

  prepare(_baseSoundManager : Phaser.Sound.BaseSoundManager)
  : void
  {
    this._m_baseSoundManager = _baseSoundManager;
    return;
  }

  receive(_id : number, _data : unknown)
  : void 
  {
    switch(_id)
    {
      case MESSAGE_ID.kButtonDown:
        // Play Audio
        this._m_baseSoundManager.playAudioSprite
        (
          MimiKSounds.kMimiKAudioSprite, 
          MimiKSounds.kButtonCarousel
        );
      return;
    }
  }

  destroy()
  : void
  {
    this._m_baseSoundManager = null;
    return;
  }

  /****************************************************/
  /* Private                                          */
  /****************************************************/
  
  /**
   * 
   */
  _m_baseSoundManager : Phaser.Sound.BaseSoundManager;
}
import { MxComponent } from "../../utilities/component/mxComponent";
import { COMPONENT_ID } from "../gameCommons";

export class BaseSoundManagerComponent extends MxComponent
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/
  
  public constructor()
  {
    super(COMPONENT_ID.kBaseSoundManager);
    return;
  }

  prepare(_baseSoundManager : Phaser.Sound.BaseSoundManager)
  : void
  {
    this._m_baseSoundManager = _baseSoundManager;
    return;
  }

  add(_sound : string, _config ?: Phaser.Types.Sound.SoundConfig)
  : void
  {
    this._m_baseSoundManager.add(_sound, _config);
    return;
  }

  addAudiosprite(_sound : string, _config ?: Phaser.Types.Sound.SoundConfig )
  : void
  {
    this._m_baseSoundManager.addAudioSprite(_sound, _config);
    return;
  }

  play
  (
    _sound : string, 
    _extra ?: Phaser.Types.Sound.SoundConfig | Phaser.Types.Sound.SoundMarker
  )
  : void
  {
    this._m_baseSoundManager.play(_sound, _extra);
    return;
  }

  playAudioSprite
  (
    _audioSpriteKey : string, 
    _audioFrame : string, 
    _config ?: Phaser.Types.Sound.SoundConfig
  )
  : void
  {
    this._m_baseSoundManager.playAudioSprite(_audioSpriteKey, _audioFrame, _config);
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
  _m_baseSoundManager : Phaser.Sound.BaseSoundManager; 
}
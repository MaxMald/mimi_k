import { MxComponent } from "../../utilities/component/mxComponent";
import { COMPONENT_ID, MESSAGE_ID } from "../gameCommons";

export class AudioClipsManager extends MxComponent
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/
  
  public constructor()
  {
    super(COMPONENT_ID.kAudioClipsManager);

    this._m_clipsMap = new Map<string, Phaser.Sound.BaseSound>();
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

  /****************************************************/
  /* Private                                          */
  /****************************************************/
  
  /**
   * 
   */
  _m_baseSoundManager : Phaser.Sound.BaseSoundManager;

  /**
   * 
   */
  _m_clipsMap : Map<string, Phaser.Sound.BaseSound>;
}
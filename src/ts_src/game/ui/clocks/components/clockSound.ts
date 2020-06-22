import { MxComponent } from "../../../../utilities/component/mxComponent";
import { COMPONENT_ID, MxSound, MESSAGE_ID, MimiKSounds, MANAGER_ID, CLOCK_STYLE } from "../../../gameCommons";
import { MxActor } from "../../../../utilities/component/mxActor";
import { MasterManager } from "../../../managers/masteManager/masterManager";
import { GameController } from "../../../managers/gameManager/components/gameController";

export class ClockSound extends MxComponent
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/
  
  constructor()
  {
    super(COMPONENT_ID.kClockSound);
    return;
  }

  prepare(_scene : Phaser.Scene)
  : void
  {
    this._m_baseSoundManager = _scene.sound;

    let master : MxActor = MasterManager.GetInstance();
    let gameManager : MxActor = master.get_child(MANAGER_ID.kGameManager);
    let gameController : GameController = gameManager.getComponent<GameController>
    (
      COMPONENT_ID.kGameController
    );

    switch(gameController._m_user_preferences.getClockStyle())
    {
      case CLOCK_STYLE.kAnalog : 
        this._m_snd_tictoc_frame = MimiKSounds.kTicTocAnalog;
        break;
      case CLOCK_STYLE.kDigital :
        this._m_snd_tictoc_frame = MimiKSounds.kTicTocDigital;
        break;
      case CLOCK_STYLE.kSand : 
        this._m_snd_tictoc_frame = MimiKSounds.kTicTocSand;
        break;
      default :
        this._m_snd_tictoc_frame = MimiKSounds.kTicTocSand;
        break;
    }

    this._m_snd_tictoc = this._m_baseSoundManager.addAudioSprite
    (
      MimiKSounds.kMimiKAudioSprite
    );
    return;
  }

  receive(_id : number, _data : unknown)
  : void 
  {
    switch(_id)
    {
      case MESSAGE_ID.kClockPaused:
        if(!this._m_snd_tictoc.isPaused) {
          this._m_snd_tictoc.pause();
        }
      return;
      case MESSAGE_ID.kClockResumed:
        if(this._m_snd_tictoc.isPaused) {
          this._m_snd_tictoc.resume();
        }
        else if (!this._m_snd_tictoc.isPlaying) {
          this._m_snd_tictoc.play(this._m_snd_tictoc_frame, {loop : true});
        }
      return;
      case MESSAGE_ID.kClockReset:
        this._m_snd_tictoc.play(this._m_snd_tictoc_frame, {loop : true});
        this._m_snd_tictoc.pause();
      return;
      case MESSAGE_ID.kClockTenSecondsAlert :        
        if(this._m_snd_tictoc.isPlaying) {
          this._m_snd_tictoc.stop();
          this._m_snd_tictoc.play(MimiKSounds.kAlertLastSecond, {loop : true})
        }
      return;
      case MESSAGE_ID.kClockTimeOut :
        this._m_snd_tictoc.play(this._m_snd_tictoc_frame, {loop : true});
        this._m_snd_tictoc.pause();
        this._m_baseSoundManager.playAudioSprite
        (
          MimiKSounds.kMimiKAudioSprite,
          MimiKSounds.kAlertFinal
        );
      return;
    }
    return;
  }

  destroy()
  : void
  {
    this._m_baseSoundManager = null;
    if(this._m_snd_tictoc != null) {
      this._m_snd_tictoc.destroy();
    }
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
  _m_snd_tictoc : MxSound;  

  /**
   * AudioSprite name for the clock tictoc.
   */
  _m_snd_tictoc_frame : string;
 
}
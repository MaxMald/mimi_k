import { MxComponent } from "../../../../utilities/component/mxComponent";
import { COMPONENT_ID, MANAGER_ID, MESSAGE_ID, MimiKSounds, CLOCK_STYLE, MxSound } from "../../../gameCommons";
import { MxActor } from "../../../../utilities/component/mxActor";
import { MasterManager } from "../../../managers/masteManager/masterManager";
import { GameController } from "../../../managers/gameManager/components/gameController";
import { MasterController } from "../../../managers/masteManager/components/MasterController";

export class ClockController extends MxComponent
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/
  
  constructor()
  {
    super(COMPONENT_ID.kClockController);

    this.m_isPaused = true;
    this._m_totalSeconds = 0.0;
    this.m_current_time = 0.0;
    return;
  }

  prepare(_scene : Phaser.Scene)
  : void
  {
    this._m_scene = _scene;
    return;
  }

  init(_actor : MxActor)
  : void
  {
    let master = MasterManager.GetInstance();
    this._m_masterController = master.getComponent<MasterController>
    (
      COMPONENT_ID.kMasterController
    );
    
    let gameManager : MxActor = master.get_child(MANAGER_ID.kGameManager);

    this._m_gameController = gameManager.getComponent<GameController>
    (
      COMPONENT_ID.kGameController
    );
    
    this._m_totalSeconds = this._m_gameController._m_user_preferences.chrono_value;
    this._m_timer = this._m_scene.time.addEvent
    ({
      delay : this._m_totalSeconds * 1000.0,
      paused : true
    })

    this.m_current_time = this._m_totalSeconds;
    this._m_actor = _actor;
    this.reset();
    return;
  }

  update(_actor : MxActor)
  : void
  {
    if(!this.m_isPaused) {
      
      this.m_current_time 
        = this._m_totalSeconds - (this._m_timer.getProgress() * this._m_totalSeconds);

      if(this.m_current_time <= 0.0) {        
        this.m_current_time = 0.0;
        this.timeOut();
      }
      else if(this.m_current_time < 10 && !this._m_areFinalSeconds) {   
        this._m_areFinalSeconds = !this._m_areFinalSeconds;     
        this._m_actor.sendMessage(MESSAGE_ID.kClockTenSecondsAlert, null);        
      }
    }
    return;
  }

  pause()
  : void
  {
    this.m_isPaused = true;
      this._m_timer.paused = true;
      this._m_actor.sendMessage(MESSAGE_ID.kClockPaused, null);

    if(!this.m_isPaused) {      
      
    }    
    return;
  }

  resume()
  : void
  {
    if(this._m_isTimeOut) {
      return;
    }

    this.m_isPaused = false;
      this._m_timer.paused = false;
      this._m_actor.sendMessage(MESSAGE_ID.kClockResumed, null);

    if(this.m_isPaused) {      
      
    }    
    return;
  }

  reset()
  : void
  {
    this.m_current_time = this._m_totalSeconds;    
    this._m_isTimeOut = false;
    this._m_areFinalSeconds = false;
    
    this._m_timer.destroy();
    this._m_timer = this._m_scene.time.addEvent
    (
      {
        delay : this._m_totalSeconds * 1000.0,
        paused : true
      }
    );
    this._m_actor.sendMessage(MESSAGE_ID.kClockReset, null);
    this.pause();
    return;
  }

  timeOut()
  : void
  {
    if(!this._m_isTimeOut) {
      this._m_isTimeOut = !this._m_isTimeOut;
      this.pause();
      this._m_gameController.timeout();
      this._m_actor.sendMessage(MESSAGE_ID.kTimeOut, null);
    }   
    return;
  }

  /**
   * Is the clock pause or not.
   */
  m_isPaused : boolean;

  /**
   * Current time.
   */
  m_current_time : number;
  
  /****************************************************/
  /* Protected                                        */
  /****************************************************/

  /**
   * 
   */
  _m_scene : Phaser.Scene;

  /**
   * 
   */
  _m_timer : Phaser.Time.TimerEvent;

  /**
   * 
   */
  _m_isTimeOut : boolean;
  
  /**
   * Total seconds for the match.
   */
  _m_totalSeconds : number;
  
  /**
   * 
   */
  _m_masterController : MasterController;

  /**
   * 
   */
  _m_gameController : GameController;

  /**
   * 
   */
  _m_areFinalSeconds : boolean;

  /**
   * Actor that this component belongs.
   */
  _m_actor : MxActor;  
}
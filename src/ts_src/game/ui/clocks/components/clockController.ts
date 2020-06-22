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
    this.m_current_time = this._m_totalSeconds;
    this._m_actor = _actor;
    this.reset();
    return;
  }

  update(_actor : MxActor)
  : void
  {
    if(!this.m_isPaused) {
      this.m_current_time -= this._m_masterController.m_dt;

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
    if(!this.m_isPaused) {      
      this.m_isPaused = !this.m_isPaused;
      this._m_actor.sendMessage(MESSAGE_ID.kClockPaused, null);
    }    
    return;
  }

  resume()
  : void
  {
    if(this._m_isTimeOut) {
      return;
    }

    if(this.m_isPaused) {      
      this.m_isPaused = !this.m_isPaused;
      this._m_actor.sendMessage(MESSAGE_ID.kClockResumed, null);
    }    
    return;
  }

  reset()
  : void
  {
    this.m_current_time = this._m_totalSeconds;    
    this._m_isTimeOut = false;
    this._m_areFinalSeconds = false;
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
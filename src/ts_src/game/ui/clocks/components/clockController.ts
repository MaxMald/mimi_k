import { MxComponent } from "../../../../utilities/component/mxComponent";
import { COMPONENT_ID, MANAGER_ID, MESSAGE_ID } from "../../../gameCommons";
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

  init(_actor : MxActor)
  : void
  {
    let master = MasterManager.GetInstance();
    this._m_masterController = master.getComponent<MasterController>
    (
      COMPONENT_ID.kMasterController
    );
    
    let gameManager : MxActor = master.get_child(MANAGER_ID.kGameManager);

    let gameController : GameController = gameManager.getComponent<GameController>
    (
      COMPONENT_ID.kGameController
    );

    this._m_totalSeconds = gameController._m_user_preferences.chrono_value;
    this.m_current_time = this._m_totalSeconds;
    this._m_actor = _actor;
    return;
  }

  update(_actor : MxActor)
  : void
  {
    if(!this.m_isPaused) {
      this.m_current_time -= this._m_masterController.m_dt;
      if(this.m_current_time <= 0.0) {
        this._m_actor.sendMessage(MESSAGE_ID.kTimeOut, null);
        this.m_current_time = 0.0;
        this.m_isPaused = !this.m_isPaused;
      }
    }
    return;
  }

  pause()
  : void
  {
    if(!this.m_isPaused) {
      this._m_actor.sendMessage(MESSAGE_ID.kClockPaused, null);
      this.m_isPaused = !this.m_isPaused;
    }    
    return;
  }

  resume()
  : void
  {
    if(this.m_isPaused) {
      this._m_actor.sendMessage(MESSAGE_ID.kClockResumed, null);
      this.m_isPaused = !this.m_isPaused;
    }    
    return;
  }

  reset()
  : void
  {
    this.m_current_time = this._m_totalSeconds;
    this._m_actor.sendMessage(MESSAGE_ID.kClockReset, null);
    this.pause();
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
   * Total seconds for the match.
   */
  _m_totalSeconds : number;
  
  /**
   * 
   */
  _m_masterController : MasterController;

  /**
   * Actor that this component belongs.
   */
  _m_actor : MxActor;
}
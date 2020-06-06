import { MxComponent } from "../../../../utilities/component/mxComponent";
import { COMPONENT_ID } from "../../../gameCommons";
import { MxActor } from "../../../../utilities/component/mxActor";
import { MasterManager } from "../../masteManager/masterManager";
import { MasterController } from "../../masteManager/components/MasterController";
import { AssertNumber } from "../../../../utilities/asserts";

export class ChronoController extends MxComponent
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/

  constructor() {
    super(COMPONENT_ID.kChronoController);
    return;
  }

  init(_actor : MxActor)
  : void {  
    let master : MxActor = MasterManager.GetInstance();
    this._m_master_controller 
      = master.getComponent<MasterController>(COMPONENT_ID.kMasterController);

    if(MxComponent.IsNull(this._m_master_controller)) {
      throw new Error('MasterController not founded!.');
    }
    
    this._m_isRunning = false;
    this.reset(5, 1);
    return;
  }
    
  update(_actor : MxActor)
  : void {
    if(this._m_isRunning) {
      this._m_chrono_current -= this._m_master_controller.m_dt;
          
      // check if the chrono reach the mark
      if(!this._m_reach_mark){
        if(this._m_chrono_current <= this._m_chrono_mark) {
                  
          // TODO
          this._m_reach_mark = !this._m_reach_mark;
        }
      }
          
      // check if chrono reach zero.
      if(this._m_chrono_current <= 0) {
        this._m_chrono_current = 0;
        this.pause();
      }
    }
    return;
  }

  destroy()
  : void {
    this._m_master_controller = null;
    super.destroy();
    return;
  }

  reset(_chrono_value : number, _chrono_mark : number)
  : void {
    AssertNumber(_chrono_value);

    this._m_chrono = _chrono_value;
    this._m_chrono_current = this._m_chrono;
        
    AssertNumber(_chrono_mark);
    this._m_chrono_mark = _chrono_mark;
    this._m_reach_mark = false;

    this.pause();
    return;
  }

  start()
  : void {
    if(!this._m_isRunning){
      this._m_isRunning = !this._m_isRunning;
    }
    return;
  }

  pause()
  : void {
    if(this._m_isRunning){
      this._m_isRunning = !this._m_isRunning;
    }
    return;
  }

  getCurrentTime()
  : number {
    return this._m_chrono_current;
  }

  getCurrentTimeNorm()
  : number {
    return this._m_chrono_current / this._m_chrono;
  }

  isRunning()
  : boolean {
    return this._m_isRunning;
  }

  /****************************************************/
  /* Private                                          */
  /****************************************************/
  /**
   * 
   */
  _m_master_controller : MasterController;
  
  /**
   * The moment when the manager trigger an event.
   */
  _m_chrono_mark : number;

  /**
   * Flag if the chrono already reach the mark in a previous update.
   */
  _m_reach_mark : boolean;

  /**
   * Chronometer value.
   */
  _m_chrono : number;

  /**
   * Current value of the chronometer value.
   */
  _m_chrono_current : number;

  /**
   * Is the chronometer running? True if it is.
   */
  _m_isRunning : boolean;
}
import { MxComponent } from "../../../../utilities/component/mxComponent";
import { COMPONENT_ID, MANAGER_ID, LOCALIZATION } from "../../../gameCommons";
import { MxActor } from "../../../../utilities/component/mxActor";
import { UserPreferences } from "../../userPreferences/userPreferences";
import { MxListenerManager } from "../../../../utilities/listeners/mxListenerManager";
import { MxListener } from "../../../../utilities/listeners/mxListener";

export class GameController extends MxComponent
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/
  
  constructor()
  {
    super(COMPONENT_ID.kGameController);
    return;
  }

  init(_actor : MxActor)
  : void 
  {
    this._m_user_preferences = new UserPreferences();
    
    this._m_events = new MxListenerManager();    
    this._m_events.addEvent('timeout');
    return;
  }

  update(_actor : MxActor)
  : void 
  {
    return;
  }

  destroy()
  : void 
  {
    this._m_user_preferences.destroy();
    return;
  }

  /**
   * Events: 'timeout'
   * 
   * @param _event 
   * @param _fn 
   * @param _context 
   */
  on(_event : string , _fn : ()=>void, _context : any)
  : void
  {
    this._m_events.addListener(_event, new MxListener(_fn, _context));
    return;
  }

  /**
   * Trigger the timeout event.
   */
  timeout()
  : void
  {
    this._m_events.call('timeout');
    return;
  }

  /**
   * Gets this game's localization identifer.
   */
  getLocalization()
  : LOCALIZATION 
  {
    return this._m_user_preferences.getLocalization();
  }

  /**
   * Sets the game's localization identifier.
   * 
   * @param _localization Localization identifier.
   */
  setLocalization(_localization : LOCALIZATION)
  : void 
  {
    this._m_user_preferences.setLocalization(_localization);
    return;
  }

  /**
   * Reference to the primary active scene.
   */
  m_active_scene : Phaser.Scene;

  /****************************************************/
  /* Private                                          */
  /****************************************************/
  
  /**
    * Reference to the UserPreference object.
  */
  _m_user_preferences : UserPreferences; 

  /**
   * 
   */
  _m_events : MxListenerManager;
}
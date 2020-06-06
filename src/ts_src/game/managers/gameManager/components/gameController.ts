import { MxComponent } from "../../../../utilities/component/mxComponent";
import { COMPONENT_ID, MANAGER_ID, LOCALIZATION } from "../../../gameCommons";
import { MxActor } from "../../../../utilities/component/mxActor";
import { ChronoController } from "./chronoController";
import { UserPreferences } from "../../userPreferences/userPreferences";

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
  : void { 
    this._m_chronoController = _actor.getComponent<ChronoController>
    (
      COMPONENT_ID.kChronoController
    );
    
    if(MxComponent.IsNull(this._m_chronoController)) {
      throw new Error('ChronoController not founded!.');
    }

    this._m_user_preferences = new UserPreferences();
    return;
  }

  update(_actor : MxActor)
  : void {
    return;
  }

  destroy()
  : void {
    this._m_user_preferences.destroy();
    return;
  }  

  
  initGamePlay()
  : void {
    if(!this._m_inGameplay) {
      
    } 
    return;
  }

  /**
  * Reset the Gameplay
  */
  public resetGameplay()
  : void {
    if(this._m_inGameplay) {
      this._m_chronoController.reset
      (
        this._m_user_preferences.chrono_value,
        this._m_user_preferences.chrono_value * 0.1
      );
    }
    return;
  }

  /**
   * Shutdown Gameplay
   */
  public shutdownGameplay()
  : void {
      if(this._m_inGameplay) {
          this._m_inGameplay = !this._m_inGameplay;
      }
      return;
  }

  /**
   * Gets this game's localization identifer.
   */
  public getLocalization()
  : LOCALIZATION {
      return this._m_user_preferences.getLocalization();
  }

  /**
   * Sets the game's localization identifier.
   * 
   * @param _localization Localization identifier.
   */
  public setLocalization(_localization : LOCALIZATION)
  : void {
      this._m_user_preferences.setLocalization(_localization);
      return;
  }

  /****************************************************/
  /* Private                                          */
  /****************************************************/
  
  /**
    * Reference to the UserPreference object.
  */
  _m_user_preferences : UserPreferences; 

  /**
    * This flag indicate if we are at the game scene.
  */
  _m_inGameplay : boolean;

  /**
   * Reference to the chronocontroller.
   */
  _m_chronoController : ChronoController;

}
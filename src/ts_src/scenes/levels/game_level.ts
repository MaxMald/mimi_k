import { MxActor } from "../../utilities/component/mxActor";
import { DataController } from "../../game/managers/gameManager/components/dataController";
import { GameController } from "../../game/managers/gameManager/components/gameController";
import { MasterManager } from "../../game/managers/masteManager/masterManager";
import { MANAGER_ID, COMPONENT_ID, CLOCK_STYLE } from "../../game/gameCommons";
import { Button } from "../../game/ui/buttons/imgButton";
import { SpriteComponent } from "../../game/components/spriteComponent";
import { BitmapTextComponent } from "../../game/components/bitmapTextComponent";
import { ClockController } from "../../game/ui/clocks/components/clockController";
import { Clock } from "../../game/ui/clocks/clock";
import { MasterController } from "../../game/managers/masteManager/components/MasterController";

export class MainGame extends Phaser.Scene
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/

  create()
  : void 
  {
    // Get Controllers

    let master : MxActor = MasterManager.GetInstance();

    this._m_masterController = master.getComponent<MasterController>
    (
      COMPONENT_ID.kMasterController
    );

    let gameManager : MxActor = master.get_child(MANAGER_ID.kGameManager);

    this._m_dataController 
      = gameManager.getComponent<DataController>(COMPONENT_ID.kDataController);

    this._m_gameController
      = gameManager.getComponent<GameController>(COMPONENT_ID.kGameController);      
    
    /****************************************************/
    /* Main Menu Button                                 */
    /****************************************************/

    let halfWidth : number = this.game.canvas.width * 0.5;

    this._m_mainMenuButton = Button.CreateStandard
    (
      this,
      0,
      halfWidth, 200,
      'landpage',
      'button.png',
      this._m_dataController.getString('back_to_menu'),
      this._onClick_mainMenu,
      this
    );

    let mainMenuButtonSprite 
      = this._m_mainMenuButton.getComponent<SpriteComponent>(COMPONENT_ID.kSprite);

    mainMenuButtonSprite.setTint(0xface01);

    let mainMenuButtonText
      = this._m_mainMenuButton.getComponent<BitmapTextComponent>(COMPONENT_ID.kBitmapText);
      
    mainMenuButtonText.setTint(0x0a0136);

    /****************************************************/
    /* Pause Button                                     */
    /****************************************************/

    this._m_pauseButton = Button.CreateStandard
    (
      this,
      0,
      halfWidth, 1600,
      'landpage',
      'button.png',
      this._m_dataController.getString('pause'),
      this._on_click_pause_resume,
      this
    );
    
    this._m_pauseButtonTexture
      = this._m_pauseButton.getComponent<SpriteComponent>
      (
        COMPONENT_ID.kSprite
      );

    this._m_pauseButtonText
      = this._m_pauseButton.getComponent<BitmapTextComponent>
      (
        COMPONENT_ID.kBitmapText
      );    
    this._m_pauseButtonText.setTint(0xffffff);

    /****************************************************/
    /* Reset Button                                     */
    /****************************************************/

    this._m_resetButton = Button.CreateStandard
    (
      this,
      0,
      halfWidth, 1800,
      'landpage',
      'button.png',
      this._m_dataController.getString('reset'),
      this._onClick_Reset,
      this
    );
    
    let resetButtonSprite
      = this._m_resetButton.getComponent<SpriteComponent>
      (
        COMPONENT_ID.kSprite
      );

    resetButtonSprite.setTint(0xff5709);

    let resetButtonText
      = this._m_resetButton.getComponent<BitmapTextComponent>
      (
        COMPONENT_ID.kBitmapText
      );
    resetButtonText.setTint(0xffffff);

    /****************************************************/
    /* Clock                                            */
    /****************************************************/

    switch(this._m_gameController._m_user_preferences.getClockStyle())
    {
      case CLOCK_STYLE.kSand :
        this._m_clock = Clock.CreateSand(this, 0);
        break;
      case CLOCK_STYLE.kDigital :
        this._m_clock = Clock.CreateDigital(this, 0);
        break;
      case CLOCK_STYLE.kAnalog :
        this._m_clock = Clock.CreateAnalog(this, 0);
        break;
      default :
        this._m_clock = Clock.CreateDigital(this, 0);
        break;
    }

    this._m_clock.setRelativePosition(halfWidth, this.game.canvas.height * 0.5);
    this._m_clockController = this._m_clock.getComponent<ClockController>
    (
      COMPONENT_ID.kClockController
    );

    this._onClick_Reset();
    return;
  }

  update(_time : number, _delta : number)
  : void
  {
    this._m_masterController.m_dt = _delta / 1000.0;

    this._m_clock.update();
    this._m_pauseButton.update();
    this._m_mainMenuButton.update();
    this._m_resetButton.update();
    return;
  }

  destroy()
  : void
  {
    this._m_clock.destroy();
    this._m_pauseButton.destroy();
    this._m_mainMenuButton.destroy();
    this._m_resetButton.destroy();
    return;
  }

  /****************************************************/
  /* Private                                          */
  /****************************************************/

  /**
   * Pause or resume time.
   */
  _on_click_pause_resume()
  : void 
  {
    if(this._m_clockController.m_isPaused) {
      this._m_clockController.resume();

      this._m_pauseButtonText.setText(this._m_dataController.getString('pause'));
      this._m_pauseButtonTexture.setTint(0xff0013);
    }
    else {      
      this._m_clockController.pause();

      this._m_pauseButtonText.setText(this._m_dataController.getString('resume'));
      this._m_pauseButtonTexture.setTint(0x31a13b);
    }
    return;
  }

  /**
   * Returns to the Mainmenu scene.
   */
  _onClick_mainMenu()
  : void
  {
    this.destroy();
    this.scene.start('mainMenu');
    return;
  }

  /**
   * Reset time.
   */
  _onClick_Reset()
  : void
  {
    this._m_clockController.reset();  
    
    this._m_pauseButtonText.setText(this._m_dataController.getString('start'));
    this._m_pauseButtonTexture.setTint(0x31a13b);
    return;
  }

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
  _m_dataController : DataController;

  /**
   * 
   */
  _m_mainMenuButton : MxActor;

  /**
   * 
   */
  _m_pauseButton : MxActor;

  /**
   * 
   */
  _m_pauseButtonTexture : SpriteComponent;

  /**
   * 
   */
  _m_pauseButtonText : BitmapTextComponent;

  /**
   * 
   */
  _m_resetButton : MxActor;

  /**
   * 
   */
  _m_clockController : ClockController;

  /**
   * 
   */
  _m_clock : MxActor;
}
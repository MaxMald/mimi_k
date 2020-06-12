import { MxActor } from "../../utilities/component/mxActor";
import { DataController } from "../../game/managers/gameManager/components/dataController";
import { GameController } from "../../game/managers/gameManager/components/gameController";
import { MasterManager } from "../../game/managers/masteManager/masterManager";
import { MANAGER_ID, COMPONENT_ID } from "../../game/gameCommons";
import { Button } from "../../game/ui/buttons/imgButton";
import { SpriteComponent } from "../../game/components/spriteComponent";
import { BitmapTextComponent } from "../../game/components/bitmapTextComponent";

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
    
    let pauseButtonSprite
      = this._m_pauseButton.getComponent<SpriteComponent>(COMPONENT_ID.kSprite);

    pauseButtonSprite.setTint(0x31a13b);

    let pauseButtonText
      = this._m_pauseButton.getComponent<BitmapTextComponent>(COMPONENT_ID.kBitmapText);

    pauseButtonText.setTint(0xffffff);

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
      = this._m_pauseButton.getComponent<SpriteComponent>(COMPONENT_ID.kSprite);

    resetButtonSprite.setTint(0x31a13b);

    let resetButtonText
      = this._m_pauseButton.getComponent<BitmapTextComponent>(COMPONENT_ID.kBitmapText);

    resetButtonText.setTint(0xffffff);

    return;
  }

  update()
  : void
  {
    this._m_pauseButton.update();
    this._m_mainMenuButton.update();
    this._m_resetButton.update();
    return;
  }

  destroy()
  : void
  {
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
    return;
  }

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
  _m_resetButton : MxActor;
}
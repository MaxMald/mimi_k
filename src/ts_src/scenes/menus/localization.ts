import { GameManager } from "../../game/managers/gameManager/gameManager";
import { MANAGER_ID, LOCALIZATION, COMPONENT_ID } from "../../game/gameCommons";
import { MxActor } from "../../utilities/component/mxActor";
import { MasterManager } from "../../game/managers/masteManager/masterManager";
import { MxComponent } from "../../utilities/component/mxComponent";
import { GameController } from "../../game/managers/gameManager/components/gameController";

export  class LocalizationScene extends Phaser.Scene
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/
        
  create()
  : void {

    let width = this.game.canvas.width;
    let height = this.game.canvas.height;

    // English icon
    let english_button : Phaser.GameObjects.Sprite = this.add.sprite
    (
      width * 0.5,
      height * 0.25,
      'preloader',
      'english_map.png'
    );

    english_button.setInteractive();
    english_button.on('pointerup', this._onClick_english, this);

    // Latam icon
    let latin_button : Phaser.GameObjects.Sprite = this.add.sprite
    (
      width * 0.5,
      height * 0.75,
      'preloader',
      'latino_map.png'
    );

    latin_button.setInteractive();
    latin_button.on('pointerup', this._onClick_spanish, this);
    return;
  }

  /****************************************************/
  /* Private                                          */
  /****************************************************/
    
  _onClick_english()
  : void {
    let master : MxActor = MasterManager.GetInstance();
    let gameManager : MxActor = master.get_child(MANAGER_ID.kGameManager);    
    let gameController : GameController 
      = gameManager.getComponent<GameController>(COMPONENT_ID.kGameController);

    gameController.setLocalization(LOCALIZATION.kEnglish);

    // TODO: start preload scene.
    this.scene.start('preloader');
    return;
  }

  private _onClick_spanish()
  : void {
    let master : MxActor = MasterManager.GetInstance();
    let gameManager : MxActor = master.get_child(MANAGER_ID.kGameManager);    
    let gameController : GameController 
      = gameManager.getComponent<GameController>(COMPONENT_ID.kGameController);

    gameController.setLocalization(LOCALIZATION.KSpanish);

    // TODO: start preload scene.
    this.scene.start('preloader');
    return;
  }
}
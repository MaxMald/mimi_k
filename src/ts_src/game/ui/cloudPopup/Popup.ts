import { MxActor } from "../../../utilities/component/mxActor";
import { NineSliceComponent } from "../../components/nineSliceComponent";
import { PopupController } from "./components/popupController";
import { BitmapTextComponent } from "../../components/bitmapTextComponent";
import { UIBitmapText } from "../text/uiBitmapText";
import { SpriteComponent } from "../../components/spriteComponent";
import { AlertPopupController } from "./components/alertPopupController";
import { MasterManager } from "../../managers/masteManager/masterManager";
import { COMPONENT_ID, MANAGER_ID, LOCALIZATION } from "../../gameCommons";
import { DataController } from "../../managers/gameManager/components/dataController";
import { GameController } from "../../managers/gameManager/components/gameController";

/**
 * Popup Factories
 */
export class Popup
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/
  
  /**
   * Creates a cloudpoup.
   * 
   * @param _scene Phaser.Scene 
   * @param _id Actor's id.
   */
  static CreateCloud(_scene : Phaser.Scene, _id : number)
  : MxActor
  {
    let actor : MxActor = MxActor.Create(_id);
    
    ///////////////////////////////////
    // Create Components

    let popupController : PopupController = new PopupController();
    actor.addComponent(popupController);

    let nineSliceComponent : NineSliceComponent = new NineSliceComponent()
    actor.addComponent(nineSliceComponent);

    nineSliceComponent.prepare
    (
      _scene,
      'landpage',
      'msg_cloud.png',
      [140, 128, 5, 128 ]
    );

    let textComponent : BitmapTextComponent =
      UIBitmapText.AddStandard(_scene, '', actor);
    
    textComponent.setFontSize(50);
    textComponent.setOrigin(0.5, 0.5);
    textComponent.setTint(0x0a0136);
    textComponent.setCenterAlign();
    textComponent._m_local_position.setTo(0, -100);

    actor.init();
    
    ///////////////////////////////////
    // Prepare Components

    popupController.prepare(_scene);    
    return actor;
  }

  static CreateTimeAlert(_id : number, _scene : Phaser.Scene)
  : MxActor
  {
    let master : MxActor = MasterManager.GetInstance();
    let gameManager : MxActor = master.get_child(MANAGER_ID.kGameManager);
    let dataController : DataController = gameManager.getComponent<DataController>
    (
      COMPONENT_ID.kDataController
    );
    let gameController : GameController = gameManager.getComponent<GameController>
    (
      COMPONENT_ID.kGameController
    );

    let alert_sprite : string = 
    (
      gameController._m_user_preferences.m_localization == LOCALIZATION.KSpanish  
      ? 'cat_timeout_esp.png' 
      : 'cat_timeout_en.png' 
    );
    let alert : MxActor = MxActor.Create(_id);

    let alertBackground : SpriteComponent = new SpriteComponent();
    alertBackground.setSprite
    (
      _scene.add.sprite
      (
        0,0,
        'landpage_2',
        alert_sprite
      )
    );
    alert.addComponent(alertBackground);

    let alertController : AlertPopupController = new AlertPopupController();
    alertController.prepare(_scene);

    alert.addComponent(alertController);
    alert.init();

    return alert;
  }
}
import { MxActor } from "../../../utilities/component/mxActor";
import { NineSliceComponent } from "../../components/nineSliceComponent";
import { TextComponent } from "../../components/textComponent";
import { PopupController } from "./components/popupController";
import { BitmapTextComponent } from "../../components/bitmapTextComponent";
import { UIBitmapText } from "../text/uiBitmapText";

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
}
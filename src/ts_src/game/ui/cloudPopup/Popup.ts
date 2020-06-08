import { MxActor } from "../../../utilities/component/mxActor";
import { NineSliceComponent } from "../../components/nineSliceComponent";
import { TextComponent } from "../../components/textComponent";
import { PopupController } from "./components/popupController";

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

    let textComponent : TextComponent = new TextComponent();
    actor.addComponent(textComponent);
    
    actor.init();
    
    ///////////////////////////////////
    // Prepare Components
    
    nineSliceComponent.prepare
    (
      _scene,
      'main_menu',
      'msg_cloud.png',
      [61, 72, 69, 59]
    );

    textComponent.prepare
    (
      _scene,
      "", 
      { fontFamily: '"Roboto Condensed"' }
    );
    textComponent.setFontSize(30);
    textComponent.setOrigin(0.5, 0.5);
    textComponent.setFontColor('black');
    textComponent.setAlign('center');

    popupController.prepare(_scene);
    return actor;
  }
}
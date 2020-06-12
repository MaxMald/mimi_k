import { TextComponent } from "../../components/textComponent";
import { MxActor } from "../../../utilities/component/mxActor";

export class UIText
{

  /****************************************************/
  /* Public                                           */
  /****************************************************/
  
  /**
   * Adds an standard TextComponent.
   * 
   * @param _scene 
   * @param _label 
   * @param _actor 
   */
  static AddStandard(_scene: Phaser.Scene, _label : string, _actor : MxActor)
  : TextComponent
  {
    let textComponent : TextComponent = new TextComponent();
    _actor.addComponent(textComponent);

    textComponent.prepare
    (
      _scene,
      _label, 
      { fontFamily: '"Roboto Condensed"' }
    );
    textComponent.setFontSize(30);
    textComponent.setOrigin(0.5, 0.5);
    textComponent.setFontColor('black');
    textComponent.setAlign('center');

    return textComponent;
  }
}
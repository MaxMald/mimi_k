import { BitmapTextComponent } from "../../components/bitmapTextComponent";
import { MxActor } from "../../../utilities/component/mxActor";

export class UIBitmapText
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/
  
  static AddStandard(_scene : Phaser.Scene, _text : string, _actor : MxActor)
  : BitmapTextComponent
  {
    let textComponent : BitmapTextComponent = new BitmapTextComponent();

    _actor.addComponent(textComponent);
    textComponent.prepare
    (
      _scene,
      'avant_garde_bk',
      _text,
      50
    );

    return textComponent;
  }
}
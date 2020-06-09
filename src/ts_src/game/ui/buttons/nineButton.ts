import { MxActor } from "../../../utilities/component/mxActor";
import { TextComponent } from "../../components/textComponent";
import { NineSliceComponent } from "../../components/nineSliceComponent";

/**
 * 
 */
export class NineButton 
{
  /**
   * 
   * @param _scene 
   * @param _id 
   * @param _x 
   * @param _y 
   * @param _label 
   * @param _fn 
   * @param _context 
   */
  static CreateStandard
  (
    _scene : Phaser.Scene, 
    _id : number,
    _x : number,
    _y : number,
    _label : string,    
    _fn : ()=>void,
    _context : any
  )
  : MxActor
  {
    let actor : MxActor = MxActor.Create(_id);
    actor.setRelativePosition(_x, _y);

    ///////////////////////////////////
    // Create Components

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
      'button_bg.png',
      [70, 70, 70, 70]
    );
    nineSliceComponent.setInteractive();
    nineSliceComponent.on('pointerdown', _fn, _context);

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
    
    return actor;
  }
}
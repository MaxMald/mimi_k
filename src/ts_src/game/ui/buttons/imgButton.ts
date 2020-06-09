import { MxActor } from "../../../utilities/component/mxActor";
import { SpriteComponent } from "../../components/spriteComponent";
import { TextComponent } from "../../components/textComponent";

/**
 * 
 */
export class Button 
{
  /**
   * 
   * @param _scene 
   * @param _id 
   * @param _x 
   * @param _y 
   * @param _texture 
   * @param _frame 
   * @param _fn 
   * @param _context 
   */
  static CreateImageButton
  (
    _scene : Phaser.Scene, 
    _id : number,
    _x : number,
    _y : number,
    _texture : string,
    _frame : string,    
    _fn : ()=>void,
    _context : any
  )
  : MxActor
  {
    let actor : MxActor = MxActor.Create(_id);
    actor.setRelativePosition(_x, _y);

    ///////////////////////////////////
    // Create Components

    let spriteComponent : SpriteComponent = new SpriteComponent()
    actor.addComponent(spriteComponent);
    
    actor.init();
    
    ///////////////////////////////////
    // Prepare Components
    
    spriteComponent.setSprite
    (
      _scene.add.sprite
      (
        0, 0,
        'main_menu',
        'arrow_button.png'
      )
    );
    spriteComponent.setInteractive();
    spriteComponent.on('pointerdown', _fn, _context);
    
    return actor;
  }
}
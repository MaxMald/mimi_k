import { Button } from "../buttons/imgButton";
import { MxActor } from "../../../utilities/component/mxActor";
import { CAROUSEL_CHILD_ID, COMPONENT_ID, MANAGER_ID } from "../../gameCommons";
import { TextComponent } from "../../components/textComponent";
import { SpriteComponent } from "../../components/spriteComponent";
import { CarouselController } from "./components/carousleController";
import { BitmapTextComponent } from "../../components/bitmapTextComponent";
import { UIBitmapText } from "../text/uiBitmapText";
import { MasterManager } from "../../managers/masteManager/masterManager";
import { DataController } from "../../managers/gameManager/components/dataController";

export class Carousel
{  
  static Create(_scene : Phaser.Scene , _id : number)
  : MxActor
  {
    // Get Data Manager.

    let master : MxActor = MasterManager.GetInstance();
    let gameManager : MxActor = master.get_child(MANAGER_ID.kGameManager);
    let dataController : DataController  
      = gameManager.getComponent<DataController>(COMPONENT_ID.kDataController);

    let carousel : MxActor = MxActor.Create(_id);

    /****************************************************/
    /* Children                                         */
    /****************************************************/

    ///////////////////////////////////
    // Title

    let label : MxActor = MxActor.Create(CAROUSEL_CHILD_ID.kTitle);

    let labelText : BitmapTextComponent = UIBitmapText.AddStandard
    (
      _scene, 
      dataController.getString('choose_clock'), 
      label
    );
    labelText.setOrigin(0.5,0.5);
    labelText.setFontSize(60);

    label.init();    
    label.setRelativePosition(0.0, -315.0);

    carousel.addChild(label);

    ///////////////////////////////////
    // Preview Background

    let previewBackground : MxActor = MxActor.Create
    (
      CAROUSEL_CHILD_ID.kPreviewBackground, 
      carousel
    );

    let backgroundImg : SpriteComponent = new SpriteComponent();
    backgroundImg.setSprite
    (
      _scene.add.sprite
      (
        0, 0,
        'landpage',
        'clock_background.png'
      )
    );
    previewBackground.addComponent(backgroundImg);

    ///////////////////////////////////
    // Preview

    let preview :  MxActor = MxActor.Create(CAROUSEL_CHILD_ID.kPreview);

    let preview_sprite : SpriteComponent = new SpriteComponent();
    preview_sprite.setSprite
    (
      _scene.add.sprite
      (
        0, 0,
        'landpage',
        'clock_idx_0.png'
      )
    );
    preview.addComponent(preview_sprite);
    
    preview.init();

    carousel.addChild(preview);   

    ///////////////////////////////////
    // Left Button
    
    let leftButton : MxActor = Button.CreateImageButton
    (
      _scene,
      CAROUSEL_CHILD_ID.kLeftButton,
      -350, 0,
      'landpage',
      'arrow_button.png',
      function(){},
      this
    );

    let leftButton_sprite : SpriteComponent 
        = leftButton.getComponent<SpriteComponent>(COMPONENT_ID.kSprite);    
    leftButton_sprite.setScale(-1.0, 1.0);
    leftButton_sprite.setTint(0x7763ad);

    carousel.addChild(leftButton);

    ///////////////////////////////////
    // Right Button

    let rightButton : MxActor = Button.CreateImageButton
    (
      _scene,
      CAROUSEL_CHILD_ID.kRightButton,
      350, 0,
      'landpage',
      'arrow_button.png',
      function(){},
      this
    );

    let rightButton_sprite : SpriteComponent 
        = rightButton.getComponent<SpriteComponent>(COMPONENT_ID.kSprite); 
    rightButton_sprite.setTint(0x7763ad);
    
    carousel.addChild(rightButton);

    ///////////////////////////////////
    // Clock Name

    let clock_name : MxActor = MxActor.Create(CAROUSEL_CHILD_ID.kClockName);    
    
    let clock_name_text : BitmapTextComponent = UIBitmapText.AddStandard
    (
      _scene,
      '',
      clock_name
    );
    clock_name_text.setOrigin(0.5,0.5);

    clock_name.init();    
    clock_name.setRelativePosition(0.0, 290.0);

    carousel.addChild(clock_name);

    /****************************************************/
    /* Components                                       */
    /****************************************************/
      
    let carouselController : CarouselController = new CarouselController();
    carousel.addComponent(carouselController);
    carouselController.init(carousel);

    return carousel;
  }
}
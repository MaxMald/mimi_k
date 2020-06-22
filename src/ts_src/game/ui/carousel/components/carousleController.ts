import { MxComponent } from "../../../../utilities/component/mxComponent";
import { COMPONENT_ID, CAROUSEL_CHILD_ID, MANAGER_ID, CLOCK_STYLE, MESSAGE_ID } from "../../../gameCommons";
import { MxActor } from "../../../../utilities/component/mxActor";
import { SpriteComponent } from "../../../components/spriteComponent";
import { GameController } from "../../../managers/gameManager/components/gameController";
import { MasterManager } from "../../../managers/masteManager/masterManager";
import { DataController } from "../../../managers/gameManager/components/dataController";
import { BitmapTextComponent } from "../../../components/bitmapTextComponent";

export class CarouselController extends MxComponent
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/
  
  constructor()
  {
    super(COMPONENT_ID.kCarouselController);    
    return;
  }

  init(_actor : MxActor)
  : void
  {
    this._m_actor = _actor;

    ///////////////////////////////////
    // Game Controller

    let master : MxActor = MasterManager.GetInstance();
    let gameManager : MxActor = master.get_child(MANAGER_ID.kGameManager);
    
    this._gameController = gameManager.getComponent<GameController>
    (
      COMPONENT_ID.kGameController
    );
    
    ///////////////////////////////////
    // DataController

    this._dataController = gameManager.getComponent<DataController>
    (
      COMPONENT_ID.kDataController
    );
    
    ///////////////////////////////////
    // Left Button
    
    let leftButton : MxActor = _actor.get_child(CAROUSEL_CHILD_ID.kLeftButton);
    let leftButton_sprite : SpriteComponent 
      = leftButton.getComponent<SpriteComponent>(COMPONENT_ID.kSprite);

    leftButton_sprite.on
    (
      'pointerdown',
      this._onClick_leftButton,
      this
    );

    ///////////////////////////////////
    // Right Button

    let rightButton : MxActor = _actor.get_child(CAROUSEL_CHILD_ID.kRightButton);
    let rightButton_sprite : SpriteComponent
      = rightButton.getComponent<SpriteComponent>(COMPONENT_ID.kSprite);
    
    rightButton_sprite.on
    (
      'pointerdown',
      this._onClick_rightButton,
      this
    );

    ///////////////////////////////////
    // ClockName Text

    let clockName : MxActor = _actor.get_child(CAROUSEL_CHILD_ID.kClockName);
    this._clockName_text = clockName.getComponent<BitmapTextComponent>
    (
      COMPONENT_ID.kBitmapText
    );

    ///////////////////////////////////
    // Preview SpriteComponent

    let preview : MxActor = _actor.get_child(CAROUSEL_CHILD_ID.kPreview);
    this._carouselSprite = preview.getComponent<SpriteComponent>(COMPONENT_ID.kSprite);

    this._activeIndex = 0;
    this._setActiveItem(this._activeIndex);
    return;
  }

  /****************************************************/
  /* Private                                          */
  /****************************************************/
  
  _onClick_leftButton()
  : void
  {
    --this._activeIndex;
    if(this._activeIndex < 0) {
      this._activeIndex = CLOCK_STYLE.kCount - 1;
    }
    this._setActiveItem(this._activeIndex);
    return;  
  }

  _onClick_rightButton()
  : void
  {
    ++this._activeIndex;
    if(this._activeIndex >= CLOCK_STYLE.kCount) {
      this._activeIndex = 0;
    }
    this._setActiveItem(this._activeIndex);
    return;  
  }

  _setActiveItem(_idx : number)
  : void 
  {
    // Send Button Down Message.
    this._m_actor.sendMessage(MESSAGE_ID.kButtonDown, null);

    // Set clock name.
    this._clockName_text.setText(this._dataController.getString('clock_name_' + _idx));
    
    // Set clock preview.
    this._carouselSprite.setFrame('clock_idx_' + _idx + '.png');

    // Set user preference.
    this._gameController._m_user_preferences.setClockStyle(_idx as CLOCK_STYLE);
    return;
  }

  _a_minutes : Int8Array;

  _activeIndex : number;  

  _gameController : GameController;

  _dataController : DataController;

  _clockName_text : BitmapTextComponent;

  _carouselSprite : SpriteComponent;

  _m_actor : MxActor;
}
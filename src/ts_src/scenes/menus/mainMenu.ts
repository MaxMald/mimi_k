import { GameController } from "../../game/managers/gameManager/components/gameController";
import { MxActor } from "../../utilities/component/mxActor";
import { MasterManager } from "../../game/managers/masteManager/masterManager";
import { COMPONENT_ID, MANAGER_ID, CLOCK_STYLE } from "../../game/gameCommons";
import { DataController } from "../../game/managers/gameManager/components/dataController";
import { Popup } from "../../game/ui/cloudPopup/Popup";
import { PopupController } from "../../game/ui/cloudPopup/components/popupController";
import { Carousel } from "../../game/ui/carousel/carousel";
import { Button } from "../../game/ui/buttons/imgButton";
import { BitmapTextComponent } from "../../game/components/bitmapTextComponent";
import { SpriteComponent } from "../../game/components/spriteComponent";

/**
 * 
 */
export class MainMenu extends Phaser.Scene
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/    

  create ()
  : void
  {   
    // gameCommons
    let half_width : number = this.game.canvas.width * 0.5;

    // MasterManager
    let master : MxActor = MasterManager.GetInstance();

    // GameManager.
    let gameManager : MxActor = master.get_child(MANAGER_ID.kGameManager);

    // GameController
    this._m_gameController
      = gameManager.getComponent<GameController>(COMPONENT_ID.kGameController);
            
    // DataController
    this._m_dataController
      = gameManager.getComponent<DataController>(COMPONENT_ID.kDataController);
    
    /****************************************************/
    /* Tip Popup                                        */
    /****************************************************/

    this._m_cloud_popup = Popup.CreateCloud(this, 1);
    this._m_cloud_popup.setRelativePosition
    (
        half_width,
        1660
    );

    // display first tip.
    this._m_tip_num = 0;
    this._nextTip();
        
    /****************************************************/
    /* Minutes Buttons                                  */
    /****************************************************/

    // Time Preferences Buttons
    this._m_a_preferenceButtons = new Array<MxActor>();
        
    let but_pos = new  Phaser.Geom.Point
    (
        half_width,
        this.game.canvas.height * 0.47
    );

    let button : MxActor;
    let nineSliceComponent : SpriteComponent;
    let prefButtonText : BitmapTextComponent;
    let a_times = [ 5, 3, 1 ];
    let a_buttonColors = [0x31a13b, 0x205e40, 0x14293d];
        
    for(let index = 0; index < a_times.length; ++index) {
      button = Button.CreateStandard
      (
        this,
        index,
        but_pos.x,
        but_pos.y,
        'landpage',
        'button.png',
        '' + a_times[index] + this._m_dataController.getString('minutes'),
        function() {
          this._onClick_minute_button(a_times[index] * 60);
        },
        this
      );
        
      this._m_a_preferenceButtons.push(button);
      
      nineSliceComponent = button.getComponent<SpriteComponent>(COMPONENT_ID.kSprite);
      nineSliceComponent.setTint(a_buttonColors[index]);
      but_pos.y += nineSliceComponent.getHeight() + 20;

      prefButtonText = button.getComponent<BitmapTextComponent>(COMPONENT_ID.kBitmapText);
      prefButtonText.setFontSize(55);
      prefButtonText.setTint(0xffffff);
    }
    this._close_prefs();

    /****************************************************/
    /* Play Button                                      */
    /****************************************************/
    
    this._m_play_button = Button.CreateStandard
    (
      this,
      0,
      half_width,
      this.game.canvas.height * 0.47,
      'landpage',
      'button.png',
      this._m_dataController.getString('ready'),
      this._onClick_play,
      this
    );

    let playButtonText : BitmapTextComponent 
      = this._m_play_button.getComponent<BitmapTextComponent>(COMPONENT_ID.kBitmapText);
    playButtonText.setTint(0xffffff);
    playButtonText.setFontSize(65);

    let playButtonSprite : SpriteComponent
      = this._m_play_button.getComponent<SpriteComponent>(COMPONENT_ID.kSprite);
    playButtonSprite.setTint(0x31a13b);

    /****************************************************/
    /* Next Tip Button                                  */
    /****************************************************/
    
    this._m_nextTipButton = Button.CreateStandard
    (
      this,
      0,
      half_width,
      this.game.canvas.height * 0.93,
      'landpage',
      'button_small_bg.png',
      this._m_dataController.getString('other_tip'),
      this._nextTip,
      this
    );

    let tipButtonText : BitmapTextComponent 
      = this._m_nextTipButton.getComponent<BitmapTextComponent>(COMPONENT_ID.kBitmapText);
    tipButtonText.setTint(0xffffff);

    let tipButtonSprite : SpriteComponent
      = this._m_nextTipButton.getComponent<SpriteComponent>(COMPONENT_ID.kSprite);
    tipButtonSprite.setTint(0xff5709);

    /****************************************************/
    /* Carousel                                         */
    /****************************************************/
    
    this._m_carousel = Carousel.Create(this, 1);
    this._m_carousel.setRelativePosition
    ( 
      this.game.canvas.width * 0.5,
      this.game.canvas.height * 0.22
    );   
    return;
  }

  /**
   * 
   */
  update()
  : void
  {
    this._m_nextTipButton.update();
    this._m_play_button.update();
    this._m_cloud_popup.update();
    this._m_carousel.update();

    this._m_a_preferenceButtons.forEach
    (
      function(_button : MxActor)
      {
        _button.update();
      }
    );
    return;
  }

  /**
  * Safely destroys the object.
  */
  destroy()
  : void 
  {
    this._m_nextTipButton.destroy();
    this._m_nextTipButton = null;

    this._m_carousel.destroy();
    this._m_carousel = null;

    this._m_cloud_popup.destroy();
    this._m_cloud_popup = null;
    
    this._m_play_button.destroy();
    
    while(this._m_a_preferenceButtons.length) {
      let button = this._m_a_preferenceButtons.pop()
      button.destroy();
    }
    
    this._m_a_preferenceButtons = null;
    this._m_dataController = null;
    this._m_gameController = null;
    return;
  }
    
  /****************************************************/
  /* Private                                          */
  /****************************************************/
    
  _onClick_minute_button(_time : number)
  : void 
  {
    this._m_gameController._m_user_preferences.chrono_value = _time;  
    
    this.destroy();
    this.scene.start('mainGame');
    return;
  }

  _close_prefs()
  : void 
  {
    this._m_a_preferenceButtons.forEach
    (
      function(_button : MxActor) {
        _button.mxDesactive();
      },
      this
    );
    return;
  }

  _open_prefs()
  : void 
  {
    this._m_a_preferenceButtons.forEach
    (
      function(_button : MxActor){
        _button.mxActive();
      },
      this
    );
    return;
  }

  _onClick_play()
  : void 
  {
    this._open_prefs();
    this._m_play_button.mxDesactive();
    return;
  }

  _nextTip()
  : void 
  {
    let popupController : PopupController
      = this._m_cloud_popup.getComponent<PopupController>(COMPONENT_ID.kPopupController);

    popupController.setText
    (
      this._m_dataController.getString('menu_tip_0' + this._m_tip_num)
    );
    popupController.close();
    popupController.open();
      
    // iterate over tips.
    this._m_tip_num++;
    if(this._m_tip_num > 5) {
      this._m_tip_num = 0;
    }
    return;
  }

  /**
   * Array of time preferences buttons 
   */
  _m_a_preferenceButtons : Array<MxActor>;

  /**
   * Play button
   */
  _m_play_button : MxActor;

  /**
   * 
   */
  _m_nextTipButton : MxActor;
    
  /**
   * Reference to the GameController.
   */
  _m_gameController : GameController;
  
  /**
   * Reference to the DataController.
   */
  _m_dataController : DataController;

  /**
   * Cloud poppup object.
   */
  _m_cloud_popup : MxActor;

  /**
   * tip number.
   */
  _m_tip_num : number;

  /**
   * 
   */
  _m_carousel : MxActor;

  /**
   * 
   */
  _m_carousel_item_name : Phaser.GameObjects.Text;
}
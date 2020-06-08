import { NineButton } from "../../game/ui/buttons/nineButton";
import { Carousel } from "../../game/ui/carousel/carousel";
import { GameController } from "../../game/managers/gameManager/components/gameController";
import { MxActor } from "../../utilities/component/mxActor";
import { MasterManager } from "../../game/managers/masteManager/masterManager";
import { COMPONENT_ID, MANAGER_ID, CLOCK_STYLE } from "../../game/gameCommons";
import { DataController } from "../../game/managers/gameManager/components/dataController";
import { Popup } from "../../game/ui/cloudPopup/Popup";
import { PopupController } from "../../game/ui/cloudPopup/components/popupController";

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
    
    ///////////////////////////////////
    // Cloud Popup

    this._m_cloud_popup = Popup.CreateCloud(this, 1);

    let popupController : PopupController 
      = this._m_cloud_popup.getComponent<PopupController>(COMPONENT_ID.kPopupController);
    
    popupController.setMaxWidth(800);
    this._m_cloud_popup.m_position.setTo
    (
        half_width,
        this.game.canvas.height * 0.9
    );

    // display first tip.
    this._m_tip_num = 0;
    this._nextTip();
        
    ///////////////////////////////////
    // Buttons

    // Time Preferences Buttons
    this._m_a_preferenceButtons = new Array<NineButton>();
        
    let but_pos = new  Phaser.Geom.Point
    (
        half_width,
        this.game.canvas.height * 0.1
    );

    let button : NineButton;
    let a_times = [ 5, 3, 1 ];
        
    for(let index = 0; index < 3; ++index) {
        button = NineButton.CreateDefault
        (
            this,
            but_pos.x,
            but_pos.y,
            '' + a_times[index] + ' minutes',
            function() {
                this._onClick_minute_button(a_times[index] * 60);
            },
            this
        );
        
        this._m_a_preferenceButtons.push(button);
        but_pos.y += button.getHeight() + 20;
    }
    this._close_prefs();

    // play
    this._m_play_button = NineButton.CreateDefault
    (
        this,
        half_width,
        this.game.canvas.height * 0.1,
        "Play",
        this._onClick_play,
        this
    );

    // tip
    NineButton.CreateDefault
    (
        this,
        half_width,
        this.game.canvas.height * 0.75,
        "Next Tip",
        this._nextTip,
        this
    );

    ///////////////////////////////////
    // Carousel
        
    this._m_carousel = new Carousel
    (
        this,
        half_width,
        this.game.canvas.height * 0.5,
        450,
        'main_menu',
        'clock_idx_',
        '.png',
        CLOCK_STYLE.kCount
    );
    this._m_carousel.addListener('active_changed', this._onCarouselChanged, this);    
        
    // carousel title
    let carousel_title = this.add.text
    (
        half_width,
        this.game.canvas.height * 0.35, 
        this._m_dataController.getString('choose_clock'), 
        { fontFamily: '"Roboto Condensed"' }
    );

    carousel_title.setFontSize(50);
    carousel_title.setColor('black');
    carousel_title.setOrigin(0.5,0.5);

    // carousel item name.
    this._m_carousel_item_name = this.add.text
    (
      half_width,
      this.game.canvas.height * 0.65, 
      "", 
      { fontFamily: '"Roboto Condensed"' }
    );

    this._m_carousel_item_name.setFontSize(50);
    this._m_carousel_item_name.setColor('black');
    this._m_carousel_item_name.setOrigin(0.5,0.5);

    // display default element
    this._m_carousel.setActive
    (
        this._m_gameController._m_user_preferences.getClockStyle()
    );        
    return;
  }

  /**
   * 
   */
  update()
  : void
  {
    this._m_cloud_popup.update();
    return;
  }

  /**
  * Safely destroys the object.
  */
  destroy()
  : void 
  {
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

    // TODO : descomentar,hasta tener el skin de todos los relojes.
    //prefs.setClockStyle(this.m_carousel.getCurrentIdx()); 
    this._m_gameController._m_user_preferences.setClockStyle(1); 
      
    this.destroy();
    this.scene.start('mainGame');
    return;
  }

  _onCarouselChanged()
  : void 
  {
      this._m_carousel_item_name.text
          = this._m_dataController.getString('clock_name_' + this._m_carousel.getCurrentIdx());
      return;
  }

  _close_prefs()
  : void 
  {
    this._m_a_preferenceButtons.forEach
    (
      function(_button : NineButton) {
        _button.close();
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
      function(_button : NineButton){
        _button.open();
      },
      this
    );
    return;
  }

  _onClick_play()
  : void 
  {
    this._open_prefs();
    this._m_play_button.close();
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
  _m_a_preferenceButtons : Array<NineButton>;

  /**
   * Play button
   */
  _m_play_button : NineButton;
    
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
  _m_carousel : Carousel;

  /**
   * 
   */
  _m_carousel_item_name : Phaser.GameObjects.Text;
}
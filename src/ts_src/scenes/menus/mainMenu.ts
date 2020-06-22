import { GameController } from "../../game/managers/gameManager/components/gameController";
import { MxActor } from "../../utilities/component/mxActor";
import { MasterManager } from "../../game/managers/masteManager/masterManager";
import { COMPONENT_ID, MANAGER_ID, MimiKSounds } from "../../game/gameCommons";
import { DataController } from "../../game/managers/gameManager/components/dataController";
import { Popup } from "../../game/ui/cloudPopup/Popup";
import { PopupController } from "../../game/ui/cloudPopup/components/popupController";
import { Carousel } from "../../game/ui/carousel/carousel";
import { Button } from "../../game/ui/buttons/imgButton";
import { BitmapTextComponent } from "../../game/components/bitmapTextComponent";
import { SpriteComponent } from "../../game/components/spriteComponent";
import { ShaderFactory } from "../../game/ui/shaders/shadersFactory";
import { MasterController } from "../../game/managers/masteManager/components/MasterController";

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

    // MasterController
    this._m_masterController = master.getComponent<MasterController>
    (
      COMPONENT_ID.kMasterController
    );

    // GameManager.
    let gameManager : MxActor = master.get_child(MANAGER_ID.kGameManager);

    // GameController
    this._m_gameController
      = gameManager.getComponent<GameController>(COMPONENT_ID.kGameController);
            
    // DataController
    this._m_dataController
      = gameManager.getComponent<DataController>(COMPONENT_ID.kDataController);

    /****************************************************/
    /* Background                                       */
    /****************************************************/
    
    this._m_backgroundShader = ShaderFactory.CreateBackground(this, 0);

    ///////////////////////////////////
    // Particle Emitter

    this._createParticleEmitter();
    
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
        '' + a_times[index] + ' ' + this._m_dataController.getString('minutes'),
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

    /****************************************************/
    /* Background Sound                                 */
    /****************************************************/

    // Play Audio
    this.sound.playAudioSprite
    (
      MimiKSounds.kMimiKAudioSprite, 
      MimiKSounds.kBackgroundInstrumental,
      { loop : true }
    );

    return;
  }

  /**
   * 
   */
  update(_time : number, _delta : number)
  : void
  {
    this._m_masterController.m_dt = _delta / 1000.0;

    this._m_backgroundShader.update();
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
    this._m_backgroundShader.destroy();
    this._m_backgroundShader = null;
    
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

    this.sound.removeByKey(MimiKSounds.kMimiKAudioSprite);
    return;
  }
    
  /****************************************************/
  /* Private                                          */
  /****************************************************/
    
  _onClick_minute_button(_time : number)
  : void 
  {
    this._m_gameController._m_user_preferences.chrono_value = _time;  
    
    // Play Audio
    this.sound.playAudioSprite
    (
      MimiKSounds.kMimiKAudioSprite, 
      MimiKSounds.kButtonPause
    );
    
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
    // Play Audio
    this.sound.playAudioSprite
    (
      MimiKSounds.kMimiKAudioSprite, 
      MimiKSounds.kButtonPause
    );

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

    // Play Audio
    this.sound.playAudioSprite
    (
      MimiKSounds.kMimiKAudioSprite, 
      MimiKSounds.kButtonTip
    );
      
    // iterate over tips.
    this._m_tip_num++;
    if(this._m_tip_num > 5) {
      this._m_tip_num = 0;
    }
    return;
  }

  _createParticleEmitter()
  : void
  {
    let emitterShape : Phaser.Geom.Rectangle = new Phaser.Geom.Rectangle
    (
      0, 0, 
      this.game.canvas.width, 
      this.game.canvas.height
    );

    this._m_particlesEmitterManager = this.add.particles('landpage');
    this._m_particlesEmitter = this._m_particlesEmitterManager.createEmitter
    ({
      frame: ['particle_01.png', 'particle_02.png'],
      x: 0, y: 0,
      lifespan: 500,
      scale : 0.5,
      rotate : {min : 0.0, max : 90.0},
      frequency : 50,
      quantity : 1,
      alpha: { start: 1, end: 0 },
      blendMode: 'ADD',
      tint : [0x0d5da4, 0x501160],
      emitZone: { type: 'random', source: emitterShape }
    });

    return;
  }

  /**
   * 
   */
  _m_particlesEmitterManager : Phaser.GameObjects.Particles.ParticleEmitterManager;

  /**
   * 
   */
  _m_particlesEmitter : Phaser.GameObjects.Particles.ParticleEmitter;

  /**
   * 
   */
  _m_masterController : MasterController;

  /**
   * 
   */
  _m_backgroundShader : MxActor;

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
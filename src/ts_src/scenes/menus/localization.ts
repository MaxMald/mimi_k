import { MANAGER_ID, LOCALIZATION, COMPONENT_ID } from "../../game/gameCommons";
import { MxActor } from "../../utilities/component/mxActor";
import { MasterManager } from "../../game/managers/masteManager/masterManager";
import { GameController } from "../../game/managers/gameManager/components/gameController";
import { SpriteComponent } from "../../game/components/spriteComponent";
import { UIBitmapText } from "../../game/ui/text/uiBitmapText";
import { BitmapTextComponent } from "../../game/components/bitmapTextComponent";
import { DataController } from "../../game/managers/gameManager/components/dataController";

export  class LocalizationScene extends Phaser.Scene
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/
        
  create()
  : void 
  { 

    let width : number = this.game.canvas.width;
    let half_width : number = width * 0.5;

    let height : number = this.game.canvas.height;
    let half_height : number = height * 0.5;

    this.cameras.main.setBackgroundColor(0xfad201);

    /****************************************************/
    /* Title                                            */
    /****************************************************/

    this._m_language_icon = MxActor.Create(0);
    
    let language_sprite : SpriteComponent = new SpriteComponent();
    language_sprite.setSprite
    (
      this.add.sprite
      (
        0, 0,
        'landpage',
        'language_button.png'
      )
    );
    language_sprite.setTint(0x0c0138);

    this._m_language_icon.addComponent(language_sprite);
    this._m_language_icon.init();
    this._m_language_icon.setRelativePosition
    (
      half_width,
      200
    );

    this._m_laguage_title = MxActor.Create(0, this._m_language_icon);

    let master : MxActor = MasterManager.GetInstance();
    let gameManager : MxActor = master.get_child(MANAGER_ID.kGameManager);
    this._m_dataController  
      = gameManager.getComponent<DataController>(COMPONENT_ID.kDataController);
    this._m_gameController  
      = gameManager.getComponent<GameController>(COMPONENT_ID.kGameController);
    
    let languageTitleText : BitmapTextComponent =
    UIBitmapText.AddStandard
    (
      this, this._m_dataController.getString('choose_language'), 
      this._m_laguage_title
    );    
    languageTitleText.setTint(0x0c0138);
    languageTitleText.setCenterAlign();
    languageTitleText.setOrigin(0.5 , 0.5);

    this._m_laguage_title.init();
    this._m_laguage_title.setRelativePosition(0,75);

    /****************************************************/
    /* English Button                                   */
    /****************************************************/

    this._m_english_button = MxActor.Create(0);

    let enlgishButtonSprite : SpriteComponent = new SpriteComponent();
    enlgishButtonSprite.setSprite
    (
      this.add.sprite
      (
        0, 0,
        'landpage',
        'english_map.png'
      )
    );
    enlgishButtonSprite.setOrigin(0.5, 0.0);
    enlgishButtonSprite.setInteractive();
    enlgishButtonSprite.on('pointerdown', this._onClick_english, this);

    this._m_english_button.addComponent(enlgishButtonSprite);
    this._m_english_button.init();
    this._m_english_button.setRelativePosition(half_width, 475);

    let english_label = MxActor.Create(1, this._m_english_button);
    
    let englishLabelText : BitmapTextComponent = 
    UIBitmapText.AddStandard
    (
      this, 
      this._m_dataController.getString('english'), 
      english_label
    );
    englishLabelText.setOrigin(0.5, 0.5);
    englishLabelText.setFontSize(60);
    englishLabelText.setTint(0x0c0138);
    
    english_label.init();
    english_label.setRelativePosition(0, 480);

    /****************************************************/
    /* Latam Button                                     */
    /****************************************************/

    this._m_spanish_button = MxActor.Create(0);

    let spanishButtonSprite : SpriteComponent = new SpriteComponent();
    spanishButtonSprite.setSprite
    (
      this.add.sprite
      (
        0, 0,
        'landpage',
        'spanish_map.png'
      )
    );
    spanishButtonSprite.setOrigin(0.5, 0.0);
    spanishButtonSprite.setInteractive();
    spanishButtonSprite.on('pointerdown', this._onClick_spanish, this);

    this._m_spanish_button.addComponent(spanishButtonSprite);
    this._m_spanish_button.init();
    this._m_spanish_button.setRelativePosition(half_width, 1200);

    let spanish_label = MxActor.Create(1, this._m_spanish_button);
    
    let spanishLabelText : BitmapTextComponent = 
      UIBitmapText.AddStandard
      (
        this, 
        this._m_dataController.getString('spanish'), 
        spanish_label
      );
    spanishLabelText.setOrigin(0.5, 0.5);
    spanishLabelText.setFontSize(60);
    spanishLabelText.setTint(0x0c0138);
    
    spanish_label.init();
    spanish_label.setRelativePosition(0, 480);
    return;
  }

  /**
   * 
   */
  update()
  : void
  {
    this._m_english_button.update();    
    this._m_spanish_button.update();  
    this._m_language_icon.update();
    return;
  }

  destroy()
  : void
  {
    this._m_english_button.destroy();    
    this._m_spanish_button.destroy();
    this._m_language_icon.destroy();
    return;
  }

  /****************************************************/
  /* Private                                          */
  /****************************************************/
    
  _onClick_english()
  : void 
  {
    this._m_gameController.setLocalization(LOCALIZATION.kEnglish);
    this._m_dataController.initLanguage(this.game);

    this.destroy();
    this.scene.start('welcomePage');
    return;
  }

  _onClick_spanish()
  : void 
  {
    this._m_gameController.setLocalization(LOCALIZATION.KSpanish);
    this._m_dataController.initLanguage(this.game);

    this.destroy();
    this.scene.start('welcomePage');
    return;
  }

  /**
   * 
   */
  _m_language_icon : MxActor;

  /**
   * 
   */
  _m_laguage_title : MxActor;

  /**
   * 
   */
  _m_english_button : MxActor; 

  /**
   * 
   */
  _m_spanish_button : MxActor; 

  /**
   * 
   */
  _m_gameController : GameController;

  /**
   * 
   */
  _m_dataController : DataController;
}
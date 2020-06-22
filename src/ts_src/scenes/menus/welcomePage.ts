import { MxActor } from "../../utilities/component/mxActor";
import { SpriteComponent } from "../../game/components/spriteComponent";
import { Button } from "../../game/ui/buttons/imgButton";
import { COMPONENT_ID, MANAGER_ID } from "../../game/gameCommons";
import { UIBitmapText } from "../../game/ui/text/uiBitmapText";
import { BitmapTextComponent } from "../../game/components/bitmapTextComponent";
import { MasterManager } from "../../game/managers/masteManager/masterManager";
import { DataController } from "../../game/managers/gameManager/components/dataController";
import { ShaderFactory } from "../../game/ui/shaders/shadersFactory";
import { MasterController } from "../../game/managers/masteManager/components/MasterController";

export class WelcomePage extends Phaser.Scene
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/
  
  create()
  : void
  {
    let screenHalfWidth : number = this.game.canvas.width * 0.5;
    let screenHeight : number = this.game.canvas.height;
    
    /****************************************************/
    /* Background                                       */
    /****************************************************/
    
    this._m_backgroundShader = ShaderFactory.CreateBackground(this, 0);
    
    ///////////////////////////////////
    // Particles

    this._createParticleEmitter();

    /****************************************************/
    /* Language Button                                  */
    /****************************************************/

    this._m_language_button = Button.CreateImageButton
    (
      this,
      0,
      60, 60,
      'landpage',
      'language_button.png',
      this._onClick_language,
      this
    );

    let _m_language_sprite : SpriteComponent 
      = this._m_language_button.getComponent<SpriteComponent>(COMPONENT_ID.kSprite);
    
    _m_language_sprite.setTint(0xface01);
    _m_language_sprite.setOrigin(0.0, 0.0);

    /****************************************************/
    /* Website                                          */
    /****************************************************/

    this._m_website_url = MxActor.Create(0);
    
    let urlTextComponent : BitmapTextComponent 
      = UIBitmapText.AddStandard(this, 'juegosmetta.com', this._m_website_url);    
    urlTextComponent.setCenterAlign();
    urlTextComponent.setOrigin(0.5 , 0.5);
    
    this._m_website_url.init();
    this._m_website_url.setRelativePosition(screenHalfWidth, 113);

    /****************************************************/
    /* Welcome Phrase                                   */
    /****************************************************/

    this._m_welcome_title = MxActor.Create(0);
    
    let welcome_sprite : SpriteComponent = new SpriteComponent();
    welcome_sprite.setSprite
    (
      this.add.sprite
      (
        0, 0,
        'landpage',
        'welcome_phrase_0.png'
      )
    );
    this._m_welcome_title.addComponent(welcome_sprite);
    this._m_welcome_title.init();
    this._m_welcome_title.setRelativePosition
    (
      screenHalfWidth,
      screenHeight * 0.25 
    );

    /****************************************************/
    /* Start Button                                     */
    /****************************************************/

    let master : MxActor = MasterManager.GetInstance();
    this._m_masterController = master.getComponent<MasterController>
    (
      COMPONENT_ID.kMasterController
    );

    let gameManager : MxActor = master.get_child(MANAGER_ID.kGameManager);
    let dataController : DataController  
      = gameManager.getComponent<DataController>(COMPONENT_ID.kDataController);

    this._m_start_button = Button.CreateStandard
    (
      this,
      0,
      screenHalfWidth,
      screenHeight * 0.4,
      'landpage',
      'button.png',
      dataController.getString('start_to_play'),
      this._onClick_start,
      this
    );

    /****************************************************/
    /* Cat                                              */
    /****************************************************/
    
    this._m_cat = MxActor.Create(0);

    let cat_spriteComponent : SpriteComponent = new SpriteComponent();
    cat_spriteComponent.setSprite
    (
      this.add.sprite
      (
        0, 0,
        'landpage',
        'cat.png'
      )
    );
    this._m_cat.addComponent(cat_spriteComponent);
    this._m_cat.init();

    this._m_cat.setRelativePosition
    (
      screenHalfWidth,
      screenHeight - cat_spriteComponent.getHeight() * 0.5
    );

    this._m_masterController.playIntro(this);
    return;
  }

  update(_time : number, _delta : number)
  : void
  {
    this._m_masterController.m_dt = _delta / 1000.0;
    this._m_language_button.update();
    this._m_website_url.update();
    this._m_welcome_title.update();
    this._m_start_button.update();
    this._m_cat.update();
    this._m_backgroundShader.update();
    return;
  }

  destroy()
  : void
  {
    this._m_backgroundShader.destroy();
    this._m_cat.destroy();
    this._m_website_url.destroy();
    this._m_welcome_title.destroy();
    this._m_start_button.destroy();
    this._m_language_button.destroy();
    return;
  }

  /****************************************************/
  /* Private                                          */
  /****************************************************/
  
  /**
   * Start the mainmenu level.
   */
  _onClick_start()
  : void
  {
    this.destroy();
    this._m_masterController.stopIntro();
    this.scene.start('mainMenu');
    return;
  }

  /**
   * Go to the language selection scene.
   */
  _onClick_language()
  : void
  {
    this.destroy();
    this.scene.start('localization');
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
   * 
   */
  _m_cat : MxActor;

  /**
   * 
   */
  _m_language_button : MxActor;

  /**
   * 
   */
  _m_welcome_title : MxActor;

  /**
   * 
   */
  _m_start_button : MxActor;

  /**
   * 
   */
  _m_website_url : MxActor;
}
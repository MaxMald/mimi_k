import { MxActor } from "../utilities/component/mxActor";
import { MasterManager } from "../game/managers/masteManager/masterManager";
import { MANAGER_ID, COMPONENT_ID } from "../game/gameCommons";
import { DataController } from "../game/managers/gameManager/components/dataController";

export class Preloader extends Phaser.Scene
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/
    
  preload ()
  : void 
  {
    ///////////////////////////////////
    // Atlas     
    
    this.load.atlas
    (
      'landpage',
      'src/assets/images/atlas/landpage.png',
      'src/assets/images/atlas/landpage.js'
    );

    this.load.atlas
    (
      'landpage_2',
      'src/assets/images/atlas/landpage_2.png',
      'src/assets/images/atlas/landpage_2.js'
    );

    ///////////////////////////////////
    // Images

    this.load.image
    (
      'sand_clock_mask',
      'src/assets/images/atlas/sand_clock_mask.png'
    );

    ///////////////////////////////////
    // Audio

    this.load.audioSprite
    (
      'mimik_sounds',
      'src/assets/sounds/audiosprite/mimik_sounds.json',
      [
        'src/assets/sounds/audiosprite/mimik_sounds.ogg',        
        'src/assets/sounds/audiosprite/mimik_sounds.m4a',
        'src/assets/sounds/audiosprite/mimik_sounds.mp3',
        'src/assets/sounds/audiosprite/mimik_sounds.ac3',
      ]
    );

    ///////////////////////////////////
    // Fonts

    this.load.bitmapFont
    (
      'avant_bold',
      'src/assets/images/bitmapFonts/avent_bold-export.png', 
      'src/assets/images/bitmapFonts/avent_bold-export.xml'
    );

    this.load.bitmapFont
    (
      'avant_garde_bk',
      'src/assets/images/bitmapFonts/avant_garde_bk-export.png', 
      'src/assets/images/bitmapFonts/avant_garde_bk-export.xml'
    );

    this.load.bitmapFont
    (
      'digital_dream',
      'src/assets/images/bitmapFonts/digital_dream-export.png', 
      'src/assets/images/bitmapFonts/digital_dream-export.xml'
    );

    ///////////////////////////////////
    // Text

    this.load.text
    (
      'game_text', 
      'src/assets/csv_files/Mimi_k_data - game_texts.tsv'
    );

    ///////////////////////////////////
    // Shader

    this.load.glsl
    (
        {
            key : 'background',
            shaderType : 'fragment',
            url : 'src/assets/shaders/background.frag' 
        }
    );
                  
    /****************************************************/
    /* Metta Loading                                    */
    /****************************************************/

    let title_mimik : Phaser.GameObjects.Sprite = this.add.sprite
    (
      this.game.canvas.width * 0.5,
      this.game.canvas.height * 0.4,
      'mimik_loader',
      'logo.png'
    );

    let loadingSprite : Phaser.GameObjects.Sprite = this.add.sprite
    (
      this.game.canvas.width * 0.5,
      this.game.canvas.height * 0.5,
      'mimik_loader',
      'loading.png'
    );

    this.add.tween
    ({
      targets : loadingSprite,
      angle : 360,
      duration : 1000,
      loop : -1,
      ease: 'Power2'
    });

    /****************************************************/
    /* Callbacks                                        */
    /****************************************************/
    
    this.load.on('complete', this._onLoadComplete, this);
    return;
  } 

  /****************************************************/
  /* Private                                          */
  /****************************************************/  
  
  _onLoadComplete()
  : void 
  {
    // Sets the column that has the text.
    // 1 : Spanish
    // 2 : English    
    
    let master : MxActor = MasterManager.GetInstance();
    let gameManger : MxActor = master.get_child(MANAGER_ID.kGameManager);
    
    let dataController : DataController
      = gameManger.getComponent<DataController>(COMPONENT_ID.kDataController);
    dataController.initLanguage(this.game);

    ///////////////////////////////////
    // Press Start to Play

    let start_button : Phaser.GameObjects.Text = this.add.text
    (
      this.game.canvas.width * 0.5, 
      this.game.canvas.height * 0.65, 
      'Presiona Aquí\nPress Here', 
      { fontFamily: 'Arial', fontSize: 64, color: '#face01' }
    );
    start_button.setAlign('center');
    start_button.setOrigin(0.5, 0.5);

    this.add.tween
    ({
      targets : start_button,
      alpha : {from : 0, to: 1},
      ease: 'Linear',
      duration: 1000,
      repeat: -1,
      yoyo : true
    });

    start_button.setInteractive();
    start_button.on('pointerdown', this._nextScene, this);    
    return;
  }

  _nextScene()
  : void
  {
    this.scene.start('welcomePage');
    return;
  }
}
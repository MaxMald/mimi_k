import { CSVFile } from "../utilities/fs/csv_file";
import { MxActor } from "../utilities/component/mxActor";
import { MasterManager } from "../game/managers/masteManager/masterManager";
import { MANAGER_ID, COMPONENT_ID, LOCALIZATION } from "../game/gameCommons";
import { GameController } from "../game/managers/gameManager/components/gameController";
import { CSVRow } from "../utilities/fs/csv_row";
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

    ///////////////////////////////////
    // Text

    this.load.text
    (
      'game_text', 
      'src/assets/csv_files/Mimi_k_data - game_texts.tsv'
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

    this.scene.start('welcomePage');
    return;
  }
}
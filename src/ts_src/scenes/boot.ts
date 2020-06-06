import { MxComponent } from "../utilities/component/mxComponent";
import { MxActor } from "../utilities/component/mxActor";
import { MasterManager } from "../game/managers/masteManager/masterManager";
import { GameManager } from "../game/managers/gameManager/gameManager";
import { MasterController } from "../game/managers/masteManager/components/MasterController";

/**
 * Creates modules and load assets for the preload scene.
 */
export class Boot extends Phaser.Scene
{   
  /****************************************************/
  /* Public                                           */
  /****************************************************/
  
  preload ()
  : void
  { 
    this.load.atlas
    (
      'preloader',
      'src/assets/images/atlas/preloader.png',
      'src/assets/images/atlas/preloader.js'
    );

    ///////////////////////////////////
    // Metta Puzzle Preloader

    // atlas
    this.load.atlas
    (
      'metta_puzzle_loader',
      'src/assets/images/atlas/metta_puzzle_loader.png',
      'src/assets/images/atlas/metta_puzzle_loader.js'
    );

    // tiled map
    this.load.tilemapTiledJSON
    (
      'metta_puzzle_loader', 
      'src/assets/images/atlas/metta_puzzle_loader.json'
    );
    return;
  }

  create ()
  : void
  {    
    // Fit the game canvas to parent container
    this.game.scale.scaleMode = Phaser.Scale.ScaleModes.FIT;

    // prepare modules
    MxComponent.Prepare();
    MxActor.Prepare();    

    // Master Manager
    MasterManager.Prepare();
    let master = MasterManager.GetInstance();
    
    // Master Manager Components
    master.addComponent(new MasterController());

    // Master Manager Children
    master.addChild(GameManager.Create());  

    master.init();

    // next scene
    this.scene.start('localization');
    return;
  }    
}
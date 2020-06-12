import { MxComponent } from "../utilities/component/mxComponent";
import { MxActor } from "../utilities/component/mxActor";
import { MasterManager } from "../game/managers/masteManager/masterManager";
import { GameManager } from "../game/managers/gameManager/gameManager";
import { MasterController } from "../game/managers/masteManager/components/MasterController";
import { GameController } from "../game/managers/gameManager/components/gameController";
import { COMPONENT_ID, LOCALIZATION } from "../game/gameCommons";

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
    ///////////////////////////////////
    // Mimi-k Loader

    this.load.atlas
    (
      'mimik_loader',
      'src/assets/images/atlas/loader.png',
      'src/assets/images/atlas/loader.js' 
    );
    return;
  }

  create ()
  : void
  {    
    // Fit the game canvas to parent container
    this.game.scale.scaleMode = Phaser.Scale.ScaleModes.FIT;

    // Prepare modules
    MxComponent.Prepare();
    MxActor.Prepare();    

    // Master Manager
    MasterManager.Prepare();
    let master = MasterManager.GetInstance();
    
    // Master Manager Components
    master.addComponent(new MasterController());

    // Master Manager Children
    let gameManager : MxActor = GameManager.Create();    
    master.addChild(gameManager);  

    master.init();

    // default language.
    let gameController : GameController 
      = gameManager.getComponent<GameController>(COMPONENT_ID.kGameController);

    gameController.setLocalization(LOCALIZATION.KSpanish);

    // next scene
    this.scene.start('preloader');
    return;
  }      
}
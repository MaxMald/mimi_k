import { MANAGER_ID } from "../../gameCommons";
import { MxActor } from "../../../utilities/component/mxActor";
import { GameController } from "./components/gameController";
import { DataController } from "./components/dataController";
import { BaseSoundManagerComponent } from "../../components/baseSoundManagerComponent";

/**
 * Administrador del juego. Responsable de los siguientes controladores:
 * 
 * - DataController
 * - ChronoController
 * 
 * Éste MxManager se crea en el Boot.
 */
export class GameManager
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/
    
  static Create()
  : MxActor {
    let manager : MxActor = MxActor.Create(MANAGER_ID.kGameManager);

    ///////////////////////////////////
    // Components

    manager.addComponent(new GameController());
    manager.addComponent(new DataController());
    manager.addComponent(new BaseSoundManagerComponent());

    return manager;
  }    
}
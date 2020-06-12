import { MxActor } from "../../../utilities/component/mxActor";
import { MANAGER_ID } from "../../gameCommons";

export class MasterManager
{   

    /****************************************************/
    /* Public                                           */
    /****************************************************/
    
    static Prepare()
    : void {
        if(this._INSTANCE != null) {
            return;
        }
        
        this._INSTANCE = MxActor.Create(MANAGER_ID.kMaster);
        // TODO
        return;
    }

    static  ShutDown()
    : void {
        if(this._INSTANCE != null) {
            this._INSTANCE.destroy();
            this._INSTANCE = null;
        }        
        return;
    }

    static GetInstance()
    : MxActor {
        return this._INSTANCE;
    }

    /**
     * Deltatime
     */
    _m_dt : number;

    /****************************************************/
    /* Private                                          */
    /****************************************************/

    private constructor()
    { }
    
    static _INSTANCE : MxActor = null;
}
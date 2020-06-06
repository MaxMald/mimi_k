import { MxComponent } from "../../../../utilities/component/mxComponent";
import { COMPONENT_ID } from "../../../gameCommons";
import { MxActor } from "../../../../utilities/component/mxActor";

export class MasterController extends MxComponent
{
    /****************************************************/
    /* Public                                           */
    /****************************************************/
    
    constructor()
    {
        super(COMPONENT_ID.kMasterController);
        return;
    }

    init(_actor : MxActor)
    : void 
    {
        this.m_dt = 0.0;
        return;
    }

    update(_actor : MxActor)
    : void
    {
        return;
    }

    m_dt : number;

    /****************************************************/
    /* Private                                          */
    /****************************************************/
    
}
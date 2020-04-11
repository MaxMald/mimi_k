import { ChronoManager } from "../../managers/chronoManager/chronoManager";

export class ChronoClock 
{

    /****************************************************/
    /* Private                                          */
    /****************************************************/
    
    protected m_chrono_mng : ChronoManager;

    /****************************************************/
    /* Public                                           */
    /****************************************************/
    
    public constructor(){
        return;
    }

    public setChronoManager(_chrono_mng : ChronoManager)
    : void {
        this.m_chrono_mng = _chrono_mng;
        return;
    }

    public update()
    : void {
        return;
    }

    public reset()
    : void {
        return;
    }

    public hotClock()
    : void {
        return;
    }
    
    /**
    * Safely destroys the object.
    */
    public destroy()
    : void {
        return;
    }
}
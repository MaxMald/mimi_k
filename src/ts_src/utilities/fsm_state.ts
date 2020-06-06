import { FSM } from "./fsm";

export class FSMState
{
    /****************************************************/
    /* Protected                                        */
    /****************************************************/
    
    protected m_fsm : FSM;

    /****************************************************/
    /* Public                                           */
    /****************************************************/
    
    public constructor()
    {
        this.m_fsm = null;
        return;
    }

    public onEnter()
    : void
    {
        return;
    }

    public onExit()
    : void
    {
        return;
    }

    public update()
    : number
    {
        return 0;
    }

    public draw()
    : number
    {
        return 0;
    }

    public setFSM(_fsm : FSM)
    : void
    {
        this.m_fsm = _fsm;
        return;
    }
}
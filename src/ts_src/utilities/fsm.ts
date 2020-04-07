import { FSMState } from "./fsm_state";

export class FSM
{
    protected m_states_map : Map<number,FSMState>;
    protected m_active_state : FSMState;

    constructor()
    {
        this.m_states_map = new Map<number,FSMState>();
        this.clear();
        return;
    }

    public update()
    : number
    {
        return this.m_active_state.update();
    }

    public draw()
    : number
    {
        return this.m_active_state.draw();
    }

    public clear()
    : void
    {
        this.m_states_map.clear();
        this.m_active_state = null;
        return;
    }

    public setActive(_idx : number)
    : number
    {
        if(this.m_states_map.has(_idx))
        {
            if(this.m_active_state != null)
            {
                this.m_active_state.onExit();
            }

            this.m_active_state = this.m_states_map.get(_idx);
            this.m_active_state.onEnter();
        }
        else
        {
            console.log("FSM doesn't has state : " + _idx);
            return -1;
        }

        return 0;
    }

    public addState(_idx : number, _state : FSMState)
    : number
    {
        if(!this.m_states_map.has(_idx))
        {
            this.m_states_map.set(_idx, _state);
            _state.setFSM(this);
        }
        else
        {
            console.log("FSM already has state : " + _idx);
            return -1;
        }

        return 0;
    }

    public removeState(_idx : number)
    : number
    {
        if(this.m_states_map.has(_idx))
        {
            this.m_states_map.delete(_idx);
        }
        else
        {
            console.log("FSM doesn't has state : " + _idx);
            return -1;
        }

        return 0;
    }
}
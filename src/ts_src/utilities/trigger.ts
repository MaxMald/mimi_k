/// <reference path="../../libs/tsDefinitions/phaser.d.ts">

class Trigger
{
    private m_trigger_time : number;
    private m_time : number;

    constructor()
    {
        this.m_trigger_time = 0;
        this.m_time = 0;
        return;
    }

    public update(_dt : number)
    : boolean
    {
        this.m_time += _dt;
        if(this.m_time >= this.m_trigger_time)
        {
            this.m_time = 0;
            return true;
        }
        return false;
    }

    public setTriggerTime(_trigger_time: number)
    : void
    {
        this.m_trigger_time = _trigger_time;
        return;
    }

    public setTime(_time : number)
    : void
    {
        this.m_time = _time;
        return;
    }

    public reset()
    : void
    {
        this.m_time = 0;
        return;
    }
}

export = Trigger;
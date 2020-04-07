import { MasterManager } from "../utilities/managers/masterManager";

export class BaseScene extends Phaser.Scene
{
    /**
     * Reference to the MasterManager.
     */
    protected m_master : MasterManager;

    public create ()
    : void {
        this.m_master = MasterManager.GetInstance();
        return;
    }
    
    public update(_step : number , _dt : number)
    : void {
        return;
    }

    public destroy()
    : void {
        this.m_master = null;
        return;
    }
}
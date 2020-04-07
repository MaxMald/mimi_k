import { MasterManager } from "./masterManager";

export class Manager 
{
    /**
     * Reference to the MasterManager that this Manager belongs.
     */
    protected m_master_mng : MasterManager;

    /**
     * This is the Manager's identifier number.
     */
    protected readonly m_id : number;

    /**
     * Creates a manager and assigns it an identifier number.
     * 
     * @param _id {number} Manager's identifier number.
     */
    public constructor(_id : number) {
        this.m_id = _id;
        return;
    }

    /**
     * Sets the MasterManager of this Manager.
     * 
     * @param _master {MasterManager} MasterManager.
     */
    public setMasterManager(_master : MasterManager)
    : void {
        this.m_master_mng = _master;
        return;
    }

    /**
     * Update method.
     */
    public update()
    : void {
        return;
    }

    /**
     * Safely destroys this Manager.
     */
    public destroy()
    : void {
        this.m_master_mng = null;
        return;
    }

    /**
     * Gets this Manager identifier number.
     */
    public getID()
    : number {
        return this.m_id;
    }    
}
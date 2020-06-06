import { MxUUID } from "../mxUUID";

export class MxUObject {
    
    /****************************************************/
    /* Protected                                        */
    /****************************************************/
    
    /**
     * Object's unique identifier object.
     */
    protected _m_uuid : MxUUID;    

    /****************************************************/
    /* Public                                           */
    /****************************************************/
    
    public constructor() 
    {
        this._m_uuid = MxUUID.Create();
        return;
    }

    /**
     * Gets this object's unique identifier object.
     */
    public getUUID()
    : MxUUID {
        return this._m_uuid; 
    }

    public get_uuid_string()
    : string {
        return this._m_uuid.get_uuid_string();
    }
    
    /**
    * Safely destroys the object.
    */
    public destroy()
    : void {
        this._m_uuid = null;
        return;
    }

    /****************************************************/
    /* Private                                          */
    /****************************************************/
    
}
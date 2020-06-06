export class MxUUID
{
    /****************************************************/
    /* Private                                          */
    /****************************************************/
    
    private m_id : string;

    /****************************************************/
    /* Public                                           */
    /****************************************************/
    
    public static Create()
    : MxUUID
    {
        let id = new MxUUID();
        id.m_id = Phaser.Utils.String.UUID();
        return id;
    }

    public static CreateFrom(_mxid : MxUUID)
    : MxUUID
    {
        let id = new MxUUID();
        id.m_id = _mxid.m_id;
        
        return id
    }

    public get_uuid_string()
    : string
    {
        return this.m_id;
    }

    public compare(_id : MxUUID)
    : boolean
    {
        return this.m_id == _id.m_id;
    }

    /****************************************************/
    /* Private                                          */
    /****************************************************/
        
    protected constructor()
    {
        this.m_id = "";
        return;
    }
}
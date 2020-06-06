import { MxUObject } from "../gameObjects/mxUObject";
import { MxActor } from "./mxActor";
import { MxUUID } from "../mxUUID";

export class MxComponent extends MxUObject
{
    /****************************************************/
    /* Public                                           */
    /****************************************************/
    
    public m_tag : number;

    /****************************************************/
    /* Protected                                        */
    /****************************************************/
    
    protected _m_id : number;

    /****************************************************/
    /* Private                                          */
    /****************************************************/
    
    private static _NULL_OBJECT : MxComponent;

    /****************************************************/
    /* Public                                           */
    /****************************************************/

    public static Prepare()
    : void 
    {
        if(MxComponent._NULL_OBJECT == null 
            || MxComponent._NULL_OBJECT == undefined ) {
            this._NULL_OBJECT = new MxComponent(-1);
        }
        return;
    }

    public  static Shutdown()
    : void 
    {
        if(typeof MxComponent._NULL_OBJECT == 'object') {
            this._NULL_OBJECT.destroy();
            this._NULL_OBJECT = null;
        }
        return;
    }

    public static IsNull(_object : MxComponent)
    : boolean
    {
        let uuid : MxUUID = _object.getUUID();
        return uuid.compare(MxComponent._NULL_OBJECT.getUUID());
    }

    public static GetNull()
    : MxComponent
    {
        return this._NULL_OBJECT;
    }

    public constructor(_id : number) {
        super();

        this._m_id = _id;
        return;
    }

    public get_id()
    : number {
        return this._m_id;
    }

    public init(_actor : MxActor)
    : void {
        return;
    }

    public update(_actor : MxActor)
    : void {
        return;
    }

    public receive(_id : number, _data : unknown)
    : void {
        return;
    }

    public destroy()
    : void {
        super.destroy();
        return;
    }
}
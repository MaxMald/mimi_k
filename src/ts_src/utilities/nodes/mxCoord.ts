import { MxNode } from "./mxNode"
import { Direction4 } from "../enum_commons";

export class MxCoord<T> extends MxNode
{
    protected m_coord_up : MxCoord<T>;
    protected m_coord_down : MxCoord<T>;
    protected m_coord_right : MxCoord<T>;
    protected m_coord_left : MxCoord<T>;

    protected m_object : T;

    constructor()
    {
        super();
        this.m_object = null;
        return;
    }  

    public static SetObject<U>(_coord : MxCoord<U>, _object : U)
    : void
    {
        _coord.m_object = _object;
        return;
    }

    public static IsNull<U>(_coord : MxCoord<U>)
    : boolean
    {
        return _coord.m_object == null;
    }

    public getObject()
    : T
    {
        return this.m_object;
    }

    public attachUp(_node : MxCoord<T>)
    : void
    {        
        this.m_coord_up = _node;
        _node.m_coord_down = this.m_coord_up;
        return;
    }

    public attachRight(_node : MxCoord<T>)
    : void
    {
        this.m_coord_right = _node;
        _node.m_coord_left = this.m_coord_right;
        return;
    }

    public attachLeft(_node : MxCoord<T>)
    : void
    {
        this.m_coord_left = _node;
        _node.m_coord_right = this.m_coord_left;
        return;
    }

    public attachDown(_node : MxCoord<T>)
    : void
    {
        this.m_coord_down = _node;
        _node.m_coord_up = this.m_coord_down;
        return;
    }

    public getCoord(_node : Direction4)
    : MxCoord<T>
    {
        switch(_node)
        {
            case Direction4.kUp:
            return this.m_coord_up;
            case Direction4.kDown:
            return this.m_coord_down;
            case Direction4.kLeft:
            return this.m_coord_left;
            case Direction4.kRigh:
            return this.m_coord_right;
            default:
            return this.m_coord_left;
        }
    }
}
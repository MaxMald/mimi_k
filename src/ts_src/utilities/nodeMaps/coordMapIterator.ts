import { MxCoordMap } from "./coordMap";
import { MxCoord } from "../nodes/mxCoord";
import { Direction4 } from "../enum_commons";

export class MxCoordMapIterator<T>
{
    protected m_coord_map : MxCoordMap<T>;
    protected m_coord : MxCoord<T>;

    protected constructor()
    { }

    public static Create<U>
    (
        _coord_map : MxCoordMap<U>
    )
    : MxCoordMapIterator<U>
    {
        let coord_map_it = new MxCoordMapIterator<U>(); 
               
        coord_map_it.m_coord_map = _coord_map;        
        return coord_map_it;
    }

    public  setPosition(_col : number, _row : number)
    : void
    {
        this.m_coord = this.m_coord_map.getCoord(_col, _row);
        return;
    }

    public getObject()
    : T
    {
        return this.m_coord.getObject();
    }

    public move(_direction : Direction4)
    : void
    {
        this.m_coord = this.m_coord.getCoord(_direction);
        return;
    }
}
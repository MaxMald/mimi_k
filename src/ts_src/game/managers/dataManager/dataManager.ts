import { Manager } from "../../../utilities/managers/manager";
import { MANAGER_ID } from "../../gameCommons";

export class  DataManager extends Manager
{
    /****************************************************/
    /* Private                                          */
    /****************************************************/
    
    /**
     * String map<key, value>
     */
    private _string_map : Map<string, string>;

    /****************************************************/
    /* Public                                           */
    /****************************************************/
    
    public constructor() {
        super(MANAGER_ID.kDataManager);
        this._string_map = new Map<string,string>();
        return;
    }

    public add(_key: string, _value: string)
    : void {
        this._string_map.set(_key, _value);
    }

    public getString(_key : string)
    : string {
        if(this._string_map.has(_key)) {
            return this._string_map.get(_key);
        }
        return "NOT_FOUND!";
    }

    public clear()
    : void {
        this._string_map.clear();
        return;
    }

    public destroy()
    : void {
        this._string_map.clear();
        this._string_map = null;
        return;
    }
}
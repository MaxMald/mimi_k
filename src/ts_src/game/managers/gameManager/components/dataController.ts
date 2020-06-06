import { MxComponent } from "../../../../utilities/component/mxComponent";
import { COMPONENT_ID } from "../../../gameCommons";

export class DataController extends MxComponent
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/
  
  constructor()
  {
    super(COMPONENT_ID.kDataController);

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

  /****************************************************/
  /* Private                                          */
  /****************************************************/
  
  _string_map : Map<string, string>;
}
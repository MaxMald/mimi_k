import { AssertString } from "../asserts";

export class MxDataMap
{
    /****************************************************/
    /* Public                                           */
    /****************************************************/
    
    public static Create
    (
        _data : string, 
        _separator_char : string, 
        _break_line_char : string
    ) : Map<string, string> {

        AssertString(_data);
        AssertString(_separator_char);
        AssertString(_break_line_char);

        let map : Map<string, string> = new Map<string, string>();
        
        let a_pair : string[] = _data.split(_break_line_char);
        for(let index : number = 0; index < a_pair.length; ++index) {
            let a_values : string[] = a_pair[index].split(_separator_char);
            if(a_values.length == 2) {
                map.set(a_values[0], a_values[1]);
            }
            else if( a_values.length == 1) {
                map.set(a_values[0], '');
            }
            else {
                continue;
            }
        }
        return map;
    }    
}
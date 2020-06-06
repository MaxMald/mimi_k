import { MxUObject } from "../gameObjects/mxUObject";
import { CSVFile } from "./csv_file";
import { AssertString } from "../asserts";

export class CSVRow extends MxUObject
{
    /****************************************************/
    /* Private                                          */
    /****************************************************/
       
    /**
     * Class Null Object.
     */
    private static _NULL_OBJ : CSVRow;

    /**
     * Array of cell data.
     */
    private _m_a_cells : string[];

    /**
     * Reference to its CSVFile Object.
     */
    private _m_a_csv_file : CSVFile;

    /****************************************************/
    /* Public                                           */
    /****************************************************/
    
    public static GetNull()
    : CSVRow {
        if(CSVRow._NULL_OBJ == null || CSVRow === undefined) {
            CSVRow._NULL_OBJ = new CSVRow(CSVFile.GetNull());
        }
        return CSVRow._NULL_OBJ;
    }

    public static IsNull(_row : CSVRow)
    : boolean {
        let null_id = CSVRow.GetNull().getUUID();
        let param_id = _row.getUUID();
        return param_id.compare(null_id);
    }
        
    constructor(_csv_file : CSVFile)
    {
        super();

        this._m_a_cells = new Array<string>();
        this._m_a_csv_file = _csv_file;
        return;
    }

    /**
     * Gets the value of one of this Row's cell. 
     * Returns an empty string if it doesn't has the required cell.
     * 
     * @param _index {string | number} Index can be the header's name or the cell's index. 
     */
    public getCell(_index : string | number)
    : string 
    {
        if(_index === undefined || _index == null) {
            console.warn("CSVRow: null or undefined parameter.");
            return "";
        }
        
        if(typeof _index === 'number') {
            if(this._validate_idx(_index)) {
                return this._m_a_cells[_index];
            }
        }
        else if(typeof _index === 'string') {
            let array_index : number = this._m_a_csv_file.getHeaderIdx(_index);
            if(this._validate_idx(array_index)) {
                return this._m_a_cells[array_index];
            }             
        }        
        return "";
    }

    /**
     * Adds a new cell to this row.
     * @param _data {string} New cell's data.
     */
    public addCell(_data : string)
    : void 
    {
        this._m_a_cells.push(_data);
        return;
    }

    /**
     * Adds multiple cells from raw data.
     *  
     * @param _data {string} cells raw data. 
     * @param _delimiter {char} Delimiter character for cells. i.e. ',' for CSV or '\t' for TSV.
     */
    public addCellsFromRaw(_data : string, _delimiter : string = ',')
    : void 
    {
        AssertString(_data);
        AssertString(_delimiter);

        let a_cells_data : string[] = _data.split(_delimiter);
        for(let index : number = 0; index < a_cells_data.length; ++index) {
            this._m_a_cells.push(a_cells_data[index]);
        }
        return;
    }

    public getRowSize()
    : number
    {
        return this._m_a_cells.length;
    }

    /**
    * Safely destroys the object.
    */
    public destroy()
    : void {
        super.destroy();

        this._m_a_cells = null;
        this._m_a_csv_file = null;
        return;
    }

    /****************************************************/
    /* Private                                          */
    /****************************************************/
    
    private _validate_idx(_index : number)
    : boolean {
        return (0 <= _index && _index < this._m_a_cells.length);
    }
}
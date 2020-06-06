import { CSVRow } from "./csv_row";
import { MxUObject } from "../gameObjects/mxUObject";
import { MxUUID } from "../mxUUID";
import { AssertString } from "../asserts";

export class CSVFile extends MxUObject
{
    /****************************************************/
    /* Private                                          */
    /****************************************************/
    
    private static  _NULL_OBJ : CSVFile;

    /**
     * Map of file headers.
     */
    private _m_a_headers : string[];

    /**
     * Array of Rows
     */
    private _m_a_rows : CSVRow[];
        
    /****************************************************/
    /* Public                                           */
    /****************************************************/

    public static GetNull()
    : CSVFile {
        if(CSVFile._NULL_OBJ == null || CSVFile._NULL_OBJ === undefined) {
            CSVFile._NULL_OBJ = new CSVFile();
        }
        return CSVFile._NULL_OBJ;
    }

    public static IsNull(_csv_file : CSVFile)
    : boolean {
        let null_id : MxUUID = this.GetNull().getUUID();
        let obj_id : MxUUID = _csv_file.getUUID();
        return obj_id.compare(null_id);
    }

    /**
     * Creates an useful CSVFile object to handle a raw csv data.
     * 
     * @param _csv_data {string} Raw CSV data.
     * @param _has_header_row {boolean} Does data has a header row? It takes the first row as headers.
     * @param _cell_delimiter {char} Delimiter character for cells. i.e. ',' for CSV or '\t' for TSV.
     * @param _row_delimiter {char} Delimiter character for rows, usually it is the line break ('\n') character.
     */
    public static Create
    (
        _csv_data : string,
        _has_header_row : boolean = true, 
        _cell_delimiter : string = ',',
        _row_delimiter : string = '\n'
    )
    : CSVFile {
        let csv_file : CSVFile = new CSVFile();
        
        AssertString(_csv_data);
        AssertString(_cell_delimiter);
        AssertString(_row_delimiter);

        if(_csv_data == "") {
            return csv_file;
        }

        // Remove any Carriage Character
        _csv_data = _csv_data.replace('\r', '');

        let row : CSVRow;
        let a_row_raw_data : string[] = _csv_data.split(_row_delimiter);
        let rows_start_position : number = 0;        

        // Get the headers from the csv file.
        if(_has_header_row) {
            if(a_row_raw_data.length > 0) {
                let a_cell_data : string[] = a_row_raw_data[0].split(_cell_delimiter);
                let value : string;
                for(let index : number = 0; index < a_cell_data.length; ++index) {
                    csv_file._m_a_headers.push(a_cell_data[index]);
                }
                rows_start_position++;
            }
        }

        // Get rows data.
        for(let index : number = rows_start_position; index < a_row_raw_data.length; ++index) {
            
            row = new CSVRow(csv_file);
            csv_file._m_a_rows.push(row);

            row.addCellsFromRaw(a_row_raw_data[index], _cell_delimiter);
        }

        return csv_file;
    }
    
    /**
     * Gets a row from the CSVFile. If the row_index is out of range, it will returns
     * a Null Object.
     * 
     * @param _row_index 
     */
    public getRow(_row_index : number)
    : CSVRow 
    {
        if(0 <= _row_index && _row_index < this._m_a_rows.length) {
            return this._m_a_rows[_row_index];
        }
        console.warn("Can't get the row from the CSVFile: Index out of range.");
        return  CSVRow.GetNull();
    }

    /**
     * Gets the first Row with given value in a specific header column. Return a
     * Null Object if doesn't found a row with the given specifications.
     * 
     * @param _key_header {string} key header's name
     * @param _value {string} value.
     */
    public getRowByKey(_key_header : string, _value : string)
    : CSVRow
    {
        AssertString(_key_header);
        AssertString(_value);

        let header_idx : number = this.getHeaderIdx(_key_header);
        if(header_idx < 0) {
            console.warn("Can't get the row from the CSVFile: Header doesn't exists: " + _key_header);
            return CSVRow.GetNull();
        }

        for(let index : number = 0; index < this._m_a_rows.length; ++index) {
            if(this._m_a_rows[index].getCell(header_idx) == _value) {
                return this._m_a_rows[index];
            }
        }
        return  CSVRow.GetNull();
    }

    /**
     * Returns the header column position (0 based). Returns -1 if the header
     * doesn't exists.
     * 
     * @param _header 
     */
    public getHeaderIdx(_header_name : string)
    : number 
    {
        let value : string;
        for(let index : number = 0; index < this._m_a_headers.length; ++index) {
            value = this._m_a_headers[index];
            if(value === _header_name) {
                return index;
            }
        }
        console.warn("Can't get the Header Index:" + _header_name + " Header doesn't exists in the CSVFile.");
        return -1;
    }

    /**
     * Check if the header exists in the CSVFile. Returns true if it does.
     * 
     * @param _header_name 
     */
    public hasHeader(_header_name : string)
    : boolean 
    {
        for(let index : number = 0; index < this._m_a_headers.length; ++index) {
            if(this._m_a_headers[index] == _header_name) {
                return true;
            }
        }
        return false;
    }

    public getNumberHeaders()
    : number {
        return this._m_a_headers.length;
    }

    public getNumberRows()
    : number {
        return this._m_a_rows.length;
    }

    /**
    * Safely destroys the object.
    */
    public destroy()
    : void {
        super.destroy();
        return;
    }

    /****************************************************/
    /* Private                                          */
    /****************************************************/
    
    private constructor() 
    { 
        super();

        this._m_a_headers = new Array<string>();
        this._m_a_rows = new Array<CSVRow>();
        return;
    }
}

import CSVRow = require("./csv_row");

class CSVFile
{
    public headers : CSVRow;
    public rows : Array<CSVRow>;

    constructor()
    { 
        this.headers = new CSVRow;
        this.rows = new Array<CSVRow>(0);
        return;
    }

    public getHeaderIdx(_header : string)
    : number
    {
        let idx = 0;
        let size = this.headers.cells.length;
        for(idx = 0; idx < size; idx++)
        {
            if(this.headers.cells[idx] === _header)
            {
                return idx;
            }
        }

        return null;
    }

    print()
    : void
    {
        console.log("Headers: ");

        let size = this.headers.cells.length;
        for(let idx = 0; idx < size; ++idx)
        {
            console.log(idx + " : " + this.headers.cells[idx]);
        }

        console.log("Data: ");

        size = this.rows.length;
        for(let idx = 0; idx < size; ++idx)
        {
            let row_size = this.headers.cells.length;
            console.log(" ----- Row: " + idx + " -----");
            for(let r_idx = 0; r_idx < row_size; ++r_idx)
            {
                console.log(r_idx + " : " + this.rows[idx].cells[r_idx]);
            }
        }

        return;
    }
}

export = CSVFile;
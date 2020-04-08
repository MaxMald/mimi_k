import fs = require("./fs");
import CSVRow = require("./csv_row");
import CSVFile = require("./csv_file");

class CSVReader
{
    static LoadFromFile( _path : string, _tsv : boolean = false)
    : CSVFile
    {
        let file_data : string = fs.loadFile(_path);
        if(file_data)
        {
            return this.GetCSV(file_data, _tsv);
        }        
        return null;
    }

    static GetCSV(data: string, _tsv : boolean = false)
    : CSVFile
    {
        let split_char = (_tsv?'\t':',');

        let rows_raw_data : Array<String> = data.split('\r\n');
        let csv_file : CSVFile = new CSVFile();

        let r_raw_idx : number = rows_raw_data.length;
        for(let idx = 0; idx < r_raw_idx; ++idx)
        {
            let row : CSVRow = new CSVRow();
            row.cells = rows_raw_data[idx].split(split_char);

            if(idx != 0)
            {
                csv_file.rows.push(row);
            }
            else
            {
                csv_file.headers = row;
            }            
        }

        return csv_file;
    }
}

export = CSVReader;
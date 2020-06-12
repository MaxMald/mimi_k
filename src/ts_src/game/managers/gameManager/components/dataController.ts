import { MxComponent } from "../../../../utilities/component/mxComponent";
import { COMPONENT_ID, LOCALIZATION } from "../../../gameCommons";
import { GameController } from "./gameController";
import { MxActor } from "../../../../utilities/component/mxActor";
import { CSVFile } from "../../../../utilities/fs/csv_file";
import { CSVRow } from "../../../../utilities/fs/csv_row";

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

  init(_actor : MxActor)
  : void
  {
    this._gameController = _actor.getComponent<GameController>
    (
      COMPONENT_ID.kGameController
    );
    return;
  }

  initLanguage(_game : Phaser.Game)
  : void
  {
    let csv_file : CSVFile 
    = CSVFile.Create
    (
      _game.cache.text.get('game_text'),
      true,
      '\t'
    );

    let text_column_index : number
      = (this._gameController.getLocalization() == LOCALIZATION.KSpanish ? 1 : 2);    
    let num_rows : number = csv_file.getNumberRows();
    let row : CSVRow = null;

    for(let index : number = 0; index < num_rows; ++index) {
        row = csv_file.getRow(index);
        if(CSVRow.IsNull(row)) {
          break;
        }
        this.add(row.getCell(0), row.getCell(text_column_index));
    }

    csv_file.destroy();
    return;
  }

  add(_key: string, _value: string)
  : void 
  {
    this._string_map.set(_key, _value);
  }

   getString(_key : string)
  : string 
  {
    if(this._string_map.has(_key)) {
      return this._string_map.get(_key);
    }
    return "NOT_FOUND!";
  }

  clear()
  : void 
  {
    this._string_map.clear();
    return;
  }

  destroy()
  : void 
  {
    this._string_map.clear();
    this._string_map = null;
    return;
  }

  /****************************************************/
  /* Private                                          */
  /****************************************************/
  
  _string_map : Map<string, string>;

  _gameController : GameController;
}
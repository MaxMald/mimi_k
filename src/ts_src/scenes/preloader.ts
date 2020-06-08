import { CSVFile } from "../utilities/fs/csv_file";
import { MxActor } from "../utilities/component/mxActor";
import { MasterManager } from "../game/managers/masteManager/masterManager";
import { MANAGER_ID, COMPONENT_ID, LOCALIZATION } from "../game/gameCommons";
import { GameController } from "../game/managers/gameManager/components/gameController";
import { CSVRow } from "../utilities/fs/csv_row";
import { DataController } from "../game/managers/gameManager/components/dataController";

export class Preloader extends Phaser.Scene
{
  /****************************************************/
  /* Public                                           */
  /****************************************************/
    
  preload ()
  : void {

    ///////////////////////////////////
    // Atlas
        
    this.load.atlas
    (
      'main_menu',
      'src/assets/images/atlas/main_menu.png',
      'src/assets/images/atlas/main_menu.js'
    );

    ///////////////////////////////////
    // Text

    this.load.text
    (
      'game_text', 
      'src/assets/csv_files/Mimi_k_data - game_texts.tsv'
    );
                  
    /****************************************************/
    /* Metta Puzzle Loader                              */
    /****************************************************/
        
    // Background Color
    this.cameras.main.setBackgroundColor(0xff2a2a);

    // TileMap
    let puzzle_map = this.make.tilemap
    (
      { 
        key: "metta_puzzle_loader", 
        insertNull: true 
      }
    );

    // Get TileSet for Ambience Object
    let img_collection : Phaser.Tilemaps.ImageCollection
      = this._get_image_collection(puzzle_map, 'loader_images');
       
    let img_names : string []
      = this._get_images_from_collection(img_collection);
                  
    let first_gid = img_collection.firstgid;  
 
    ///////////////////////////////////
    // Objects

    // Puzzle Labels
    let obj_layer = this._get_object_layer
    (
      puzzle_map,
      'puzzle_labels'
    );
        
    this._create_sprites_from
    (
      this,
      obj_layer,
      'metta_puzzle_loader',
      img_names,
      first_gid
    );

    // Puzzle Base
    obj_layer = this._get_object_layer
    (
      puzzle_map,
      'puzzle_base'
    );
        
    this._create_sprites_from
    (
      this,
      obj_layer,
      'metta_puzzle_loader',
      img_names,
      first_gid
    );

    // Puzzle Pieces        
    this._m_a_puzzle_pieces = new Array<Phaser.GameObjects.Sprite>();
    this._m_a_pieces_position = new Array<Phaser.Geom.Point>();

    obj_layer = this._get_object_layer
    (
      puzzle_map,
      'puzzle_pieces'
    );
        
    this._m_a_puzzle_pieces = this._create_sprites_from
    (
      this,
      obj_layer,
      'metta_puzzle_loader',
      img_names,
      first_gid
    );

    obj_layer = this._get_object_layer
    (
      puzzle_map,
      'puzzle_pieces_start_point'
    );

    let pieces_size : number = this._m_a_puzzle_pieces.length;
    let object : any;
    let piece : Phaser.GameObjects.Sprite;

    for(let index : number = 0; index < pieces_size; ++index) {
            
      object = obj_layer[index];
      piece = this._m_a_puzzle_pieces[index];

      this._m_a_pieces_position.push
      (
        new Phaser.Geom.Point
        (
          piece.x, 
          piece.y
        )
      );
            
      piece.setPosition (object.x, object.y);            
    }

    // Index
    this._m_indexes = new  Int8Array(pieces_size);
    for(let index : number = 0; index < pieces_size; ++index){
        this._m_indexes[index] = index;
    }

    this._m_active_idx = 0;
    this._shuffle(this._m_indexes);

    // Callbacks
    this.load.on('progress', this._onProgress, this);
    this.load.on('complete', this._onLoadComplete, this);
    return;
  } 

  /****************************************************/
  /* Private                                          */
  /****************************************************/
  
  _onProgress(_value : number)
  : void {        
    let target_idx : number 
      = Math.floor(this._m_indexes.length * _value);
        
    while(this._m_active_idx < target_idx) {
            
      let piece : Phaser.GameObjects.Sprite;
      let position : Phaser.Geom.Point;

      piece = this._m_a_puzzle_pieces[this._m_indexes[this._m_active_idx]];
      position = this._m_a_pieces_position[this._m_indexes[this._m_active_idx]];

      piece.setPosition        
      (
          position.x,
          position.y
      );

      ++this._m_active_idx;
    }
    return;
  }
  
  _onLoadComplete()
  : void {

    let csv_file : CSVFile 
      = CSVFile.Create
      (
        this.game.cache.text.get('game_text'),
        true,
        '\t'
      );

    // Sets the column that has the text.
    // 1 : Spanish
    // 2 : English    
    let master : MxActor = MasterManager.GetInstance();
    let gameManger : MxActor = master.get_child(MANAGER_ID.kGameManager);
    let gameController : GameController 
      = gameManger.getComponent<GameController>(COMPONENT_ID.kGameController);
    let dataController : DataController
      = gameManger.getComponent<DataController>(COMPONENT_ID.kDataController);
    let text_column_index : number
      = (gameController.getLocalization() == LOCALIZATION.KSpanish ? 1 : 2);    
    let num_rows : number = csv_file.getNumberRows();
    let row : CSVRow = null;

    for(let index : number = 0; index < num_rows; ++index) {
        row = csv_file.getRow(index);
        if(CSVRow.IsNull(row)) {
          break;
        }
        dataController.add(row.getCell(0), row.getCell(text_column_index));
    }

    csv_file.destroy();
    this.scene.start('mainMenu');
    return;
  }

  _get_object_layer
  (
    _map : Phaser.Tilemaps.Tilemap, 
    _layer : string
  )
  : any {
    return _map.getObjectLayer(_layer)['objects'];
  }

  _get_image_collection
  (
    _map : Phaser.Tilemaps.Tilemap,
    _name : string   
  ) 
  : Phaser.Tilemaps.ImageCollection {
        
    let a_img_collections : Phaser.Tilemaps.ImageCollection[] = _map.imageCollections;
    let size : number = a_img_collections.length;

    for(let index : number = 0; index < size; ++index) {
      if(a_img_collections[index].name == _name) {
        return a_img_collections[index];
      }
    }

    console.error('Image Collection not foud.');
    return null;
  }

  _get_images_from_collection
  (
    _img_collection : Phaser.Tilemaps.ImageCollection
  ) : string[] {
    let images : string[] = new Array<string>();
    let images_from_collection = _img_collection.images;

    let tile_data : any;
    let image_root : string;
    let image_name : string;
             
    for(let index = 0; index < images_from_collection.length; ++index) {
            
      tile_data = images_from_collection[index];
 
      image_root = tile_data.image;
      image_name = image_root.split('/').pop();
 
      images.push(image_name);
    }

    return images;
  }

  _create_sprites_from
  (
    _scene : Phaser.Scene,
    _objects : any,
    _atlas : string,
    _images : string[],
    _first_gid : number
  ) : Phaser.GameObjects.Sprite[] {

    let a_sprites : Phaser.GameObjects.Sprite[] 
      = new Array<Phaser.GameObjects.Sprite>();

    let size = _objects.length;
    let object : any;
    let sprite : Phaser.GameObjects.Sprite;
        
    for(let index : number = 0; index < size; ++index) {
      object = _objects[index];
      sprite = _scene.add.sprite
      (
        object.x,
        object.y,
        _atlas,
        _images[object.gid - _first_gid]
      );

      sprite.setRotation(object.rotation * Phaser.Math.DEG_TO_RAD);
      sprite.setFlipX(object.flippedHorizontal);
      sprite.setFlipY(object.flippedVertical);
      sprite.setOrigin(0,1);

      a_sprites.push(sprite);
    }
    return a_sprites;
  }

  _shuffle(_a : Int8Array)
  : Int8Array {

    let j : number; 
    let x : number; 
    let i : number;

    for (i = _a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = _a[i];
      _a[i] = _a[j];
      _a[j] = x;
    }
    return _a;
  }

  _m_a_puzzle_pieces : Phaser.GameObjects.Sprite[];
  
  _m_a_pieces_position : Phaser.Geom.Point[];
  
  _m_active_idx : number;
  
  _m_indexes : Int8Array;
}
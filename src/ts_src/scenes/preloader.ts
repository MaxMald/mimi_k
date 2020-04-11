import { MasterManager } from "../utilities/managers/masterManager";
import CSVReader = require("../utilities/fs/csv_reader");
import CSVFile = require("../utilities/fs/csv_file");
import CSVRow = require("../utilities/fs/csv_row");
import { GameManager } from "../game/managers/gameManager/gameManager";
import { MANAGER_ID, LOCALIZATION } from "../game/gameCommons";
import { DataManager } from "../game/managers/dataManager/dataManager";
import { FileLoader } from "../utilities/fs/fs";

export class Preloader extends Phaser.Scene
{
    /****************************************************/
    /* Private                                          */
    /****************************************************/
    
    private m_loading_bar : Phaser.GameObjects.RenderTexture;
    
    private m_max_size : number;

    private m_a_puzzle_pieces : Phaser.GameObjects.Sprite[];
    
    private m_a_pieces_position : Phaser.Geom.Point[];

    private m_active_idx : number;
    private m_indexes : Int8Array;

    private m_phaser_loader_ready : boolean;

    private m_file_loader : FileLoader;

    /****************************************************/
    /* Public                                           */
    /****************************************************/
    
    public preload ()
    : void
    {
        this.m_phaser_loader_ready = false;

        ///////////////////////////////////
        // CSV Data
        
        let game_mng : GameManager
            = MasterManager.GetInstance().getManager<GameManager>(MANAGER_ID.kGameManager);

        this.m_file_loader = FileLoader.GetInstance();
        this.m_file_loader.loadFile
        (
            'game_text', 
            'src/assets/csv_files/Mimi_k_data - game_texts.tsv'
        );
            
        this.m_file_loader.addListener('onLoadEnd', this._on_file_load, this);

        ///////////////////////////////////
        // TiledMap

        //this.load.tilemapTiledJSON('level_01', 'src/assets/maps/level_01.json');

        ///////////////////////////////////
        // SpriteSheets

        /*
        this.load.spritesheet
        (
            'dragon',
            'src/assets/images/player/dragon.png',
            {
                frameWidth: 128,
                frameHeight: 128,                
            }
        );
        */ 

        ///////////////////////////////////
        // Atlas
        
        this.load.atlas
        (
            'main_menu',
            'src/assets/images/atlas/main_menu.png',
            'src/assets/images/atlas/main_menu.js'
        );

        ///////////////////////////////////
        // Images
        
        /*
        this.load.image('main_menu_bckg', 'src/assets/images/main_menu/background.png');
        */       
                    
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
        
        this.m_a_puzzle_pieces = new Array<Phaser.GameObjects.Sprite>();
        this.m_a_pieces_position = new Array<Phaser.Geom.Point>();

        obj_layer = this._get_object_layer
        (
            puzzle_map,
            'puzzle_pieces'
        );
        
        this.m_a_puzzle_pieces = this._create_sprites_from
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

        let pieces_size : number = this.m_a_puzzle_pieces.length;
        let object : any;
        let piece : Phaser.GameObjects.Sprite;

        for(let index : number = 0; index < pieces_size; ++index) {
            
            object = obj_layer[index];
            piece = this.m_a_puzzle_pieces[index];

            this.m_a_pieces_position.push
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

        this.m_indexes = new  Int8Array(pieces_size);
        for(let index : number = 0; index < pieces_size; ++index){
            this.m_indexes[index] = index;
        }

        this.m_active_idx = 0;
        this._shuffle(this.m_indexes);

        // Callbacks
        this.load.on('progress', this.onProgress, this);

        this.m_file_loader.load();
        return;
    }

    public onProgress(_value : number)
    : void
    {        
        let target_idx : number 
            = Math.floor(this.m_indexes.length * _value);
        
        while(this.m_active_idx < target_idx){
            
            let piece : Phaser.GameObjects.Sprite;
            let position : Phaser.Geom.Point;

            piece = this.m_a_puzzle_pieces[this.m_indexes[this.m_active_idx]];
            position = this.m_a_pieces_position[this.m_indexes[this.m_active_idx]];

            piece.setPosition        
            (
                position.x,
                position.y
            );

            ++this.m_active_idx;
        }
        return;
    }

    public update()
    : void {
        if(this.load.progress >= 1 
            && !this.m_file_loader.isLoading()){
                this.scene.start('mainMenu');
        }
    }

    /****************************************************/
    /* Private                                          */
    /****************************************************/
    
    private _on_file_load()
    : void {

        let game_mng : GameManager 
            = MasterManager.GetInstance().getManager<GameManager>(MANAGER_ID.kGameManager);
        
        let data_mng : DataManager
            = game_mng.getDataManager();
        
        let csv_file : CSVFile 
            = CSVReader.GetCSV
            (
                this.m_file_loader.getFile('game_text'),
                true
            );
    
        let num_rows : number = csv_file.rows.length;
        let row : CSVRow;

        // Sets the column that has the text.
        // 1 : Spanish
        // 2 : English
        let text_column_index 
            = (game_mng.getLocalization() == LOCALIZATION.kSpanish ? 1 : 2); 
    
        for(let index = 0; index < num_rows; ++index) {
            row = csv_file.rows[index];
            data_mng.add(row.cells[0], row.cells[text_column_index]);
        }

        // clear storage data.
        this.m_file_loader.clearData();
    return;
    }

    private _get_object_layer
    (
        _map : Phaser.Tilemaps.Tilemap, 
        _layer : string
    )
    : any {
        return _map.getObjectLayer(_layer)['objects'];
    }

    private _get_image_collection
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

    private _get_images_from_collection
    (
        _img_collection : Phaser.Tilemaps.ImageCollection
    )
    : string[] {
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

    private _create_sprites_from
    (
        _scene : Phaser.Scene,
        _objects : any,
        _atlas : string,
        _images : string[],
        _first_gid : number
    ) 
    : Phaser.GameObjects.Sprite[] {

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
            )
            sprite.setRotation(object.rotation * Phaser.Math.DEG_TO_RAD);
            sprite.setFlipX(object.flippedHorizontal);
            sprite.setFlipY(object.flippedVertical);
            sprite.setOrigin(0,1);

            a_sprites.push(sprite);
        }

        return a_sprites;
    }

    private _shuffle(a) {
        var j, x, i;
        for (i = a.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = a[i];
            a[i] = a[j];
            a[j] = x;
        }
        return a;
    }
}
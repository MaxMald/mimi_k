import { BaseScene } from "../../BaseScene";


export class Test_Level_Tiled extends BaseScene
{ 
    private bckg_layer : Phaser.Tilemaps.StaticTilemapLayer; 
    private terrain_layer : Phaser.Tilemaps.StaticTilemapLayer;

    public create ()
    : void {
        super.create();

        /****************************************************/
        /* Scene                                            */
        /****************************************************/

        // TileMap
        let level_map = this.make.tilemap
        (
            { 
                key: "level_01", 
                insertNull: true 
            }
        );

        // Set TileSet
        let tile_set = level_map.addTilesetImage('terrain_256_01', "terrain_256_01");

        // Get Statick Layer: Background
        this.bckg_layer = level_map.createStaticLayer("Background", tile_set);

        // Get Statick Layer: Terrain
        this.terrain_layer = level_map.createStaticLayer("Terrain", tile_set);

        // Create Scene Props
        let props_layer = level_map.getObjectLayer('Props')['objects'];

        // Sort Objects by its y position
        props_layer.sort
        (
            function
            (
                _a : Phaser.Types.Tilemaps.TiledObject, 
                _b : Phaser.Types.Tilemaps.TiledObject
            )
            : number {                
                return _a.y - _b.y;
            }
        );

        // Get TileSet for Ambience Object
        let tileset_ambience : Phaser.Tilemaps.ImageCollection; 
        
        // Get Image Collection
        level_map.imageCollections.forEach
        (
            function(_img_collection : Phaser.Tilemaps.ImageCollection)
            {
                if(_img_collection.name == "ambience_01_collection") {
                    tileset_ambience = _img_collection;
                }
            },
            this
        );

        let first_gid = tileset_ambience.firstgid;
         
        let tile_data : any;
        let image_root : string;
        let image_name : string;
        let sprite : Phaser.GameObjects.Sprite;
        let object : Phaser.Types.Tilemaps.TiledObject;
            
        for(let index = 0; index < props_layer.length; ++index) {
            object = props_layer[index];
            tile_data = tileset_ambience.images[object.gid - first_gid];

            image_root = tile_data.image;
            image_name = image_root.split('/').pop();

            sprite = this.add.sprite(object.x, object.y, 'ambience_01', image_name);
            sprite.setOrigin(0,1);
        }  
        return;
    }

    public destroy()
    : void {
        this.bckg_layer.destroy();
        this.terrain_layer.destroy();       
        return;
    }
}
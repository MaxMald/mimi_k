import { MasterManager } from "../utilities/managers/masterManager";

export class Preloader extends Phaser.Scene
{
    private m_loading_bar : Phaser.GameObjects.RenderTexture;
    private m_max_size : number;

    public preload ()
    : void
    {   
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

        /*
        this.load.atlas
        (
            'touch_ui',
            'src/assets/images/touch_ui/touch_ui.png',
            'src/assets/images/touch_ui/touch_ui.js'
        );
        */

        ///////////////////////////////////
        // Images
        
        /*
        this.load.image('main_menu_bckg', 'src/assets/images/main_menu/background.png');
        */       
                    
        ///////////////////////////////////
        // Loading Bar

        /*
        let mid_v = this.game.canvas.height * 0.5;
        let mid_h = this.game.canvas.width * 0.5;

        let loading_text = this.add.sprite
        (
            mid_h, 
            mid_v - 120, 
            'loader_set',
            'text.png'
        );

        // loading background
        let bar_bckg = this.add.sprite
        (
            mid_h, 
            mid_v, 
            'loader_set',
            'bg.png'
        );

        bar_bckg.setOrigin(0,0.5);
        bar_bckg.x -= bar_bckg.width * 0.5;
        
        this.m_bck_offset = 20;
        this.m_max_size = bar_bckg.width - (this.m_bck_offset * 2);

         // nineslice bar
         this.m_loading_bar = this.add.nineslice
         (
            bar_bckg.x + this.m_bck_offset,
            bar_bckg.y,            
             136,
             61,
             {key : 'loader_set', frame: 'barg.png'},
             [2,65,2]
         );
        this.m_loading_bar.setOrigin(0,0.5);

        // Callbacks
        this.load.on('complete', this.onLoadComplete, this);
        this.load.on('progress', this.onProgress, this);      
        */

        return;
    }

    public onProgress(_value : number)
    : void
    {        
        /*
        let new_size = this.m_max_size * _value;
        if(new_size > 136)
        {
            this.m_loading_bar.resize(this.m_max_size * _value, 61);
        }        
        */
        return;
    }

    public onLoadComplete()
    : void
    {
        /**
         * Starts Main Menu Scene.
         */
        this.scene.start('mainMenu');        
        return;
    }
}